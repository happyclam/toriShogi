Const = require('./const')
Piece = require('./piece')

class Player
    # @depthプロパティはthink,prepareメソッドに渡す引数limitより大きな数値である必要がある
    # 読みの深さとしての属性（@depth）は許容量、実際の読みの深さとして渡すlimit引数の関係
    constructor:(@turn, @human, @depth = 2) ->
        @pre_ahead = 0
        @pre_select = 20
        @preparation = []

    prepare: (board, oppo, limit, preValue, pre_ahead = 2) ->
        @preparation = []
        @pre_ahead = pre_ahead
        ret = @think(board, oppo, @pre_ahead, preValue)
        if @turn == Const.FIRST
            sortPreparation.call @, @preparation, 'desc'
        else
            sortPreparation.call @, @preparation, 'asc'
        # console.log("@preparation")
        # console.log(@preparation)
        # console.log("--- @turn = #{@turn}:  @preparation.length = #{@preparation.length}")
        selection = {}
        selection["pieces"] = []
        selection["positions"] = []
        for v in @preparation
            buf = (w for w in board.pieces when w.id == v.id)
            # 同じ駒を打つ時は６カ所に制限
            # continue if (x for x in selection.positions when x.id == v.id && v.s_posi.length == 0).length > 5
            if buf.length > 0
                if (x for x in selection.pieces when x.id == v.id).length == 0
                    selection.pieces.push(buf[0])
                    selection.positions.push({id: v.id, posi: v.posi})
                if (x for x in selection.positions when x.id == v.id && x.posi == v.posi).length == 0
                    selection.positions.push({id: v.id, posi: v.posi})
            break if selection.positions.length > @pre_select
        # console.log("selection")
        # console.log(selection)
        @pre_ahead = -1
        ret = @think(board, oppo, limit, preValue, selection)
        # console.log("ret = #{JSON.stringify(ret)}")
        return ret

    think: (board, oppo, limit, preValue, priority = {}, check_flg = null) ->
        spare = {}
        lastscore = if @turn == Const.FIRST then Const.MIN_VALUE else Const.MAX_VALUE
        lastposi = null
        lastkoma = null
        laststatus = null
        score = 0
        kinds = []
        move_piece = null
        utifudume_flg = null
        src = board.cloneBoard()
        if Object.keys(priority).length != 0
            selections = priority.pieces
        else
            selections = board.pieces
        for koma in selections when koma.turn == @turn
            # 同じ駒でも指す場所が複数になるので、この段階では複数の候補となる
            if Object.keys(priority).length != 0
                choice = priority.positions
            if koma.status == Const.Status.MOTIGOMA
                continue if koma.name in kinds
                kinds.push(koma.name)
                for col in [1..board.cols]
                    for row in [1..board.rows]
                        if Object.keys(priority).length != 0
                            continue unless (w for w in choice when koma.id == w.id && row == w.posi[0] && col == w.posi[1])[0]?
                        dest = src[row - 1][col - 1]
                        continue if dest?
                        if koma.name == 'Fu' && is_utifuOute.call @, board, koma, [row, col]
                            if board.check_utifudume(koma, [row, col])
                                utifudume_flg = null
                                continue
                            else
                                utifudume_flg = true
                        else
                            utifudume_flg = null
                        move_piece = new Piece.Piece(koma.turn, koma.status, koma.posi)
                        if board.check_move(koma, [row, col], src[row - 1][col - 1])
                            board.move_capture(koma, [row, col], src[row - 1][col - 1])
                            result = []
                            result = board.check_tumi(@turn, utifudume_flg)
                            if limit > 0 && !result[0]
                                # if @pre_ahead == -1 && limit > 3
                                #     ret = oppo.prepare(board, @, limit - 1, if oppo.turn == Const.FIRST then Const.MAX_VALUE else Const.MIN_VALUE)
                                # else
                                ret = oppo.think(board, @, limit - 1, lastscore, {})
                                score = ret[2]
                            else
                                if check_flg == null && result[1] == Const.CHECKMATE
                                    checkmate_threshold = if oppo.turn == Const.FIRST then Const.MAX_VALUE else Const.MIN_VALUE
                                    checkmate_ret = []
                                    checkmate_ret = oppo.think(board, @, limit - 1, checkmate_threshold, {}, true)
                                    score = checkmate_ret[2]
                                else if check_flg == null && result[1] == Const.UTIFUDUME
                                    utifudume_threshold = if oppo.turn == Const.FIRST then Const.MAX_VALUE else Const.MIN_VALUE
                                    utifudume_ret = []
                                    utifudume_ret = oppo.think(board, @, limit - 1, utifudume_threshold, {}, false)
                                    if utifudume_ret[2] >= Const.MAX_VALUE || utifudume_ret[2] <= Const.MIN_VALUE
                                        score = utifudume_ret[2] * -1
                                    else
                                        score = utifudume_ret[2]
                                else
                                    score = result[1]
                            @preparation.push {"id": koma.id, "kind": koma.name,"s_posi": move_piece.posi, "posi": [row,col], "status": koma.status, "score": score, "weight": koma.omomi()} if limit == @pre_ahead
                            shortCut = false
                            if (score > lastscore && @turn == Const.FIRST) || (score < lastscore && @turn == Const.SECOND)
                                spare["koma"] = lastkoma
                                spare["posi"] = [].concat(lastposi)
                                spare["score"] = lastscore
                                spare["status"] = laststatus
                                lastkoma = koma
                                lastscore = score
                                lastposi = [].concat([row, col])
                                laststatus = koma.status
                                if ((preValue < score && @turn == Const.FIRST) || (preValue > score && @turn == Const.SECOND))
                                    shortCut = true
                        koma.turn = move_piece.turn
                        koma.status = move_piece.status
                        koma.posi = move_piece.posi
                        return [lastkoma, lastposi, lastscore, laststatus, spare] if (score >= Const.MAX_VALUE && @turn == Const.FIRST) || (score <= Const.MIN_VALUE && @turn == Const.SECOND)
                        return [lastkoma, lastposi, lastscore, laststatus, spare] if shortCut
            else
                for v in getClass(koma.name).getD(koma.turn, koma.status)
                    buf = [].concat(koma.posi)
                    loop
                        break unless ((buf[0] + v.xd in [1..board.cols]) && (buf[1] + v.yd in [1..board.rows]))
                        # promotion = false
                        buf[0] += v.xd; buf[1] += v.yd
                        if Object.keys(priority).length != 0
                            continue unless (w for w in choice when koma.id == w.id && buf[0] == w.posi[0] && buf[1] == w.posi[1])[0]?
                        dest = src[buf[0] - 1][buf[1] - 1]
                        break if dest? && dest.turn == koma.turn
                        move_piece = new Piece.Piece(koma.turn, koma.status, koma.posi)
                        if dest?
                            dest_piece = new Piece.Piece(dest.turn, dest.status, dest.posi)
                        if board.check_move(koma, buf, src[buf[0] - 1][buf[1] - 1])
                            # promotion = true if board.check_promotion(koma, buf)
                            koma.status = Const.Status.URA if board.check_promotion(koma, buf)
                            board.move_capture(koma, buf, src[buf[0] - 1][buf[1] - 1])
                            # loop
                            result = []
                            result = board.check_tumi(@turn)
                            if limit > 0 && !result[0]
                                # if @pre_ahead == -1 && limit > 3
                                #     ret = oppo.prepare(board, @, limit - 1, if oppo.turn == Const.FIRST then Const.MAX_VALUE else Const.MIN_VALUE)
                                # else
                                ret = oppo.think(board, @, limit - 1, lastscore, {})
                                score = ret[2]
                            else
                                if check_flg == null && result[1] == Const.CHECKMATE
                                    checkmate_threshold = if oppo.turn == Const.FIRST then Const.MAX_VALUE else Const.MIN_VALUE
                                    checkmate_ret = []
                                    checkmate_ret = oppo.think(board, @, limit - 1, checkmate_threshold, {}, true)
                                    score = checkmate_ret[2]
                                # 打ち歩時だけだと不十分、玉が睨み合っている時はCHECKMATEが返ってくるので
                                # 駒を指した時ここでも打ち歩詰めチェック
                                else if check_flg == false && result[1] == Const.CHECKMATE && dest? && dest.kind() == 'Fu' && koma.kind() != 'Ou'
                                    utifudume_threshold = if oppo.turn == Const.FIRST then Const.MAX_VALUE else Const.MIN_VALUE
                                    utifudume_ret = []
                                    utifudume_ret = oppo.think(board, @, 0, utifudume_threshold, {})
                                    if utifudume_ret[2] >= Const.MAX_VALUE || utifudume_ret[2] <= Const.MIN_VALUE
                                        score = utifudume_ret[2] * -1
                                    else
                                        score = utifudume_ret[2]
                                else
                                    score = result[1]
                            @preparation.push {"id": koma.id,  "kind": koma.name,"s_posi": move_piece.posi, "posi": [].concat(buf), "status": koma.status, "score": score, "weight": koma.omomi()} if limit == @pre_ahead
                            shortCut = false
                            if (score > lastscore && @turn == Const.FIRST) || (score < lastscore && @turn == Const.SECOND)
                                spare["koma"] = lastkoma
                                spare["posi"] = [].concat(lastposi)
                                spare["score"] = lastscore
                                spare["status"] = laststatus
                                lastkoma = koma
                                lastscore = score
                                lastposi = [].concat(buf)
                                laststatus = koma.status
                                if ((preValue < score && @turn == Const.FIRST) || (preValue > score && @turn == Const.SECOND))
                                    shortCut = true
                                # # 駒が成れる場合は成ってからもう一度評価する
                                # if promotion
                                #     promotion = false
                                #     koma.status = Const.Status.URA
                                # else
                                #     break
                        koma.turn = move_piece.turn
                        koma.status = move_piece.status
                        koma.posi = move_piece.posi
                        if dest?
                            dest.turn = dest_piece.turn
                            dest.status = dest_piece.status
                            dest.posi = dest_piece.posi
                        return [lastkoma, lastposi, lastscore, laststatus, spare] if (score >= Const.MAX_VALUE && @turn == Const.FIRST) || (score <= Const.MIN_VALUE && @turn == Const.SECOND)
                        return [lastkoma, lastposi, lastscore, laststatus, spare] if shortCut
                        # break unless (!dest? && v.series)
        return [lastkoma, lastposi, lastscore, laststatus, spare]

    sortPreparation = (arr, order = 'asc') ->
        arr.sort (a, b) ->
            if a.score != b.score
                if order is 'asc'
                    a.score - b.score
                else
                    b.score - a.score
            else if a.weight != b.weight
                a.weight - b.weight
            else
                if Math.random() < 0.5 then -1 else 1

    is_utifuOute = (board, piece, d_posi) ->
        oppo = if piece.turn == Const.FIRST then Const.SECOND else Const.FIRST
        oppo_king = (v for v in board.pieces when v.turn == oppo && v.name == 'Ou')[0]
        buf = [].concat(d_posi)
        buf[0] += Piece.Fu.getD(piece.turn, piece.status)[0].xd
        buf[1] += Piece.Fu.getD(piece.turn, piece.status)[0].yd
        return (oppo_king.posi[0] == buf[0] && oppo_king.posi[1] == buf[1])

module.exports = Player
