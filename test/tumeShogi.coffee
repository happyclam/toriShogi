chai = require 'chai'
expect = chai.expect
chai.should()
Const = require('../const.coffee')
Piece = require('../piece.coffee')
Board = require('../board.coffee')
Player = require('../player.coffee')

describe '=== tumeshogi1', ->
    b = null
    first = null; second = null;
    ret = []
    before ->
        first = new Player(Const.FIRST, false)
        second = new Player(Const.SECOND, false)
    beforeEach ->
        b = new Board()
        b.pieces = []
        b.pieces.push(new Piece.Ou(Const.FIRST, Const.Status.OMOTE, [4,7]))
        b.pieces.push(new Piece.Ou(Const.SECOND, Const.Status.OMOTE, [3,3]))
        b.pieces.push(new Piece.Ka(Const.FIRST, Const.Status.OMOTE, [7,1]))
        b.pieces.push(new Piece.Ka(Const.FIRST, Const.Status.OMOTE, [5,2]))
        b.pieces.push(new Piece.Ka(Const.FIRST, Const.Status.OMOTE, [6,3]))
        b.pieces.push(new Piece.Ka(Const.SECOND, Const.Status.OMOTE, [1,7]))
        b.pieces.push(new Piece.Ki(Const.FIRST, Const.Status.OMOTE, [6,7]))
        b.pieces.push(new Piece.Ki(Const.FIRST, Const.Status.OMOTE, [7,5]))
        b.pieces.push(new Piece.Ki(Const.SECOND, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Ki(Const.SECOND, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Gi(Const.FIRST, Const.Status.OMOTE, [7,7]))
        b.pieces.push(new Piece.Gi(Const.SECOND, Const.Status.OMOTE, [1,1]))
        b.pieces.push(new Piece.Ke(Const.FIRST, Const.Status.OMOTE, [6,1]))
        b.pieces.push(new Piece.Ke(Const.SECOND, Const.Status.OMOTE, [2,2]))
        b.pieces.push(new Piece.Ky(Const.SECOND, Const.Status.OMOTE, [3,4]))
        b.pieces.push(new Piece.Ky(Const.SECOND, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.URA, [5,6]))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.URA, [1,2]))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [6,5]))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [4,5]))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.URA, [3,6]))
        b.display()
    describe '--- 詰めろを受ける think, depth=1 -1', ->
        it 'expects Fu move [4,6] -1', ->
            first.pre_select = 80
            second.pre_select = 80
            first.depth = 1
            second.depth = 1
            first.pre_ahead = 0; second.pre_ahead = 0
            ret = first.think(b, second, first.depth, Const.MAX_VALUE)
            expect(ret[0].name).to.equal('Fu')
            expect(ret[1]).to.deep.equal([4,6])
            expect(ret[4].score).to.be.lte(-50000)
    describe '--- 詰めろを受ける prepare, depth=1, pre_select=80', ->
        it 'expects Fu move [4,6] -2', ->
            first.pre_select = 80
            second.pre_select = 80
            first.depth = 1
            second.depth = 1
            ret = first.prepare(b, second, first.depth, Const.MAX_VALUE)
            expect(ret[0].name).to.equal('Fu')
            expect(ret[1]).to.deep.equal([4,6])
            expect(ret[4].score).to.be.lte(-50000)
    describe '--- 詰めろを受ける prepare, depth=2, pre_select=40', ->
        it 'expects Fu move [4,6] -3', ->
            first.pre_select = 40
            second.pre_select = 40
            first.depth = 2
            second.depth = 2
            ret = first.prepare(b, second, first.depth, Const.MAX_VALUE)
            expect(ret[4].score).to.be.lte(-50000)
    describe '--- 詰めろを受ける prepare, depth=3, pre_select=20', ->
        it 'expects Fu move [4,6] -4', ->
            first.pre_select = 20
            second.pre_select = 20
            first.depth = 3
            second.depth = 3
            ret = first.prepare(b, second, first.depth, Const.MAX_VALUE)
            expect(ret[4].score).to.be.lte(-50000)
    afterEach ->
        console.log(ret)
        if ret[0]?
            if b.check_move(ret[0], ret[1])
                b.move_capture(ret[0], ret[1])
                ret[0].status = Const.Status.URA if ret[3]
        else
            console.log("AI resigned.")
        b.display()

describe '=== tumeshogi2', ->
    b = null
    first = null; second = null;
    ret = []
    before ->
        first = new Player(Const.FIRST, false)
        second = new Player(Const.SECOND, false)
    beforeEach ->
        b = new Board()
        b.pieces = []
        b.pieces.push(new Piece.Ou(Const.FIRST, Const.Status.OMOTE, [4,7]))
        b.pieces.push(new Piece.Ou(Const.SECOND, Const.Status.OMOTE, [4,1]))
        b.pieces.push(new Piece.Ka(Const.FIRST, Const.Status.OMOTE, [2,6]))
        b.pieces.push(new Piece.Ka(Const.FIRST, Const.Status.OMOTE, [6,5]))
        b.pieces.push(new Piece.Ka(Const.SECOND, Const.Status.OMOTE, [4,2]))
        b.pieces.push(new Piece.Ka(Const.SECOND, Const.Status.OMOTE, [5,1]))
        b.pieces.push(new Piece.Ki(Const.FIRST, Const.Status.OMOTE, [2,7]))
        b.pieces.push(new Piece.Ki(Const.SECOND, Const.Status.OMOTE, [1,1]))
        b.pieces.push(new Piece.Ki(Const.SECOND, Const.Status.OMOTE, [2,1]))
        b.pieces.push(new Piece.Ki(Const.SECOND, Const.Status.OMOTE, [6,1]))
        b.pieces.push(new Piece.Gi(Const.FIRST, Const.Status.OMOTE, [7,6]))
        b.pieces.push(new Piece.Gi(Const.SECOND, Const.Status.OMOTE, [1,2]))
        b.pieces.push(new Piece.Ke(Const.FIRST, Const.Status.OMOTE, [1,6]))
        b.pieces.push(new Piece.Ke(Const.SECOND, Const.Status.OMOTE, [7,1]))
        b.pieces.push(new Piece.Ky(Const.SECOND, Const.Status.OMOTE, [4,3]))
        b.pieces.push(new Piece.Ky(Const.SECOND, Const.Status.OMOTE, [5,5]))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [7,4]))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [7,5]))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [6,3]))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [6,4]))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [5,2]))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [4,6]))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [3,4]))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [3,5]))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [2,4]))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [1,5]))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [6,6]))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [5,4]))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [4,5]))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [3,3]))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [1,3]))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.URA, [2,2]))
        b.display()
    describe '--- 詰めろを受ける think, depth=3', ->
        it 'expects Fu move [4,5] -1', ->
            first.pre_select = 20
            second.pre_select = 20
            first.depth = 3
            second.depth = 3
            first.pre_ahead = 0; second.pre_ahead = 0
            ret = first.think(b, second, first.depth, Const.MAX_VALUE)
            expect(ret[0].name).to.equal('Fu')
            expect(ret[1]).to.deep.equal([4,5])
            expect(ret[3]).to.equal(Const.Status.OMOTE)
    describe '--- 詰めろを受ける prepare, depth=3, pre_select=20', ->
        it 'expects Fu move [4,5] -2', ->
            first.pre_select = 20
            second.pre_select = 20
            first.depth = 3
            second.depth = 3
            ret = first.prepare(b, second, first.depth, Const.MAX_VALUE)
            expect(ret[0].name).to.equal('Fu')
            expect(ret[1]).to.deep.equal([4,5])
            expect(ret[3]).to.equal(Const.Status.OMOTE)
    describe '--- 詰めろを受ける prepare, depth=3, pre_select=3', ->
        it 'expects Fu move [4,5] -3', ->
            first.pre_select = 3
            second.pre_select = 3
            first.depth = 3
            second.depth = 3
            ret = first.prepare(b, second, first.depth, Const.MAX_VALUE)
            expect(ret[0].name).to.equal('Fu')
            expect(ret[1]).to.deep.equal([4,5])
            expect(ret[3]).to.equal(Const.Status.OMOTE)
    afterEach ->
        console.log(ret)
        if ret[0]?
            if b.check_move(ret[0], ret[1])
                b.move_capture(ret[0], ret[1])
                ret[0].status = Const.Status.URA if ret[3]
        else
            console.log("AI resigned.")
        b.display()

describe '=== tumeshogi3', ->
    b = null
    first = null; second = null;
    ret = []
    before ->
        first = new Player(Const.FIRST, false)
        second = new Player(Const.SECOND, false)
    beforeEach ->
        b = new Board()
        b.pieces = []
        b.pieces.push(new Piece.Ou(Const.FIRST, Const.Status.OMOTE, [1,6]))
        b.pieces.push(new Piece.Ou(Const.SECOND, Const.Status.OMOTE, [6,2]))
        b.pieces.push(new Piece.Ka(Const.FIRST, Const.Status.OMOTE, [4,1]))
        b.pieces.push(new Piece.Ka(Const.SECOND, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Ka(Const.SECOND, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Ka(Const.SECOND, Const.Status.OMOTE, [5,1]))
        b.pieces.push(new Piece.Ki(Const.FIRST, Const.Status.OMOTE, [2,7]))
        b.pieces.push(new Piece.Ki(Const.FIRST, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Ki(Const.SECOND, Const.Status.OMOTE, [6,1]))
        b.pieces.push(new Piece.Ki(Const.SECOND, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Gi(Const.FIRST, Const.Status.OMOTE, [4,6]))
        b.pieces.push(new Piece.Gi(Const.SECOND, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Ke(Const.FIRST, Const.Status.OMOTE, [1,7]))
        b.pieces.push(new Piece.Ke(Const.SECOND, Const.Status.OMOTE, [7,1]))
        b.pieces.push(new Piece.Ky(Const.FIRST, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Ky(Const.SECOND, Const.Status.OMOTE, [3,4]))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [7,5]))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [7,6]))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [6,5]))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [5,7]))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [4,7]))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [2,5]))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [1,5]))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [7,3]))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [6,3]))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [5,3]))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [5,4]))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [4,3]))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [4,4]))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.URA, [3,6]))
        b.display()
    describe '--- 好手 think, depth=3', ->
        it 'expects Ky move [2,2] -1', ->
            first.pre_select = 20
            second.pre_select = 20
            first.depth = 3
            second.depth = 3
            first.pre_ahead = 0; second.pre_ahead = 0
            ret = first.think(b, second, first.depth, Const.MAX_VALUE)
            expect(ret[0].name).to.equal('Ky')
            expect(ret[1]).to.deep.equal([2,2])
            expect(ret[3]).to.equal(Const.Status.OMOTE)
    describe '--- 好手 prepare, depth=3, pre_select=20 -2', ->
        it 'expects Ky move [2,2] -2', ->
            first.pre_select = 20
            second.pre_select = 20
            first.depth = 3
            second.depth = 3
            ret = first.prepare(b, second, first.depth, Const.MAX_VALUE)
            expect(ret[0].name).to.equal('Ky')
            expect(ret[1]).to.deep.equal([2,2])
            expect(ret[3]).to.equal(Const.Status.OMOTE)
    afterEach ->
        console.log(ret)
        if ret[0]?
            if b.check_move(ret[0], ret[1])
                b.move_capture(ret[0], ret[1])
                ret[0].status = Const.Status.URA if ret[3]
        else
            console.log("AI resigned.")
        b.display()

describe '=== tumeshogi4', ->
    b = null
    first = null; second = null;
    ret = []
    before ->
        first = new Player(Const.FIRST, false)
        second = new Player(Const.SECOND, false)
    beforeEach ->
        b = new Board()
        b.pieces = []
        b.pieces.push(new Piece.Ou(Const.FIRST, Const.Status.OMOTE, [3,7]))
        b.pieces.push(new Piece.Ou(Const.SECOND, Const.Status.OMOTE, [5,2]))
        b.pieces.push(new Piece.Ka(Const.FIRST, Const.Status.OMOTE, [1,2]))
        b.pieces.push(new Piece.Ka(Const.FIRST, Const.Status.OMOTE, [5,6]))
        b.pieces.push(new Piece.Ka(Const.SECOND, Const.Status.OMOTE, [3,1]))
        b.pieces.push(new Piece.Ka(Const.SECOND, Const.Status.OMOTE, [7,6]))
        b.pieces.push(new Piece.Ki(Const.FIRST, Const.Status.OMOTE, [2,7]))
        b.pieces.push(new Piece.Ki(Const.FIRST, Const.Status.OMOTE, [6,7]))
        b.pieces.push(new Piece.Ki(Const.SECOND, Const.Status.OMOTE, [6,1]))
        b.pieces.push(new Piece.Ki(Const.SECOND, Const.Status.OMOTE, [2,1]))
        b.pieces.push(new Piece.Gi(Const.FIRST, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Gi(Const.SECOND, Const.Status.OMOTE, [5,3]))
        b.pieces.push(new Piece.Ke(Const.FIRST, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Ke(Const.SECOND, Const.Status.OMOTE, [7,1]))
        b.pieces.push(new Piece.Ky(Const.FIRST, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Ky(Const.SECOND, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [7,5]))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [6,5]))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [5,5]))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [4,5]))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [2,5]))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [7,3]))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [6,3]))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [4,3]))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [3,2]))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [2,3]))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [1,4]))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [1,6]))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [3,5]))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.MOTIGOMA))
        b.display()
    describe '--- 詰めろを受ける prepare, depth=3, pre_select=21', ->
        it 'expects Ky move [2,6] -2', ->
            first.pre_select = 21
            second.pre_select = 21
            first.depth = 3
            second.depth = 3
            ret = first.prepare(b, second, first.depth, Const.MAX_VALUE)
            expect(ret[0].name).to.equal('Ky')
            expect(ret[1]).to.deep.equal([2,6])
            # expect(ret[1][0]).to.be.equal(4)
            # expect(ret[1][1]).to.be.oneOf([6,7])
    describe '--- 詰めろを受ける prepare, depth=3, pre_select=14', ->
        it 'expects Ky move [2,6] -3', ->
            first.pre_select = 14
            second.pre_select = 14
            first.depth = 3
            second.depth = 3
            ret = first.prepare(b, second, first.depth, Const.MAX_VALUE)
            expect(ret[0].name).to.equal('Ky')
            expect(ret[1]).to.deep.equal([2,6])
    describe '--- 詰めろを受ける prepare, depth=2, pre_select=40', ->
        it 'expects Ky move [2,6] -4', ->
            first.pre_select = 40
            second.pre_select = 40
            first.depth = 2
            second.depth = 2
            ret = first.prepare(b, second, first.depth, Const.MAX_VALUE)
            expect(ret[0].name).to.equal('Ky')
            expect(ret[1]).to.deep.equal([2,6])
    describe '--- 詰めろを受ける prepare, depth=1, pre_select=80', ->
        it 'expects Ky move [2,6] -5', ->
            first.pre_select = 80
            second.pre_select = 80
            first.depth = 1
            second.depth = 1
            ret = first.prepare(b, second, first.depth, Const.MAX_VALUE)
            expect(ret[0].name).to.equal('Ky')
            expect(ret[1]).to.deep.equal([2,6])
            # expect(ret[1]).to.deep.equal([1,1])
    afterEach ->
        console.log(ret)
        if ret[0]?
            if b.check_move(ret[0], ret[1])
                b.move_capture(ret[0], ret[1])
                ret[0].status = Const.Status.URA if ret[3]
        else
            console.log("AI resigned.")
        b.display()
