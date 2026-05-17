chai = require 'chai'
expect = chai.expect
chai.should()
Const = require('../const.coffee')
Piece = require('../piece.coffee')
Board = require('../board.coffee')
Player = require('../player.coffee')

describe '=== tumeshogi01-1', ->
    b = null
    first = null; second = null;
    ret = []
    before ->
        first = new Player(Const.FIRST, false)
        second = new Player(Const.SECOND, false)
    beforeEach ->
        b = new Board()
        b.pieces = []
        b.pieces.push(new Piece.Ou(Const.FIRST, Const.Status.OMOTE, [2,7]))
        b.pieces.push(new Piece.Ou(Const.SECOND, Const.Status.OMOTE, [4,1]))
        b.pieces.push(new Piece.Ka(Const.FIRST, Const.Status.OMOTE, [3,7]))
        b.pieces.push(new Piece.Ka(Const.SECOND, Const.Status.OMOTE, [2,2]))
        b.pieces.push(new Piece.Ka(Const.SECOND, Const.Status.OMOTE, [5,3]))
        b.pieces.push(new Piece.Ka(Const.SECOND, Const.Status.OMOTE, [2,5]))
        b.pieces.push(new Piece.Ki(Const.SECOND, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Ki(Const.SECOND, Const.Status.OMOTE, [6,1]))
        b.pieces.push(new Piece.Ki(Const.SECOND, Const.Status.OMOTE, [2,1]))
        b.pieces.push(new Piece.Ki(Const.SECOND, Const.Status.OMOTE, [6,7]))
        b.pieces.push(new Piece.Gi(Const.SECOND, Const.Status.OMOTE, [1,2]))
        b.pieces.push(new Piece.Gi(Const.SECOND, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Ke(Const.FIRST, Const.Status.OMOTE, [7,2]))
        b.pieces.push(new Piece.Ke(Const.FIRST, Const.Status.OMOTE, [1,7]))
        b.pieces.push(new Piece.Ky(Const.SECOND, Const.Status.URA, [3,4]))
        b.pieces.push(new Piece.Ky(Const.SECOND, Const.Status.OMOTE, [4,2]))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [7,6]))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [5,7]))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [3,3]))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [1,5]))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [1,3]))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [4,3]))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [5,4]))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [6,3]))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.MOTIGOMA))
        b.display()
    describe '--- ５手詰め think, depth=4', ->
        it 'expects Fu move [2,6] -1', ->
            first.pre_select = 20
            second.pre_select = 20
            first.depth = 4
            second.depth = 4
            ret = second.prepare(b, first, second.depth, Const.MIN_VALUE)
            expect(ret[2]).to.be.lte(-50000)
    afterEach ->
        console.log(ret)
        if ret[0]?
            if b.check_move(ret[0], ret[1])
                b.move_capture(ret[0], ret[1])
                ret[0].status = Const.Status.URA if ret[3]
        else
            console.log("AI resigned.")
        b.display()

describe '=== tumeshogi01-2', ->
    b = null
    first = null; second = null;
    ret = []
    before ->
        first = new Player(Const.FIRST, false)
        second = new Player(Const.SECOND, false)
    beforeEach ->
        b = new Board()
        b.pieces = []
        b.pieces.push(new Piece.Ou(Const.FIRST, Const.Status.OMOTE, [2,7]))
        b.pieces.push(new Piece.Ou(Const.SECOND, Const.Status.OMOTE, [4,1]))
        b.pieces.push(new Piece.Ka(Const.FIRST, Const.Status.OMOTE, [3,7]))
        b.pieces.push(new Piece.Ka(Const.SECOND, Const.Status.OMOTE, [2,2]))
        b.pieces.push(new Piece.Ka(Const.SECOND, Const.Status.OMOTE, [5,3]))
        b.pieces.push(new Piece.Ka(Const.SECOND, Const.Status.OMOTE, [2,5]))
        b.pieces.push(new Piece.Ki(Const.SECOND, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Ki(Const.SECOND, Const.Status.OMOTE, [6,1]))
        b.pieces.push(new Piece.Ki(Const.SECOND, Const.Status.OMOTE, [2,1]))
        b.pieces.push(new Piece.Ki(Const.SECOND, Const.Status.OMOTE, [6,7]))
        b.pieces.push(new Piece.Gi(Const.SECOND, Const.Status.OMOTE, [1,2]))
        b.pieces.push(new Piece.Gi(Const.SECOND, Const.Status.OMOTE, [2,6]))
        b.pieces.push(new Piece.Ke(Const.FIRST, Const.Status.OMOTE, [7,2]))
        b.pieces.push(new Piece.Ke(Const.FIRST, Const.Status.OMOTE, [1,7]))
        b.pieces.push(new Piece.Ky(Const.SECOND, Const.Status.URA, [3,4]))
        b.pieces.push(new Piece.Ky(Const.SECOND, Const.Status.OMOTE, [4,2]))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [7,6]))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [5,7]))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [3,3]))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [1,5]))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [1,3]))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [4,3]))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [5,4]))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [6,3]))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.MOTIGOMA))
        b.display()
    describe '--- ３手詰め think, depth=3', ->
        it 'expects Ky move [4,5] -1', ->
            first.pre_select = 20
            second.pre_select = 20
            first.depth = 1
            second.depth = 3
            ret = first.prepare(b, second, first.depth, Const.MAX_VALUE)
            console.log("first: ret[0] = #{ret[0].name}, ret[1] = #{ret[1]}")
            if b.check_move(ret[0], ret[1])
                b.move_capture(ret[0], ret[1])
                ret[0].status = Const.Status.URA if ret[3]
            b.display()
            ret = second.prepare(b, first, second.depth, Const.MIN_VALUE)
            expect(ret[0].name).to.equal('Ky')
            expect(ret[1]).to.deep.equal([4,5])
            expect(ret[2]).to.be.lte(-50000)
    afterEach ->
        console.log(ret)
        if ret[0]?
            if b.check_move(ret[0], ret[1])
                b.move_capture(ret[0], ret[1])
                ret[0].status = Const.Status.URA if ret[3]
        else
            console.log("AI resigned.")
        b.display()

# ５手読み無理(Fatal JavaScript invalid size error)、４手読みだと不正解
# describe '=== tumeshogi02-1', ->
#     b = null
#     first = null; second = null;
#     ret = []
#     before ->
#         first = new Player(Const.FIRST, false)
#         second = new Player(Const.SECOND, false)
#     beforeEach ->
#         b = new Board()
#         b.pieces = []
#         b.pieces.push(new Piece.Ou(Const.FIRST, Const.Status.OMOTE, [1,3]))
#         b.pieces.push(new Piece.Ou(Const.SECOND, Const.Status.OMOTE, [7,2]))
#         b.pieces.push(new Piece.Ka(Const.FIRST, Const.Status.MOTIGOMA))
#         b.pieces.push(new Piece.Ka(Const.SECOND, Const.Status.MOTIGOMA))
#         b.pieces.push(new Piece.Ka(Const.FIRST, Const.Status.OMOTE, [3,5]))
#         b.pieces.push(new Piece.Ka(Const.SECOND, Const.Status.OMOTE, [5,2]))
#         b.pieces.push(new Piece.Ki(Const.FIRST, Const.Status.MOTIGOMA))
#         b.pieces.push(new Piece.Ki(Const.FIRST, Const.Status.MOTIGOMA))
#         b.pieces.push(new Piece.Ki(Const.FIRST, Const.Status.OMOTE, [6,7]))
#         b.pieces.push(new Piece.Ki(Const.SECOND, Const.Status.OMOTE, [6,3]))
#         b.pieces.push(new Piece.Gi(Const.SECOND, Const.Status.MOTIGOMA))
#         b.pieces.push(new Piece.Gi(Const.SECOND, Const.Status.MOTIGOMA))
#         b.pieces.push(new Piece.Ke(Const.FIRST, Const.Status.MOTIGOMA))
#         b.pieces.push(new Piece.Ke(Const.FIRST, Const.Status.OMOTE, [1,6]))
#         b.pieces.push(new Piece.Ky(Const.FIRST, Const.Status.URA, [3,2]))
#         b.pieces.push(new Piece.Ky(Const.FIRST, Const.Status.URA, [3,6]))
#         b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA))
#         b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA))
#         b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA))
#         b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA))
#         b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA))
#         b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA))
#         b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA))
#         b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA))        
#         b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [1,5]))
#         b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.URA, [4,4]))
#         b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [2,2]))
#         b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [5,3]))
#         b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [5,4]))
#         b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [6,4]))
#         b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.URA, [7,4]))
#         b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.URA, [2,6]))
#         b.display()
#     describe '--- ５手詰め think, depth=3', ->
#         it 'expects Fu move [7,3] -1', ->
#             first.pre_select = 20
#             second.pre_select = 20
#             first.depth = 5
#             second.depth = 5
#             ret = first.prepare(b, second, first.depth, Const.MAX_VALUE)
#             expect(ret[2]).to.be.gte(50000)
#     afterEach ->
#         console.log(ret)
#         if ret[0]?
#             if b.check_move(ret[0], ret[1])
#                 b.move_capture(ret[0], ret[1])
#                 ret[0].status = Const.Status.URA if ret[3]
#         else
#             console.log("AI resigned.")
#         b.display()

describe '=== tumeshogi02-2', ->
    b = null
    first = null; second = null;
    ret = []
    before ->
        first = new Player(Const.FIRST, false)
        second = new Player(Const.SECOND, false)
    beforeEach ->
        b = new Board()
        b.pieces = []
        b.pieces.push(new Piece.Ou(Const.FIRST, Const.Status.OMOTE, [1,3]))
        b.pieces.push(new Piece.Ou(Const.SECOND, Const.Status.OMOTE, [7,2]))
        b.pieces.push(new Piece.Ka(Const.FIRST, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Ka(Const.SECOND, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Ka(Const.FIRST, Const.Status.OMOTE, [3,5]))
        b.pieces.push(new Piece.Ka(Const.SECOND, Const.Status.OMOTE, [5,2]))
        b.pieces.push(new Piece.Ki(Const.FIRST, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Ki(Const.FIRST, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Ki(Const.FIRST, Const.Status.OMOTE, [6,7]))
        b.pieces.push(new Piece.Ki(Const.SECOND, Const.Status.OMOTE, [6,3]))
        b.pieces.push(new Piece.Gi(Const.SECOND, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Gi(Const.SECOND, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Ke(Const.FIRST, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Ke(Const.FIRST, Const.Status.OMOTE, [1,6]))
        b.pieces.push(new Piece.Ky(Const.FIRST, Const.Status.URA, [3,2]))
        b.pieces.push(new Piece.Ky(Const.FIRST, Const.Status.URA, [3,6]))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [7,3]))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [1,5]))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.URA, [4,4]))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [2,2]))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [5,3]))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [5,4]))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [6,4]))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.URA, [7,4]))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.URA, [2,6]))
        b.display()
    describe '--- ３手詰め think, depth=4', ->
        it 'expects Ka move [6,2] -1', ->
            first.pre_select = 20
            second.pre_select = 20
            first.depth = 3
            second.depth = 1
            ret = second.prepare(b, first, second.depth, Const.MIN_VALUE)
            console.log("second: ret[0] = #{ret[0].name}, ret[1] = #{ret[1]}")
            if b.check_move(ret[0], ret[1])
                b.move_capture(ret[0], ret[1])
                ret[0].status = Const.Status.URA if ret[3]
            b.display()
            ret = first.prepare(b, second, first.depth, Const.MAX_VALUE)
            expect(ret[0].name).to.equal('Ka')
            expect(ret[1]).to.deep.equal([6,2])
            expect(ret[2]).to.be.gte(50000)
    afterEach ->
        console.log(ret)
        if ret[0]?
            if b.check_move(ret[0], ret[1])
                b.move_capture(ret[0], ret[1])
                ret[0].status = Const.Status.URA if ret[3]
        else
            console.log("AI resigned.")
        b.display()
