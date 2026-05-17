/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./board.coffee"
/*!**********************!*\
  !*** ./board.coffee ***!
  \**********************/
(module, __unused_webpack_exports, __webpack_require__) {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
var Board,
  Const,
  Piece,
  indexOf = [].indexOf;
Const = __webpack_require__(/*! ./const */ "./const.coffee");
Piece = __webpack_require__(/*! ./piece */ "./piece.coffee");
Array.prototype.unique = function () {
  var j, key, output, ref, results, value;
  output = {};
  for (key = j = 0, ref = this.length; 0 <= ref ? j < ref : j > ref; key = 0 <= ref ? ++j : --j) {
    output[this[key]] = this[key];
  }
  results = [];
  for (key in output) {
    value = output[key];
    results.push(value);
  }
  return results;
};
Board = function () {
  var check_kiki, check_nifu, check_potential, count_kiki;
  var Board = /*#__PURE__*/function (_Array) {
    function Board() {
      var _this;
      var rows = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Const.ROWS;
      var cols = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Const.COLS;
      _classCallCheck(this, Board);
      var j, r, ref;
      _this = _callSuper(this, Board);
      _this.rows = rows;
      _this.cols = cols;
      for (r = j = 0, ref = _this.rows; 0 <= ref ? j < ref : j > ref; r = 0 <= ref ? ++j : --j) {
        _this[r] = new Array(_this.cols).fill(null);
      }
      _this.pieces = [];
      _this.kiki = {};
      return _this;
    }
    _inherits(Board, _Array);
    return _createClass(Board, [{
      key: "cloneBoard",
      value: function cloneBoard() {
        var clone, j, len, ref, v;
        clone = new Board(this.rows, this.cols);
        ref = this.pieces;
        for (j = 0, len = ref.length; j < len; j++) {
          v = ref[j];
          if (v.posi.length !== 0) {
            clone[v.posi[0] - 1][v.posi[1] - 1] = v;
          }
        }
        return clone;
      }
    }, {
      key: "set_standard",
      value: function set_standard() {
        this.pieces = [];
        this.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [1, 5]));
        this.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [7, 3]));
        this.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [2, 5]));
        this.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [6, 3]));
        this.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [3, 5]));
        this.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [5, 3]));
        this.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [4, 5]));
        this.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [4, 3]));
        this.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [5, 5]));
        this.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [3, 3]));
        this.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [6, 5]));
        this.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [2, 3]));
        this.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [7, 5]));
        this.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [1, 3]));
        this.pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [3, 4]));
        this.pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [5, 4]));
        this.pieces.push(new Piece.Ka(Const.FIRST, Const.Status.OMOTE, [5, 7]));
        this.pieces.push(new Piece.Ka(Const.FIRST, Const.Status.OMOTE, [3, 7]));
        this.pieces.push(new Piece.Ka(Const.SECOND, Const.Status.OMOTE, [3, 1]));
        this.pieces.push(new Piece.Ka(Const.SECOND, Const.Status.OMOTE, [5, 1]));
        this.pieces.push(new Piece.Ki(Const.FIRST, Const.Status.OMOTE, [6, 7]));
        this.pieces.push(new Piece.Ki(Const.FIRST, Const.Status.OMOTE, [2, 7]));
        this.pieces.push(new Piece.Ki(Const.SECOND, Const.Status.OMOTE, [2, 1]));
        this.pieces.push(new Piece.Ki(Const.SECOND, Const.Status.OMOTE, [6, 1]));
        this.pieces.push(new Piece.Gi(Const.FIRST, Const.Status.OMOTE, [7, 7]));
        this.pieces.push(new Piece.Ke(Const.FIRST, Const.Status.OMOTE, [1, 7]));
        this.pieces.push(new Piece.Gi(Const.SECOND, Const.Status.OMOTE, [1, 1]));
        this.pieces.push(new Piece.Ke(Const.SECOND, Const.Status.OMOTE, [7, 1]));
        this.pieces.push(new Piece.Ky(Const.FIRST, Const.Status.OMOTE, [4, 6]));
        this.pieces.push(new Piece.Ky(Const.SECOND, Const.Status.OMOTE, [4, 2]));
        this.pieces.push(new Piece.Ou(Const.FIRST, Const.Status.OMOTE, [4, 7]));
        this.pieces.push(new Piece.Ou(Const.SECOND, Const.Status.OMOTE, [4, 1]));
      }

      // test data
      // @pieces = []
      // @pieces.push(new Piece.Ou(Const.FIRST, Const.Status.OMOTE, [3,7]))
      // @pieces.push(new Piece.Ou(Const.SECOND, Const.Status.OMOTE, [5,2]))
      // @pieces.push(new Piece.Ka(Const.FIRST, Const.Status.OMOTE, [1,2]))
      // @pieces.push(new Piece.Ka(Const.FIRST, Const.Status.OMOTE, [5,6]))
      // @pieces.push(new Piece.Ka(Const.SECOND, Const.Status.OMOTE, [3,1]))
      // @pieces.push(new Piece.Ka(Const.SECOND, Const.Status.OMOTE, [7,6]))
      // @pieces.push(new Piece.Ki(Const.FIRST, Const.Status.OMOTE, [2,7]))
      // @pieces.push(new Piece.Ki(Const.FIRST, Const.Status.OMOTE, [6,7]))
      // @pieces.push(new Piece.Ki(Const.SECOND, Const.Status.OMOTE, [6,1]))
      // @pieces.push(new Piece.Ki(Const.SECOND, Const.Status.OMOTE, [2,1]))
      // @pieces.push(new Piece.Gi(Const.FIRST, Const.Status.MOTIGOMA))
      // @pieces.push(new Piece.Gi(Const.SECOND, Const.Status.OMOTE, [5,3]))
      // @pieces.push(new Piece.Ke(Const.FIRST, Const.Status.MOTIGOMA))
      // @pieces.push(new Piece.Ke(Const.SECOND, Const.Status.OMOTE, [7,1]))
      // @pieces.push(new Piece.Ky(Const.FIRST, Const.Status.MOTIGOMA))
      // @pieces.push(new Piece.Ky(Const.SECOND, Const.Status.MOTIGOMA))
      // @pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [7,5]))
      // @pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [6,5]))
      // @pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [5,5]))
      // @pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [4,5]))
      // @pieces.push(new Piece.Fu(Const.FIRST, Const.Status.OMOTE, [2,5]))
      // @pieces.push(new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA))
      // @pieces.push(new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA))
      // @pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [7,3]))
      // @pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [6,3]))
      // @pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [4,3]))
      // @pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [3,2]))
      // @pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [2,3]))
      // @pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [1,4]))
      // @pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [1,6]))
      // @pieces.push(new Piece.Fu(Const.SECOND, Const.Status.OMOTE, [3,5]))
      // @pieces.push(new Piece.Fu(Const.SECOND, Const.Status.MOTIGOMA))
    }, {
      key: "add",
      value: function add(piece) {
        this.pieces.push(piece);
      }
    }, {
      key: "gameover",
      value: function gameover() {
        var kings, v;
        kings = function () {
          var j, len, ref, results;
          ref = this.pieces;
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            v = ref[j];
            if (v.name === 'Ou' && v.turn === Const.FIRST) {
              results.push(v);
            }
          }
          return results;
        }.call(this);
        switch (kings.length) {
          case 2:
            return Const.FIRST;
          case 0:
            return Const.SECOND;
          default:
            return false;
        }
      }
    }, {
      key: "display",
      value: function display() {
        var col, i, j, k, koma, l, len, len1, m, n, ref, ref1, ref2, ref3, ref4, row, v;
        ref = this.pieces;
        // console.log(@pieces)
        // console.log(@motigoma)
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          v = ref[i];
          if (v.turn === Const.SECOND && v.status === Const.Status.MOTIGOMA) {
            if (v != null) {
              process.stdout.write(v.caption());
            }
          }
        }
        process.stdout.write("\n");
        for (col = k = ref1 = this.cols; ref1 <= 1 ? k <= 1 : k >= 1; col = ref1 <= 1 ? ++k : --k) {
          process.stdout.write(" " + col.toString());
        }
        process.stdout.write("\n");
        for (row = l = 1, ref2 = this.rows; 1 <= ref2 ? l <= ref2 : l >= ref2; row = 1 <= ref2 ? ++l : --l) {
          for (col = m = ref3 = this.cols; m >= 1; col = m += -1) {
            koma = function () {
              var len1, n, ref4, results;
              ref4 = this.pieces;
              results = [];
              for (n = 0, len1 = ref4.length; n < len1; n++) {
                v = ref4[n];
                if (v.posi != null && v.posi[0] === col && v.posi[1] === row) {
                  results.push(v);
                }
              }
              return results;
            }.call(this);
            process.stdout.write("|" + (koma.length !== 0 ? koma[0].caption() : " "));
          }
          process.stdout.write("|" + row.toString() + "\n");
        }
        ref4 = this.pieces;
        for (i = n = 0, len1 = ref4.length; n < len1; i = ++n) {
          v = ref4[i];
          if (v.turn === Const.FIRST && v.status === Const.Status.MOTIGOMA) {
            if (v != null) {
              process.stdout.write(v.caption());
            }
          }
        }
        process.stdout.write("\n");
      }
    }, {
      key: "make_kiki",
      value: function make_kiki(turn) {
        var exclude = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var c, col, j, k, l, len, len1, m, r, ref, ref1, ref2, row, selected, src, v;
        this.kiki[turn] = [];
        src = [];
        src = function () {
          var j, ref, results;
          results = [];
          for (r = j = 1, ref = this.rows; 1 <= ref ? j <= ref : j >= ref; r = 1 <= ref ? ++j : --j) {
            results.push(function () {
              var k, ref1, results1;
              results1 = [];
              for (c = k = 1, ref1 = this.cols; 1 <= ref1 ? k <= ref1 : k >= ref1; c = 1 <= ref1 ? ++k : --k) {
                results1.push(null);
              }
              return results1;
            }.call(this));
          }
          return results;
        }.call(this);
        ref = this.pieces;
        for (j = 0, len = ref.length; j < len; j++) {
          v = ref[j];
          if (v.posi.length !== 0) {
            src[v.posi[0] - 1][v.posi[1] - 1] = v;
          }
        }
        selected = function () {
          var k, len1, ref1, results;
          ref1 = this.pieces;
          results = [];
          for (k = 0, len1 = ref1.length; k < len1; k++) {
            v = ref1[k];
            if (v.turn === turn && v.status !== Const.Status.MOTIGOMA && v.name !== exclude) {
              results.push(v);
            }
          }
          return results;
        }.call(this);
        for (col = k = 1, ref1 = this.cols; 1 <= ref1 ? k <= ref1 : k >= ref1; col = 1 <= ref1 ? ++k : --k) {
          for (row = l = 1, ref2 = this.rows; 1 <= ref2 ? l <= ref2 : l >= ref2; row = 1 <= ref2 ? ++l : --l) {
            for (m = 0, len1 = selected.length; m < len1; m++) {
              v = selected[m];
              if (check_kiki.call(this, v, [row, col], src)) {
                this.kiki[turn].push([row, col]);
                break;
              }
            }
          }
        }
      }
    }, {
      key: "make_kiki_value",
      value: function make_kiki_value() {
        var j, len, ref, v;
        this.kiki[Const.FIRST] = [];
        this.kiki[Const.SECOND] = [];
        ref = this.pieces;
        for (j = 0, len = ref.length; j < len; j++) {
          v = ref[j];
          v.coefficient = 0;
          if (v.status !== Const.Status.MOTIGOMA) {
            count_kiki.call(this, v);
          }
        }
        this.kiki[Const.FIRST] = this.kiki[Const.FIRST].unique();
        this.kiki[Const.SECOND] = this.kiki[Const.SECOND].unique();
      }
    }, {
      key: "check_move",
      value: function check_move(piece, d_posi) {
        var d_piece = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var buf, cnt, dest, force_promo, j, len, o, ref, ref1, ref2, ref3, ref4, v;
        // console.log("check_move")
        force_promo = false;
        if (d_piece != null) {
          dest = d_piece;
        } else {
          dest = function () {
            var j, len, ref, results;
            ref = this.pieces;
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
              v = ref[j];
              if (v.posi != null && v.posi[0] === d_posi[0] && v.posi[1] === d_posi[1]) {
                results.push(v);
              }
            }
            return results;
          }.call(this)[0];
        }
        if (piece.status === Const.Status.MOTIGOMA) {
          if (dest == null && check_potential.call(this, piece, d_posi)) {
            // 二歩チェック
            if (piece.name === 'Fu' && check_nifu.call(this, piece, d_posi)) {
              // console.log("check0")
              return false;
            } else {
              // console.log("check-1")
              return true;
            }
          } else {
            // console.log("check00")
            return false;
          }
        } else {
          if (!check_potential.call(this, piece, d_posi)) {
            if (this.check_promotion(piece, d_posi)) {
              force_promo = true;
            } else {
              // console.log("check00-1")
              return false;
            }
          }
        }
        ref = getClass(piece.name).getD(piece.turn, piece.status);
        // console.log("--- Error in Board.check_move ---")
        for (j = 0, len = ref.length; j < len; j++) {
          v = ref[j];
          buf = [].concat(piece.posi);
          buf[0] += v.xd;
          buf[1] += v.yd;
          if (buf[0] === d_posi[0] && buf[1] === d_posi[1]) {
            if (dest != null) {
              if (piece.turn !== dest.turn) {
                if (force_promo) {
                  piece.status = Const.Status.URA;
                }
                // console.log("check1")
                return true;
              }
            } else {
              if (force_promo) {
                piece.status = Const.Status.URA;
              }
              // console.log("check2")
              return true;
            }
          }
          if (v.series > 0) {
            cnt = v.series;
            while ((ref1 = buf[0], indexOf.call(function () {
              var results = [];
              for (var k = 1, ref2 = this.cols; 1 <= ref2 ? k <= ref2 : k >= ref2; 1 <= ref2 ? k++ : k--) {
                results.push(k);
              }
              return results;
            }.apply(this), ref1) >= 0) && (ref3 = buf[1], indexOf.call(function () {
              var results = [];
              for (var k = 1, ref4 = this.rows; 1 <= ref4 ? k <= ref4 : k >= ref4; 1 <= ref4 ? k++ : k--) {
                results.push(k);
              }
              return results;
            }.apply(this), ref3) >= 0) && cnt > 0) {
              // if (buf.toString() == d_posi.toString())
              if (buf[0] === d_posi[0] && buf[1] === d_posi[1]) {
                if (dest == null) {
                  if (force_promo) {
                    piece.status = Const.Status.URA;
                  }
                  // console.log("check3")
                  return true;
                } else {
                  if (piece.turn !== dest.turn) {
                    if (force_promo) {
                      piece.status = Const.Status.URA;
                    }
                    // console.log("check4")
                    return true;
                  } else {
                    break;
                  }
                }
              } else {
                if (function () {
                  var k, len1, ref1, results;
                  ref1 = this.pieces;
                  results = [];
                  for (k = 0, len1 = ref1.length; k < len1; k++) {
                    o = ref1[k];
                    if (o.posi != null && o.posi[0] === buf[0] && o.posi[1] === buf[1]) {
                      results.push(o);
                    }
                  }
                  return results;
                }.call(this)[0] != null) {
                  break;
                }
              }
              buf[0] += v.xd;
              buf[1] += v.yd;
              cnt -= 1;
            }
          }
        }
        // console.log("check5")
        return false;
      }

      // 成れるかどうか判定
    }, {
      key: "check_promotion",
      value: function check_promotion(piece, d_posi) {
        var ref;
        if (piece.status !== Const.Status.OMOTE) {
          return false;
        }
        if ((ref = piece.name) === 'Ou' || ref === 'Ka' || ref === 'Ki' || ref === 'Gi' || ref === 'Ke') {
          return false;
        }
        switch (piece.turn) {
          case Const.FIRST:
            if (piece.posi[1] <= Board.promotion_line[0] || d_posi[1] <= Board.promotion_line[0]) {
              return true;
            }
            break;
          case Const.SECOND:
            if (piece.posi[1] >= Board.promotion_line[1] || d_posi[1] >= Board.promotion_line[1]) {
              return true;
            }
        }
        return false;
      }
    }, {
      key: "move_capture",
      value: function move_capture(piece, d_posi) {
        var d_piece = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var dest, s_posi, v;
        if (d_piece != null) {
          dest = d_piece;
        } else {
          dest = function () {
            var j, len, ref, results;
            ref = this.pieces;
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
              v = ref[j];
              if (v.posi != null && v.posi[0] === d_posi[0] && v.posi[1] === d_posi[1]) {
                results.push(v);
              }
            }
            return results;
          }.call(this)[0];
        }
        if (dest != null) {
          dest.status = Const.Status.MOTIGOMA;
          dest.setTurn(piece.turn);
          dest.posi = [];
        } else {
          if (piece.status === Const.Status.MOTIGOMA) {
            piece.status = Const.Status.OMOTE;
          }
        }
        s_posi = [].concat(piece.posi);
        piece.posi = [].concat(d_posi);
        return s_posi;
      }
    }, {
      key: "check_tumi",
      value: function check_tumi(turn) {
        var utifudume_flg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var dest, f_canmove, f_oute, first, first_king, j, k, l, len, len1, len2, len3, len4, m, n, o, org, ref, ref1, ref10, ref11, ref12, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, s_canmove, s_oute, second, second_king, v;
        first_king = function () {
          var j, len, ref, results;
          ref = this.pieces;
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            v = ref[j];
            if (v.turn === Const.FIRST && v.name === 'Ou') {
              results.push(v);
            }
          }
          return results;
        }.call(this)[0];
        if (!first_king) {
          return [true, Const.MIN_VALUE];
        }
        second_king = function () {
          var j, len, ref, results;
          ref = this.pieces;
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            v = ref[j];
            if (v.turn === Const.SECOND && v.name === 'Ou') {
              results.push(v);
            }
          }
          return results;
        }.call(this)[0];
        if (!second_king) {
          return [true, Const.MAX_VALUE];
        }
        f_canmove = false;
        s_canmove = false;
        first = 0;
        second = 0;
        this.make_kiki_value();
        // 王手が掛かっているかどうか
        s_oute = function () {
          var j, len, ref, results;
          ref = this.kiki[Const.FIRST];
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            o = ref[j];
            if (o[0] === second_king.posi[0] && o[1] === second_king.posi[1]) {
              results.push(o);
            }
          }
          return results;
        }.call(this)[0] != null;
        f_oute = function () {
          var j, len, ref, results;
          ref = this.kiki[Const.SECOND];
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            o = ref[j];
            if (o[0] === first_king.posi[0] && o[1] === first_king.posi[1]) {
              results.push(o);
            }
          }
          return results;
        }.call(this)[0] != null;
        ref = this.pieces;
        // console.log("f_oute = #{f_oute}")
        // console.log("s_oute = #{s_oute}")

        // 味方の駒の位置も相手の利きに追加（玉が移動出来ない座標という意味では同じ）
        for (j = 0, len = ref.length; j < len; j++) {
          v = ref[j];
          if (v.turn === Const.FIRST && v.status !== Const.Status.MOTIGOMA) {
            this.kiki[Const.SECOND].push(v.posi);
          }
        }
        ref1 = this.pieces;
        for (k = 0, len1 = ref1.length; k < len1; k++) {
          v = ref1[k];
          if (v.turn === Const.SECOND && v.status !== Const.Status.MOTIGOMA) {
            this.kiki[Const.FIRST].push(v.posi);
          }
        }
        // console.log(@kiki[Const.FIRST])
        // console.log(@kiki[Const.SECOND])
        org = [].concat(first_king.posi);
        ref2 = Piece.Ou.getD(first_king.turn, first_king.status);
        for (l = 0, len2 = ref2.length; l < len2; l++) {
          v = ref2[l];
          dest = [org[0] + v.xd, org[1] + v.yd];
          if (!((ref3 = dest[0], indexOf.call(function () {
            var results = [];
            for (var m = 1, ref4 = this.cols; 1 <= ref4 ? m <= ref4 : m >= ref4; 1 <= ref4 ? m++ : m--) {
              results.push(m);
            }
            return results;
          }.apply(this), ref3) >= 0) && (ref5 = dest[1], indexOf.call(function () {
            var results = [];
            for (var m = 1, ref6 = this.rows; 1 <= ref6 ? m <= ref6 : m >= ref6; 1 <= ref6 ? m++ : m--) {
              results.push(m);
            }
            return results;
          }.apply(this), ref5) >= 0))) {
            continue;
          }
          if (function () {
            var len3, m, ref7, results;
            ref7 = this.kiki[Const.SECOND];
            results = [];
            for (m = 0, len3 = ref7.length; m < len3; m++) {
              o = ref7[m];
              if (o[0] === dest[0] && o[1] === dest[1]) {
                results.push(o);
              }
            }
            return results;
          }.call(this)[0] != null) {
            continue;
          } else {
            f_canmove = true;
            break;
          }
        }
        org = [].concat(second_king.posi);
        ref7 = Piece.Ou.getD(second_king.turn, second_king.status);
        for (m = 0, len3 = ref7.length; m < len3; m++) {
          v = ref7[m];
          dest = [org[0] + v.xd, org[1] + v.yd];
          if (!((ref8 = dest[0], indexOf.call(function () {
            var results = [];
            for (var n = 1, ref9 = this.cols; 1 <= ref9 ? n <= ref9 : n >= ref9; 1 <= ref9 ? n++ : n--) {
              results.push(n);
            }
            return results;
          }.apply(this), ref8) >= 0) && (ref10 = dest[1], indexOf.call(function () {
            var results = [];
            for (var n = 1, ref11 = this.rows; 1 <= ref11 ? n <= ref11 : n >= ref11; 1 <= ref11 ? n++ : n--) {
              results.push(n);
            }
            return results;
          }.apply(this), ref10) >= 0))) {
            continue;
          }
          if (function () {
            var len4, n, ref12, results;
            ref12 = this.kiki[Const.FIRST];
            results = [];
            for (n = 0, len4 = ref12.length; n < len4; n++) {
              o = ref12[n];
              if (o[0] === dest[0] && o[1] === dest[1]) {
                results.push(o);
              }
            }
            return results;
          }.call(this)[0] != null) {
            continue;
          } else {
            s_canmove = true;
            break;
          }
        }
        // console.log("f_canmove = #{f_canmove}")
        // console.log("s_canmove = #{s_canmove}")

        // 先手が王手掛かっていて指したのが先手なら後手勝ち
        if (f_oute && turn === Const.FIRST) {
          // console.log("check1")
          return [true, Const.MIN_VALUE];
          // 後手が王手掛かっていて指したのが後手なら先手勝ち
        } else if (s_oute && turn === Const.SECOND) {
          // console.log("check2")
          return [true, Const.MAX_VALUE];
          // 先手玉が動けなくて王手が掛かっていたら後手勝ち
        } else if (f_canmove === false && f_oute) {
          // 後手が王手放置していて指したのが後手なら先手勝ち
          if (s_oute && turn === Const.SECOND) {
            // console.log("check3")
            return [true, Const.MAX_VALUE];
          } else if (utifudume_flg) {
            // console.log("check4")
            return [true, Const.UTIFUDUME];
          } else {
            return [true, Const.CHECKMATE];
          }
          // 後手玉が動けなくて王手が掛かっていたら先手勝ち
        } else if (s_canmove === false && s_oute) {
          // 先手が王手放置していて指したのが先手なら後手勝ち
          if (f_oute && turn === Const.FIRST) {
            // console.log("check5")
            return [true, Const.MIN_VALUE];
          } else if (utifudume_flg) {
            // console.log("check6")
            return [true, Const.UTIFUDUME];
          } else {
            return [true, Const.CHECKMATE];
          }
        }
        ref12 = this.pieces;
        // else
        for (n = 0, len4 = ref12.length; n < len4; n++) {
          v = ref12[n];
          if (v.turn === Const.FIRST) {
            first += v.omomi();
          }
          if (v.turn === Const.SECOND) {
            second += v.omomi();
          }
        }
        // console.log("check7")
        return [false, first - second];
      }
    }, {
      key: "check_utifudume",
      value: function check_utifudume(piece, d_posi) {
        var dest, j, len, o, oppo, oppo_king, org, ref, ref1, ref2, ref3, ref4, v, w;
        // console.log("check_utifudume")
        oppo = piece.turn === Const.FIRST ? Const.SECOND : Const.FIRST;
        oppo_king = function () {
          var j, len, ref, results;
          ref = this.pieces;
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            v = ref[j];
            if (v.turn === oppo && v.name === 'Ou') {
              results.push(v);
            }
          }
          return results;
        }.call(this)[0];
        this.make_kiki(oppo, 'Ou');
        if (function () {
          var j, len, ref, results;
          ref = this.kiki[oppo];
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            o = ref[j];
            if (o[0] === d_posi[0] && o[1] === d_posi[1]) {
              results.push(o);
            }
          }
          return results;
        }.call(this)[0] != null) {
          return false;
        }
        this.make_kiki(piece.turn);
        org = [].concat(oppo_king.posi);
        ref = Piece.Ou.getD(oppo_king.turn, oppo_king.status);
        for (j = 0, len = ref.length; j < len; j++) {
          v = ref[j];
          dest = [org[0] + v.xd, org[1] + v.yd];
          if (!((ref1 = dest[0], indexOf.call(function () {
            var results = [];
            for (var k = 1, ref2 = this.cols; 1 <= ref2 ? k <= ref2 : k >= ref2; 1 <= ref2 ? k++ : k--) {
              results.push(k);
            }
            return results;
          }.apply(this), ref1) >= 0) && (ref3 = dest[1], indexOf.call(function () {
            var results = [];
            for (var k = 1, ref4 = this.rows; 1 <= ref4 ? k <= ref4 : k >= ref4; 1 <= ref4 ? k++ : k--) {
              results.push(k);
            }
            return results;
          }.apply(this), ref3) >= 0))) {
            continue;
          }
          if (function () {
            var k, len1, ref5, results;
            ref5 = this.kiki[piece.turn];
            results = [];
            for (k = 0, len1 = ref5.length; k < len1; k++) {
              o = ref5[k];
              if (o[0] === dest[0] && o[1] === dest[1]) {
                results.push(o);
              }
            }
            return results;
          }.call(this)[0] != null) {
            continue;
          } else {
            if (function () {
              var k, len1, ref5, results;
              ref5 = this.pieces;
              results = [];
              for (k = 0, len1 = ref5.length; k < len1; k++) {
                w = ref5[k];
                if (w.posi != null && w.posi[0] === dest[0] && w.posi[1] === dest[1]) {
                  results.push(w);
                }
              }
              return results;
            }.call(this)[0] == null) {
              return false;
            }
          }
        }
        return true;
      }
    }]);
  }(/*#__PURE__*/_wrapNativeSuper(Array));
  ;
  Board.promotion_line = [2, 6];
  check_nifu = function check_nifu(piece, d_posi) {
    var tsubame, v;
    // return (v for v in @pieces when v.posi? && v.posi[0] == d_posi[0] && v.name == 'Fu' && v.status == Const.Status.OMOTE && v.turn == piece.turn)[0]?
    tsubame = function () {
      var j, len, ref, results;
      ref = this.pieces;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        v = ref[j];
        if (v.posi != null && v.posi[0] === d_posi[0] && v.name === 'Fu' && v.status === Const.Status.OMOTE && v.turn === piece.turn) {
          results.push(v);
        }
      }
      return results;
    }.call(this);
    if (tsubame.length >= 2) {
      return true;
    } else {
      return false;
    }
  };

  // 打った後、指した後に移動可能な場所が無い場合falseを返す
  check_potential = function check_potential(piece, d_posi) {
    var j, len, ref, v;
    ref = getClass(piece.name).getD(piece.turn, piece.status);
    for (j = 0, len = ref.length; j < len; j++) {
      v = ref[j];
      if (d_posi[0] + v.xd > 0 && d_posi[1] + v.yd > 0 && d_posi[0] + v.xd <= this.cols && d_posi[1] + v.yd <= this.rows) {
        return true;
      }
    }
    return false;
  };
  check_kiki = function check_kiki(piece, d_posi, src) {
    var buf, cnt, j, len, ref, ref1, ref2, ref3, ref4, v;
    ref = getClass(piece.name).getD(piece.turn, piece.status);
    for (j = 0, len = ref.length; j < len; j++) {
      v = ref[j];
      buf = [].concat(piece.posi);
      cnt = v.series;
      while (true) {
        buf[0] += v.xd;
        buf[1] += v.yd;
        if (!((ref1 = buf[0], indexOf.call(function () {
          var results = [];
          for (var k = 1, ref2 = this.cols; 1 <= ref2 ? k <= ref2 : k >= ref2; 1 <= ref2 ? k++ : k--) {
            results.push(k);
          }
          return results;
        }.apply(this), ref1) >= 0) && (ref3 = buf[1], indexOf.call(function () {
          var results = [];
          for (var k = 1, ref4 = this.rows; 1 <= ref4 ? k <= ref4 : k >= ref4; 1 <= ref4 ? k++ : k--) {
            results.push(k);
          }
          return results;
        }.apply(this), ref3) >= 0))) {
          break;
        }
        if (buf[0] === d_posi[0] && buf[1] === d_posi[1]) {
          return true;
        }
        if (src[buf[0] - 1][buf[1] - 1] != null) {
          // break if (o for o in @pieces when o.posi? && o.posi[0] == buf[0] && o.posi[1] == buf[1])[0]?
          break;
        }
        cnt -= 1;
        if (!(cnt > 0)) {
          break;
        }
      }
    }
    return false;
  };
  count_kiki = function count_kiki(piece) {
    var buf, cnt, dest, j, len, o, ref, ref1, ref2, ref3, ref4, v;
    ref = getClass(piece.name).getD(piece.turn, piece.status);
    // console.log("piece = ")
    // console.log(piece)
    for (j = 0, len = ref.length; j < len; j++) {
      v = ref[j];
      buf = [].concat(piece.posi);
      cnt = v.series;
      while (true) {
        buf[0] += v.xd;
        buf[1] += v.yd;
        if (!((ref1 = buf[0], indexOf.call(function () {
          var results = [];
          for (var k = 1, ref2 = this.cols; 1 <= ref2 ? k <= ref2 : k >= ref2; 1 <= ref2 ? k++ : k--) {
            results.push(k);
          }
          return results;
        }.apply(this), ref1) >= 0) && (ref3 = buf[1], indexOf.call(function () {
          var results = [];
          for (var k = 1, ref4 = this.rows; 1 <= ref4 ? k <= ref4 : k >= ref4; 1 <= ref4 ? k++ : k--) {
            results.push(k);
          }
          return results;
        }.apply(this), ref3) >= 0))) {
          break;
        }
        dest = function () {
          var k, len1, ref5, results;
          ref5 = this.pieces;
          results = [];
          for (k = 0, len1 = ref5.length; k < len1; k++) {
            o = ref5[k];
            if (o.posi != null && o.posi[0] === buf[0] && o.posi[1] === buf[1]) {
              results.push(o);
            }
          }
          return results;
        }.call(this)[0];
        // console.log("dest = #{dest}")
        // 味方の駒あっても利きから漏れないようにここでpush
        // 但し駒の働き評価値（移動可能箇所数）にはカウントしない
        this.kiki[piece.turn].push([buf[0], buf[1]]);
        if (dest) {
          if (dest.turn === piece.turn) {
            break;
          } else {
            piece.coefficient += 1;
            break;
          }
        } else {
          piece.coefficient += 1;
        }
        cnt -= 1;
        if (!(cnt > 0)) {
          break;
        }
      }
    }
  };
  return Board;
}.call(this);

// console.log("piece.coefficient = #{piece.coefficient}")
// board.display()
module.exports = Board;

/***/ },

/***/ "./const.coffee"
/*!**********************!*\
  !*** ./const.coffee ***!
  \**********************/
(module) {

var CHECKMATE, COLS, FIRST, KIFU_KOMA_LENGTH, KIFU_ROW_LENGTH, KIFU_ROW_LENGTH_SUB, MAX_VALUE, MIN_VALUE, ROWS, SECOND, Status, TEMP_DUPLICATION, TEMP_HISTORY, UTIFUDUME;
Status = {
  OMOTE: 0,
  URA: 1,
  MOTIGOMA: 2
};
FIRST = -1;
SECOND = 1;
COLS = 7;
ROWS = 7;
MAX_VALUE = 50000;
MIN_VALUE = -50000;
UTIFUDUME = 30000;
CHECKMATE = -30000;

// 7 x 3
KIFU_ROW_LENGTH = 21;

// 7 x 3 行末スペースが削られてるケース
KIFU_ROW_LENGTH_SUB = 20;
KIFU_KOMA_LENGTH = 3;
TEMP_HISTORY = 'history_file';
TEMP_DUPLICATION = 'duplication_file';
module.exports = {
  Status: Status,
  FIRST: FIRST,
  SECOND: SECOND,
  COLS: COLS,
  ROWS: ROWS,
  MAX_VALUE: MAX_VALUE,
  MIN_VALUE: MIN_VALUE,
  UTIFUDUME: UTIFUDUME,
  CHECKMATE: CHECKMATE,
  KIFU_ROW_LENGTH: KIFU_ROW_LENGTH,
  KIFU_ROW_LENGTH_SUB: KIFU_ROW_LENGTH_SUB,
  KIFU_KOMA_LENGTH: KIFU_KOMA_LENGTH,
  TEMP_HISTORY: TEMP_HISTORY,
  TEMP_DUPLICATION: TEMP_DUPLICATION
};

/***/ },

/***/ "./gameGui.coffee"
/*!************************!*\
  !*** ./gameGui.coffee ***!
  \************************/
(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// --- minimal jQuery / jQuery Mobile compatibility shim ---
var $$,
  $1,
  Board,
  BoardGUI,
  Const,
  GameGUI,
  MiniQuery,
  Piece,
  Player,
  State,
  crypto,
  hash,
  indexOf = [].indexOf;
$$ = function $$(selector) {
  var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return Array.prototype.slice.call(root.querySelectorAll(selector));
};
$1 = function $1(selector) {
  var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return root.querySelector(selector);
};
MiniQuery = /*#__PURE__*/function () {
  function MiniQuery(elements) {
    _classCallCheck(this, MiniQuery);
    this.elements = elements;
  }
  return _createClass(MiniQuery, [{
    key: "on",
    value: function on(eventName, handler) {
      var el, l, len, ref;
      ref = this.elements;
      for (l = 0, len = ref.length; l < len; l++) {
        el = ref[l];
        if (el != null) {
          el.addEventListener(eventName, handler);
        }
      }
      return this;
    }
  }, {
    key: "change",
    value: function change(handler) {
      return this.on('change', handler);
    }
  }, {
    key: "localize",
    value: function localize() {
      var el, isHtml, key, l, len, len1, m, node, nodes, rawKey, ref, root, value;
      ref = this.elements;
      for (l = 0, len = ref.length; l < len; l++) {
        el = ref[l];
        if (!(el != null)) {
          continue;
        }
        root = el === document ? document : el;
        nodes = Array.prototype.slice.call(root.querySelectorAll('[data-i18n]'));
        if (root !== document && root.hasAttribute != null && root.hasAttribute('data-i18n')) {
          nodes.unshift(root);
        }
        for (m = 0, len1 = nodes.length; m < len1; m++) {
          node = nodes[m];
          rawKey = node.getAttribute('data-i18n');
          if (!(window.i18next != null && rawKey != null)) {
            continue;
          }
          isHtml = false;
          key = rawKey;
          if (rawKey.indexOf('[html]') === 0) {
            isHtml = true;
            key = rawKey.replace(/^\[html\]/, '');
          }
          value = i18next.t(key);
          if (isHtml || /_html$/.test(key)) {
            node.innerHTML = value;
          } else {
            node.textContent = value;
          }
        }
      }
      return this;
    }
  }, {
    key: "trigger",
    value: function trigger(eventOrName) {
      var el, ev, l, len, ref;
      ev = typeof eventOrName === 'string' ? new Event(eventOrName, {
        bubbles: true,
        cancelable: true
      }) : eventOrName;
      ref = this.elements;
      for (l = 0, len = ref.length; l < len; l++) {
        el = ref[l];
        if (el != null) {
          el.dispatchEvent(ev);
        }
      }
      return this;
    }
  }, {
    key: "hide",
    value: function hide() {
      var el, l, len, ref;
      ref = this.elements;
      for (l = 0, len = ref.length; l < len; l++) {
        el = ref[l];
        if (el != null) {
          el.style.display = 'none';
        }
      }
      return this;
    }
  }, {
    key: "show",
    value: function show() {
      var el, l, len, ref;
      ref = this.elements;
      for (l = 0, len = ref.length; l < len; l++) {
        el = ref[l];
        if (el != null) {
          el.style.display = '';
        }
      }
      return this;
    }
  }, {
    key: "text",
    value: function text(value) {
      var el, l, len, ref;
      if (arguments.length === 0) {
        if (this.elements[0] != null) {
          return this.elements[0].textContent;
        } else {
          return '';
        }
      }
      ref = this.elements;
      for (l = 0, len = ref.length; l < len; l++) {
        el = ref[l];
        if (el != null) {
          el.textContent = value;
        }
      }
      return this;
    }
  }, {
    key: "html",
    value: function html(value) {
      var el, l, len, ref;
      if (arguments.length === 0) {
        if (this.elements[0] != null) {
          return this.elements[0].innerHTML;
        } else {
          return '';
        }
      }
      ref = this.elements;
      for (l = 0, len = ref.length; l < len; l++) {
        el = ref[l];
        if (el != null) {
          el.innerHTML = value;
        }
      }
      return this;
    }
  }, {
    key: "append",
    value: function append(value) {
      var child, el, l, len, len1, m, ref, ref1;
      ref = this.elements;
      for (l = 0, len = ref.length; l < len; l++) {
        el = ref[l];
        if (el != null) {
          if (typeof value === 'string') {
            el.insertAdjacentHTML('beforeend', value);
          } else if (value instanceof MiniQuery) {
            ref1 = value.elements;
            for (m = 0, len1 = ref1.length; m < len1; m++) {
              child = ref1[m];
              if (child != null) {
                el.appendChild(child.cloneNode(true));
              }
            }
          } else if (value != null) {
            el.appendChild(value);
          }
        }
      }
      return this;
    }
  }, {
    key: "appendTo",
    value: function appendTo(selector) {
      var el, l, len, ref, target;
      target = typeof selector === 'string' ? $1(selector) : selector;
      if (target == null) {
        return this;
      }
      ref = this.elements;
      for (l = 0, len = ref.length; l < len; l++) {
        el = ref[l];
        if (el != null) {
          target.appendChild(el);
        }
      }
      return this;
    }
  }, {
    key: "css",
    value: function css(name, value) {
      var el, k, l, len, len1, m, ref, ref1, v;
      if (_typeof(name) === 'object') {
        ref = this.elements;
        for (l = 0, len = ref.length; l < len; l++) {
          el = ref[l];
          if (el != null) {
            for (k in name) {
              v = name[k];
              el.style.setProperty(k, v);
            }
          }
        }
        return this;
      }
      if (arguments.length === 1) {
        if (this.elements[0] != null) {
          return getComputedStyle(this.elements[0]).getPropertyValue(name);
        } else {
          return void 0;
        }
      }
      ref1 = this.elements;
      for (m = 0, len1 = ref1.length; m < len1; m++) {
        el = ref1[m];
        if (el != null) {
          el.style.setProperty(name, value);
        }
      }
      return this;
    }
  }, {
    key: "attr",
    value: function attr(name, value) {
      var el, k, l, len, len1, m, ref, ref1, v;
      if (_typeof(name) === 'object') {
        ref = this.elements;
        for (l = 0, len = ref.length; l < len; l++) {
          el = ref[l];
          if (el != null) {
            for (k in name) {
              v = name[k];
              if (k === 'class') {
                el.className = v;
              } else {
                el.setAttribute(k, v);
              }
            }
          }
        }
        return this;
      }
      if (arguments.length === 1) {
        if (this.elements[0] != null) {
          return this.elements[0].getAttribute(name);
        } else {
          return void 0;
        }
      }
      ref1 = this.elements;
      for (m = 0, len1 = ref1.length; m < len1; m++) {
        el = ref1[m];
        if (el != null) {
          if (name === 'class') {
            el.className = value;
          } else {
            el.setAttribute(name, value);
          }
        }
      }
      return this;
    }
  }, {
    key: "prop",
    value: function prop(name, value) {
      var el, l, len, ref;
      if (arguments.length === 1) {
        if (this.elements[0] != null) {
          return this.elements[0][name];
        } else {
          return void 0;
        }
      }
      ref = this.elements;
      for (l = 0, len = ref.length; l < len; l++) {
        el = ref[l];
        if (el != null) {
          el[name] = value;
        }
      }
      return this;
    }
  }, {
    key: "val",
    value: function val(value) {
      var el, l, len, ref;
      if (arguments.length === 0) {
        if (this.elements[0] != null) {
          return this.elements[0].value;
        } else {
          return '';
        }
      }
      ref = this.elements;
      for (l = 0, len = ref.length; l < len; l++) {
        el = ref[l];
        if (el != null) {
          el.value = value;
        }
      }
      return this;
    }
  }, {
    key: "children",
    value: function children() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var arr, child, el, kids, l, len, ref;
      kids = [];
      ref = this.elements;
      for (l = 0, len = ref.length; l < len; l++) {
        el = ref[l];
        if (!(el != null)) {
          continue;
        }
        arr = Array.prototype.slice.call(el.children);
        if (selector != null) {
          arr = function () {
            var len1, m, results;
            results = [];
            for (m = 0, len1 = arr.length; m < len1; m++) {
              child = arr[m];
              if (child.matches(selector)) {
                results.push(child);
              }
            }
            return results;
          }();
        }
        kids = kids.concat(arr);
      }
      return new MiniQuery(kids);
    }
  }, {
    key: "eq",
    value: function eq(index) {
      return new MiniQuery([this.elements[index]]);
    }
  }, {
    key: "popup",
    value: function popup(action) {
      var el, l, len, ref;
      ref = this.elements;
      for (l = 0, len = ref.length; l < len; l++) {
        el = ref[l];
        if (el != null) {
          if (action === 'open') {
            el.classList.add('is-open');
            document.body.classList.add('popup-open');
          } else if (action === 'close') {
            el.classList.remove('is-open');
            if (!document.querySelector('[data-role="popup"].is-open')) {
              document.body.classList.remove('popup-open');
            }
          }
        }
      }
      return this;
    }
  }, {
    key: "pagecontainer",
    value: function pagecontainer(action, target) {
      if (action === 'change' && target != null) {
        if (window.changePage != null) {
          window.changePage(target);
        } else {
          location.hash = target;
        }
      }
      return this;
    }
  }, {
    key: "checkboxradio",
    value: function checkboxradio() {
      return this;
    }
  }, {
    key: "button",
    value: function button() {
      return this;
    }
  }]);
}();
window.$ = function (arg) {
  var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var el, k, tag, trimmed, v;
  if (typeof arg === 'function') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', arg);
    } else {
      arg();
    }
    return new MiniQuery([]);
  }
  if (arg === window || arg === document) {
    return new MiniQuery([arg]);
  }
  if (typeof arg === 'string') {
    trimmed = arg.trim();
    if (trimmed[0] === '<' && trimmed[trimmed.length - 1] === '>') {
      tag = trimmed.replace(/^<\s*|\s*>$/g, '');
      el = document.createElement(tag);
      if (attrs != null && _typeof(attrs) === 'object') {
        for (k in attrs) {
          v = attrs[k];
          if (k === 'class') {
            el.className = v;
          } else if (k in el) {
            el[k] = v;
          } else {
            el.setAttribute(k, v);
          }
        }
      }
      return new MiniQuery([el]);
    }
    return new MiniQuery($$(arg));
  }
  if (arg instanceof Element || arg instanceof HTMLDocument || arg === window) {
    return new MiniQuery([arg]);
  }
  if (Array.isArray(arg)) {
    return new MiniQuery(arg);
  }
  return new MiniQuery([]);
};
window.jQuery = window.$;
$.Event = function (name) {
  return new Event(name, {
    bubbles: true,
    cancelable: true
  });
};
$.mobile = {
  loader: {
    prototype: {
      options: {}
    }
  },
  loading: function loading(action) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var overlay;
    overlay = document.getElementById('vanillaLoadingOverlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'vanillaLoadingOverlay';
      overlay.style.position = 'fixed';
      overlay.style.inset = '0';
      overlay.style.display = 'none';
      overlay.style.alignItems = 'center';
      overlay.style.justifyContent = 'center';
      overlay.style.background = 'rgba(0,0,0,.35)';
      overlay.style.zIndex = '9999';
      overlay.innerHTML = '<div style="background:#fff;padding:12px 16px;border-radius:8px;">Loading...</div>';
      document.body.appendChild(overlay);
    }
    if (action === 'show') {
      overlay.style.display = 'flex';
      return overlay.firstElementChild.textContent = opts.text || 'Loading...';
    } else {
      return overlay.style.display = 'none';
    }
  }
};
$.mobile.pushStateEnabled = false;
if (window.jqueryI18next == null) {
  window.jqueryI18next = {
    init: function init() {}
  };
}
window.__vanillaCordovaReady = !!!window.cordova;
document.addEventListener('deviceready', function () {
  return window.__vanillaCordovaReady = true;
});

// --- end shim ---
crypto = __webpack_require__(/*! crypto */ "?a16a");
Const = __webpack_require__(/*! ./const */ "./const.coffee");
Piece = __webpack_require__(/*! ./piece */ "./piece.coffee");
Board = __webpack_require__(/*! ./board */ "./board.coffee");
Player = __webpack_require__(/*! ./player */ "./player.coffee");
$(function () {
  return new GameGUI();
});
Array.prototype.unique = function () {
  var key, l, output, ref, results, value;
  output = {};
  for (key = l = 0, ref = this.length; 0 <= ref ? l < ref : l > ref; key = 0 <= ref ? ++l : --l) {
    output[this[key]] = this[key];
  }
  results = [];
  for (key in output) {
    value = output[key];
    results.push(value);
  }
  return results;
};

// djb2
hash = function hash(str) {
  var h, i;
  h = 5381;
  i = 0;
  while (i < str.length) {
    h = (h << 5) + h + str.charCodeAt(i);
    i++;
  }
  return (h >>> 0).toString(16);
};
BoardGUI = function () {
  var getImg;
  var BoardGUI = /*#__PURE__*/function (_Board) {
    function BoardGUI() {
      var _this;
      _classCallCheck(this, BoardGUI);
      _this = _callSuper(this, BoardGUI);
      _this.width = 0;
      _this.height = 0;
      // @statusarea = null
      _this.fonts = 0;
      _this.latest = [];
      return _this;
    }
    _inherits(BoardGUI, _Board);
    return _createClass(BoardGUI, [{
      key: "display",
      value: function display() {
        var rev = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var pieceStyle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var clsFLUName, clsFName, clsFRUName, clsSLUName, clsSName, clsSRUName, col, f_motigoma, i, k, koma, l, len, len1, m, n, p, ref, ref1, ref2, ref3, row, s_motigoma, v;
        if (rev) {
          $("#surface").hide();
          $("#reverse").show();
          clsFName = 'firstR';
          clsSName = 'secondR';
          clsFLUName = 'fluzuraR';
          clsSLUName = 'sluzuraR';
          clsFRUName = 'fruzuraR';
          clsSRUName = 'sruzuraR';
        } else {
          $("#reverse").hide();
          $("#surface").show();
          clsFName = 'first';
          clsSName = 'second';
          clsFLUName = 'fluzura';
          clsSLUName = 'sluzura';
          clsFRUName = 'fruzura';
          clsSRUName = 'sruzura';
        }
        s_motigoma = {
          "Ka": 0,
          "Ki": 0,
          "Gi": 0,
          "Ke": 0,
          "Ky": 0,
          "Fu": 0
        };
        ref = this.pieces;
        for (i = l = 0, len = ref.length; l < len; i = ++l) {
          v = ref[i];
          if (v.turn === Const.SECOND && v.status === Const.Status.MOTIGOMA) {
            s_motigoma[v.name] += 1;
          }
        }
        // if pieceStyle != 2
        //     for k,v of s_motigoma
        //         document.querySelectorAll('[id="s' + k + '"]').forEach (el) ->
        //             el.classList.remove("ui-illust-s" + k.toLowerCase())
        //             el.classList.add("ui-icon-s" + k.toLowerCase())
        //             el.textContent = v.toString()
        // else
        //     for k,v of s_motigoma
        //         document.querySelectorAll('[id="s' + k + '"]').forEach (el) ->
        //             el.classList.remove("ui-icon-s" + k.toLowerCase())
        //             el.classList.add("ui-illust-s" + k.toLowerCase())
        //             el.textContent = v.toString()
        for (row = m = 1, ref1 = this.rows; 1 <= ref1 ? m <= ref1 : m >= ref1; row = 1 <= ref1 ? ++m : --m) {
          for (col = n = ref2 = this.cols; n >= 1; col = n += -1) {
            $('[id=b' + row.toString() + col.toString() + ']').css('background-color', '#FFFACD');
            $('[id=b' + row.toString() + col.toString() + ']').css('border-style', 'solid');
            koma = function () {
              var len1, p, ref3, results;
              ref3 = this.pieces;
              results = [];
              for (p = 0, len1 = ref3.length; p < len1; p++) {
                v = ref3[p];
                if (v.posi != null && v.posi.toString() === [col, row].toString()) {
                  results.push(v);
                }
              }
              return results;
            }.call(this)[0];
            if (koma != null) {
              switch (koma.name) {
                case "Gi":
                  $('[id=b' + koma.posi[0] + koma.posi[1] + ']').children('img').attr({
                    'src': getImg.call(this, koma),
                    'alt': koma.caption(),
                    'class': koma.turn === Const.FIRST ? clsFLUName : clsSLUName
                  });
                  break;
                case "Ke":
                  $('[id=b' + koma.posi[0] + koma.posi[1] + ']').children('img').attr({
                    'src': getImg.call(this, koma),
                    'alt': koma.caption(),
                    'class': koma.turn === Const.FIRST ? clsFRUName : clsSRUName
                  });
                  break;
                default:
                  $('[id=b' + koma.posi[0] + koma.posi[1] + ']').children('img').attr({
                    'src': getImg.call(this, koma),
                    'alt': koma.caption(),
                    'class': koma.turn === Const.FIRST ? clsFName : clsSName
                  });
              }
            } else {
              $('[id=b' + col + row + ']').children('img').attr({
                'src': './img/empty.svg',
                'class': 'empty'
              });
            }
          }
        }
        if (this.latest != null && this.latest.length === 2) {
          $('[id=b' + this.latest[0] + this.latest[1] + ']').css('border-style', 'dashed');
        }
        f_motigoma = {
          "Ka": 0,
          "Ki": 0,
          "Gi": 0,
          "Ke": 0,
          "Ky": 0,
          "Fu": 0
        };
        ref3 = this.pieces;
        for (i = p = 0, len1 = ref3.length; p < len1; i = ++p) {
          v = ref3[i];
          if (v.turn === Const.FIRST && v.status === Const.Status.MOTIGOMA) {
            f_motigoma[v.name] += 1;
          }
        }
        if (rev) {
          if (pieceStyle !== 2) {
            for (k in s_motigoma) {
              v = s_motigoma[k];
              document.querySelectorAll('[id="s' + k + '"]').forEach(function (el) {
                el.classList.remove("ui-illust-s" + k.toLowerCase());
                el.classList.remove("ui-illust-f" + k.toLowerCase());
                el.classList.remove("ui-icon-s" + k.toLowerCase());
                el.classList.add("ui-icon-f" + k.toLowerCase());
                return el.textContent = v.toString();
              });
            }
            for (k in f_motigoma) {
              v = f_motigoma[k];
              document.querySelectorAll('[id="f' + k + '"]').forEach(function (el) {
                el.classList.remove("ui-illust-f" + k.toLowerCase());
                el.classList.remove("ui-illust-s" + k.toLowerCase());
                el.classList.remove("ui-icon-f" + k.toLowerCase());
                el.classList.add("ui-icon-s" + k.toLowerCase());
                return el.textContent = v.toString();
              });
            }
          } else {
            for (k in s_motigoma) {
              v = s_motigoma[k];
              document.querySelectorAll('[id="s' + k + '"]').forEach(function (el) {
                el.classList.remove("ui-icon-s" + k.toLowerCase());
                el.classList.remove("ui-icon-f" + k.toLowerCase());
                el.classList.remove("ui-illust-s" + k.toLowerCase());
                el.classList.add("ui-illust-f" + k.toLowerCase());
                return el.textContent = v.toString();
              });
            }
            for (k in f_motigoma) {
              v = f_motigoma[k];
              document.querySelectorAll('[id="f' + k + '"]').forEach(function (el) {
                el.classList.remove("ui-icon-f" + k.toLowerCase());
                el.classList.remove("ui-icon-s" + k.toLowerCase());
                el.classList.remove("ui-illust-f" + k.toLowerCase());
                el.classList.add("ui-illust-s" + k.toLowerCase());
                return el.textContent = v.toString();
              });
            }
          }
        } else {
          if (pieceStyle !== 2) {
            for (k in s_motigoma) {
              v = s_motigoma[k];
              document.querySelectorAll('[id="s' + k + '"]').forEach(function (el) {
                el.classList.remove("ui-illust-s" + k.toLowerCase());
                el.classList.remove("ui-illust-f" + k.toLowerCase());
                el.classList.remove("ui-icon-f" + k.toLowerCase());
                el.classList.add("ui-icon-s" + k.toLowerCase());
                return el.textContent = v.toString();
              });
            }
            for (k in f_motigoma) {
              v = f_motigoma[k];
              document.querySelectorAll('[id="f' + k + '"]').forEach(function (el) {
                el.classList.remove("ui-illust-f" + k.toLowerCase());
                el.classList.remove("ui-illust-s" + k.toLowerCase());
                el.classList.remove("ui-icon-s" + k.toLowerCase());
                el.classList.add("ui-icon-f" + k.toLowerCase());
                return el.textContent = v.toString();
              });
            }
          } else {
            for (k in s_motigoma) {
              v = s_motigoma[k];
              document.querySelectorAll('[id="s' + k + '"]').forEach(function (el) {
                el.classList.remove("ui-icon-s" + k.toLowerCase());
                el.classList.remove("ui-icon-f" + k.toLowerCase());
                el.classList.remove("ui-illust-f" + k.toLowerCase());
                el.classList.add("ui-illust-s" + k.toLowerCase());
                return el.textContent = v.toString();
              });
            }
            for (k in f_motigoma) {
              v = f_motigoma[k];
              document.querySelectorAll('[id="f' + k + '"]').forEach(function (el) {
                el.classList.remove("ui-icon-f" + k.toLowerCase());
                el.classList.remove("ui-icon-s" + k.toLowerCase());
                el.classList.remove("ui-illust-s" + k.toLowerCase());
                el.classList.add("ui-illust-f" + k.toLowerCase());
                return el.textContent = v.toString();
              });
            }
          }
        }
      }
    }], [{
      key: "appLocalize",
      value: function appLocalize() {
        var lng;
        lng = '';
        lng = localStorage.getItem('appLanguage');
        if (!lng) {
          lng = 'ja';
        }
        i18next.use(i18nextSprintfPostProcessor).init({
          lng: lng,
          fallbackLng: 'en',
          debug: true,
          resources: {
            en: {
              translation: {
                title: 'Tori Shogi (Japanese Bird Chess)',
                btn_first: 'Black',
                btn_second: 'White',
                btn_start: 'New Game',
                btn_stop: 'Interrupt',
                menu_title: 'Settings',
                menu_turn: 'Turn / AI Level',
                menu_first: 'Black',
                menu_second: 'White',
                menu_person: 'Man',
                menu_ai: 'AI',
                menu_level: 'AI Level',
                menu_beginner: 'Novice',
                menu_average: 'Intermediate',
                menu_longtime: 'Senior',
                menu_meditation: 'Expert',
                menu_fonts: 'Piece Style',
                menu_fonts_standard: 'Modern',
                menu_fonts_kouzan: 'Traditional',
                menu_fonts_illustrated: 'Illustrated',
                menu_placement: 'Movement of the pieces',
                menu_guide: 'Display movement guide.',
                menu_about: 'About Tori Shogi',
                menu_kifuinput: 'Input Record',
                menu_btninput: 'Reading',
                menu_kifudata: 'Please paste the record of game:',
                dlg_promote: 'Promote?',
                dlg_promote_yes: 'Promote',
                dlg_promote_no: 'Not promote',
                dlg_check: 'The Peng is in check!',
                dlg_utifudume: 'Drop Pawn Mate!',
                msgBlack: 'Black',
                msgWhite: 'White',
                msgTurn: '%s turn ',
                msgEvaluate: '(Evaluation: %s)',
                msgWinner: '%s Win',
                msgRestart: 'Restart',
                msgInterrupt: 'Interrupt',
                msgFirstWin: 'Black Win',
                msgSecondWin: 'White Win',
                msgThinking: 'thinking...',
                msgSennitite: 'Repetition Draw',
                msgKifuCopied: 'Game record copied.',
                msgKifuError: 'Failed to copy game record.',
                dlg2_exitTitle: 'Application Menu',
                dlg2_exitItemYes: 'Exit',
                dlg2_exitItemNo: 'Cancel',
                dlg2_exit: 'Exit Application ?',
                koma_front: 'Front',
                koma_front_image: 'Front Image',
                koma_front_moves: 'Moves',
                koma_back: 'Back(Promoted)',
                koma_back_image: 'Back Image(Promoted)',
                koma_back_moves: 'Moves',
                koma_otori: '<img class="first" src="./img/f_ou.svg" alt=""><br />Peng',
                koma_otori_image: '<img class="first" src="./img/f_ou_image.svg" alt=""><br />Ootori',
                koma_tsuru: '<img class="first" src="./img/f_ka.svg" alt=""><br />Crane',
                koma_tsuru_image: '<img class="first" src="./img/f_ka_image.svg" alt=""><br />Tsuru',
                koma_kiji: '<img class="first" src="./img/f_ki.svg" alt=""><br />Pheasant',
                koma_kiji_image: '<img class="first" src="./img/f_ki_image.svg" alt=""><br />Kizi',
                koma_left_uzura: '<img class="fluzura" src="./img/f_gi.svg" alt=""><br />Left Quail',
                koma_left_uzura_image: '<img class="fluzura" src="./img/f_gi_image.svg" alt=""><br />Hidari Uzura',
                koma_right_uzura: '<img class="fruzura" src="./img/f_ke.svg" alt=""><br />&emsp;Right Quail&emsp;',
                koma_right_uzura_image: '<img class="fruzura" src="./img/f_ke_image.svg" alt=""><br />&emsp;Migi Uzura&emsp;',
                koma_taka: '<img class="first" src="./img/f_ky.svg" alt=""><br />Hawk',
                koma_taka_image: '<img class="first" src="./img/f_ky_image.svg" alt=""><br />Taka',
                koma_kumataka: '<img class="first" src="./img/f_ny.svg" alt=""><br />Eagle',
                koma_kumataka_image: '<img class="first" src="./img/f_ny_image.svg" alt=""><br />Kumataka',
                koma_tsubame: '<img class="first" src="./img/f_fu.svg" alt=""><br />Swallow',
                koma_tsubame_image: '<img class="first" src="./img/f_fu_image.svg" alt=""><br />Tsubame',
                koma_kari: '<img class="first" src="./img/f_to.svg" alt=""><br />Wild Geese',
                koma_kari_image: '<img class="first" src="./img/f_to_image.svg" alt=""><br />Kari',
                menu_description_html: 'It is a board game born in Japan during the Edo period, but there will be no people who have played in Japan as well.<br />I wanted to play once and tried making it.<br />For detailed specifications please see <a href="https://happyclam.github.io/project/2019-01-03/torishogiapp"> blog post </a>, and see <a href="https://ja.wikipedia.org/wiki/禽将棋">Wikipedia</a> for histories.<br />We were allowed to use illustrations in the app by <a href="http://www.irasutoya.com">"Irasutoya"</a>.<br />We used a free font <a href="https://forest.watch.impress.co.jp/library/software/aoyagifont/">"Kouzan brush pen font"</a> owned by <a href="http://www7a.biglobe.ne.jp/~kouzan/">"Aoyagi Kouzan"</a> who can redistribute it.'
              }
            },
            ja: {
              translation: {
                title: '禽将棋（Tori Shogi）',
                btn_first: '先手',
                btn_second: '後手',
                btn_start: '新規対局',
                btn_stop: '中断',
                menu_title: '設定',
                menu_turn: '先手・後手／ＡＩレベル',
                menu_first: '先手',
                menu_second: '後手',
                menu_person: '人',
                menu_ai: 'ＡＩ',
                menu_level: 'ＡＩレベル',
                menu_beginner: '弱い',
                menu_average: '普通',
                menu_longtime: '長考',
                menu_meditation: '瞑想',
                menu_fonts: '駒のスタイル',
                menu_fonts_standard: '楷書',
                menu_fonts_kouzan: '毛筆',
                menu_fonts_illustrated: 'イラスト',
                menu_placement: '駒の動き',
                menu_guide: '駒の移動ガイドを表示する',
                menu_about: '「禽将棋」について',
                menu_kifuinput: '棋譜入力',
                menu_btninput: '棋譜読込',
                menu_kifudata: '棋譜を貼り付けてください:',
                dlg_promote: '成りますか？',
                dlg_promote_yes: '成る',
                dlg_promote_no: '成らない',
                dlg_check: '鵬が取られてしまいます',
                dlg_utifudume: '打ち燕詰めです',
                msgBlack: '先手',
                msgWhite: '後手',
                msgTurn: '%sの番です',
                msgEvaluate: '（評価値: %s）',
                msgWinner: '%sの勝ちです',
                msgRestart: '再開',
                msgInterrupt: '中断',
                msgFirstWin: '先手の勝ちです',
                msgSecondWin: '後手の勝ちです',
                msgSennitite: '千日手です',
                msgThinking: '考え中...',
                msgKifuCopied: '棋譜をコピーしました',
                msgKifuError: '棋譜のコピーに失敗しました',
                dlg2_exitTitle: '終了メニュー',
                dlg2_exitItemYes: '終了',
                dlg2_exitItemNo: 'キャンセル',
                dlg2_exit: 'アプリを終了しますか？',
                koma_front: '表',
                koma_front_image: '表画像',
                koma_front_moves: '動き',
                koma_back: '　裏（成駒）　',
                koma_back_image: '裏画像（成駒）',
                koma_back_moves: '動き',
                koma_otori: '<img class="first" src="./img/f_ou.svg" alt=""><br />おおとり',
                koma_otori_image: '<img class="first" src="./img/f_ou_image.svg" alt=""><br />Ootori',
                koma_tsuru: '<img class="first" src="./img/f_ka.svg" alt=""><br />つる',
                koma_tsuru_image: '<img class="first" src="./img/f_ka_image.svg" alt=""><br />Tsuru',
                koma_kiji: '<img class="first" src="./img/f_ki.svg" alt=""><br />きじ',
                koma_kiji_image: '<img class="first" src="./img/f_ki_image.svg" alt=""><br />Kizi',
                koma_left_uzura: '<img class="fluzura" src="./img/f_gi.svg" alt=""><br />ひだり　うずら',
                koma_left_uzura_image: '<img class="fluzura" src="./img/f_gi_image.svg" alt=""><br />Hidari Uzura',
                koma_right_uzura: '<img class="fruzura" src="./img/f_ke.svg" alt=""><br />みぎ　うずら',
                koma_right_uzura_image: '<img class="fruzura" src="./img/f_ke_image.svg" alt=""><br />Migi Uzura',
                koma_taka: '<img class="first" src="./img/f_ky.svg" alt=""><br />たか',
                koma_taka_image: '<img class="first" src="./img/f_ky_image.svg" alt=""><br />Taka',
                koma_kumataka: '<img class="first" src="./img/f_ny.svg" alt=""><br />くまたか',
                koma_kumataka_image: '<img class="first" src="./img/f_ny_image.svg" alt=""><br />Kumataka',
                koma_tsubame: '<img class="first" src="./img/f_fu.svg" alt=""><br />つばめ',
                koma_tsubame_image: '<img class="first" src="./img/f_fu_image.svg" alt=""><br />Tsubame',
                koma_kari: '<img class="first" src="./img/f_to.svg" alt=""><br />かり',
                koma_kari_image: '<img class="first" src="./img/f_to_image.svg" alt=""><br />Kari',
                menu_description_html: '江戸時代に日本で生まれた禽将棋ですが、日本人でも遊んだことがある人はほとんどいないのではないでしょうか？<br />一度遊んでみたいと思い作ってみました。仕様に関しては<a href="https://happyclam.github.io/project/2019-01-03/torishogiapp">ブログ記事</a>を参照してください。<a href="https://ja.wikipedia.org/wiki/禽将棋">Wikipedia</a>に起源やルールも書かれています。<br />アプリ内で使用されているイラストは<a href="http://www.irasutoya.com">「いらすとや」様</a>のものを利用させていただきました。<br />将棋の駒に再配布可能な<a href="http://www7a.biglobe.ne.jp/~kouzan/">「青柳衡山」様</a>の<a href="https://forest.watch.impress.co.jp/library/software/aoyagifont/">「衡山毛筆フォント」</a>を利用させていただいてます。'
              }
            }
          }
        });
        // console.log '=== lng = ' + lng
        return $(function () {
          jqueryI18next.init(i18next, $);
          $('#home').localize();
          $('#win_menu').localize();
          // $('#popupCheckLeft').localize()
          $('[id=btnStart]').val(i18next.t('btn_start')).button('refresh');
          $('[id=btnStop]').val(i18next.t('btn_stop')).button('refresh');
        });
      }
    }]);
  }(Board);
  ;
  getImg = function getImg(piece) {
    var ret;
    ret = "";
    switch (piece.name) {
      case "Ou":
        // 鵬
        if (piece.turn === Const.FIRST) {
          if (this.fonts === 2) {
            ret = "./img/f_ou_image.svg";
          } else if (this.fonts === 1) {
            ret = "./img/f_ou_m.svg";
          } else {
            ret = "./img/f_ou.svg";
          }
        } else {
          if (this.fonts === 2) {
            ret = "./img/s_ou_image.svg";
          } else if (this.fonts === 1) {
            ret = "./img/s_ou_m.svg";
          } else {
            ret = "./img/s_ou.svg";
          }
        }
        break;
      case "Ka":
        // 鶴
        if (piece.turn === Const.FIRST) {
          if (this.fonts === 2) {
            ret = "./img/f_ka_image.svg";
          } else if (this.fonts === 1) {
            ret = "./img/f_ka_m.svg";
          } else {
            ret = "./img/f_ka.svg";
          }
        } else {
          if (this.fonts === 2) {
            ret = "./img/s_ka_image.svg";
          } else if (this.fonts === 1) {
            ret = "./img/s_ka_m.svg";
          } else {
            ret = "./img/s_ka.svg";
          }
        }
        break;
      case "Ki":
        // 雉
        if (piece.turn === Const.FIRST) {
          if (this.fonts === 2) {
            ret = "./img/f_ki_image.svg";
          } else if (this.fonts === 1) {
            ret = "./img/f_ki_m.svg";
          } else {
            ret = "./img/f_ki.svg";
          }
        } else {
          if (this.fonts === 2) {
            ret = "./img/s_ki_image.svg";
          } else if (this.fonts === 1) {
            ret = "./img/s_ki_m.svg";
          } else {
            ret = "./img/s_ki.svg";
          }
        }
        break;
      case "Gi":
        // 左鶉
        if (piece.turn === Const.FIRST) {
          if (this.fonts === 2) {
            ret = "./img/f_gi_image.svg";
          } else if (this.fonts === 1) {
            ret = "./img/f_gi_m.svg";
          } else {
            ret = "./img/f_gi.svg";
          }
        } else {
          if (this.fonts === 2) {
            ret = "./img/s_gi_image.svg";
          } else if (this.fonts === 1) {
            ret = "./img/s_gi_m.svg";
          } else {
            ret = "./img/s_gi.svg";
          }
        }
        break;
      case "Ke":
        // 右鶉
        if (piece.turn === Const.FIRST) {
          if (this.fonts === 2) {
            ret = "./img/f_ke_image.svg";
          } else if (this.fonts === 1) {
            ret = "./img/f_ke_m.svg";
          } else {
            ret = "./img/f_ke.svg";
          }
        } else {
          if (this.fonts === 2) {
            ret = "./img/s_ke_image.svg";
          } else if (this.fonts === 1) {
            ret = "./img/s_ke_m.svg";
          } else {
            ret = "./img/s_ke.svg";
          }
        }
        break;
      case "Ky":
        // 鷹、鵰
        if (piece.status === Const.Status.URA) {
          if (piece.turn === Const.FIRST) {
            if (this.fonts === 2) {
              ret = "./img/f_ny_image.svg";
            } else if (this.fonts === 1) {
              ret = "./img/f_ny_m.svg";
            } else {
              ret = "./img/f_ny.svg";
            }
          } else {
            if (this.fonts === 2) {
              ret = "./img/s_ny_image.svg";
            } else if (this.fonts === 1) {
              ret = "./img/s_ny_m.svg";
            } else {
              ret = "./img/s_ny.svg";
            }
          }
        } else {
          if (piece.turn === Const.FIRST) {
            if (this.fonts === 2) {
              ret = "./img/f_ky_image.svg";
            } else if (this.fonts === 1) {
              ret = "./img/f_ky_m.svg";
            } else {
              ret = "./img/f_ky.svg";
            }
          } else {
            if (this.fonts === 2) {
              ret = "./img/s_ky_image.svg";
            } else if (this.fonts === 1) {
              ret = "./img/s_ky_m.svg";
            } else {
              ret = "./img/s_ky.svg";
            }
          }
        }
        break;
      case "Fu":
        // 燕、雁
        if (piece.status === Const.Status.URA) {
          if (piece.turn === Const.FIRST) {
            if (this.fonts === 2) {
              ret = "./img/f_to_image.svg";
            } else if (this.fonts === 1) {
              ret = "./img/f_to_m.svg";
            } else {
              ret = "./img/f_to.svg";
            }
          } else {
            if (this.fonts === 2) {
              ret = "./img/s_to_image.svg";
            } else if (this.fonts === 1) {
              ret = "./img/s_to_m.svg";
            } else {
              ret = "./img/s_to.svg";
            }
          }
        } else {
          if (piece.turn === Const.FIRST) {
            if (this.fonts === 2) {
              ret = "./img/f_fu_image.svg";
            } else if (this.fonts === 1) {
              ret = "./img/f_fu_m.svg";
            } else {
              ret = "./img/f_fu.svg";
            }
          } else {
            if (this.fonts === 2) {
              ret = "./img/s_fu_image.svg";
            } else if (this.fonts === 1) {
              ret = "./img/s_fu_m.svg";
            } else {
              ret = "./img/s_fu.svg";
            }
          }
        }
    }
    return ret;
  };
  return BoardGUI;
}.call(this);
State = /*#__PURE__*/_createClass(function State(turn1, status) {
  var posi1 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  _classCallCheck(this, State);
  this.turn = turn1;
  this.status = status;
  this.posi = posi1;
});
GameGUI = function () {
  var _sortCoordinate, checkKind, copyKifuToClipboard, is_oute, makePiece;
  var GameGUI = /*#__PURE__*/function () {
    function GameGUI() {
      _classCallCheck(this, GameGUI);
      // console.log("GameGUI.constructor")
      this.selected = null;
      this.posi = null;
      this.s_posi = null;
      this.d_posi = null;
      this.pre_posi = null;
      this.interrupt_flg = false;
      this.auto_flg = false;
      this.history = [];
      this.seq = null;
      this.duplication = [];
      this.first_player = null;
      this.second_player = null;
      this.check_guide = null;
      this.reverse = null;
      this.radio_depth_f = null;
      this.radio_depth_s = null;
      this.radio_fonts = null;
      this.first = new Player(Const.FIRST, true);
      this.second = new Player(Const.SECOND, true);
      this.teban = this.first;
      this.board = new BoardGUI();
      this.md5hash = null;
      this.setEventListener();
      this.originalBoardImage = "";
    }
    return _createClass(GameGUI, [{
      key: "viewState",
      value: function viewState() {
        var i, l, len, ref, v;
        ref = this.board.pieces;
        // console.log("viewState")
        for (i = l = 0, len = ref.length; l < len; i = ++l) {
          v = ref[i];
          v.turn = this.history[this.seq]["board"][i].turn;
          v.status = this.history[this.seq]["board"][i].status;
          v.posi = this.history[this.seq]["board"][i].posi;
        }
        $('[id=naviSeq]').text(this.seq.toString());
        this.board.latest = this.history[this.seq]["latest"];
        this.board.display(this.reverse, this.board.fonts);
      }
    }, {
      key: "addState",
      value: function addState() {
        var md5hash = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var latest = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var from = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var to = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
        var koma = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
        var l, len, record, ref, v;
        // console.log("GameGUI.addState")
        // console.log("latest = #{latest}, from = #{from}, to = #{to}, koma = #{koma}")
        record = {};
        record["latest"] = latest != null ? [].concat(latest) : null;
        record["from"] = from != null ? [].concat(from) : null;
        record["to"] = to != null ? [].concat(to) : null;
        record["koma"] = koma != null ? koma : null;
        record["board"] = [];
        ref = this.board.pieces;
        for (l = 0, len = ref.length; l < len; l++) {
          v = ref[l];
          record["board"].push(new State(v.turn, v.status, [].concat(v.posi)));
        }
        this.history.push(record);
        this.duplication.push(md5hash);
        $('[id=naviSeq]').text((this.history.length - 1).toString());
      }
    }, {
      key: "makeRecord",
      value: function makeRecord() {
        var converted, linkStr;
        // console.log("GameGUI.makeRecord")
        converted = this.convert();
        linkStr = "https://github.com/happyclam/toriShogi";
        // window.plugins.socialsharing.share('\' #禽将棋 ' + linkStr + ' \n' + converted, 'torishogi', null, null);
        copyKifuToClipboard('\' #禽将棋 ' + linkStr + ' \n' + converted);
      }
    }, {
      key: "convert",
      value: function convert() {
        var from, i, l, len, radioNo, records, ref, teban, to, v;
        // console.log("GameGUI.convert")
        if (this.history.length <= 0) {
          return "";
        }
        if (this.history[0]["latest"] != null) {
          radioNo = this.history[0]["latest"][0];
        } else {
          radioNo = -1;
        }
        records = "'\n";
        records += "V2.2\n";
        if (this.first.human) {
          records += "N+Player\n";
        } else {
          records += "N+AI\n";
        }
        if (this.second.human) {
          records += "N-Player\n";
        } else {
          records += "N-AI\n";
        }
        if (radioNo === -1) {
          records += this.originalBoardImage;
        } else {
          records += "P1-RU-KZ-TR-OO-TR-KZ-LU\n";
          records += "P2 *  *  * -TK *  *  * \n";
          records += "P3-TB-TB-TB-TB-TB-TB-TB\n";
          records += "P4 *  * -TB * +TB *  * \n";
          records += "P5+TB+TB+TB+TB+TB+TB+TB\n";
          records += "P6 *  *  * +TK *  *  * \n";
          records += "P7+LU+KZ+TR+OO+TR+KZ+RU\n";
        }
        if (this.teban.turn === Const.SECOND) {
          records += "-\n";
        } else {
          records += "+\n";
        }
        ref = this.history;
        for (i = l = 0, len = ref.length; l < len; i = ++l) {
          v = ref[i];
          if (i === 0) {
            continue;
          }
          teban = i % 2 === 1 ? "+" : "-";
          from = v.from.length !== 0 ? v.from.toString().replace(",", "") : "00";
          to = v.to.length !== 0 ? v.to.toString().replace(",", "") : "";
          records += teban + from + to + v.koma + "\n";
        }
        return records;
      }
    }, {
      key: "inputRecord",
      value: function inputRecord() {
        var buf, col, cols, err, from, i, j, k, koma, l, len, len1, m, n, piece, ref, results, row, to, turn, v, w, y;
        // console.log("GameGUI.inputRecord")
        this.board.pieces = [];
        this.history = [];
        this.duplication = [];
        this.seq = 0;
        this.originalBoardImage = "";
        try {
          buf = $('#textKifu').val().split(/\r\n|\r|\n/);
          results = [];
          for (i = l = 0, len = buf.length; l < len; i = ++l) {
            v = buf[i];
            if (v.length === 0) {
              continue;
            }
            if (v[0] === "\'") {
              continue;
            }
            if (v[0] === "V") {
              continue;
            }
            if (v[0] === "T") {
              continue;
            }
            if (v[0] === "%") {
              continue;
            }
            if (v[0] === "N") {
              continue;
            }
            if (v[0] === "$") {
              continue;
            }
            switch (v[0]) {
              case "P":
                // throw "1:Line = #{i + 1}: #{v}" unless isFinite(v[1])
                this.originalBoardImage += v + "\n";
                if (isFinite(v[1])) {
                  row = parseInt(v[1], 10);
                  cols = v.slice(2);
                  if (!(cols.length === Const.KIFU_ROW_LENGTH || cols.length === Const.KIFU_ROW_LENGTH_SUB)) {
                    throw "01:Line = ".concat(i + 1, ": ").concat(v);
                  }
                  for (j = m = 1, ref = this.board.cols; 1 <= ref ? m <= ref : m >= ref; j = 1 <= ref ? ++m : --m) {
                    y = Const.KIFU_ROW_LENGTH - Const.KIFU_KOMA_LENGTH * j;
                    col = cols.slice(y, +(y + 2) + 1 || 9e9);
                    if (col.indexOf("*") >= 0) {
                      continue;
                    }
                    piece = makePiece.call(this, col, [j, row]);
                    if (piece != null) {
                      this.board.pieces.push(piece);
                    } else {
                      throw "02:Line = ".concat(i + 1, ": ").concat(v);
                    }
                  }
                } else if (v[1] === "+" || v[1] === "-") {
                  cols = v.split("00");
                  for (k = n = 0, len1 = cols.length; n < len1; k = ++n) {
                    j = cols[k];
                    if (k === 0) {
                      continue;
                    }
                    piece = makePiece.call(this, v[1] + j);
                    if (piece != null) {
                      this.board.pieces.push(piece);
                    } else {
                      throw "03:Line = ".concat(i + 1, ": ").concat(v);
                    }
                  }
                } else {
                  throw "04:Line = ".concat(i + 1, ": ").concat(v);
                }
                if (this.history.length > 0) {
                  throw "09:Line = ".concat(i, ": ").concat(v);
                } else {
                  results.push(void 0);
                }
                break;
              case "+":
              case "-":
                if (v.length === 1) {
                  this.addState();
                  continue;
                }
                from = [v[1], v[2]].map(Number);
                turn = v[0] === "+" ? Const.FIRST : Const.SECOND;
                if (v.slice(1, 3) === "00") {
                  koma = function () {
                    var len2, p, ref1, results1;
                    ref1 = this.board.pieces;
                    results1 = [];
                    for (p = 0, len2 = ref1.length; p < len2; p++) {
                      w = ref1[p];
                      if (w.posi.length === 0 && w.turn === turn && w.koma() === v.slice(5, 7)) {
                        results1.push(w);
                      }
                    }
                    return results1;
                  }.call(this);
                } else {
                  koma = function () {
                    var len2, p, ref1, results1;
                    ref1 = this.board.pieces;
                    results1 = [];
                    for (p = 0, len2 = ref1.length; p < len2; p++) {
                      w = ref1[p];
                      if (w.posi != null && w.turn === turn && w.posi[0] === from[0] && w.posi[1] === from[1]) {
                        results1.push(w);
                      }
                    }
                    return results1;
                  }.call(this);
                }
                if (koma.length === 0) {
                  throw "05:Line = ".concat(i + 1, ": ").concat(v);
                }
                to = [v[3], v[4]].map(Number);
                if (!checkKind.call(this, v.slice(5, 7))) {
                  throw "08:Line = ".concat(i + 1, ": ").concat(v);
                }
                if (this.board.check_move(koma[0], to)) {
                  from = this.board.move_capture(koma[0], to);
                  if (koma[0].koma() !== v.slice(5, 7)) {
                    // 駒の種類が変わっていたら成ったと見做す
                    koma[0].status = Const.Status.URA;
                  }
                } else {
                  throw "06:Line = ".concat(i + 1, ": ").concat(v);
                }
                this.md5hash = GameGUI.make_hash(this.board);
                this.seq += 1;
                results.push(this.addState(this.md5hash, to, from, to, koma[0].koma()));
                break;
              default:
                throw "07:Line= ".concat(i + 1, ": ").concat(v);
            }
          }
          return results;
        } catch (error) {
          err = error;
          console.log("Error: ".concat(err));
          return this.kifustatus.innerHTML = "Error: ".concat(err);
        } finally {
          if (err != null) {
            return false;
          } else {
            this.kifustatus.innerHTML = "";
            return true;
          }
        }
      }

      // ゲーム開始毎
    }, {
      key: "prepare",
      value: function prepare() {
        var err, radioNo;
        // console.log("GameGUI.prepare")
        this.interrupt_flg = false;
        this.auto_flg = false;
        this.history = [];
        this.duplication = [];
        this.seq = 0;
        $('[id=naviSeq]').text('');
        $("[id=btnStart]").prop("disabled", true);
        this.startbtn = true;
        $("[id=btnStop]").val(i18next.t('msgInterrupt')).button("refresh");
        $('[id=naviA]').hide();
        $('[id=spanStatus]').html(i18next.t('msgTurn', {
          postProcess: 'sprintf',
          sprintf: [i18next.t('msgBlack')]
        }));
        this.teban = this.first;
        radioNo = 0;
        this.board.set_standard();
        this.normal_weight();
        this.set_gravity(1.0);
        this.board.latest = [];
        this.addState(null, radioNo);
        this.board.display(this.reverse, this.board.fonts);
        try {
          this.first_player.selectedIndex = parseInt(localStorage.getItem("first_playerTori") | 0, 10);
          this.second_player.selectedIndex = parseInt(localStorage.getItem("second_playerTori") | 0, 10);
        } catch (error) {
          err = error;
          this.first_player.selectedIndex = 0;
          this.second_player.selectedIndex = 0;
        }
        this.first.human = this.first_player.selectedIndex === 1 ? false : true;
        return this.second.human = this.second_player.selectedIndex === 1 ? false : true;
      }
    }, {
      key: "set_gravity",
      value: function set_gravity(seq) {
        var l, len, ref, v;
        ref = this.board.pieces;
        for (l = 0, len = ref.length; l < len; l++) {
          v = ref[l];
          v.gravity = seq;
        }
      }
    }, {
      key: "normal_weight",
      value: function normal_weight() {
        Piece.Ka.weight = [60, 60, 48];
        Piece.Ki.weight = [30, 30, 24];
        Piece.Gi.weight = [70, 70, 56];
        Piece.Ke.weight = [70, 70, 56];
        Piece.Ky.weight = [70, 160, 56];
        Piece.Fu.weight = [10, 20, 12];
      }
    }, {
      key: "auto_battle",
      value: function auto_battle(seq1) {
        var _this2 = this;
        var chk_sennitite, i, l, len, msgStr, oppo, player, ref, ret, src_posi, temp, threshold;
        this.seq = seq1;
        // console.log("auto_battle")
        this.auto_flg = true;
        if (this.teban.turn === Const.FIRST) {
          player = this.first;
          oppo = this.second;
          threshold = Const.MAX_VALUE;
        } else {
          player = this.second;
          oppo = this.first;
          threshold = Const.MIN_VALUE;
        }
        temp = [];
        ret = [];
        ref = [0, 1, player.depth].unique();
        for (l = 0, len = ref.length; l < len; l++) {
          i = ref[l];
          temp = [];
          if (i >= 2) {
            temp = player.prepare(this.board, oppo, i, threshold);
          } else {
            player.pre_ahead = 0;
            oppo.pre_ahead = 0;
            temp = player.think(this.board, oppo, i, threshold);
          }
          if (this.interrupt_flg) {
            this.auto_flg = false;
            $('[id=spanStatus]').html("");
            return;
          }
          if (temp[0] != null) {
            ret = [].concat(temp);
            if (temp[2] >= Const.MAX_VALUE || temp[2] <= Const.MIN_VALUE) {
              break;
            }
          } else {
            break;
          }
        }
        if (ret[0]) {
          // 一手前のハッシュ値ですでに千日手判定されていればreturn
          chk_sennitite = this.sennitite(this.md5hash);
          if (chk_sennitite) {
            this.board.latest = ret[1];
            this.board.display(this.reverse, this.board.fonts);
            this.auto_flg = false;
            return;
          } else if (chk_sennitite === null && ret[4]["koma"] != null) {
            ret[0] = ret[4]["koma"];
            ret[1] = ret[4]["posi"];
            ret[2] = ret[4]["score"];
            ret[3] = ret[4]["status"];
          }
          if (this.board.check_move(ret[0], ret[1])) {
            src_posi = this.board.move_capture(ret[0], ret[1]);
            ret[0].status = ret[3];
          }
          this.md5hash = GameGUI.make_hash(this.board);
          this.seq += 1;
          this.addState(this.md5hash, ret[1], src_posi, ret[1], ret[0].koma());
          if (this.history[0]["latest"] != null) {
            this.writeFile(Const.TEMP_HISTORY, this.history);
            this.writeFile(Const.TEMP_DUPLICATION, this.duplication);
          }
          if (this.sennitite(this.md5hash)) {
            this.board.latest = ret[1];
            this.board.display(this.reverse, this.board.fonts);
            this.auto_flg = false;
            return;
          }
          this.teban = this.seq % 2 === 0 ? this.first : this.second;
          if (this.teban.turn === Const.FIRST) {
            msgStr = i18next.t('msgTurn', {
              postProcess: 'sprintf',
              sprintf: [i18next.t('msgBlack')]
            });
            $('[id=spanStatus]').html(msgStr);
          } else {
            msgStr = i18next.t('msgTurn', {
              postProcess: 'sprintf',
              sprintf: [i18next.t('msgWhite')]
            });
            $('[id=spanStatus]').html(msgStr);
          }
          $('[id=spanStatus]').html(msgStr + i18next.t('msgEvaluate', {
            postProcess: 'sprintf',
            sprintf: [ret[2].toString()]
          }));
        } else {
          if (this.teban.turn === Const.FIRST) {
            msgStr = i18next.t('msgWinner', {
              postProcess: 'sprintf',
              sprintf: [i18next.t('msgWhite')]
            });
            $('[id=spanStatus]').html(msgStr);
          } else {
            msgStr = i18next.t('msgWinner', {
              postProcess: 'sprintf',
              sprintf: [i18next.t('msgBlack')]
            });
            $('[id=spanStatus]').html(msgStr);
          }
          $("[id=btnStart]").prop("disabled", false);
          this.startbtn = false;
          $("[id=btnStop]").val(i18next.t('msgRestart')).button("refresh");
          $('[id=naviA]').show();
          this.auto_flg = false;
          return;
        }
        this.board.latest = ret[1];
        this.board.display(this.reverse, this.board.fonts);
        if (this.interrupt_flg) {
          this.auto_flg = false;
          $('[id=spanStatus]').html("");
          return;
        } else {
          if (this.auto_flg) {
            setTimeout(function () {
              return _this2.auto_battle(_this2.seq);
            }, 1000);
          }
        }
      }

      // 起動時
    }, {
      key: "init",
      value: function init() {
        var _this3 = this;
        var depth_f, depth_s, err, i, j, l, m, temp;
        // console.log("GameGUI.init")
        this.startbtn = null;
        this.first_player = document.getElementById("first_player");
        this.second_player = document.getElementById("second_player");
        this.radio_depth_f = document.getElementsByName("f-radio-depth");
        this.radio_depth_s = document.getElementsByName("s-radio-depth");
        this.radio_fonts = document.getElementsByName("radio-fonts");
        this.kifustatus = document.getElementById("kifuStatus");
        // @naviA = document.getElementById("naviA")
        // @naviA.style.display = "none"
        this.board.set_standard();
        try {
          this.reverse = false;
          temp = JSON.parse(localStorage.getItem("movement_guideTori"));
          if (temp === false) {
            this.check_guide = false;
            $("#check-guide").prop("checked", false);
          } else {
            this.check_guide = true;
            $("#check-guide").prop("checked", true);
          }
          this.first_player.selectedIndex = parseInt(localStorage.getItem("first_playerTori") | 0, 10);
          this.second_player.selectedIndex = parseInt(localStorage.getItem("second_playerTori") | 0, 10);
          this.first_player.dispatchEvent(new Event('change', {
            bubbles: true
          }));
          this.second_player.dispatchEvent(new Event('change', {
            bubbles: true
          }));
          depth_f = parseInt(localStorage.getItem("f-radio-depthTori") | 0, 10);
          depth_s = parseInt(localStorage.getItem("s-radio-depthTori") | 0, 10);
          // if depth_f == 3
          //     @radio_depth_f[3].checked = true
          //     @first.depth = 4; @first.pre_select = 100
          if (depth_f === 2) {
            this.radio_depth_f[2].checked = true;
            this.first.depth = 3;
            this.first.pre_select = 20;
          } else if (depth_f === 1) {
            this.radio_depth_f[1].checked = true;
            this.first.depth = 2;
            this.first.pre_select = 40;
          } else {
            this.radio_depth_f[0].checked = true;
            this.first.depth = 1;
            this.first.pre_select = 80;
          }
          // if depth_s == 3
          //     @radio_depth_s[3].checked = true
          //     @second.depth = 4; @second.pre_select = 100
          if (depth_s === 2) {
            this.radio_depth_s[2].checked = true;
            this.second.depth = 3;
            this.second.pre_select = 20;
          } else if (depth_s === 1) {
            this.radio_depth_s[1].checked = true;
            this.second.depth = 2;
            this.second.pre_select = 40;
          } else {
            this.radio_depth_s[0].checked = true;
            this.second.depth = 1;
            this.second.pre_select = 80;
          }
          $("#level-first input[type='radio']").checkboxradio();
          $("#level-first input[type='radio']").checkboxradio('refresh');
          $("#level-second input[type='radio']").checkboxradio();
          $("#level-second input[type='radio']").checkboxradio('refresh');
          if (this.first_player.selectedIndex === 0) {
            $("#level-first input[type='radio']").checkboxradio('disable');
          } else {
            $("#level-first input[type='radio']").checkboxradio('enable');
          }
          if (this.second_player.selectedIndex === 0) {
            $("#level-second input[type='radio']").checkboxradio('disable');
          } else {
            $("#level-second input[type='radio']").checkboxradio('enable');
          }
          this.board.fonts = parseInt(localStorage.getItem("radio-fontsTori") | 0, 10);
          if (this.board.fonts === 2) {
            this.radio_fonts[2].checked = true;
            this.radio_fonts[2].dispatchEvent(new Event('change', {
              bubbles: true
            }));
          } else if (this.board.fonts === 1) {
            this.radio_fonts[1].checked = true;
            this.radio_fonts[1].dispatchEvent(new Event('change', {
              bubbles: true
            }));
          } else {
            this.radio_fonts[0].checked = true;
            this.radio_fonts[0].dispatchEvent(new Event('change', {
              bubbles: true
            }));
          }
          setTimeout(function () {
            var event;
            event = new $.Event('special');
            return $(document).trigger(event);
          }, 500);
        } catch (error) {
          err = error;
          console.log("=== Error ===");
          console.log(err);
          this.first_player.selectedIndex = 0;
          this.second_player.selectedIndex = 0;
          this.radio_depth_f[0].checked = true;
          this.radio_depth_s[0].checked = true;
          this.radio_fonts[0].checked = true;
        }
        $('#btnRecord1').on('click', function (e) {
          _this3.makeRecord();
        });
        $('#btnRecord2').on('click', function (e) {
          _this3.makeRecord();
        });
        $('#btnReverse').on('click', function (e) {
          _this3.reverse = _this3.reverse ? false : true;
          _this3.board.display(_this3.reverse, _this3.board.fonts);
        });
        $('#btnKifu').on('click', function (e) {
          if (_this3.inputRecord()) {
            $('[id=naviSeq]').text('');
            _this3.interrupt_flg = true;
            $("[id=btnStop]").val(i18next.t('msgRestart')).button("refresh");
            $("[id=btnStart]").prop("disabled", false);
            _this3.startbtn = false;
            $('[id=naviA]').show();
            $('[id=spanStatus]').html("");
            if (typeof window.changePage === "function") {
              window.changePage('#home');
            }
            _this3.viewState();
          }
        });
        $('[id=btnStart]').on('click', function (e) {
          var target;
          target = $(e.currentTarget);
          _this3.prepare();
          _this3.first.human = _this3.first_player.selectedIndex === 1 ? false : true;
          _this3.second.human = _this3.second_player.selectedIndex === 1 ? false : true;
          if (!_this3.first.human && !_this3.second.human) {
            $('[id=spanStatus]').html(i18next.t('msgThinking'));
            _this3.board.display(_this3.reverse, _this3.board.fonts);
            setTimeout(function () {
              return _this3.auto_battle(_this3.seq);
            }, 1000);
          } else if (!_this3.first.human) {
            $('[id=spanStatus]').html(i18next.t('msgThinking'));
            setTimeout(function () {
              var event;
              event = new $.Event('ai_thinking');
              return $(window).trigger(event);
            }, 500);
          }
        });
        $('[id=naviStart]').on('click', function (e) {
          _this3.seq = 0;
          _this3.viewState();
        });
        $('[id=naviPrev]').on('click', function (e) {
          if (_this3.seq > 0) {
            _this3.seq -= 1;
          }
          _this3.viewState();
        });
        $('[id=naviFollow]').on('click', function (e) {
          if (_this3.seq < _this3.history.length - 1) {
            _this3.seq += 1;
          }
          _this3.viewState();
        });
        $('[id=naviEnd]').on('click', function (e) {
          _this3.seq = _this3.history.length - 1;
          _this3.viewState();
        });
        for (i = l = 1; l <= 7; i = ++l) {
          for (j = m = 1; m <= 7; j = ++m) {
            $('[id=b' + i.toString() + j.toString() + ']').on('click', function (e) {
              _this3.select([Number(e.currentTarget.dataset.col), Number(e.currentTarget.dataset.row)]);
            });
          }
        }
        $('[id=sFu]').on('click', function (e) {
          _this3.motigoma(e.currentTarget.id[0] === "s" ? Const.SECOND : Const.FIRST, e.currentTarget.id.slice(1, 3));
        });
        $('[id=sHi]').on('click', function (e) {
          _this3.motigoma(e.currentTarget.id[0] === "s" ? Const.SECOND : Const.FIRST, e.currentTarget.id.slice(1, 3));
        });
        $('[id=sKa]').on('click', function (e) {
          _this3.motigoma(e.currentTarget.id[0] === "s" ? Const.SECOND : Const.FIRST, e.currentTarget.id.slice(1, 3));
        });
        $('[id=sKi]').on('click', function (e) {
          _this3.motigoma(e.currentTarget.id[0] === "s" ? Const.SECOND : Const.FIRST, e.currentTarget.id.slice(1, 3));
        });
        $('[id=sGi]').on('click', function (e) {
          _this3.motigoma(e.currentTarget.id[0] === "s" ? Const.SECOND : Const.FIRST, e.currentTarget.id.slice(1, 3));
        });
        $('[id=sKe]').on('click', function (e) {
          _this3.motigoma(e.currentTarget.id[0] === "s" ? Const.SECOND : Const.FIRST, e.currentTarget.id.slice(1, 3));
        });
        $('[id=sKy]').on('click', function (e) {
          _this3.motigoma(e.currentTarget.id[0] === "s" ? Const.SECOND : Const.FIRST, e.currentTarget.id.slice(1, 3));
        });
        $('[id=fFu]').on('click', function (e) {
          _this3.motigoma(e.currentTarget.id[0] === "s" ? Const.SECOND : Const.FIRST, e.currentTarget.id.slice(1, 3));
        });
        $('[id=fHi]').on('click', function (e) {
          _this3.motigoma(e.currentTarget.id[0] === "s" ? Const.SECOND : Const.FIRST, e.currentTarget.id.slice(1, 3));
        });
        $('[id=fKa]').on('click', function (e) {
          _this3.motigoma(e.currentTarget.id[0] === "s" ? Const.SECOND : Const.FIRST, e.currentTarget.id.slice(1, 3));
        });
        $('[id=fKi]').on('click', function (e) {
          _this3.motigoma(e.currentTarget.id[0] === "s" ? Const.SECOND : Const.FIRST, e.currentTarget.id.slice(1, 3));
        });
        $('[id=fGi]').on('click', function (e) {
          _this3.motigoma(e.currentTarget.id[0] === "s" ? Const.SECOND : Const.FIRST, e.currentTarget.id.slice(1, 3));
        });
        $('[id=fKe]').on('click', function (e) {
          _this3.motigoma(e.currentTarget.id[0] === "s" ? Const.SECOND : Const.FIRST, e.currentTarget.id.slice(1, 3));
        });
        $('[id=fKy]').on('click', function (e) {
          _this3.motigoma(e.currentTarget.id[0] === "s" ? Const.SECOND : Const.FIRST, e.currentTarget.id.slice(1, 3));
        });
        $('#btnMenu').on('click', function (e) {
          if (typeof e.preventDefault === "function") {
            e.preventDefault();
          }
          if (_this3.startbtn) {
            _this3.interrupted();
          }
          if (typeof window.changePage === "function") {
            window.changePage('#win_menu');
          }
        });
        $('[id=btnStop]').on('click', function (e) {
          return _this3.interrupted();
        });
        $('#btnCheckLeft').on('click', function (e) {
          return $('#popupCheckLeft').popup("close");
        });
        $('#btnDropPawnMate').on('click', function (e) {
          return $('#popupDropPawnMate').popup("close");
        });
        $('input[name=radio-fonts]').change(function () {
          var idx;
          idx = $('input[name=radio-fonts]:checked').val();
          try {
            localStorage.setItem("radio-fontsTori", idx);
            return setTimeout(function () {
              var event;
              event = new $.Event('after_fonts');
              return $(document).trigger(event);
            }, 500);
          } catch (error) {
            err = error;
            return console.log(err);
          }
        });
        $('input[name="f-radio-depth"]').on('change', function (e) {
          var target;
          target = $(e.currentTarget);
          try {
            // if @radio_depth_f[3].checked
            //     localStorage.setItem("f-radio-depth77", 3)
            //     @first.depth = 4; @first.pre_select = 100
            if (_this3.radio_depth_f[2].checked) {
              localStorage.setItem("f-radio-depthTori", 2);
              _this3.first.depth = 3;
              return _this3.first.pre_select = 20;
            } else if (_this3.radio_depth_f[1].checked) {
              localStorage.setItem("f-radio-depthTori", 1);
              _this3.first.depth = 2;
              return _this3.first.pre_select = 40;
            } else {
              localStorage.setItem("f-radio-depthTori", 0);
              _this3.first.depth = 1;
              return _this3.first.pre_select = 80;
            }
          } catch (error) {
            err = error;
            return console.log(err);
          }
        });
        $('input[name="s-radio-depth"]').on('change', function (e) {
          var target;
          target = $(e.currentTarget);
          try {
            // if @radio_depth_s[3].checked
            //     localStorage.setItem("s-radio-depth77", 3)
            //     @second.depth = 4; @second.pre_select = 100
            if (_this3.radio_depth_s[2].checked) {
              localStorage.setItem("s-radio-depthTori", 2);
              _this3.second.depth = 3;
              return _this3.second.pre_select = 20;
            } else if (_this3.radio_depth_s[1].checked) {
              localStorage.setItem("s-radio-depthTori", 1);
              _this3.second.depth = 2;
              return _this3.second.pre_select = 40;
            } else {
              localStorage.setItem("s-radio-depthTori", 0);
              _this3.second.depth = 1;
              return _this3.second.pre_select = 80;
            }
          } catch (error) {
            err = error;
            return console.log(err);
          }
        });
        $('#check-guide').on('change', function (e) {
          try {
            _this3.check_guide = e.currentTarget.checked;
            return localStorage.setItem("movement_guideTori", _this3.check_guide);
          } catch (error) {
            err = error;
            return console.log(err);
          }
        });
        $('#first_player').on('change', function (e) {
          var target;
          target = $(e.currentTarget);
          try {
            if (target.prop('selectedIndex') === 0) {
              $("#level-first input[type='radio']").checkboxradio('disable');
            } else {
              $("#level-first input[type='radio']").checkboxradio('enable');
            }
            return localStorage.setItem("first_playerTori", target.prop('selectedIndex'));
          } catch (error) {
            err = error;
            return console.log(err);
          }
        });
        return $('#second_player').on('change', function (e) {
          var target;
          target = $(e.currentTarget);
          try {
            if (target.prop('selectedIndex') === 0) {
              $("#level-second input[type='radio']").checkboxradio('disable');
            } else {
              $("#level-second input[type='radio']").checkboxradio('enable');
            }
            return localStorage.setItem("second_playerTori", target.prop('selectedIndex'));
          } catch (error) {
            err = error;
            return console.log(err);
          }
        });
      }
    }, {
      key: "interrupted",
      value: function interrupted() {
        var _this4 = this;
        var oppo, ret, threshold;
        // console.log("Game.interrupted")
        if (this.seq == null) {
          return;
        }
        if (this.startbtn) {
          this.interrupt_flg = true;
          $("[id=btnStop]").val(i18next.t('msgRestart')).button("refresh");
          $("[id=btnStart]").prop("disabled", false);
          this.startbtn = false;
          $('[id=naviA]').show();
          $('[id=spanStatus]').html("");
        } else {
          this.interrupt_flg = false;
          $("[id=btnStop]").val(i18next.t('msgInterrupt')).button("refresh");
          $("[id=btnStart]").prop("disabled", true);
          this.startbtn = true;
          $('[id=naviA]').hide();
          if (this.seq % 2 === 0) {
            $('[id=spanStatus]').html(i18next.t('msgTurn', {
              postProcess: 'sprintf',
              sprintf: [i18next.t('msgBlack')]
            }));
          } else {
            $('[id=spanStatus]').html(i18next.t('msgTurn', {
              postProcess: 'sprintf',
              sprintf: [i18next.t('msgWhite')]
            }));
          }
          this.teban = this.seq % 2 === 0 ? this.first : this.second;
          this.first_player.selectedIndex = parseInt(localStorage.getItem("first_playerTori") | 0, 10);
          this.second_player.selectedIndex = parseInt(localStorage.getItem("second_playerTori") | 0, 10);
          this.first.human = this.first_player.selectedIndex === 1 ? false : true;
          this.second.human = this.second_player.selectedIndex === 1 ? false : true;
          this.history.splice(this.seq + 1);
          this.duplication.splice(this.seq + 1);
          if (!this.first.human && !this.second.human) {
            $('[id=spanStatus]').html(i18next.t('msgThinking'));
            setTimeout(function () {
              return _this4.auto_battle(_this4.seq);
            }, 1000);
          } else if (!this.teban.human) {
            $('[id=spanStatus]').html(i18next.t('msgThinking'));
            setTimeout(function () {
              var event;
              event = new $.Event('ai_thinking');
              return $(window).trigger(event);
            }, 500);
          } else {
            if (this.sennitite(GameGUI.make_hash(this.board))) {
              return;
            }
            ret = [];
            oppo = this.teban.turn === Const.FIRST ? this.second : this.first;
            threshold = this.teban.turn === Const.FIRST ? Const.MAX_VALUE : Const.MIN_VALUE;
            this.teban.pre_ahead = 0;
            oppo.pre_ahead = 0;
            ret = this.teban.think(this.board, oppo, 0, threshold);
            if (!ret[0]) {
              switch (ret[2]) {
                case Const.MAX_VALUE:
                  $('[id=spanStatus]').html(i18next.t('msgFirstWin'));
                  $("[id=btnStart]").prop("disabled", false);
                  this.startbtn = false;
                  $("[id=btnStop]").val(i18next.t('msgRestart')).button("refresh");
                  $('[id=naviA]').show();
                  break;
                case Const.MIN_VALUE:
                  $('[id=spanStatus]').html(i18next.t('msgSecondWin'));
                  $("[id=btnStart]").prop("disabled", false);
                  this.startbtn = false;
                  $("[id=btnStop]").val(i18next.t('msgRestart')).button("refresh");
                  $('[id=naviA]').show();
                  break;
                default:
                  console.log("Error!");
              }
              this.board.display(this.reverse, this.board.fonts);
            }
          }
        }
      }
    }, {
      key: "sennitite",
      value: function sennitite(h) {
        var b, v;
        b = function () {
          var l, len, ref, results;
          ref = this.duplication;
          results = [];
          for (l = 0, len = ref.length; l < len; l++) {
            v = ref[l];
            if (v === h) {
              results.push(v);
            }
          }
          return results;
        }.call(this);
        if (b.length === 3) {
          return null;
        } else if (b.length >= 4) {
          $('[id=spanStatus]').html(i18next.t('msgSennitite'));
          $("[id=btnStart]").prop("disabled", false);
          this.startbtn = false;
          $("[id=btnStop]").val(i18next.t('msgRestart')).button("refresh");
          $('[id=naviA]').show();
          return true;
        } else {
          return false;
        }
      }
    }, {
      key: "routine",
      value: function routine(piece, posi, nari) {
        var oppo, ret, src_posi, threshold;
        // console.log("routine")
        src_posi = this.board.move_capture(piece, posi);
        if (nari) {
          piece.status = Const.Status.URA;
        }
        this.md5hash = GameGUI.make_hash(this.board);
        this.seq += 1;
        this.addState(this.md5hash, posi, src_posi, posi, piece.koma());
        if (this.history[0]["latest"] != null) {
          this.writeFile(Const.TEMP_HISTORY, this.history);
          this.writeFile(Const.TEMP_DUPLICATION, this.duplication);
        }
        if (this.sennitite(this.md5hash)) {
          this.board.latest = posi;
          this.board.display(this.reverse, this.board.fonts);
          return;
        }
        this.teban = this.seq % 2 === 0 ? this.first : this.second;
        threshold = this.teban.turn === Const.FIRST ? Const.MAX_VALUE : Const.MIN_VALUE;
        switch (this.board.gameover()) {
          case Const.FIRST:
            $('[id=spanStatus]').html(i18next.t('msgFirstWin'));
            $("[id=btnStart]").prop("disabled", false);
            this.startbtn = false;
            $("[id=btnStop]").val(i18next.t('msgRestart')).button("refresh");
            $('[id=naviA]').show();
            this.board.latest = posi;
            this.board.display(this.reverse, this.board.fonts);
            return;
          case Const.SECOND:
            $('[id=spanStatus]').html(i18next.t('msgSecondWin'));
            $("[id=btnStart]").prop("disabled", false);
            this.startbtn = false;
            $("[id=btnStop]").val(i18next.t('msgRestart')).button("refresh");
            $('[id=naviA]').show();
            this.board.latest = posi;
            this.board.display(this.reverse, this.board.fonts);
            return;
          default:
            if (this.teban.turn === Const.FIRST) {
              $('[id=spanStatus]').html(i18next.t('msgTurn', {
                postProcess: 'sprintf',
                sprintf: [i18next.t('msgBlack')]
              }));
            } else {
              $('[id=spanStatus]').html(i18next.t('msgTurn', {
                postProcess: 'sprintf',
                sprintf: [i18next.t('msgWhite')]
              }));
            }
        }
        this.s_posi = null;
        this.d_posi = null;
        this.board.latest = posi;
        this.board.display(this.reverse, this.board.fonts);
        if (this.teban.human) {
          oppo = this.teban.turn === Const.FIRST ? this.second : this.first;
          ret = [];
          // 詰みチェック
          this.teban.pre_ahead = 0;
          oppo.pre_ahead = 0;
          ret = this.teban.think(this.board, oppo, 0, threshold);
          if (!ret[0]) {
            if (this.teban.turn === Const.FIRST) {
              $('[id=spanStatus]').html(i18next.t('msgWinner', {
                postProcess: 'sprintf',
                sprintf: [i18next.t('msgWhite')]
              }));
            } else {
              $('[id=spanStatus]').html(i18next.t('msgWinner', {
                postProcess: 'sprintf',
                sprintf: [i18next.t('msgBlack')]
              }));
            }
            $("[id=btnStart]").prop("disabled", false);
            this.startbtn = false;
            $("[id=btnStop]").val(i18next.t('msgRestart')).button("refresh");
            $('[id=naviA]').show();
          }
        } else {
          $('[id=spanStatus]').html(i18next.t('msgThinking'));
          return setTimeout(function () {
            var event;
            event = new $.Event('ai_thinking');
            return $(window).trigger(event);
          }, 500);
        }
      }
    }, {
      key: "touch",
      value: function touch(piece, posi) {
        var dest, dest_piece, king, move_piece, oppo, player, ref, ret, threshold, v;
        // console.log("touch")
        if (!this.startbtn) {
          return;
        }
        if (this.auto_flg) {
          return;
        }
        if (piece == null) {
          this.s_posi = null;
          return;
        }
        dest = function () {
          var l, len, ref, results;
          ref = this.board.pieces;
          results = [];
          for (l = 0, len = ref.length; l < len; l++) {
            v = ref[l];
            if (v.posi != null && v.posi.toString() === posi.toString()) {
              results.push(v);
            }
          }
          return results;
        }.call(this);
        if (dest.length !== 0 && dest[0].turn === piece.turn) {
          this.s_posi = null;
          return;
        }
        move_piece = new Piece.Piece(piece.turn, piece.status, [].concat(piece.posi));
        if (dest.length !== 0) {
          dest_piece = new Piece.Piece(dest[0].turn, dest[0].status, [].concat(dest[0].posi));
        }
        if (this.board.check_move(piece, posi)) {
          this.board.move_capture(piece, posi);
        } else {
          this.s_posi = null;
          return;
        }
        if (this.teban.turn === Const.FIRST) {
          player = this.second;
          oppo = this.first;
          threshold = Const.MIN_VALUE;
        } else {
          player = this.first;
          oppo = this.second;
          threshold = Const.MAX_VALUE;
        }
        this.board.make_kiki(player.turn);
        king = function () {
          var l, len, ref, results;
          ref = this.board.pieces;
          results = [];
          for (l = 0, len = ref.length; l < len; l++) {
            v = ref[l];
            if (v.name === 'Ou' && v.turn === this.teban.turn) {
              results.push(v);
            }
          }
          return results;
        }.call(this)[0];
        if (ref = king.posi.toString(), indexOf.call(this.board.kiki[player.turn].map(function (o) {
          return o.toString();
        }), ref) >= 0) {
          $('#popupCheckLeft').popup("open");
          this.s_posi = null;
          piece.turn = move_piece.turn;
          piece.status = move_piece.status;
          piece.posi = move_piece.posi;
          if (dest.length !== 0) {
            dest[0].turn = dest_piece.turn;
            dest[0].status = dest_piece.status;
            dest[0].posi = dest_piece.posi;
          }
          return;
        }
        if (piece.name === 'Fu' && move_piece.status === Const.Status.MOTIGOMA) {
          ret = [];
          player.pre_ahead = 0;
          oppo.pre_ahead = 0;
          ret = player.think(this.board, oppo, 0, threshold);
          if (ret[2] >= Const.MAX_VALUE || ret[2] <= Const.MIN_VALUE) {
            if (is_oute.call(this, piece, posi)) {
              $('#popupDropPawnMate').popup("open");
              this.s_posi = null;
              piece.turn = move_piece.turn;
              piece.status = move_piece.status;
              piece.posi = move_piece.posi;
              return;
            }
          }
        }
        piece.turn = move_piece.turn;
        piece.status = move_piece.status;
        piece.posi = move_piece.posi;
        if (dest.length !== 0) {
          dest[0].turn = dest_piece.turn;
          dest[0].status = dest_piece.status;
          dest[0].posi = dest_piece.posi;
        }
        if (this.board.check_move(piece, posi)) {
          if (this.board.check_promotion(piece, posi)) {
            this.posi = posi;
            this.routine(piece, posi, true);
          } else {
            this.routine(piece, posi, false);
          }
        } else {
          this.s_posi = null;
        }
      }
    }, {
      key: "motigoma",
      value: function motigoma(turn, kind) {
        var v;
        // console.log("motigoma")
        if (!this.startbtn) {
          return;
        }
        if (this.pre_posi) {
          $('[id=b' + this.pre_posi[0] + this.pre_posi[1] + ']').css('background-color', '#FFFACD');
        }
        this.selected = function () {
          var l, len, ref, results;
          ref = this.board.pieces;
          results = [];
          for (l = 0, len = ref.length; l < len; l++) {
            v = ref[l];
            if (v.turn === turn && v.name === kind && v.status === Const.Status.MOTIGOMA && v.turn === this.teban.turn) {
              results.push(v);
            }
          }
          return results;
        }.call(this)[0];
        if (this.selected != null) {
          this.s_posi = !null;
        }
      }
    }, {
      key: "select",
      value: function select(posi) {
        var c, l, m, r, ref, ref1, v;
        // console.log("select")
        $('[id=b' + posi[0] + posi[1] + ']').css('background-color', '#FFFACD');
        if (!this.s_posi) {
          this.s_posi = posi;
          this.selected = function () {
            var l, len, ref, results;
            ref = this.board.pieces;
            results = [];
            for (l = 0, len = ref.length; l < len; l++) {
              v = ref[l];
              if (v.posi != null && v.posi.toString() === posi.toString() && v.turn === this.teban.turn) {
                results.push(v);
              }
            }
            return results;
          }.call(this)[0];
          if (this.selected != null) {
            $('[id=b' + posi[0] + posi[1] + ']').css('background-color', '#E3D7A6');
            this.pre_posi = posi;
            if (this.check_guide) {
              this.guide(this.selected);
            }
          } else {
            this.s_posi = null;
          }
        } else {
          this.d_posi = posi;
          if (this.pre_posi) {
            $('[id=b' + this.pre_posi[0] + this.pre_posi[1] + ']').css('background-color', '#FFFACD');
            for (c = l = 1, ref = this.board.cols; 1 <= ref ? l <= ref : l >= ref; c = 1 <= ref ? ++l : --l) {
              for (r = m = 1, ref1 = this.board.rows; 1 <= ref1 ? m <= ref1 : m >= ref1; r = 1 <= ref1 ? ++m : --m) {
                if (!(r === posi[1] && c === posi[0])) {
                  $('[id=b' + c.toString() + r.toString() + ']').css('background-color', '#FFFACD');
                }
              }
            }
          }
          this.touch(this.selected, this.d_posi);
        }
      }
    }, {
      key: "guide",
      value: function guide(piece) {
        var buf, cnt, dest, l, len, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, v, w;
        ref = getClass(piece.name).getD(piece.turn, piece.status);
        // console.log("GameGUI.guide")
        for (l = 0, len = ref.length; l < len; l++) {
          v = ref[l];
          buf = [].concat(piece.posi);
          buf[0] += v.xd;
          buf[1] += v.yd;
          if (v.series > 0) {
            cnt = v.series;
            while ((ref1 = buf[0], indexOf.call(function () {
              var results = [];
              for (var m = 1, ref2 = this.board.cols; 1 <= ref2 ? m <= ref2 : m >= ref2; 1 <= ref2 ? m++ : m--) {
                results.push(m);
              }
              return results;
            }.apply(this), ref1) >= 0) && (ref3 = buf[1], indexOf.call(function () {
              var results = [];
              for (var m = 1, ref4 = this.board.rows; 1 <= ref4 ? m <= ref4 : m >= ref4; 1 <= ref4 ? m++ : m--) {
                results.push(m);
              }
              return results;
            }.apply(this), ref3) >= 0) && cnt > 0) {
              dest = function () {
                var len1, m, ref1, results;
                ref1 = this.board.pieces;
                results = [];
                for (m = 0, len1 = ref1.length; m < len1; m++) {
                  w = ref1[m];
                  if (w.posi != null && w.posi[0] === buf[0] && w.posi[1] === buf[1]) {
                    results.push(w);
                  }
                }
                return results;
              }.call(this);
              if (dest.length !== 0) {
                if (piece.turn !== dest[0].turn) {
                  $('[id=b' + buf[0].toString() + buf[1].toString() + ']').css('background-color', '#E6E6E6');
                }
                break;
              } else {
                $('[id=b' + buf[0].toString() + buf[1].toString() + ']').css('background-color', '#E6E6E6');
              }
              buf[0] += v.xd;
              buf[1] += v.yd;
              cnt -= 1;
            }
          } else {
            dest = function () {
              var len1, m, ref5, results;
              ref5 = this.board.pieces;
              results = [];
              for (m = 0, len1 = ref5.length; m < len1; m++) {
                w = ref5[m];
                if (w.posi != null && w.posi[0] === buf[0] && w.posi[1] === buf[1]) {
                  results.push(w);
                }
              }
              return results;
            }.call(this);
            if (dest.length !== 0) {
              if (piece.turn !== dest[0].turn) {
                $('[id=b' + buf[0].toString() + buf[1].toString() + ']').css('background-color', '#E6E6E6');
              }
            } else {
              if ((ref5 = buf[0], indexOf.call(function () {
                var results = [];
                for (var m = 1, ref6 = this.board.cols; 1 <= ref6 ? m <= ref6 : m >= ref6; 1 <= ref6 ? m++ : m--) {
                  results.push(m);
                }
                return results;
              }.apply(this), ref5) >= 0) && (ref7 = buf[1], indexOf.call(function () {
                var results = [];
                for (var m = 1, ref8 = this.board.rows; 1 <= ref8 ? m <= ref8 : m >= ref8; 1 <= ref8 ? m++ : m--) {
                  results.push(m);
                }
                return results;
              }.apply(this), ref7) >= 0)) {
                $('[id=b' + buf[0].toString() + buf[1].toString() + ']').css('background-color', '#E6E6E6');
              }
            }
          }
        }
      }
    }, {
      key: "toast",
      value: function toast(piece) {
        var toastStr;
        // console.log("toast")
        toastStr = this.getMovement(piece);
        if (toastStr === "") {
          return;
        }
        window.plugins.toast.showWithOptions({
          message: toastStr,
          duration: 'long',
          position: 'center',
          styling: {
            opacity: 0.75,
            backgroundColor: '#E6E6E6',
            textColor: '#000000',
            textSize: 28,
            cornerRadius: 16
          }
        });
      }
    }, {
      key: "getMovement",
      value: function getMovement(piece) {
        var ret;
        // console.log("getMovement")
        ret = "";
        if (piece == null) {
          return ret;
        }
        switch (piece.name) {
          case "Ou":
            ret = "|　|　|　|　|　|\n |　|◯|◯|◯|　|\n |　|◯|●|◯|　|\n |　|◯|◯|◯|　|\n |　|　|　|　|　|\n";
            break;
          case "Ky":
            if (piece.status === Const.Status.URA) {
              if (piece.turn === Const.FIRST) {
                ret = "|＼|　|　|　|／|\n |　|＼|◯|／|　|\n |　|◯|●|◯|　|\n |　|◯|｜|◯|　|\n |◯|　|｜|　|◯|\n";
              } else {
                ret = "|◯|　|｜|　|◯|\n |　|◯|｜|◯|　|\n |　|◯|●|◯|　|\n |　|／|◯|＼|　|\n |／|　|　|　|＼|\n";
              }
            } else {
              if (piece.turn === Const.FIRST) {
                ret = "|　|　|　|　|　|\n |　|◯|◯|◯|　|\n |　|◯|●|◯|　|\n |　|◯|　|◯|　|\n |　|　|　|　|　|\n";
              } else {
                ret = "|　|　|　|　|　|\n |　|◯|　|◯|　|\n |　|◯|●|◯|　|\n |　|◯|◯|◯|　|\n |　|　|　|　|　|\n";
              }
            }
            break;
          case "Ka":
            ret = "|　|　|　|　|　|\n |　|◯|◯|◯|　|\n |　|　|●|　|　|\n |　|◯|◯|◯|　|\n |　|　|　|　|　|\n";
            break;
          case "Ki":
            if (piece.turn === Const.FIRST) {
              ret = "|　|　|☆|　|　|\n |　|　|　|　|　|\n |　|　|●|　|　|\n |　|◯|　|◯|　|\n |　|　|　|　|　|\n";
            } else {
              ret = "|　|　|　|　|　|\n |　|◯|　|◯|　|\n |　|　|●|　|　|\n |　|　|　|　|　|\n |　|　|☆|　|　|\n";
            }
            break;
          case "Gi":
            if (piece.turn === Const.FIRST) {
              ret = "|　|　|｜|　|　|\n |　|　|｜|　|　|\n |　|　|●|　|　|\n |　|◯|　|＼|　|\n |　|　|　|　|＼|\n";
            } else {
              ret = "|＼|　|　|　|　|\n |　|＼|　|◯|　|\n |　|　|●|　|　|\n |　|　|｜|　|　|\n |　|　|｜|　|　|\n";
            }
            break;
          case "Ke":
            if (piece.turn === Const.FIRST) {
              ret = "|　|　|｜|　|　|\n |　|　|｜|　|　|\n |　|　|●|　|　|\n |　|／|　|◯|　|\n |／|　|　|　|　|\n";
            } else {
              ret = "|　|　|　|　|／|\n |　|◯|　|／|　|\n |　|　|●|　|　|\n |　|　|｜|　|　|\n |　|　|｜|　|　|\n";
            }
            break;
          case "Fu":
            if (piece.status === Const.Status.URA) {
              if (piece.turn === Const.FIRST) {
                ret = "|☆|　|　|　|☆|\n |　|　|　|　|　|\n |　|　|●|　|　|\n |　|　|　|　|　|\n |　|　|☆|　|　|\n";
              } else {
                ret = "|　|　|☆|　|　|\n |　|　|　|　|　|\n |　|　|●|　|　|\n |　|　|　|　|　|\n |☆|　|　|　|☆|\n";
              }
            } else {
              if (piece.turn === Const.FIRST) {
                ret = "|　|　|　|　|　|\n |　|　|◯|　|　|\n |　|　|●|　|　|\n |　|　|　|　|　|\n |　|　|　|　|　|\n";
              } else {
                ret = "|　|　|　|　|　|\n |　|　|　|　|　|\n |　|　|●|　|　|\n |　|　|◯|　|　|\n |　|　|　|　|　|\n";
              }
            }
        }
        return ret;
      }
    }, {
      key: "setBoardSize",
      value: function setBoardSize(w, h) {
        if (w <= h) {
          this.board.width = w * 0.70;
          this.board.height = w * 0.70;
        } else {
          this.board.width = h * 0.70;
          this.board.height = h * 0.70;
        }
      }
    }, {
      key: "checkHistoryFile",
      value: function checkHistoryFile() {
        var data;
        // console.log("GameGUI.checkHistoryFile")
        data = localStorage.getItem(Const.TEMP_HISTORY);
        if (data != null) {
          this.history = JSON.parse(data);
          this.seq = this.history.length - 1;
          this.checkDuplicationFile();
        } else {
          this.board.display(false, this.board.fonts);
        }
        $('[id=naviSeq]').text('');
        this.interrupt_flg = true;
        $("[id=btnStop]").val(i18next.t('msgRestart')).button("refresh");
        $("[id=btnStart]").prop("disabled", false);
        this.startbtn = false;
        $('[id=naviA]').show();
        $('[id=spanStatus]').html("");
        this.viewState();
      }
    }, {
      key: "checkDuplicationFile",
      value: function checkDuplicationFile() {
        var data;
        // console.log("GameGUI.checkDuplicationFile")
        data = localStorage.getItem(Const.TEMP_DUPLICATION);
        if (data != null) {
          this.duplication = JSON.parse(data);
          this.md5hash = this.duplication[this.duplication.length - 1];
        }
      }
    }, {
      key: "writeFile",
      value: function writeFile(fname, data) {
        // console.log("GameGUI.writeFile")
        localStorage.setItem(fname, JSON.stringify(data));
      }
    }, {
      key: "setEventListener",
      value: function setEventListener() {
        var _this5 = this;
        $(document).on('special', function (e) {
          var appLanguage;
          // console.log("special")
          appLanguage = (navigator.language || 'ja').toLowerCase().startsWith('ja') ? 'ja' : 'en';
          localStorage.setItem("appLanguage", appLanguage);
          BoardGUI.appLocalize();
          _this5.board.pieces = [];
          _this5.prepare();
          _this5.checkHistoryFile();
          _this5.checkDuplicationFile();
        });
        $(document).on('after_fonts', function (e) {
          _this5.board.fonts = parseInt(localStorage.getItem("radio-fontsTori") | 0, 10);
        });
        $(window).on('ai_thinking', function (e) {
          var chk_sennitite, i, l, len, msgStr, oppo, oppo_threshold, player, player_threshold, ref, ret, src_posi, temp, tumi;
          // console.log("ai_thinking")
          if (_this5.teban.turn === Const.FIRST) {
            player = _this5.first;
            oppo = _this5.second;
            player_threshold = Const.MAX_VALUE;
            oppo_threshold = Const.MIN_VALUE;
          } else {
            player = _this5.second;
            oppo = _this5.first;
            player_threshold = Const.MIN_VALUE;
            oppo_threshold = Const.MAX_VALUE;
          }
          temp = [];
          ret = [];
          ref = [0, 1, player.depth].unique();
          // 対人戦の場合は相手玉を取るまで指す
          for (l = 0, len = ref.length; l < len; l++) {
            i = ref[l];
            temp = [];
            if (i >= 2) {
              temp = player.prepare(_this5.board, oppo, i, player_threshold);
            } else {
              player.pre_ahead = 0;
              oppo.pre_ahead = 0;
              temp = player.think(_this5.board, oppo, i, player_threshold);
            }
            if (temp[0] != null) {
              ret = [].concat(temp);
              if (temp[2] >= Const.MAX_VALUE || temp[2] <= Const.MIN_VALUE) {
                break;
              }
            } else {
              break;
            }
          }
          if (ret[0]) {
            // 一手前のハッシュ値ですでに千日手判定されていればreturn
            chk_sennitite = _this5.sennitite(_this5.md5hash);
            if (chk_sennitite) {
              _this5.board.latest = ret[1];
              _this5.board.display(_this5.reverse, _this5.board.fonts);
              return;
            } else if (chk_sennitite === null && ret[4]["koma"] != null) {
              ret[0] = ret[4]["koma"];
              ret[1] = ret[4]["posi"];
              ret[2] = ret[4]["score"];
              ret[3] = ret[4]["status"];
            }
            if (_this5.board.check_move(ret[0], ret[1])) {
              src_posi = _this5.board.move_capture(ret[0], ret[1]);
              ret[0].status = ret[3];
            }
            _this5.md5hash = GameGUI.make_hash(_this5.board);
            _this5.seq += 1;
            _this5.addState(_this5.md5hash, ret[1], src_posi, ret[1], ret[0].koma());
            if (_this5.history[0]["latest"] != null) {
              _this5.writeFile(Const.TEMP_HISTORY, _this5.history);
              _this5.writeFile(Const.TEMP_DUPLICATION, _this5.duplication);
            }
            if (_this5.sennitite(_this5.md5hash)) {
              _this5.board.latest = ret[1];
              _this5.board.display(_this5.reverse, _this5.radio_fonts[2].checked);
              return;
            }
            _this5.teban = _this5.seq % 2 === 0 ? _this5.first : _this5.second;
          } else {
            if (_this5.teban.turn === Const.FIRST) {
              $('[id=spanStatus]').html(i18next.t('msgWinner', {
                postProcess: 'sprintf',
                sprintf: [i18next.t('msgWhite')]
              }));
            } else {
              $('[id=spanStatus]').html(i18next.t('msgWinner', {
                postProcess: 'sprintf',
                sprintf: [i18next.t('msgBlack')]
              }));
            }
            $("[id=btnStart]").prop("disabled", false);
            _this5.startbtn = false;
            $("[id=btnStop]").val(i18next.t('msgRestart')).button("refresh");
            $('[id=naviA]').show();
            return;
          }
          // 詰みチェック
          tumi = [];
          player.pre_ahead = 0;
          oppo.pre_ahead = 0;
          tumi = oppo.think(_this5.board, player, 0, oppo_threshold);
          if (!tumi[0]) {
            switch (tumi[2]) {
              case Const.MAX_VALUE:
                $('[id=spanStatus]').html(i18next.t('msgFirstWin'));
                $("[id=btnStart]").prop("disabled", false);
                _this5.startbtn = false;
                $("[id=btnStop]").val(i18next.t('msgRestart')).button("refresh");
                $('[id=naviA]').show();
                break;
              case Const.MIN_VALUE:
                $('[id=spanStatus]').html(i18next.t('msgSecondWin'));
                $("[id=btnStart]").prop("disabled", false);
                _this5.startbtn = false;
                $("[id=btnStop]").val(i18next.t('msgRestart')).button("refresh");
                $('[id=naviA]').show();
                break;
              default:
                console.log("Error!");
            }
            _this5.board.display(_this5.reverse, _this5.board.fonts);
            return;
          }
          // 相手玉が自爆しても指し手を進めてしまうのでゲーム終了チェック
          switch (_this5.board.gameover()) {
            case Const.FIRST:
              $('[id=spanStatus]').html(i18next.t('msgFirstWin'));
              $("[id=btnStart]").prop("disabled", false);
              _this5.startbtn = false;
              $("[id=btnStop]").val(i18next.t('msgRestart')).button("refresh");
              $('[id=naviA]').show();
              break;
            case Const.SECOND:
              $('[id=spanStatus]').html(i18next.t('msgSecondWin'));
              $("[id=btnStart]").prop("disabled", false);
              _this5.startbtn = false;
              $("[id=btnStop]").val(i18next.t('msgRestart')).button("refresh");
              $('[id=naviA]').show();
              break;
            default:
              if (_this5.teban.turn === Const.FIRST) {
                msgStr = i18next.t('msgTurn', {
                  postProcess: 'sprintf',
                  sprintf: [i18next.t('msgBlack')]
                });
                $('[id=spanStatus]').html(msgStr);
              } else {
                msgStr = i18next.t('msgTurn', {
                  postProcess: 'sprintf',
                  sprintf: [i18next.t('msgWhite')]
                });
                $('[id=spanStatus]').html(msgStr);
              }
              $('[id=spanStatus]').html(msgStr + i18next.t('msgEvaluate', {
                postProcess: 'sprintf',
                sprintf: [ret[2].toString()]
              }));
          }
          _this5.board.latest = ret[1];
          return _this5.board.display(_this5.reverse, _this5.board.fonts);
        });
        return $(window).on('load', function (e) {
          // console.log("=== Load ===")
          _this5.setBoardSize(window.innerWidth, window.innerHeight);
          return _this5.init();
        });
      }
    }], [{
      key: "make_hash",
      value:
      // 局面を比較するためHashを生成
      function make_hash(board) {
        var buf, koma, l, len, rec, ref;
        rec = [];
        ref = board.pieces;
        for (l = 0, len = ref.length; l < len; l++) {
          koma = ref[l];
          buf = {};
          buf["kind"] = koma.name;
          buf["turn"] = koma.turn;
          buf["status"] = koma.status;
          buf["posi0"] = koma.posi[0];
          buf["posi1"] = koma.posi[1];
          rec.push(buf);
        }
        rec.sort(_sortCoordinate);
        return hash(JSON.stringify(rec));
      }
    }]);
  }();
  ;

  // 同じ駒が複数使用されていることもあるので座標も含めてソート
  _sortCoordinate = function _sortCoordinate(a, b) {
    var kinds;
    kinds = ["Ou", "Hi", "Ka", "Ki", "Gi", "Ke", "Ky", "Fu"];
    return kinds.indexOf(a["kind"]) - kinds.indexOf(b["kind"]) || a["turn"] - b["turn"] || a["status"] - b["status"] || a["posi0"] - b["posi0"] || a["posi1"] - b["posi1"];
  };
  copyKifuToClipboard = function copyKifuToClipboard(kifuText) {
    navigator.clipboard.writeText(kifuText).then(function () {
      return alert(i18next.t('msgKifuCopied'));
    })["catch"](function (err) {
      console.error(err);
      return alert(i18next.t('msgKifuError'));
    });
  };
  is_oute = function is_oute(piece, d_posi) {
    var buf, oppo, oppo_king, v;
    oppo = piece.turn === Const.FIRST ? Const.SECOND : Const.FIRST;
    oppo_king = function () {
      var l, len, ref, results;
      ref = this.board.pieces;
      results = [];
      for (l = 0, len = ref.length; l < len; l++) {
        v = ref[l];
        if (v.turn === oppo && v.name === 'Ou') {
          results.push(v);
        }
      }
      return results;
    }.call(this)[0];
    buf = [].concat(d_posi);
    buf[0] += getClass(piece.name).getD(piece.turn, piece.status)[0].xd;
    buf[1] += getClass(piece.name).getD(piece.turn, piece.status)[0].yd;
    return oppo_king.posi.toString() === buf.toString();
  };
  checkKind = function checkKind(str) {
    return str === "OO" || str === "TK" || str === "TR" || str === "KZ" || str === "LU" || str === "RU" || str === "TB" || str === "KT" || str === "KR";
  };
  makePiece = function makePiece(str) {
    var posi = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var ret;
    ret = null;
    switch (str.slice(1, 3)) {
      case "OO":
        if (posi === null) {
          if (str[0] === "+") {
            ret = new Piece.Ou(Const.FIRST, Const.Status.MOTIGOMA);
          } else {
            ret = new Piece.Ou(Const.SECOND, Const.Status.MOTIGOMA);
          }
        } else {
          if (str[0] === "+") {
            ret = new Piece.Ou(Const.FIRST, Const.Status.OMOTE, posi);
          } else {
            ret = new Piece.Ou(Const.SECOND, Const.Status.OMOTE, posi);
          }
        }
        break;
      case "TK":
        if (posi === null) {
          if (str[0] === "+") {
            ret = new Piece.Ky(Const.FIRST, Const.Status.MOTIGOMA);
          } else {
            ret = new Piece.Ky(Const.SECOND, Const.Status.MOTIGOMA);
          }
        } else {
          if (str[0] === "+") {
            ret = new Piece.Ky(Const.FIRST, Const.Status.OMOTE, posi);
          } else {
            ret = new Piece.Ky(Const.SECOND, Const.Status.OMOTE, posi);
          }
        }
        break;
      case "TR":
        if (posi === null) {
          if (str[0] === "+") {
            ret = new Piece.Ka(Const.FIRST, Const.Status.MOTIGOMA);
          } else {
            ret = new Piece.Ka(Const.SECOND, Const.Status.MOTIGOMA);
          }
        } else {
          if (str[0] === "+") {
            ret = new Piece.Ka(Const.FIRST, Const.Status.OMOTE, posi);
          } else {
            ret = new Piece.Ka(Const.SECOND, Const.Status.OMOTE, posi);
          }
        }
        break;
      case "KZ":
        if (posi === null) {
          if (str[0] === "+") {
            ret = new Piece.Ki(Const.FIRST, Const.Status.MOTIGOMA);
          } else {
            ret = new Piece.Ki(Const.SECOND, Const.Status.MOTIGOMA);
          }
        } else {
          if (str[0] === "+") {
            ret = new Piece.Ki(Const.FIRST, Const.Status.OMOTE, posi);
          } else {
            ret = new Piece.Ki(Const.SECOND, Const.Status.OMOTE, posi);
          }
        }
        break;
      case "LU":
        if (posi === null) {
          if (str[0] === "+") {
            ret = new Piece.Gi(Const.FIRST, Const.Status.MOTIGOMA);
          } else {
            ret = new Piece.Gi(Const.SECOND, Const.Status.MOTIGOMA);
          }
        } else {
          if (str[0] === "+") {
            ret = new Piece.Gi(Const.FIRST, Const.Status.OMOTE, posi);
          } else {
            ret = new Piece.Gi(Const.SECOND, Const.Status.OMOTE, posi);
          }
        }
        break;
      case "RU":
        if (posi === null) {
          if (str[0] === "+") {
            ret = new Piece.Ke(Const.FIRST, Const.Status.MOTIGOMA);
          } else {
            ret = new Piece.Ke(Const.SECOND, Const.Status.MOTIGOMA);
          }
        } else {
          if (str[0] === "+") {
            ret = new Piece.Ke(Const.FIRST, Const.Status.OMOTE, posi);
          } else {
            ret = new Piece.Ke(Const.SECOND, Const.Status.OMOTE, posi);
          }
        }
        break;
      case "TB":
        if (posi === null) {
          if (str[0] === "+") {
            ret = new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA);
          } else {
            ret = new Piece.Fu(Const.SECOND, Const.Status.MOTIGOMA);
          }
        } else {
          if (str[0] === "+") {
            ret = new Piece.Fu(Const.FIRST, Const.Status.OMOTE, posi);
          } else {
            ret = new Piece.Fu(Const.SECOND, Const.Status.OMOTE, posi);
          }
        }
        break;
      case "KT":
        if (posi === null) {
          if (str[0] === "+") {
            ret = new Piece.Ky(Const.FIRST, Const.Status.MOTIGOMA);
          } else {
            ret = new Piece.Ky(Const.SECOND, Const.Status.MOTIGOMA);
          }
        } else {
          if (str[0] === "+") {
            ret = new Piece.Ky(Const.FIRST, Const.Status.URA, posi);
          } else {
            ret = new Piece.Ky(Const.SECOND, Const.Status.URA, posi);
          }
        }
        break;
      case "KR":
        if (posi === null) {
          if (str[0] === "+") {
            ret = new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA);
          } else {
            ret = new Piece.Fu(Const.SECOND, Const.Status.MOTIGOMA);
          }
        } else {
          if (str[0] === "+") {
            ret = new Piece.Fu(Const.FIRST, Const.Status.URA, posi);
          } else {
            ret = new Piece.Fu(Const.SECOND, Const.Status.URA, posi);
          }
        }
    }
    return ret;
  };
  return GameGUI;
}.call(this);

/***/ },

/***/ "./piece.coffee"
/*!**********************!*\
  !*** ./piece.coffee ***!
  \**********************/
(module, __unused_webpack_exports, __webpack_require__) {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
var Const, Course, Fu, Gi, Ka, Ke, Ki, Ky, Ou, Piece;
Const = __webpack_require__(/*! ./const */ "./const.coffee");
this.getClass = function (classname) {
  switch (classname) {
    case 'Ou':
      return gOu;
    // when 'Hi' then gHi
    case 'Ka':
      return gKa;
    case 'Ki':
      return gKi;
    case 'Gi':
      return gGi;
    case 'Ke':
      return gKe;
    case 'Ky':
      return gKy;
    case 'Fu':
      return gFu;
    default:
      return gPiece;
  }
};
Course = /*#__PURE__*/_createClass(function Course() {
  var series = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var xd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var yd = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  _classCallCheck(this, Course);
  this.series = series;
  this.xd = xd;
  this.yd = yd;
});
Piece = function () {
  var uniqueId;
  var Piece = /*#__PURE__*/function () {
    function Piece(turn1, status1) {
      var posi1 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      _classCallCheck(this, Piece);
      this.turn = turn1;
      this.status = status1;
      this.posi = posi1;
      this.posi = this.posi != null ? this.posi.concat() : [];
      this.id = uniqueId.call(this);
      this.coefficient = 0.0;
      this.gravity = 1.0;
    }
    return _createClass(Piece, [{
      key: "setTurn",
      value: function setTurn(turn) {
        if (turn !== this.turn) {
          return this.turn = turn;
        }
      }
    }]);
  }();
  ;
  uniqueId = function uniqueId() {
    var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;
    var id;
    id = "";
    while (id.length < length) {
      id += Math.random().toString(36).substr(2);
    }
    return id.substr(0, length);
  };
  return Piece;
}.call(this);
Ou = function () {
  var _direction;
  var Ou = /*#__PURE__*/function (_Piece) {
    function Ou(turn, status, posi) {
      var _this;
      _classCallCheck(this, Ou);
      _this = _callSuper(this, Ou, [turn, status, posi]);
      _this.name = 'Ou';
      return _this;
    }

    // kind: ->
    //     @constructor.name
    _inherits(Ou, _Piece);
    return _createClass(Ou, [{
      key: "koma",
      value: function koma() {
        return "OO";
      }
    }, {
      key: "omomi",
      value: function omomi() {
        var ret;
        ret = function () {
          switch (this.status) {
            case Const.Status.OMOTE:
              return Ou.weight[Const.Status.OMOTE];
            case Const.Status.URA:
              return Ou.weight[Const.Status.URA];
            case Const.Status.MOTIGOMA:
              return Ou.weight[Const.Status.MOTIGOMA];
            default:
              return 0;
          }
        }.call(this);
        return ret;
      }
    }, {
      key: "caption",
      value: function caption() {
        switch (this.status) {
          case Const.Status.OMOTE:
            if (this.turn === Const.FIRST) {
              return 'O';
            } else {
              return 'o';
            }
            // removed by dead control flow

          case Const.Status.URA:
            if (this.turn === Const.FIRST) {
              return 'O';
            } else {
              return 'o';
            }
            // removed by dead control flow

          case Const.Status.MOTIGOMA:
            if (this.turn === Const.FIRST) {
              return 'O';
            } else {
              return 'o';
            }
        }
      }
    }], [{
      key: "getD",
      value: function getD(turn, status) {
        return _direction[status][turn];
      }
    }]);
  }(Piece);
  ;

  // Ootori
  _direction = {};
  _direction[Const.Status.OMOTE] = {};
  _direction[Const.Status.URA] = {};
  _direction[Const.Status.MOTIGOMA] = {};
  _direction[Const.Status.OMOTE][Const.FIRST] = [new Course(0, 0, -1), new Course(0, -1, -1), new Course(0, -1, 0), new Course(0, -1, 1), new Course(0, 0, 1), new Course(0, 1, 1), new Course(0, 1, 0), new Course(0, 1, -1)];
  _direction[Const.Status.OMOTE][Const.SECOND] = [new Course(0, 0, 1), new Course(0, 1, 1), new Course(0, 1, 0), new Course(0, 1, -1), new Course(0, 0, -1), new Course(0, -1, -1), new Course(0, -1, 0), new Course(0, -1, 1)];
  _direction[Const.Status.URA][Const.FIRST] = [];
  _direction[Const.Status.URA][Const.SECOND] = [];
  _direction[Const.Status.MOTIGOMA][Const.FIRST] = [];
  _direction[Const.Status.MOTIGOMA][Const.SECOND] = [];
  Ou.potential = [8, 8, 8];
  Ou.weight = [9999, 9999, 9999];
  return Ou;
}.call(this);
Ka = function () {
  var _direction;
  var Ka = /*#__PURE__*/function (_Piece2) {
    function Ka(turn, status, posi) {
      var _this2;
      _classCallCheck(this, Ka);
      _this2 = _callSuper(this, Ka, [turn, status, posi]);
      _this2.name = 'Ka';
      return _this2;
    }

    // kind: ->
    //     @constructor.name
    _inherits(Ka, _Piece2);
    return _createClass(Ka, [{
      key: "koma",
      value: function koma() {
        return "TR";
      }
    }, {
      key: "omomi",
      value: function omomi() {
        var ret;
        ret = function () {
          switch (this.status) {
            case Const.Status.OMOTE:
              return Ka.weight[Const.Status.OMOTE] * (this.gravity + this.coefficient / Ka.potential[this.status]);
            case Const.Status.URA:
              return Ka.weight[Const.Status.URA] * (this.gravity + this.coefficient / Ka.potential[this.status]);
            case Const.Status.MOTIGOMA:
              return Ka.weight[Const.Status.MOTIGOMA];
            default:
              return 0;
          }
        }.call(this);
        return parseInt(ret, 10);
      }
    }, {
      key: "caption",
      value: function caption() {
        switch (this.status) {
          case Const.Status.OMOTE:
            if (this.turn === Const.FIRST) {
              return 'M';
            } else {
              return 'm';
            }
            // removed by dead control flow

          case Const.Status.URA:
            if (this.turn === Const.FIRST) {
              return 'U';
            } else {
              return 'u';
            }
            // removed by dead control flow

          case Const.Status.MOTIGOMA:
            if (this.turn === Const.FIRST) {
              return 'M';
            } else {
              return 'm';
            }
        }
      }
    }], [{
      key: "getD",
      value: function getD(turn, status) {
        return _direction[status][turn];
      }
    }]);
  }(Piece);
  ;

  // Tsuru
  // ki
  _direction = {};
  _direction[Const.Status.OMOTE] = {};
  _direction[Const.Status.URA] = {};
  _direction[Const.Status.MOTIGOMA] = {};
  _direction[Const.Status.OMOTE][Const.FIRST] = [new Course(0, -1, -1), new Course(0, -1, 1), new Course(0, 1, 1), new Course(0, 1, -1), new Course(0, 0, -1), new Course(0, 0, 1)];
  _direction[Const.Status.OMOTE][Const.SECOND] = [new Course(0, 1, 1), new Course(0, 1, -1), new Course(0, -1, -1), new Course(0, -1, 1), new Course(0, 0, -1), new Course(0, 0, 1)];
  _direction[Const.Status.URA][Const.FIRST] = [];
  _direction[Const.Status.URA][Const.SECOND] = [];
  _direction[Const.Status.MOTIGOMA][Const.FIRST] = [new Course(0, -1, -1), new Course(0, -1, 1), new Course(0, 1, 1), new Course(0, 1, -1), new Course(0, 0, -1), new Course(0, 0, 1)];
  _direction[Const.Status.MOTIGOMA][Const.SECOND] = [new Course(0, 1, 1), new Course(0, 1, -1), new Course(0, -1, -1), new Course(0, -1, 1), new Course(0, 0, -1), new Course(0, 0, 1)];
  Ka.potential = [6, 6, 6];
  Ka.weight = [55, 55, 44];
  return Ka;
}.call(this);
Ki = function () {
  var _direction;
  var Ki = /*#__PURE__*/function (_Piece3) {
    function Ki(turn, status, posi) {
      var _this3;
      _classCallCheck(this, Ki);
      _this3 = _callSuper(this, Ki, [turn, status, posi]);
      _this3.name = 'Ki';
      return _this3;
    }

    // kind: ->
    //     @constructor.name
    _inherits(Ki, _Piece3);
    return _createClass(Ki, [{
      key: "koma",
      value: function koma() {
        return "KZ";
      }
    }, {
      key: "omomi",
      value: function omomi() {
        var ret;
        ret = function () {
          switch (this.status) {
            case Const.Status.OMOTE:
              return Ki.weight[Const.Status.OMOTE] * (this.gravity + this.coefficient / Ki.potential[this.status]);
            case Const.Status.URA:
              return Ki.weight[Const.Status.URA] * (this.gravity + this.coefficient / Ki.potential[this.status]);
            case Const.Status.MOTIGOMA:
              return Ki.weight[Const.Status.MOTIGOMA];
            default:
              return 0;
          }
        }.call(this);
        return parseInt(ret, 10);
      }
    }, {
      key: "caption",
      value: function caption() {
        switch (this.status) {
          case Const.Status.OMOTE:
            if (this.turn === Const.FIRST) {
              return 'X';
            } else {
              return 'x';
            }
            // removed by dead control flow

          case Const.Status.URA:
            if (this.turn === Const.FIRST) {
              return 'X';
            } else {
              return 'x';
            }
            // removed by dead control flow

          case Const.Status.MOTIGOMA:
            if (this.turn === Const.FIRST) {
              return 'X';
            } else {
              return 'x';
            }
        }
      }
    }], [{
      key: "getD",
      value: function getD(turn, status) {
        return _direction[status][turn];
      }
    }]);
  }(Piece);
  ;

  // Kizi
  // ke
  _direction = {};
  _direction[Const.Status.OMOTE] = {};
  _direction[Const.Status.URA] = {};
  _direction[Const.Status.MOTIGOMA] = {};
  _direction[Const.Status.OMOTE][Const.FIRST] = [new Course(0, 0, -2), new Course(0, -1, 1), new Course(0, 1, 1)];
  _direction[Const.Status.OMOTE][Const.SECOND] = [new Course(0, 0, 2), new Course(0, -1, -1), new Course(0, 1, -1)];
  _direction[Const.Status.URA][Const.FIRST] = [];
  _direction[Const.Status.URA][Const.SECOND] = [];
  _direction[Const.Status.MOTIGOMA][Const.FIRST] = [new Course(0, 0, -2), new Course(0, -1, 1), new Course(0, 1, 1)];
  _direction[Const.Status.MOTIGOMA][Const.SECOND] = [new Course(0, 0, 2), new Course(0, -1, -1), new Course(0, 1, -1)];
  Ki.potential = [3, 3, 3];
  Ki.weight = [30, 30, 24];
  return Ki;
}.call(this);
Gi = function () {
  var _direction;
  var Gi = /*#__PURE__*/function (_Piece4) {
    function Gi(turn, status, posi) {
      var _this4;
      _classCallCheck(this, Gi);
      _this4 = _callSuper(this, Gi, [turn, status, posi]);
      _this4.name = 'Gi';
      return _this4;
    }

    // kind: ->
    //     @constructor.name
    _inherits(Gi, _Piece4);
    return _createClass(Gi, [{
      key: "koma",
      value: function koma() {
        return "LU";
      }
    }, {
      key: "omomi",
      value: function omomi() {
        var ret;
        ret = function () {
          switch (this.status) {
            case Const.Status.OMOTE:
              return Gi.weight[Const.Status.OMOTE] * (this.gravity + this.coefficient / Gi.potential[this.status]);
            case Const.Status.URA:
              return Gi.weight[Const.Status.URA] * (this.gravity + this.coefficient / Gi.potential[this.status]);
            case Const.Status.MOTIGOMA:
              return Gi.weight[Const.Status.MOTIGOMA];
            default:
              return 0;
          }
        }.call(this);
        return parseInt(ret, 10);
      }
    }, {
      key: "caption",
      value: function caption() {
        switch (this.status) {
          case Const.Status.OMOTE:
            if (this.turn === Const.FIRST) {
              return 'G';
            } else {
              return 'g';
            }
            // removed by dead control flow

          case Const.Status.URA:
            if (this.turn === Const.FIRST) {
              return 'N';
            } else {
              return 'n';
            }
            // removed by dead control flow

          case Const.Status.MOTIGOMA:
            if (this.turn === Const.FIRST) {
              return 'G';
            } else {
              return 'g';
            }
        }
      }
    }], [{
      key: "getD",
      value: function getD(turn, status) {
        return _direction[status][turn];
      }
    }]);
  }(Piece);
  ;

  // Hidari Uzura
  // gi
  _direction = {};
  _direction[Const.Status.OMOTE] = {};
  _direction[Const.Status.URA] = {};
  _direction[Const.Status.MOTIGOMA] = {};
  _direction[Const.Status.OMOTE][Const.FIRST] = [new Course(9, 0, -1), new Course(9, -1, 1), new Course(0, 1, 1)];
  _direction[Const.Status.OMOTE][Const.SECOND] = [new Course(9, 0, 1), new Course(9, 1, -1), new Course(0, -1, -1)];
  _direction[Const.Status.URA][Const.FIRST] = [];
  _direction[Const.Status.URA][Const.SECOND] = [];
  _direction[Const.Status.MOTIGOMA][Const.FIRST] = [new Course(9, 0, -1), new Course(9, -1, 1), new Course(0, 1, 1)];
  _direction[Const.Status.MOTIGOMA][Const.SECOND] = [new Course(9, 0, 1), new Course(9, 1, -1), new Course(0, -1, -1)];
  Gi.potential = [7, 7, 7];
  Gi.weight = [45, 45, 36];
  return Gi;
}.call(this);
Ke = function () {
  var _direction;
  var Ke = /*#__PURE__*/function (_Piece5) {
    function Ke(turn, status, posi) {
      var _this5;
      _classCallCheck(this, Ke);
      _this5 = _callSuper(this, Ke, [turn, status, posi]);
      _this5.name = 'Ke';
      return _this5;
    }

    // kind: ->
    //     @constructor.name
    _inherits(Ke, _Piece5);
    return _createClass(Ke, [{
      key: "koma",
      value: function koma() {
        return "RU";
      }
    }, {
      key: "omomi",
      value: function omomi() {
        var ret;
        ret = function () {
          switch (this.status) {
            case Const.Status.OMOTE:
              return Ke.weight[Const.Status.OMOTE] * (this.gravity + this.coefficient / Ke.potential[this.status]);
            case Const.Status.URA:
              return Ke.weight[Const.Status.URA] * (this.gravity + this.coefficient / Ke.potential[this.status]);
            case Const.Status.MOTIGOMA:
              return Ke.weight[Const.Status.MOTIGOMA];
            default:
              return 0;
          }
        }.call(this);
        return parseInt(ret, 10);
      }
    }, {
      key: "caption",
      value: function caption() {
        switch (this.status) {
          case Const.Status.OMOTE:
            if (this.turn === Const.FIRST) {
              return 'K';
            } else {
              return 'k';
            }
            // removed by dead control flow

          case Const.Status.URA:
            if (this.turn === Const.FIRST) {
              return 'E';
            } else {
              return 'e';
            }
            // removed by dead control flow

          case Const.Status.MOTIGOMA:
            if (this.turn === Const.FIRST) {
              return 'K';
            } else {
              return 'k';
            }
        }
      }
    }], [{
      key: "getD",
      value: function getD(turn, status) {
        return _direction[status][turn];
      }
    }]);
  }(Piece);
  ;

  // Migi Uzura
  // gi
  _direction = {};
  _direction[Const.Status.OMOTE] = {};
  _direction[Const.Status.URA] = {};
  _direction[Const.Status.MOTIGOMA] = {};
  _direction[Const.Status.OMOTE][Const.FIRST] = [new Course(9, 0, -1), new Course(9, 1, 1), new Course(0, -1, 1)];
  _direction[Const.Status.OMOTE][Const.SECOND] = [new Course(9, 0, 1), new Course(9, -1, -1), new Course(0, 1, -1)];
  _direction[Const.Status.URA][Const.FIRST] = [];
  _direction[Const.Status.URA][Const.SECOND] = [];
  _direction[Const.Status.MOTIGOMA][Const.FIRST] = [new Course(9, 0, -1), new Course(9, 1, 1), new Course(0, -1, 1)];
  _direction[Const.Status.MOTIGOMA][Const.SECOND] = [new Course(9, 0, 1), new Course(9, -1, -1), new Course(0, 1, -1)];
  Ke.potential = [7, 7, 7];
  Ke.weight = [45, 45, 36];
  return Ke;
}.call(this);
Ky = function () {
  var _direction;
  var Ky = /*#__PURE__*/function (_Piece6) {
    function Ky(turn, status, posi) {
      var _this6;
      _classCallCheck(this, Ky);
      _this6 = _callSuper(this, Ky, [turn, status, posi]);
      _this6.name = 'Ky';
      return _this6;
    }

    // kind: ->
    //     @constructor.name
    _inherits(Ky, _Piece6);
    return _createClass(Ky, [{
      key: "koma",
      value: function koma() {
        if (this.status === Const.Status.URA) {
          return "KT";
        } else {
          return "TK";
        }
      }
    }, {
      key: "omomi",
      value: function omomi() {
        var ret;
        ret = function () {
          switch (this.status) {
            case Const.Status.OMOTE:
              return Ky.weight[Const.Status.OMOTE] * (this.gravity + this.coefficient / Ky.potential[this.status]);
            case Const.Status.URA:
              return Ky.weight[Const.Status.URA] * (this.gravity + this.coefficient / Ky.potential[this.status]);
            case Const.Status.MOTIGOMA:
              return Ky.weight[Const.Status.MOTIGOMA];
            default:
              return 0;
          }
        }.call(this);
        return parseInt(ret, 10);
      }
    }, {
      key: "caption",
      value: function caption() {
        switch (this.status) {
          case Const.Status.OMOTE:
            if (this.turn === Const.FIRST) {
              return 'Y';
            } else {
              return 'y';
            }
            // removed by dead control flow

          case Const.Status.URA:
            if (this.turn === Const.FIRST) {
              return 'S';
            } else {
              return 's';
            }
            // removed by dead control flow

          case Const.Status.MOTIGOMA:
            if (this.turn === Const.FIRST) {
              return 'Y';
            } else {
              return 'y';
            }
        }
      }
    }], [{
      key: "getD",
      value: function getD(turn, status) {
        return _direction[status][turn];
      }
    }]);
  }(Piece);
  ;

  // Taka
  // ka ry
  _direction = {};
  _direction[Const.Status.OMOTE] = {};
  _direction[Const.Status.URA] = {};
  _direction[Const.Status.MOTIGOMA] = {};
  _direction[Const.Status.OMOTE][Const.FIRST] = [new Course(0, 0, -1), new Course(0, -1, -1), new Course(0, -1, 0), new Course(0, -1, 1), new Course(0, 1, 1), new Course(0, 1, 0), new Course(0, 1, -1)];
  _direction[Const.Status.OMOTE][Const.SECOND] = [new Course(0, -1, -1), new Course(0, -1, 0), new Course(0, -1, 1), new Course(0, 0, 1), new Course(0, 1, 1), new Course(0, 1, 0), new Course(0, 1, -1)];
  _direction[Const.Status.URA][Const.FIRST] = [new Course(9, -1, -1), new Course(9, 1, -1), new Course(9, 0, 1), new Course(0, 0, -1), new Course(0, 1, 0), new Course(0, -1, 0), new Course(2, 1, 1), new Course(2, -1, 1)];
  _direction[Const.Status.URA][Const.SECOND] = [new Course(9, 1, 1), new Course(9, -1, 1), new Course(9, 0, -1), new Course(0, 0, 1), new Course(0, 1, 0), new Course(0, -1, 0), new Course(2, -1, -1), new Course(2, 1, -1)];
  _direction[Const.Status.MOTIGOMA][Const.FIRST] = [new Course(0, 0, -1), new Course(0, -1, -1), new Course(0, -1, 0), new Course(0, -1, 1), new Course(0, 1, 1), new Course(0, 1, 0), new Course(0, 1, -1)];
  _direction[Const.Status.MOTIGOMA][Const.SECOND] = [new Course(0, 0, -1), new Course(0, -1, -1), new Course(0, -1, 1), new Course(0, 0, 1), new Course(0, 1, 1), new Course(0, 1, 0), new Course(0, 1, -1)];
  Ky.potential = [7, 16, 7];
  Ky.weight = [80, 150, 64];
  return Ky;
}.call(this);
Fu = function () {
  var _direction;
  var Fu = /*#__PURE__*/function (_Piece7) {
    function Fu(turn, status, posi) {
      var _this7;
      _classCallCheck(this, Fu);
      _this7 = _callSuper(this, Fu, [turn, status, posi]);
      _this7.name = 'Fu';
      return _this7;
    }

    // kind: ->
    //     @constructor.name
    _inherits(Fu, _Piece7);
    return _createClass(Fu, [{
      key: "koma",
      value: function koma() {
        if (this.status === Const.Status.URA) {
          return "KR";
        } else {
          return "TB";
        }
      }
    }, {
      key: "omomi",
      value: function omomi() {
        var ret;
        ret = function () {
          switch (this.status) {
            case Const.Status.OMOTE:
              return Fu.weight[Const.Status.OMOTE] * (this.gravity + this.coefficient / Fu.potential[this.status]);
            case Const.Status.URA:
              return Fu.weight[Const.Status.URA] * (this.gravity + this.coefficient / Fu.potential[this.status]);
            case Const.Status.MOTIGOMA:
              return Fu.weight[Const.Status.MOTIGOMA];
            default:
              return 0;
          }
        }.call(this);
        return parseInt(ret, 10);
      }
    }, {
      key: "caption",
      value: function caption() {
        switch (this.status) {
          case Const.Status.OMOTE:
            if (this.turn === Const.FIRST) {
              return 'F';
            } else {
              return 'f';
            }
            // removed by dead control flow

          case Const.Status.URA:
            if (this.turn === Const.FIRST) {
              return 'T';
            } else {
              return 't';
            }
            // removed by dead control flow

          case Const.Status.MOTIGOMA:
            if (this.turn === Const.FIRST) {
              return 'F';
            } else {
              return 'f';
            }
        }
      }
    }], [{
      key: "getD",
      value: function getD(turn, status) {
        return _direction[status][turn];
      }
    }]);
  }(Piece);
  ;

  // Tsubame
  _direction = {};
  _direction[Const.Status.OMOTE] = {};
  _direction[Const.Status.URA] = {};
  _direction[Const.Status.MOTIGOMA] = {};
  _direction[Const.Status.OMOTE][Const.FIRST] = [new Course(0, 0, -1)];
  _direction[Const.Status.OMOTE][Const.SECOND] = [new Course(0, 0, 1)];
  _direction[Const.Status.URA][Const.FIRST] = [new Course(0, -2, -2), new Course(0, 2, -2), new Course(0, 0, 2)];
  _direction[Const.Status.URA][Const.SECOND] = [new Course(0, 2, 2), new Course(0, -2, 2), new Course(0, 0, -2)];
  _direction[Const.Status.MOTIGOMA][Const.FIRST] = [new Course(0, 0, -1)];
  _direction[Const.Status.MOTIGOMA][Const.SECOND] = [new Course(0, 0, 1)];
  Fu.potential = [1, 3, 1];
  Fu.weight = [10, 20, 10];
  return Fu;
}.call(this);
module.exports = {
  Course: Course,
  Piece: Piece,
  Ou: Ou,
  Ka: Ka,
  Ki: Ki,
  Gi: Gi,
  Ke: Ke,
  Ky: Ky,
  Fu: Fu
};
__webpack_require__.g.gPiece = Piece;
__webpack_require__.g.gOu = Ou;
__webpack_require__.g.gKa = Ka;
__webpack_require__.g.gKi = Ki;
__webpack_require__.g.gGi = Gi;
__webpack_require__.g.gKe = Ke;
__webpack_require__.g.gKy = Ky;
__webpack_require__.g.gFu = Fu;
__webpack_require__.g.getClass = this.getClass;

/***/ },

/***/ "./player.coffee"
/*!***********************!*\
  !*** ./player.coffee ***!
  \***********************/
(module, __unused_webpack_exports, __webpack_require__) {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Const,
  Piece,
  Player,
  indexOf = [].indexOf;
Const = __webpack_require__(/*! ./const */ "./const.coffee");
Piece = __webpack_require__(/*! ./piece */ "./piece.coffee");
Player = function () {
  var is_utifuOute, sortPreparation;
  var Player = /*#__PURE__*/function () {
    // @depthプロパティはthink,prepareメソッドに渡す引数limitより大きな数値である必要がある
    // 読みの深さとしての属性（@depth）は許容量、実際の読みの深さとして渡すlimit引数の関係
    function Player(turn, human) {
      var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
      _classCallCheck(this, Player);
      this.turn = turn;
      this.human = human;
      this.depth = depth;
      this.pre_ahead = 0;
      this.pre_select = 20;
      this.preparation = [];
    }
    return _createClass(Player, [{
      key: "prepare",
      value: function prepare(board, oppo, limit, preValue) {
        var pre_ahead = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 2;
        var buf, i, len, ref, ret, selection, v, w, x;
        this.preparation = [];
        this.pre_ahead = pre_ahead;
        ret = this.think(board, oppo, this.pre_ahead, preValue);
        if (this.turn === Const.FIRST) {
          sortPreparation.call(this, this.preparation, 'desc');
        } else {
          sortPreparation.call(this, this.preparation, 'asc');
        }
        // console.log("@preparation")
        // console.log(@preparation)
        // console.log("--- @turn = #{@turn}:  @preparation.length = #{@preparation.length}")
        selection = {};
        selection["pieces"] = [];
        selection["positions"] = [];
        ref = this.preparation;
        for (i = 0, len = ref.length; i < len; i++) {
          v = ref[i];
          buf = function () {
            var j, len1, ref1, results;
            ref1 = board.pieces;
            results = [];
            for (j = 0, len1 = ref1.length; j < len1; j++) {
              w = ref1[j];
              if (w.id === v.id) {
                results.push(w);
              }
            }
            return results;
          }();
          // 同じ駒を打つ時は６カ所に制限
          // continue if (x for x in selection.positions when x.id == v.id && v.s_posi.length == 0).length > 5
          if (buf.length > 0) {
            if (function () {
              var j, len1, ref1, results;
              ref1 = selection.pieces;
              results = [];
              for (j = 0, len1 = ref1.length; j < len1; j++) {
                x = ref1[j];
                if (x.id === v.id) {
                  results.push(x);
                }
              }
              return results;
            }().length === 0) {
              selection.pieces.push(buf[0]);
              selection.positions.push({
                id: v.id,
                posi: v.posi
              });
            }
            if (function () {
              var j, len1, ref1, results;
              ref1 = selection.positions;
              results = [];
              for (j = 0, len1 = ref1.length; j < len1; j++) {
                x = ref1[j];
                if (x.id === v.id && x.posi === v.posi) {
                  results.push(x);
                }
              }
              return results;
            }().length === 0) {
              selection.positions.push({
                id: v.id,
                posi: v.posi
              });
            }
          }
          if (selection.positions.length > this.pre_select) {
            break;
          }
        }
        // console.log("selection")
        // console.log(selection)
        this.pre_ahead = -1;
        ret = this.think(board, oppo, limit, preValue, selection);
        // console.log("ret = #{JSON.stringify(ret)}")
        return ret;
      }
    }, {
      key: "think",
      value: function think(board, oppo, limit, preValue) {
        var priority = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
        var check_flg = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
        var buf, checkmate_ret, checkmate_threshold, choice, col, dest, dest_piece, i, j, k, kinds, koma, l, lastkoma, lastposi, lastscore, laststatus, len, len1, move_piece, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, result, ret, row, score, selections, shortCut, spare, src, utifudume_flg, utifudume_ret, utifudume_threshold, v, w;
        spare = {};
        lastscore = this.turn === Const.FIRST ? Const.MIN_VALUE : Const.MAX_VALUE;
        lastposi = null;
        lastkoma = null;
        laststatus = null;
        score = 0;
        kinds = [];
        move_piece = null;
        utifudume_flg = null;
        src = board.cloneBoard();
        if (Object.keys(priority).length !== 0) {
          selections = priority.pieces;
        } else {
          selections = board.pieces;
        }
        for (i = 0, len = selections.length; i < len; i++) {
          koma = selections[i];
          if (!(koma.turn === this.turn)) {
            continue;
          }
          // 同じ駒でも指す場所が複数になるので、この段階では複数の候補となる
          if (Object.keys(priority).length !== 0) {
            choice = priority.positions;
          }
          if (koma.status === Const.Status.MOTIGOMA) {
            if (ref = koma.name, indexOf.call(kinds, ref) >= 0) {
              continue;
            }
            kinds.push(koma.name);
            for (col = j = 1, ref1 = board.cols; 1 <= ref1 ? j <= ref1 : j >= ref1; col = 1 <= ref1 ? ++j : --j) {
              for (row = k = 1, ref2 = board.rows; 1 <= ref2 ? k <= ref2 : k >= ref2; row = 1 <= ref2 ? ++k : --k) {
                if (Object.keys(priority).length !== 0) {
                  if (function () {
                    var l, len1, results;
                    results = [];
                    for (l = 0, len1 = choice.length; l < len1; l++) {
                      w = choice[l];
                      if (koma.id === w.id && row === w.posi[0] && col === w.posi[1]) {
                        results.push(w);
                      }
                    }
                    return results;
                  }()[0] == null) {
                    continue;
                  }
                }
                dest = src[row - 1][col - 1];
                if (dest != null) {
                  continue;
                }
                if (koma.name === 'Fu' && is_utifuOute.call(this, board, koma, [row, col])) {
                  if (board.check_utifudume(koma, [row, col])) {
                    utifudume_flg = null;
                    continue;
                  } else {
                    utifudume_flg = true;
                  }
                } else {
                  utifudume_flg = null;
                }
                move_piece = new Piece.Piece(koma.turn, koma.status, koma.posi);
                if (board.check_move(koma, [row, col], src[row - 1][col - 1])) {
                  board.move_capture(koma, [row, col], src[row - 1][col - 1]);
                  result = [];
                  result = board.check_tumi(this.turn, utifudume_flg);
                  if (limit > 0 && !result[0]) {
                    // if @pre_ahead == -1 && limit > 3
                    //     ret = oppo.prepare(board, @, limit - 1, if oppo.turn == Const.FIRST then Const.MAX_VALUE else Const.MIN_VALUE)
                    // else
                    ret = oppo.think(board, this, limit - 1, lastscore, {});
                    score = ret[2];
                  } else {
                    if (check_flg === null && result[1] === Const.CHECKMATE) {
                      checkmate_threshold = oppo.turn === Const.FIRST ? Const.MAX_VALUE : Const.MIN_VALUE;
                      checkmate_ret = [];
                      checkmate_ret = oppo.think(board, this, limit - 1, checkmate_threshold, {}, true);
                      score = checkmate_ret[2];
                    } else if (check_flg === null && result[1] === Const.UTIFUDUME) {
                      utifudume_threshold = oppo.turn === Const.FIRST ? Const.MAX_VALUE : Const.MIN_VALUE;
                      utifudume_ret = [];
                      utifudume_ret = oppo.think(board, this, limit - 1, utifudume_threshold, {}, false);
                      if (utifudume_ret[2] >= Const.MAX_VALUE || utifudume_ret[2] <= Const.MIN_VALUE) {
                        score = utifudume_ret[2] * -1;
                      } else {
                        score = utifudume_ret[2];
                      }
                    } else {
                      score = result[1];
                    }
                  }
                  if (limit === this.pre_ahead) {
                    this.preparation.push({
                      "id": koma.id,
                      "kind": koma.name,
                      "s_posi": move_piece.posi,
                      "posi": [row, col],
                      "status": koma.status,
                      "score": score,
                      "weight": koma.omomi()
                    });
                  }
                  shortCut = false;
                  if (score > lastscore && this.turn === Const.FIRST || score < lastscore && this.turn === Const.SECOND) {
                    spare["koma"] = lastkoma;
                    spare["posi"] = [].concat(lastposi);
                    spare["score"] = lastscore;
                    spare["status"] = laststatus;
                    lastkoma = koma;
                    lastscore = score;
                    lastposi = [].concat([row, col]);
                    laststatus = koma.status;
                    if (preValue < score && this.turn === Const.FIRST || preValue > score && this.turn === Const.SECOND) {
                      shortCut = true;
                    }
                  }
                }
                koma.turn = move_piece.turn;
                koma.status = move_piece.status;
                koma.posi = move_piece.posi;
                if (score >= Const.MAX_VALUE && this.turn === Const.FIRST || score <= Const.MIN_VALUE && this.turn === Const.SECOND) {
                  return [lastkoma, lastposi, lastscore, laststatus, spare];
                }
                if (shortCut) {
                  return [lastkoma, lastposi, lastscore, laststatus, spare];
                }
              }
            }
          } else {
            ref3 = getClass(koma.name).getD(koma.turn, koma.status);
            for (l = 0, len1 = ref3.length; l < len1; l++) {
              v = ref3[l];
              buf = [].concat(koma.posi);
              while (true) {
                if (!((ref4 = buf[0] + v.xd, indexOf.call(function () {
                  var results = [];
                  for (var m = 1, ref5 = board.cols; 1 <= ref5 ? m <= ref5 : m >= ref5; 1 <= ref5 ? m++ : m--) {
                    results.push(m);
                  }
                  return results;
                }.apply(this), ref4) >= 0) && (ref6 = buf[1] + v.yd, indexOf.call(function () {
                  var results = [];
                  for (var m = 1, ref7 = board.rows; 1 <= ref7 ? m <= ref7 : m >= ref7; 1 <= ref7 ? m++ : m--) {
                    results.push(m);
                  }
                  return results;
                }.apply(this), ref6) >= 0))) {
                  break;
                }
                // promotion = false
                buf[0] += v.xd;
                buf[1] += v.yd;
                if (Object.keys(priority).length !== 0) {
                  if (function () {
                    var len2, m, results;
                    results = [];
                    for (m = 0, len2 = choice.length; m < len2; m++) {
                      w = choice[m];
                      if (koma.id === w.id && buf[0] === w.posi[0] && buf[1] === w.posi[1]) {
                        results.push(w);
                      }
                    }
                    return results;
                  }()[0] == null) {
                    continue;
                  }
                }
                dest = src[buf[0] - 1][buf[1] - 1];
                if (dest != null && dest.turn === koma.turn) {
                  break;
                }
                move_piece = new Piece.Piece(koma.turn, koma.status, koma.posi);
                if (dest != null) {
                  dest_piece = new Piece.Piece(dest.turn, dest.status, dest.posi);
                }
                if (board.check_move(koma, buf, src[buf[0] - 1][buf[1] - 1])) {
                  if (board.check_promotion(koma, buf)) {
                    // promotion = true if board.check_promotion(koma, buf)
                    koma.status = Const.Status.URA;
                  }
                  board.move_capture(koma, buf, src[buf[0] - 1][buf[1] - 1]);
                  // loop
                  result = [];
                  result = board.check_tumi(this.turn);
                  if (limit > 0 && !result[0]) {
                    // if @pre_ahead == -1 && limit > 3
                    //     ret = oppo.prepare(board, @, limit - 1, if oppo.turn == Const.FIRST then Const.MAX_VALUE else Const.MIN_VALUE)
                    // else
                    ret = oppo.think(board, this, limit - 1, lastscore, {});
                    score = ret[2];
                  } else {
                    if (check_flg === null && result[1] === Const.CHECKMATE) {
                      checkmate_threshold = oppo.turn === Const.FIRST ? Const.MAX_VALUE : Const.MIN_VALUE;
                      checkmate_ret = [];
                      checkmate_ret = oppo.think(board, this, limit - 1, checkmate_threshold, {}, true);
                      score = checkmate_ret[2];
                      // 打ち歩時だけだと不十分、玉が睨み合っている時はCHECKMATEが返ってくるので
                      // 駒を指した時ここでも打ち歩詰めチェック
                    } else if (check_flg === false && result[1] === Const.CHECKMATE && dest != null && dest.kind() === 'Fu' && koma.kind() !== 'Ou') {
                      utifudume_threshold = oppo.turn === Const.FIRST ? Const.MAX_VALUE : Const.MIN_VALUE;
                      utifudume_ret = [];
                      utifudume_ret = oppo.think(board, this, 0, utifudume_threshold, {});
                      if (utifudume_ret[2] >= Const.MAX_VALUE || utifudume_ret[2] <= Const.MIN_VALUE) {
                        score = utifudume_ret[2] * -1;
                      } else {
                        score = utifudume_ret[2];
                      }
                    } else {
                      score = result[1];
                    }
                  }
                  if (limit === this.pre_ahead) {
                    this.preparation.push({
                      "id": koma.id,
                      "kind": koma.name,
                      "s_posi": move_piece.posi,
                      "posi": [].concat(buf),
                      "status": koma.status,
                      "score": score,
                      "weight": koma.omomi()
                    });
                  }
                  shortCut = false;
                  if (score > lastscore && this.turn === Const.FIRST || score < lastscore && this.turn === Const.SECOND) {
                    spare["koma"] = lastkoma;
                    spare["posi"] = [].concat(lastposi);
                    spare["score"] = lastscore;
                    spare["status"] = laststatus;
                    lastkoma = koma;
                    lastscore = score;
                    lastposi = [].concat(buf);
                    laststatus = koma.status;
                    if (preValue < score && this.turn === Const.FIRST || preValue > score && this.turn === Const.SECOND) {
                      shortCut = true;
                    }
                  }
                }
                // # 駒が成れる場合は成ってからもう一度評価する
                // if promotion
                //     promotion = false
                //     koma.status = Const.Status.URA
                // else
                //     break
                koma.turn = move_piece.turn;
                koma.status = move_piece.status;
                koma.posi = move_piece.posi;
                if (dest != null) {
                  dest.turn = dest_piece.turn;
                  dest.status = dest_piece.status;
                  dest.posi = dest_piece.posi;
                }
                if (score >= Const.MAX_VALUE && this.turn === Const.FIRST || score <= Const.MIN_VALUE && this.turn === Const.SECOND) {
                  return [lastkoma, lastposi, lastscore, laststatus, spare];
                }
                if (shortCut) {
                  return [lastkoma, lastposi, lastscore, laststatus, spare];
                }
              }
            }
          }
        }
        // break unless (!dest? && v.series)
        return [lastkoma, lastposi, lastscore, laststatus, spare];
      }
    }]);
  }();
  ;
  sortPreparation = function sortPreparation(arr) {
    var order = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'asc';
    return arr.sort(function (a, b) {
      if (a.score !== b.score) {
        if (order === 'asc') {
          return a.score - b.score;
        } else {
          return b.score - a.score;
        }
      } else if (a.weight !== b.weight) {
        return a.weight - b.weight;
      } else {
        if (Math.random() < 0.5) {
          return -1;
        } else {
          return 1;
        }
      }
    });
  };
  is_utifuOute = function is_utifuOute(board, piece, d_posi) {
    var buf, oppo, oppo_king, v;
    oppo = piece.turn === Const.FIRST ? Const.SECOND : Const.FIRST;
    oppo_king = function () {
      var i, len, ref, results;
      ref = board.pieces;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        v = ref[i];
        if (v.turn === oppo && v.name === 'Ou') {
          results.push(v);
        }
      }
      return results;
    }()[0];
    buf = [].concat(d_posi);
    buf[0] += Piece.Fu.getD(piece.turn, piece.status)[0].xd;
    buf[1] += Piece.Fu.getD(piece.turn, piece.status)[0].yd;
    return oppo_king.posi[0] === buf[0] && oppo_king.posi[1] === buf[1];
  };
  return Player;
}.call(this);
module.exports = Player;

/***/ },

/***/ "?a16a"
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
() {

/* (ignored) */

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./gameGui.coffee");
/******/ 	
/******/ })()
;
//# sourceMappingURL=torishogi.js.map