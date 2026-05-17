Const = require('./const')
Piece = require('./piece')

Array::unique = ->
  output = {}
  output[@[key]] = @[key] for key in [0...@length]
  value for key, value of output

class Board extends Array
    @promotion_line = [2, 6]
    constructor: (rows = Const.ROWS, cols = Const.COLS) ->
        super()
        @rows = rows
        @cols = cols
        for r in [0...@rows]
            @[r] = new Array(@cols).fill(null)
        @pieces = []
        @kiki = {}

    cloneBoard: ->
        clone = new Board(@rows, @cols)
        for v in @pieces
            clone[v.posi[0] - 1][v.posi[1] - 1] = v if v.posi.length != 0
        return clone

    set_standard: ->
        @pieces = []
        @pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [1,5]))
        @pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [7,3]))
        @pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [2,5]))
        @pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [6,3]))
        @pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [3,5]))
        @pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [5,3]))
        @pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [4,5]))
        @pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [4,3]))
        @pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [5,5]))
        @pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [3,3]))
        @pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [6,5]))
        @pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [2,3]))
        @pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [7,5]))
        @pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [1,3]))
        @pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [3,4]))
        @pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [5,4]))
        @pieces.push(new Piece.Ka(Const.FIRST, Const.Status.OMOTE, [5,7]))
        @pieces.push(new Piece.Ka(Const.FIRST, Const.Status.OMOTE, [3,7]))
        @pieces.push(new Piece.Ka(Const.SECOND, Const.Status.OMOTE, [3,1]))
        @pieces.push(new Piece.Ka(Const.SECOND, Const.Status.OMOTE, [5,1]))
        @pieces.push(new Piece.Ki(Const.FIRST, Const.Status.OMOTE, [6,7]))
        @pieces.push(new Piece.Ki(Const.FIRST, Const.Status.OMOTE, [2,7]))
        @pieces.push(new Piece.Ki(Const.SECOND, Const.Status.OMOTE, [2,1]))
        @pieces.push(new Piece.Ki(Const.SECOND, Const.Status.OMOTE, [6,1]))
        @pieces.push(new Piece.Gi(Const.FIRST, Const.Status.OMOTE, [7,7]))
        @pieces.push(new Piece.Ke(Const.FIRST, Const.Status.OMOTE, [1,7]))
        @pieces.push(new Piece.Gi(Const.SECOND, Const.Status.OMOTE, [1,1]))
        @pieces.push(new Piece.Ke(Const.SECOND, Const.Status.OMOTE, [7,1]))
        @pieces.push(new Piece.Ky(Const.FIRST, Const.Status.OMOTE, [4,6]))
        @pieces.push(new Piece.Ky(Const.SECOND, Const.Status.OMOTE, [4,2]))
        @pieces.push(new Piece.Ou(Const.FIRST, Const.Status.OMOTE, [4,7]))
        @pieces.push(new Piece.Ou(Const.SECOND, Const.Status.OMOTE, [4,1]))

        # test data
        # @pieces = []
        # @pieces.push(new Piece.Ou(Const.FIRST, Const.Status.OMOTE, [3,7]))
        # @pieces.push(new Piece.Ou(Const.SECOND, Const.Status.OMOTE, [5,2]))
        # @pieces.push(new Piece.Ka(Const.FIRST, Const.Status.OMOTE, [1,2]))
        # @pieces.push(new Piece.Ka(Const.FIRST, Const.Status.OMOTE, [5,6]))
        # @pieces.push(new Piece.Ka(Const.SECOND, Const.Status.OMOTE, [3,1]))
        # @pieces.push(new Piece.Ka(Const.SECOND, Const.Status.OMOTE, [7,6]))
        # @pieces.push(new Piece.Ki(Const.FIRST, Const.Status.OMOTE, [2,7]))
        # @pieces.push(new Piece.Ki(Const.FIRST, Const.Status.OMOTE, [6,7]))
        # @pieces.push(new Piece.Ki(Const.SECOND, Const.Status.OMOTE, [6,1]))
        # @pieces.push(new Piece.Ki(Const.SECOND, Const.Status.OMOTE, [2,1]))
        # @pieces.push(new Piece.Gi(Const.FIRST, Const.Status.MOTIGOMA))
        # @pieces.push(new Piece.Gi(Const.SECOND, Const.Status.OMOTE, [5,3]))
        # @pieces.push(new Piece.Ke(Const.FIRST, Const.Status.MOTIGOMA))
        # @pieces.push(new Piece.Ke(Const.SECOND, Const.Status.OMOTE, [7,1]))
        # @pieces.push(new Piece.Ky(Const.FIRST, Const.Status.MOTIGOMA))
        # @pieces.push(new Piece.Ky(Const.SECOND, Const.Status.MOTIGOMA))
        # @pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [7,5]))
        # @pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [6,5]))
        # @pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [5,5]))
        # @pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [4,5]))
        # @pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [2,5]))
        # @pieces.push(new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA))
        # @pieces.push(new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA))
        # @pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [7,3]))
        # @pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [6,3]))
        # @pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [4,3]))
        # @pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [3,2]))
        # @pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [2,3]))
        # @pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [1,4]))
        # @pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [1,6]))
        # @pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [3,5]))
        # @pieces.push(new Piece.Fu(Const.SECOND, Const.Status.MOTIGOMA))

        return

    add: (piece) ->
        @pieces.push(piece)
        return

    gameover: ->
        kings = (v for v in @pieces when v.name == 'Ou' && v.turn == Const.FIRST)
        switch kings.length
            when 2
                return Const.FIRST
            when 0
                return Const.SECOND
            else
                return false

    display: ->
        # console.log(@pieces)
        # console.log(@motigoma)
        for v,i in @pieces when v.turn == Const.SECOND && v.status == Const.Status.MOTIGOMA
            process.stdout.write(v.caption()) if v?
        process.stdout.write("\n")

        for col in [@cols..1]
            process.stdout.write(" " + col.toString())
        process.stdout.write("\n")

        for row in [1..@rows]
            for col in [@cols..1] by -1
                koma = (v for v in @pieces when v.posi? && v.posi[0] == col && v.posi[1] == row)
                process.stdout.write("|" + if koma.length != 0 then koma[0].caption() else " ")
            process.stdout.write("|" + row.toString() + "\n")

        for v,i in @pieces when v.turn == Const.FIRST && v.status == Const.Status.MOTIGOMA
            process.stdout.write(v.caption()) if v?
        process.stdout.write("\n")
        return

    make_kiki: (turn, exclude = null) ->
        @kiki[turn] = []
        src = []
        src = ((null for c in [1..@cols]) for r in [1..@rows])
        for v in @pieces
            src[v.posi[0] - 1][v.posi[1] - 1] = v if v.posi.length != 0
        selected = (v for v in @pieces when v.turn == turn && v.status != Const.Status.MOTIGOMA && v.name != exclude)
        for col in [1..@cols]
            for row in [1..@rows]
                for v in selected
                    if check_kiki.call @, v, [row, col], src
                        @kiki[turn].push([row, col])
                        break
        return

    make_kiki_value: ->
        @kiki[Const.FIRST] = []
        @kiki[Const.SECOND] = []
        for v in @pieces
            v.coefficient = 0
            if v.status != Const.Status.MOTIGOMA
                count_kiki.call @, v
        @kiki[Const.FIRST] = @kiki[Const.FIRST].unique()
        @kiki[Const.SECOND] = @kiki[Const.SECOND].unique()
        return

    check_move: (piece, d_posi, d_piece = null) ->
        # console.log("check_move")
        force_promo = false
        if d_piece?
            dest = d_piece
        else
            dest = (v for v in @pieces when v.posi? && v.posi[0] == d_posi[0] && v.posi[1] == d_posi[1])[0]
        if piece.status == Const.Status.MOTIGOMA
            # 駒が存在しているところに駒を打とうとした
            if !dest? && check_potential.call @, piece, d_posi
                # 二歩チェック
                if (piece.name == 'Fu') && (check_nifu.call @, piece, d_posi)
                    # console.log("check0")
                    return false
                else
                    # console.log("check-1")
                    return true
            else
                # console.log("check00")
                return false
        else
            unless check_potential.call @, piece, d_posi
                if @check_promotion(piece, d_posi)
                    force_promo = true
                else
                    # console.log("check00-1")
                    return false
                    # console.log("--- Error in Board.check_move ---")

        for v in getClass(piece.name).getD(piece.turn, piece.status)
            buf = [].concat(piece.posi)
            buf[0] += v.xd; buf[1] += v.yd
            if (buf[0] == d_posi[0] && buf[1] == d_posi[1])
                if dest?
                    if (piece.turn != dest.turn)
                        piece.status = Const.Status.URA if force_promo
                        # console.log("check1")
                        return true
                else
                    piece.status = Const.Status.URA if force_promo
                    # console.log("check2")
                    return true
            if v.series > 0
                cnt = v.series
                while (buf[0] in [1..@cols]) && (buf[1] in [1..@rows]) && cnt > 0
                    # if (buf.toString() == d_posi.toString())
                    if (buf[0] == d_posi[0] && buf[1] == d_posi[1])
                        if !dest?
                            piece.status = Const.Status.URA if force_promo
                            # console.log("check3")
                            return true
                        else
                            if (piece.turn != dest.turn)
                                piece.status = Const.Status.URA if force_promo
                                # console.log("check4")
                                return true
                            else
                                break
                    else
                        break if (o for o in @pieces when o.posi? && o.posi[0] == buf[0] && o.posi[1] == buf[1])[0]?
                    buf[0] += v.xd; buf[1] += v.yd
                    cnt -= 1
        # console.log("check5")
        return false

    # 成れるかどうか判定
    check_promotion: (piece, d_posi) ->
        return false unless piece.status == Const.Status.OMOTE
        return false if piece.name in ['Ou', 'Ka', 'Ki', 'Gi', 'Ke']
        switch piece.turn
            when Const.FIRST
                return true if (piece.posi[1] <= Board.promotion_line[0] || d_posi[1] <= Board.promotion_line[0])
            when Const.SECOND
                return true if (piece.posi[1] >= Board.promotion_line[1] || d_posi[1] >= Board.promotion_line[1])
        return false

    move_capture: (piece, d_posi, d_piece = null) ->
        if d_piece?
            dest = d_piece
        else
            dest = (v for v in @pieces when v.posi? && v.posi[0] == d_posi[0] && v.posi[1] == d_posi[1])[0]
        if dest?
            dest.status = Const.Status.MOTIGOMA
            dest.setTurn(piece.turn)
            dest.posi = []
        else
            if piece.status == Const.Status.MOTIGOMA
                piece.status = Const.Status.OMOTE
        s_posi = [].concat(piece.posi)
        piece.posi = [].concat(d_posi)
        return s_posi

    check_tumi: (turn, utifudume_flg = null) ->
        first_king = (v for v in @pieces when v.turn == Const.FIRST && v.name == 'Ou')[0]
        return [true, Const.MIN_VALUE] unless first_king
        second_king = (v for v in @pieces when v.turn == Const.SECOND && v.name == 'Ou')[0]
        return [true, Const.MAX_VALUE] unless second_king
        f_canmove = false; s_canmove = false
        first = 0; second = 0
        @make_kiki_value()

        # 王手が掛かっているかどうか
        s_oute = (o for o in @kiki[Const.FIRST] when o[0] == second_king.posi[0] && o[1] == second_king.posi[1])[0]?
        f_oute = (o for o in @kiki[Const.SECOND] when o[0] == first_king.posi[0] && o[1] == first_king.posi[1])[0]?
        # console.log("f_oute = #{f_oute}")
        # console.log("s_oute = #{s_oute}")

        # 味方の駒の位置も相手の利きに追加（玉が移動出来ない座標という意味では同じ）
        for v in @pieces when v.turn == Const.FIRST && v.status != Const.Status.MOTIGOMA
            @kiki[Const.SECOND].push(v.posi)
        for v in @pieces when v.turn == Const.SECOND && v.status != Const.Status.MOTIGOMA
            @kiki[Const.FIRST].push(v.posi)

        # console.log(@kiki[Const.FIRST])
        # console.log(@kiki[Const.SECOND])

        org = [].concat(first_king.posi)
        for v in Piece.Ou.getD(first_king.turn, first_king.status)
            dest = [org[0] + v.xd, org[1] + v.yd]
            continue unless (dest[0] in [1..@cols] && dest[1] in [1..@rows])
            if (o for o in @kiki[Const.SECOND] when o[0] == dest[0] && o[1] == dest[1])[0]?
                continue
            else
                f_canmove = true
                break
        org = [].concat(second_king.posi)
        for v in Piece.Ou.getD(second_king.turn, second_king.status)
            dest = [org[0] + v.xd, org[1] + v.yd]
            continue unless (dest[0] in [1..@cols] && dest[1] in [1..@rows])
            if (o for o in @kiki[Const.FIRST] when o[0] == dest[0] && o[1] == dest[1])[0]?
                continue
            else
                s_canmove = true
                break
        # console.log("f_canmove = #{f_canmove}")
        # console.log("s_canmove = #{s_canmove}")

        # 先手が王手掛かっていて指したのが先手なら後手勝ち
        if f_oute && turn == Const.FIRST
            # console.log("check1")
            return [true, Const.MIN_VALUE]
        # 後手が王手掛かっていて指したのが後手なら先手勝ち
        else if s_oute && turn == Const.SECOND
            # console.log("check2")
            return [true, Const.MAX_VALUE]
        # 先手玉が動けなくて王手が掛かっていたら後手勝ち
        else if f_canmove == false && f_oute
            # 後手が王手放置していて指したのが後手なら先手勝ち
            if s_oute && turn == Const.SECOND
                # console.log("check3")
                return [true, Const.MAX_VALUE]
            else if utifudume_flg
                # console.log("check4")
                return [true, Const.UTIFUDUME]
            else
                return [true, Const.CHECKMATE]
        # 後手玉が動けなくて王手が掛かっていたら先手勝ち
        else if s_canmove == false && s_oute
            # 先手が王手放置していて指したのが先手なら後手勝ち
            if f_oute && turn == Const.FIRST
                # console.log("check5")
                return [true, Const.MIN_VALUE]
            else if utifudume_flg
                # console.log("check6")
                return [true, Const.UTIFUDUME]
            else
                return [true, Const.CHECKMATE]
        # else
        for v in @pieces
            first += v.omomi() if v.turn == Const.FIRST
            second += v.omomi() if v.turn == Const.SECOND
        # console.log("check7")
        return [false, (first - second)]

    check_utifudume: (piece, d_posi) ->
        # console.log("check_utifudume")
        oppo = if piece.turn == Const.FIRST then Const.SECOND else Const.FIRST
        oppo_king = (v for v in @pieces when v.turn == oppo && v.name == 'Ou')[0]

        @make_kiki(oppo, 'Ou')
        if (o for o in @kiki[oppo] when o[0] == d_posi[0] && o[1] == d_posi[1])[0]?
            return false

        @make_kiki(piece.turn)
        org = [].concat(oppo_king.posi)
        for v in Piece.Ou.getD(oppo_king.turn, oppo_king.status)
            dest = [org[0] + v.xd, org[1] + v.yd]
            continue unless (dest[0] in [1..@cols] && dest[1] in [1..@rows])
            if (o for o in @kiki[piece.turn] when o[0] == dest[0] && o[1] == dest[1])[0]?
                continue
            else
                unless (w for w in @pieces when w.posi? && w.posi[0] == dest[0] && w.posi[1] == dest[1])[0]?
                    return false
        return true

    check_nifu = (piece, d_posi) ->
        # return (v for v in @pieces when v.posi? && v.posi[0] == d_posi[0] && v.name == 'Fu' && v.status == Const.Status.OMOTE && v.turn == piece.turn)[0]?
        tsubame = (v for v in @pieces when v.posi? && v.posi[0] == d_posi[0] && v.name == 'Fu' && v.status == Const.Status.OMOTE && v.turn == piece.turn)
        if tsubame.length >= 2
            return true
        else
            return false

    # 打った後、指した後に移動可能な場所が無い場合falseを返す
    check_potential = (piece, d_posi) ->
        for v in getClass(piece.name).getD(piece.turn, piece.status)
            if ((d_posi[0] + v.xd) > 0) && ((d_posi[1] + v.yd) > 0) && ((d_posi[0] + v.xd) <= @cols) && ((d_posi[1] + v.yd) <= @rows)
                return true
        return false

    check_kiki = (piece, d_posi, src) ->
        for v in getClass(piece.name).getD(piece.turn, piece.status)
            buf = [].concat(piece.posi)
            cnt = v.series
            loop
                buf[0] += v.xd; buf[1] += v.yd
                break unless buf[0] in [1..@cols] && buf[1] in [1..@rows]
                return true if buf[0] == d_posi[0] && buf[1] == d_posi[1]
                # break if (o for o in @pieces when o.posi? && o.posi[0] == buf[0] && o.posi[1] == buf[1])[0]?
                break if src[buf[0] - 1][buf[1] - 1]?
                cnt -= 1
                break unless cnt > 0
        return false

    count_kiki = (piece) ->
        # console.log("piece = ")
        # console.log(piece)
        for v in getClass(piece.name).getD(piece.turn, piece.status)
            buf = [].concat(piece.posi)
            cnt = v.series
            loop
                buf[0] += v.xd; buf[1] += v.yd
                break unless (buf[0] in [1..@cols] && buf[1] in [1..@rows])
                dest = (o for o in @pieces when o.posi? && o.posi[0] == buf[0] && o.posi[1] == buf[1])[0]
                # console.log("dest = #{dest}")
                # 味方の駒あっても利きから漏れないようにここでpush
                # 但し駒の働き評価値（移動可能箇所数）にはカウントしない
                @kiki[piece.turn].push([buf[0], buf[1]])
                if dest
                    if dest.turn == piece.turn
                        break
                    else
                        piece.coefficient += 1
                        break
                else
                    piece.coefficient += 1
                cnt -= 1
                break unless cnt > 0
        # console.log("piece.coefficient = #{piece.coefficient}")
        # board.display()
        return

module.exports = Board
