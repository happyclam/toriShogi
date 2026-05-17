chai = require 'chai'
expect = chai.expect
chai.should()
Const = require('../const.coffee')
Piece = require('../piece.coffee')
Board = require('../board.coffee')
Player = require('../player.coffee')

describe '=== utifudume1', ->
    b = null
    first = null; second = null;
    ret = []
    before ->
        first = new Player(Const.FIRST, false)
        second = new Player(Const.SECOND, false)
    beforeEach ->
        b = new Board()
        b.promotion_line = [2, 6]
        b.pieces = []
        # b.pieces.push(new Piece.Ou(Const.FIRST, Const.Status.OMOTE, [4,7]))
        # b.pieces.push(new Piece.Ou(Const.SECOND, Const.Status.OMOTE, [3,3]))
        # b.pieces.push(new Piece.Ka(Const.FIRST, Const.Status.OMOTE, [7,1]))
        # b.pieces.push(new Piece.Ka(Const.FIRST, Const.Status.OMOTE, [5,2]))
        # b.pieces.push(new Piece.Ka(Const.FIRST, Const.Status.OMOTE, [6,3]))
        # b.pieces.push(new Piece.Ka(Const.SECOND, Const.Status.OMOTE, [1,7]))
        # b.pieces.push(new Piece.Ki(Const.FIRST, Const.Status.OMOTE, [6,7]))
        # b.pieces.push(new Piece.Ki(Const.FIRST, Const.Status.OMOTE, [7,5]))
        # b.pieces.push(new Piece.Ki(Const.SECOND, Const.Status.MOTIGOMA))
        # b.pieces.push(new Piece.Ki(Const.SECOND, Const.Status.MOTIGOMA))
        # b.pieces.push(new Piece.Gi(Const.FIRST, Const.Status.OMOTE, [7,7]))
        # b.pieces.push(new Piece.Gi(Const.SECOND, Const.Status.OMOTE, [1,1]))
        # b.pieces.push(new Piece.Ke(Const.FIRST, Const.Status.OMOTE, [6,1]))
        # b.pieces.push(new Piece.Ke(Const.SECOND, Const.Status.OMOTE, [2,2]))
        # b.pieces.push(new Piece.Ky(Const.SECOND, Const.Status.OMOTE, [3,4]))
        # b.pieces.push(new Piece.Ky(Const.SECOND, Const.Status.MOTIGOMA))
        # b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA))
        # b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA))
        # b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA))
        # b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA))
        # b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA))
        # b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA))
        # b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA))
        # b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA))
        # b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.URA, [5,6]))
        # b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.URA, [1,2]))
        # b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [6,5]))
        # b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [4,5]))
        # b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.MOTIGOMA))
        # b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.MOTIGOMA))
        # b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.URA, [3,6]))

        b.pieces.push(new Piece.Ou(Const.FIRST, Const.Status.OMOTE, [7,7]))
        b.pieces.push(new Piece.Ou(Const.SECOND, Const.Status.OMOTE, [1,1]))
        b.pieces.push(new Piece.Ki(Const.FIRST, Const.Status.OMOTE, [6,7]))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [6,6]))
        b.pieces.push(new Piece.Ky(Const.SECOND, Const.Status.OMOTE, [6,5]))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.MOTIGOMA))
        b.display()
    describe '--- 打ち燕詰めを避ける prepare, depth=3 -1', ->
        it 'expects Ky move [5,6]', ->
            first.pre_select = 20
            second.pre_select = 20
            first.depth = 3
            second.depth = 3
            first.pre_ahead = 0; second.pre_ahead = 0
            ret = second.prepare(b, first, second.depth, Const.MIN_VALUE)
            expect(ret[0].name).to.equal('Ky')
            expect(ret[1]).to.deep.equal([5,6])
            expect(ret[3]).to.equal(Const.Status.URA)
    describe '--- 打ち燕詰めを避ける think, depth=2 -2', ->
        it 'expects Ky move [5,6]', ->
            first.pre_select = 20
            second.pre_select = 20
            first.depth = 2
            second.depth = 2
            first.pre_ahead = 0; second.pre_ahead = 0
            ret = second.think(b, first, second.depth, Const.MIN_VALUE)
            expect(ret[0].name).to.equal('Ky')
            expect(ret[1]).to.deep.equal([5,6])
            expect(ret[3]).to.equal(Const.Status.URA)
    describe '--- 打ち燕詰めを避ける think, depth=1 -3', ->
        it 'expects Ky move [5,6]', ->
            first.pre_select = 20
            second.pre_select = 20
            first.depth = 1
            second.depth = 1
            first.pre_ahead = 0; second.pre_ahead = 0
            ret = second.think(b, first, second.depth, Const.MIN_VALUE)
            expect(ret[0].name).to.equal('Ky')
            expect(ret[1]).to.deep.equal([5,6])
            expect(ret[3]).to.equal(Const.Status.URA)
    describe '--- 打ち燕詰めを避ける think, depth=0 -4', ->
        it 'expects Ky move [6,6]', ->
            first.pre_select = 20
            second.pre_select = 20
            first.depth = 0
            second.depth = 0
            first.pre_ahead = 0; second.pre_ahead = 0
            ret = second.think(b, first, second.depth, Const.MIN_VALUE)
            expect(ret[0].name).to.equal('Ky')
            expect(ret[1]).to.deep.equal([6,6])
            expect(ret[3]).to.equal(Const.Status.URA)
    afterEach ->
        console.log(ret)
        if ret[0]?
            if b.check_move(ret[0], ret[1])
                b.move_capture(ret[0], ret[1])
                ret[0].status = Const.Status.URA if ret[3]
        else
            console.log("AI resigned.")
        b.display()
describe '=== utifudume2', ->
    b = null
    first = null; second = null;
    ret = []
    before ->
        first = new Player(Const.FIRST, false)
        second = new Player(Const.SECOND, false)
    beforeEach ->
        b = new Board()
        b.promotion_line = [2, 6]
        b.pieces = []
        b.pieces.push(new Piece.Ou(Const.FIRST, Const.Status.OMOTE, [7,1]))
        b.pieces.push(new Piece.Ou(Const.SECOND, Const.Status.OMOTE, [1,1]))
        b.pieces.push(new Piece.Ka(Const.SECOND, Const.Status.OMOTE, [2,1]))
        b.pieces.push(new Piece.Ka(Const.SECOND, Const.Status.OMOTE, [2,2]))
        b.pieces.push(new Piece.Ky(Const.FIRST, Const.Status.URA, [7,7]))
        b.pieces.push(new Piece.Ka(Const.FIRST, Const.Status.OMOTE, [1,3]))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA))
        b.display()
    describe '--- 打ち燕詰めを避ける prepare, depth=3 -1', ->
        it 'expects Ky move [2,2]', ->
            first.pre_select = 20
            second.pre_select = 20
            first.depth = 3
            second.depth = 3
            first.pre_ahead = 0; second.pre_ahead = 0
            ret = first.prepare(b, second, first.depth, Const.MAX_VALUE)
            expect(ret[0].name).to.equal('Ky')
            expect(ret[1]).to.deep.equal([2,2])
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

describe '=== utifudume3', ->
    b = null
    first = null; second = null;
    ret = []
    before ->
        first = new Player(Const.FIRST, false)
        second = new Player(Const.SECOND, false)
    beforeEach ->
        b = new Board()
        b.promotion_line = [2, 6]
        b.pieces = []
        b.pieces.push(new Piece.Ou(Const.FIRST, Const.Status.OMOTE, [7,1]))
        b.pieces.push(new Piece.Ou(Const.SECOND, Const.Status.OMOTE, [1,1]))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [2,1]))
        b.pieces.push(new Piece.Ky(Const.SECOND, Const.Status.OMOTE, [2,2]))
        b.pieces.push(new Piece.Ky(Const.FIRST, Const.Status.URA, [7,7]))
        b.pieces.push(new Piece.Ki(Const.FIRST, Const.Status.OMOTE, [1,4]))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA))
        b.display()
    describe '--- 打ち燕詰めを避ける prepare, depth=3 -1', ->
        it 'expects Fu move [5,2]', ->
            first.pre_select = 20
            second.pre_select = 20
            first.depth = 3
            second.depth = 3
            first.pre_ahead = 0; second.pre_ahead = 0
            ret = first.prepare(b, second, first.depth, Const.MAX_VALUE)
            expect(ret[0].name).to.equal('Fu')
            expect(ret[1]).to.deep.equal([5,2])
    describe '--- 打ち燕詰めを避ける think, depth=2 -2', ->
        it 'expects Fu move [5,2] -1', ->
            first.pre_select = 20
            second.pre_select = 20
            first.depth = 2
            second.depth = 2
            first.pre_ahead = 0; second.pre_ahead = 0
            ret = first.prepare(b, second, first.depth, Const.MAX_VALUE)
            expect(ret[0].name).to.equal('Fu')
            expect(ret[1]).to.deep.equal([5,2])
    describe '--- 打ち燕詰めを避ける think, depth=1 -3', ->
        it 'expects Ky move [5,5]', ->
            first.pre_select = 20
            second.pre_select = 20
            first.depth = 1
            second.depth = 1
            first.pre_ahead = 0; second.pre_ahead = 0
            ret = first.think(b, second, first.depth, Const.MAX_VALUE)
            expect(ret[0].name).to.equal('Ky')
            expect(ret[1]).to.deep.equal([5,5])
    afterEach ->
        console.log(ret)
        if ret[0]?
            if b.check_move(ret[0], ret[1])
                b.move_capture(ret[0], ret[1])
                ret[0].status = Const.Status.URA if ret[3]
        else
            console.log("AI resigned.")
        b.display()
describe '=== utifudume4', ->
    b = null
    first = null; second = null;
    ret = []
    before ->
        first = new Player(Const.FIRST, false)
        second = new Player(Const.SECOND, false)
    beforeEach ->
        b = new Board()
        b.promotion_line = [2, 6]
        b.pieces = []
        b.pieces.push(new Piece.Ou(Const.FIRST, Const.Status.OMOTE, [7,1]))
        b.pieces.push(new Piece.Ou(Const.SECOND, Const.Status.OMOTE, [1,1]))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [2,1]))
        b.pieces.push(new Piece.Ky(Const.SECOND, Const.Status.OMOTE, [2,2]))
        b.pieces.push(new Piece.Ky(Const.FIRST, Const.Status.URA, [7,7]))
        b.pieces.push(new Piece.Ki(Const.FIRST, Const.Status.OMOTE, [1,4]))
        b.pieces.push(new Piece.Ki(Const.FIRST, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA))
        b.display()
    describe '--- 打ち燕詰めを避ける prepare, depth=3 -1', ->
        it 'expects Ki move [1,3]', ->
            first.pre_select = 20
            second.pre_select = 20
            first.depth = 3
            second.depth = 3
            first.pre_ahead = 0; second.pre_ahead = 0
            ret = first.prepare(b, second, first.depth, Const.MAX_VALUE)
            expect(ret[0].name).to.equal('Ki')
            expect(ret[1]).to.deep.equal([1,3])
            expect(ret[2]).to.be.gte(50000)
    describe '--- 打ち燕詰めを避ける think, depth=2 -1', ->
        it 'expects Ki move [1,3]', ->
            first.pre_select = 20
            second.pre_select = 20
            first.depth = 2
            second.depth = 2
            first.pre_ahead = 0; second.pre_ahead = 0
            ret = first.prepare(b, second, first.depth, Const.MAX_VALUE)
            expect(ret[0].name).to.equal('Ki')
            expect(ret[1]).to.deep.equal([1,3])
            expect(ret[2]).to.be.gte(50000)
    describe '--- 打ち燕詰めを避ける prepare, depth=1 -1', ->
        it 'expects Ki move [1,3]', ->
            first.pre_select = 20
            second.pre_select = 20
            first.depth = 1
            second.depth = 1
            first.pre_ahead = 0; second.pre_ahead = 0
            ret = first.prepare(b, second, first.depth, Const.MAX_VALUE)
            expect(ret[0].name).to.equal('Ki')
            expect(ret[1]).to.deep.equal([1,3])
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
describe '=== utifudume5', ->
    b = null
    first = null; second = null;
    ret = []
    before ->
        first = new Player(Const.FIRST, false)
        second = new Player(Const.SECOND, false)
    beforeEach ->
        b = new Board()
        b.promotion_line = [2, 6]
        b.pieces = []
        b.pieces.push(new Piece.Ou(Const.FIRST, Const.Status.OMOTE, [7,1]))
        b.pieces.push(new Piece.Ou(Const.SECOND, Const.Status.OMOTE, [1,1]))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [2,1]))
        b.pieces.push(new Piece.Ky(Const.SECOND, Const.Status.OMOTE, [2,2]))
        b.pieces.push(new Piece.Ky(Const.FIRST, Const.Status.URA, [7,7]))
        b.pieces.push(new Piece.Ki(Const.FIRST, Const.Status.OMOTE, [1,4]))
        b.pieces.push(new Piece.Ka(Const.FIRST, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA))
        b.display()
    describe '--- 打ち燕詰めを避ける prepare, depth=3 -1', ->
        it 'expects Ka move [1,2]', ->
            first.pre_select = 20
            second.pre_select = 20
            first.depth = 3
            second.depth = 3
            first.pre_ahead = 0; second.pre_ahead = 0
            ret = first.prepare(b, second, first.depth, Const.MAX_VALUE)
            expect(ret[0].name).to.equal('Ka')
            expect(ret[1]).to.deep.equal([1,2])
            expect(ret[2]).to.be.gte(50000)
    describe '--- 打ち燕詰めを避ける think, depth=2 -1', ->
        it 'expects Ka move [1,2]', ->
            first.pre_select = 20
            second.pre_select = 20
            first.depth = 2
            second.depth = 2
            first.pre_ahead = 0; second.pre_ahead = 0
            ret = first.think(b, second, first.depth, Const.MAX_VALUE)
            expect(ret[0].name).to.equal('Ka')
            expect(ret[1]).to.deep.equal([1,2])
            expect(ret[2]).to.be.gte(50000)
    describe '--- 打ち燕詰めを避ける think, depth=1 -1', ->
        it 'expects Ka move [1,2]', ->
            first.pre_select = 20
            second.pre_select = 20
            first.depth = 1
            second.depth = 1
            first.pre_ahead = 0; second.pre_ahead = 0
            ret = first.prepare(b, second, first.depth, Const.MAX_VALUE)
            expect(ret[0].name).to.equal('Ka')
            expect(ret[1]).to.deep.equal([1,2])
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

describe '=== utifudume6', ->
    b = null
    first = null; second = null;
    ret = []
    before ->
        first = new Player(Const.FIRST, false)
        second = new Player(Const.SECOND, false)
    beforeEach ->
        b = new Board()
        b.promotion_line = [2, 6]
        b.pieces = []
        b.pieces.push(new Piece.Ou(Const.FIRST, Const.Status.OMOTE, [7,1]))
        b.pieces.push(new Piece.Ou(Const.SECOND, Const.Status.OMOTE, [1,2]))
        b.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [2,1]))
        b.pieces.push(new Piece.Ki(Const.SECOND, Const.Status.OMOTE, [2,2]))
        # b.pieces.push(new Piece.Ky(Const.FIRST, Const.Status.URA, [7,7]))
        b.pieces.push(new Piece.Ka(Const.FIRST, Const.Status.OMOTE, [1,4]))
        b.pieces.push(new Piece.Ka(Const.FIRST, Const.Status.MOTIGOMA))
        b.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA))
        b.display()
    describe '--- 有効な打ち歩の王手を指せる prepare, depth=3 -1', ->
        it 'expects Fu move [1,3]', ->
            first.pre_select = 20
            second.pre_select = 20
            first.depth = 3
            second.depth = 3
            first.pre_ahead = 0; second.pre_ahead = 0
            ret = first.prepare(b, second, first.depth, Const.MAX_VALUE)
            expect(ret[0].name).to.equal('Fu')
            expect(ret[1]).to.deep.equal([1,3])
            expect(ret[2]).to.be.gte(50000)
    describe '--- 有効な打ち歩の王手を指せる think, depth=3 -1', ->
        it 'expects Ka move [1,3]', ->
            first.pre_select = 20
            second.pre_select = 20
            first.depth = 3
            second.depth = 3
            first.pre_ahead = 0; second.pre_ahead = 0
            ret = first.think(b, second, first.depth, Const.MAX_VALUE)
            expect(ret[0].name).to.equal('Fu')
            expect(ret[1]).to.deep.equal([1,3])
            expect(ret[2]).to.be.gte(50000)
    describe '--- 有効な打ち歩の王手を指せる think, depth=2 -1', ->
        it 'expects Ka move [1,3]', ->
            first.pre_select = 20
            second.pre_select = 20
            first.depth = 2
            second.depth = 2
            first.pre_ahead = 0; second.pre_ahead = 0
            ret = first.think(b, second, first.depth, Const.MAX_VALUE)
            expect(ret[0].name).to.equal('Fu')
            expect(ret[1]).to.deep.equal([1,3])
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
