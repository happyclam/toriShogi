Const = require('./const')

@getClass = (classname) ->
    return switch classname
        when 'Ou' then gOu
        # when 'Hi' then gHi
        when 'Ka' then gKa
        when 'Ki' then gKi
        when 'Gi' then gGi
        when 'Ke' then gKe
        when 'Ky' then gKy
        when 'Fu' then gFu
        else gPiece

class Course
    constructor: (series = 0, xd = 0, yd = 0) ->
        @series = series
        @xd = xd
        @yd = yd

class Piece
    constructor: (@turn, @status, @posi = null) ->
        @posi = if @posi? then @posi.concat() else []
        @id = uniqueId.call @
        @coefficient = 0.0
        @gravity = 1.0
    setTurn: (turn) ->
        if turn != @turn
            @turn = turn
    uniqueId = (length = 8) ->
        id = ""
        id += Math.random().toString(36).substr(2) while id.length < length
        return id.substr 0, length

class Ou extends Piece
    # Ootori
    _direction = {}
    _direction[Const.Status.OMOTE] = {}
    _direction[Const.Status.URA] = {}
    _direction[Const.Status.MOTIGOMA] = {}
    _direction[Const.Status.OMOTE][Const.FIRST] = [new Course(0, 0, -1), new Course(0, -1, -1), new Course(0, -1, 0), new Course(0, -1, 1), new Course(0, 0, 1), new Course(0, 1, 1), new Course(0, 1, 0), new Course(0, 1, -1)]
    _direction[Const.Status.OMOTE][Const.SECOND] = [new Course(0, 0, 1), new Course(0, 1, 1), new Course(0, 1, 0), new Course(0, 1, -1), new Course(0, 0, -1), new Course(0, -1, -1), new Course(0, -1, 0), new Course(0, -1, 1)]
    _direction[Const.Status.URA][Const.FIRST] = []
    _direction[Const.Status.URA][Const.SECOND] = []
    _direction[Const.Status.MOTIGOMA][Const.FIRST] = []
    _direction[Const.Status.MOTIGOMA][Const.SECOND] = []
    @potential = [8, 8, 8]
    @weight = [9999, 9999, 9999]
    @getD: (turn, status) ->
        return _direction[status][turn]

    constructor: (turn, status, posi) ->
        super(turn, status, posi)
        @name = 'Ou'
    # kind: ->
    #     @constructor.name
    koma: ->
        return "OO"

    omomi: ->
        ret = switch @status
            when Const.Status.OMOTE then Ou.weight[Const.Status.OMOTE]
            when Const.Status.URA then Ou.weight[Const.Status.URA]
            when Const.Status.MOTIGOMA then Ou.weight[Const.Status.MOTIGOMA]
            else 0
        return ret
    caption: ->
        switch @status
            when Const.Status.OMOTE
                if @turn == Const.FIRST then 'O' else 'o'
            when Const.Status.URA
                if @turn == Const.FIRST then 'O' else 'o'
            when Const.Status.MOTIGOMA
                if @turn == Const.FIRST then 'O' else 'o'

class Ka extends Piece
    # Tsuru
    # ki
    _direction = {}
    _direction[Const.Status.OMOTE] = {}
    _direction[Const.Status.URA] = {}
    _direction[Const.Status.MOTIGOMA] = {}
    _direction[Const.Status.OMOTE][Const.FIRST] = [new Course(0, -1, -1), new Course(0, -1, 1), new Course(0, 1, 1), new Course(0, 1, -1), new Course(0, 0, -1), new Course(0, 0, 1)]
    _direction[Const.Status.OMOTE][Const.SECOND] = [new Course(0, 1, 1), new Course(0, 1, -1), new Course(0, -1, -1), new Course(0, -1, 1), new Course(0, 0, -1), new Course(0, 0, 1)]
    _direction[Const.Status.URA][Const.FIRST] = []
    _direction[Const.Status.URA][Const.SECOND] = []
    _direction[Const.Status.MOTIGOMA][Const.FIRST] = [new Course(0, -1, -1), new Course(0, -1, 1), new Course(0, 1, 1), new Course(0, 1, -1), new Course(0, 0, -1), new Course(0, 0, 1)]
    _direction[Const.Status.MOTIGOMA][Const.SECOND] = [new Course(0, 1, 1), new Course(0, 1, -1), new Course(0, -1, -1), new Course(0, -1, 1), new Course(0, 0, -1), new Course(0, 0, 1)]
    @potential = [6, 6, 6]
    @weight = [55, 55, 44]
    @getD: (turn, status) ->
        return _direction[status][turn]

    constructor: (turn, status, posi) ->
        super(turn, status, posi)
        @name = 'Ka'
    # kind: ->
    #     @constructor.name
    koma: ->
        return "TR"

    omomi: ->
        ret = switch @status
            when Const.Status.OMOTE
                Ka.weight[Const.Status.OMOTE] * (@gravity + @coefficient / Ka.potential[@status])
            when Const.Status.URA
                Ka.weight[Const.Status.URA] * (@gravity + @coefficient / Ka.potential[@status])
            when Const.Status.MOTIGOMA
                Ka.weight[Const.Status.MOTIGOMA]
            else 0
        return parseInt(ret, 10)

    caption: ->
        switch @status
            when Const.Status.OMOTE
                if @turn == Const.FIRST then 'M' else 'm'
            when Const.Status.URA
                if @turn == Const.FIRST then 'U' else 'u'
            when Const.Status.MOTIGOMA
                if @turn == Const.FIRST then 'M' else 'm'

class Ki extends Piece
    # Kizi
    # ke
    _direction = {}
    _direction[Const.Status.OMOTE] = {}
    _direction[Const.Status.URA] = {}
    _direction[Const.Status.MOTIGOMA] = {}
    _direction[Const.Status.OMOTE][Const.FIRST] = [new Course(0, 0, -2), new Course(0, -1, 1), new Course(0, 1, 1)]
    _direction[Const.Status.OMOTE][Const.SECOND] = [new Course(0, 0, 2), new Course(0, -1, -1), new Course(0, 1, -1)]
    _direction[Const.Status.URA][Const.FIRST] = []
    _direction[Const.Status.URA][Const.SECOND] = []
    _direction[Const.Status.MOTIGOMA][Const.FIRST] = [new Course(0, 0, -2), new Course(0, -1, 1), new Course(0, 1, 1)]
    _direction[Const.Status.MOTIGOMA][Const.SECOND] = [new Course(0, 0, 2), new Course(0, -1, -1), new Course(0, 1, -1)]
    @potential = [3, 3, 3]
    @weight = [30, 30, 24]
    @getD: (turn, status) ->
        return _direction[status][turn]

    constructor: (turn, status, posi) ->
        super(turn, status, posi)
        @name = 'Ki'
    # kind: ->
    #     @constructor.name
    koma: ->
        return "KZ"

    omomi: ->
        ret = switch @status
            when Const.Status.OMOTE
                Ki.weight[Const.Status.OMOTE] * (@gravity + @coefficient / Ki.potential[@status])
            when Const.Status.URA
                Ki.weight[Const.Status.URA] * (@gravity + @coefficient / Ki.potential[@status])
            when Const.Status.MOTIGOMA
                Ki.weight[Const.Status.MOTIGOMA]
            else 0
        return parseInt(ret, 10)

    caption: ->
        switch @status
            when Const.Status.OMOTE
                if @turn == Const.FIRST then 'X' else 'x'
            when Const.Status.URA
                if @turn == Const.FIRST then 'X' else 'x'
            when Const.Status.MOTIGOMA
                if @turn == Const.FIRST then 'X' else 'x'

class Gi extends Piece
    # Hidari Uzura
    # gi
    _direction = {}
    _direction[Const.Status.OMOTE] = {}
    _direction[Const.Status.URA] = {}
    _direction[Const.Status.MOTIGOMA] = {}
    _direction[Const.Status.OMOTE][Const.FIRST] = [new Course(9, 0, -1), new Course(9, -1, 1), new Course(0, 1, 1)]
    _direction[Const.Status.OMOTE][Const.SECOND] = [new Course(9, 0, 1), new Course(9, 1, -1), new Course(0, -1, -1)]
    _direction[Const.Status.URA][Const.FIRST] = []
    _direction[Const.Status.URA][Const.SECOND] = []
    _direction[Const.Status.MOTIGOMA][Const.FIRST] = [new Course(9, 0, -1), new Course(9, -1, 1), new Course(0, 1, 1)]
    _direction[Const.Status.MOTIGOMA][Const.SECOND] = [new Course(9, 0, 1), new Course(9, 1, -1), new Course(0, -1, -1)]
    @potential = [7, 7, 7]
    @weight = [45, 45, 36]
    @getD: (turn, status) ->
        return _direction[status][turn]

    constructor: (turn, status, posi) ->
        super(turn, status, posi)
        @name = 'Gi'
    # kind: ->
    #     @constructor.name
    koma: ->
        return "LU"
    omomi: ->
        ret = switch @status
            when Const.Status.OMOTE
                Gi.weight[Const.Status.OMOTE] * (@gravity + @coefficient / Gi.potential[@status])
            when Const.Status.URA
                Gi.weight[Const.Status.URA] * (@gravity + @coefficient / Gi.potential[@status])
            when Const.Status.MOTIGOMA
                Gi.weight[Const.Status.MOTIGOMA]
            else 0
        return parseInt(ret, 10)

    caption: ->
        switch @status
            when Const.Status.OMOTE
                if @turn == Const.FIRST then 'G' else 'g'
            when Const.Status.URA
                if @turn == Const.FIRST then 'N' else 'n'
            when Const.Status.MOTIGOMA
                if @turn == Const.FIRST then 'G' else 'g'

class Ke extends Piece
    # Migi Uzura
    # gi
    _direction = {}
    _direction[Const.Status.OMOTE] = {}
    _direction[Const.Status.URA] = {}
    _direction[Const.Status.MOTIGOMA] = {}
    _direction[Const.Status.OMOTE][Const.FIRST] = [new Course(9, 0, -1), new Course(9, 1, 1), new Course(0, -1, 1)]
    _direction[Const.Status.OMOTE][Const.SECOND] = [new Course(9, 0, 1), new Course(9, -1, -1), new Course(0, 1, -1)]
    _direction[Const.Status.URA][Const.FIRST] = []
    _direction[Const.Status.URA][Const.SECOND] = []
    _direction[Const.Status.MOTIGOMA][Const.FIRST] = [new Course(9, 0, -1), new Course(9, 1, 1), new Course(0, -1, 1)]
    _direction[Const.Status.MOTIGOMA][Const.SECOND] = [new Course(9, 0, 1), new Course(9, -1, -1), new Course(0, 1, -1)]
    @potential = [7, 7, 7]
    @weight = [45, 45, 36]
    @getD: (turn, status) ->
        return _direction[status][turn]

    constructor: (turn, status, posi) ->
        super(turn, status, posi)
        @name = 'Ke'
    # kind: ->
    #     @constructor.name
    koma: ->
        return "RU"
    omomi: ->
        ret = switch @status
            when Const.Status.OMOTE
                Ke.weight[Const.Status.OMOTE] * (@gravity + @coefficient / Ke.potential[@status])
            when Const.Status.URA
                Ke.weight[Const.Status.URA] * (@gravity + @coefficient / Ke.potential[@status])
            when Const.Status.MOTIGOMA
                Ke.weight[Const.Status.MOTIGOMA]
            else 0
        return parseInt(ret, 10)

    caption: ->
        switch @status
            when Const.Status.OMOTE
                if @turn == Const.FIRST then 'K' else 'k'
            when Const.Status.URA
                if @turn == Const.FIRST then 'E' else 'e'
            when Const.Status.MOTIGOMA
                if @turn == Const.FIRST then 'K' else 'k'

class Ky extends Piece
    # Taka
    # ka ry
    _direction = {}
    _direction[Const.Status.OMOTE] = {}
    _direction[Const.Status.URA] = {}
    _direction[Const.Status.MOTIGOMA] = {}
    _direction[Const.Status.OMOTE][Const.FIRST] = [new Course(0, 0, -1), new Course(0, -1, -1), new Course(0, -1, 0), new Course(0, -1, 1), new Course(0, 1, 1), new Course(0, 1, 0), new Course(0, 1, -1)]
    _direction[Const.Status.OMOTE][Const.SECOND] = [new Course(0, -1, -1), new Course(0, -1, 0), new Course(0, -1, 1), new Course(0, 0, 1), new Course(0, 1, 1), new Course(0, 1, 0), new Course(0, 1, -1)]
    _direction[Const.Status.URA][Const.FIRST] = [new Course(9, -1, -1), new Course(9, 1, -1), new Course(9, 0, 1), new Course(0, 0, -1), new Course(0, 1, 0), new Course(0, -1, 0), new Course(2, 1, 1), new Course(2, -1, 1)]
    _direction[Const.Status.URA][Const.SECOND] = [new Course(9, 1, 1), new Course(9, -1, 1), new Course(9, 0, -1), new Course(0, 0, 1), new Course(0, 1, 0), new Course(0, -1, 0), new Course(2, -1, -1), new Course(2, 1, -1)]
    _direction[Const.Status.MOTIGOMA][Const.FIRST] = [new Course(0, 0, -1), new Course(0, -1, -1), new Course(0, -1, 0), new Course(0, -1, 1), new Course(0, 1, 1), new Course(0, 1, 0), new Course(0, 1, -1)]
    _direction[Const.Status.MOTIGOMA][Const.SECOND] = [new Course(0, 0, -1), new Course(0, -1, -1), new Course(0, -1, 1), new Course(0, 0, 1), new Course(0, 1, 1), new Course(0, 1, 0), new Course(0, 1, -1)]
    @potential = [7, 16, 7]
    @weight = [80, 150, 64]
    @getD: (turn, status) ->
        return _direction[status][turn]

    constructor: (turn, status, posi) ->
        super(turn, status, posi)
        @name = 'Ky'
    # kind: ->
    #     @constructor.name
    koma: ->
        return if @status == Const.Status.URA then "KT" else "TK"
    omomi: ->
        ret = switch @status
            when Const.Status.OMOTE
                Ky.weight[Const.Status.OMOTE] * (@gravity + @coefficient / Ky.potential[@status])
            when Const.Status.URA
                Ky.weight[Const.Status.URA] * (@gravity + @coefficient / Ky.potential[@status])
            when Const.Status.MOTIGOMA
                Ky.weight[Const.Status.MOTIGOMA]
            else 0
        return parseInt(ret, 10)

    caption: ->
        switch @status
            when Const.Status.OMOTE
                if @turn == Const.FIRST then 'Y' else 'y'
            when Const.Status.URA
                if @turn == Const.FIRST then 'S' else 's'
            when Const.Status.MOTIGOMA
                if @turn == Const.FIRST then 'Y' else 'y'

class Fu extends Piece
    # Tsubame
    _direction = {}
    _direction[Const.Status.OMOTE] = {}
    _direction[Const.Status.URA] = {}
    _direction[Const.Status.MOTIGOMA] = {}
    _direction[Const.Status.OMOTE][Const.FIRST] = [new Course(0, 0, -1)]
    _direction[Const.Status.OMOTE][Const.SECOND] = [new Course(0, 0, 1)]
    _direction[Const.Status.URA][Const.FIRST] = [new Course(0, -2, -2), new Course(0, 2, -2), new Course(0, 0, 2)]
    _direction[Const.Status.URA][Const.SECOND] = [new Course(0, 2, 2), new Course(0, -2, 2), new Course(0, 0, -2)]
    _direction[Const.Status.MOTIGOMA][Const.FIRST] = [new Course(0, 0, -1)]
    _direction[Const.Status.MOTIGOMA][Const.SECOND] = [new Course(0, 0, 1)]
    @potential = [1, 3, 1]
    @weight = [10, 20, 10]
    @getD: (turn, status) ->
        return _direction[status][turn]

    constructor: (turn, status, posi) ->
        super(turn, status, posi)
        @name = 'Fu'
    # kind: ->
    #     @constructor.name
    koma: ->
        return if @status == Const.Status.URA then "KR" else "TB"
    omomi: ->
        ret = switch @status
            when Const.Status.OMOTE
                Fu.weight[Const.Status.OMOTE] * (@gravity + @coefficient / Fu.potential[@status])
            when Const.Status.URA
                Fu.weight[Const.Status.URA] * (@gravity + @coefficient / Fu.potential[@status])
            when Const.Status.MOTIGOMA
                Fu.weight[Const.Status.MOTIGOMA]
            else 0
        return parseInt(ret, 10)

    caption: ->
        switch @status
            when Const.Status.OMOTE
                if @turn == Const.FIRST then 'F' else 'f'
            when Const.Status.URA
                if @turn == Const.FIRST then 'T' else 't'
            when Const.Status.MOTIGOMA
                if @turn == Const.FIRST then 'F' else 'f'

module.exports =
    Course: Course
    Piece: Piece
    Ou: Ou
    Ka: Ka
    Ki: Ki
    Gi: Gi
    Ke: Ke
    Ky: Ky
    Fu: Fu
global.gPiece = Piece
global.gOu = Ou
global.gKa = Ka
global.gKi = Ki
global.gGi = Gi
global.gKe = Ke
global.gKy = Ky
global.gFu = Fu
global.getClass = @getClass
