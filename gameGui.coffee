# --- minimal jQuery / jQuery Mobile compatibility shim ---
$$ = (selector, root = document) -> Array::slice.call(root.querySelectorAll(selector))
$1 = (selector, root = document) -> root.querySelector(selector)

class MiniQuery
    constructor: (@elements) ->

    on: (eventName, handler) ->
        for el in @elements when el?
            el.addEventListener(eventName, handler)
        @

    change: (handler) ->
        @on('change', handler)

    localize: ->
        for el in @elements when el?
            root = if el == document then document else el
            nodes = Array::slice.call(root.querySelectorAll('[data-i18n]'))
            if root != document and root.hasAttribute? and root.hasAttribute('data-i18n')
                nodes.unshift(root)
            for node in nodes
                rawKey = node.getAttribute('data-i18n')
                continue unless window.i18next? and rawKey?
                isHtml = false
                key = rawKey
                if rawKey.indexOf('[html]') == 0
                    isHtml = true
                    key = rawKey.replace(/^\[html\]/, '')
                value = i18next.t(key)
                if isHtml or /_html$/.test(key)
                    node.innerHTML = value
                else
                    node.textContent = value
        @

    trigger: (eventOrName) ->
        ev = if typeof eventOrName == 'string' then new Event(eventOrName, {bubbles: true, cancelable: true}) else eventOrName
        for el in @elements when el?
            el.dispatchEvent(ev)
        @

    hide: ->
        for el in @elements when el?
            el.style.display = 'none'
        @

    show: ->
        for el in @elements when el?
            el.style.display = ''
        @

    text: (value) ->
        if arguments.length == 0
            return if @elements[0]? then @elements[0].textContent else ''
        for el in @elements when el?
            el.textContent = value
        @

    html: (value) ->
        if arguments.length == 0
            return if @elements[0]? then @elements[0].innerHTML else ''
        for el in @elements when el?
            el.innerHTML = value
        @

    append: (value) ->
        for el in @elements when el?
            if typeof value == 'string'
                el.insertAdjacentHTML('beforeend', value)
            else if value instanceof MiniQuery
                for child in value.elements when child?
                    el.appendChild(child.cloneNode(true))
            else if value?
                el.appendChild(value)
        @

    appendTo: (selector) ->
        target = if typeof selector == 'string' then $1(selector) else selector
        return @ unless target?
        for el in @elements when el?
            target.appendChild(el)
        @

    css: (name, value) ->
        if typeof name == 'object'
            for el in @elements when el?
                for k, v of name
                    el.style.setProperty(k, v)
            return @
        if arguments.length == 1
            return if @elements[0]? then getComputedStyle(@elements[0]).getPropertyValue(name) else undefined
        for el in @elements when el?
            el.style.setProperty(name, value)
        @

    attr: (name, value) ->
        if typeof name == 'object'
            for el in @elements when el?
                for k, v of name
                    if k == 'class'
                        el.className = v
                    else
                        el.setAttribute(k, v)
            return @
        if arguments.length == 1
            return if @elements[0]? then @elements[0].getAttribute(name) else undefined
        for el in @elements when el?
            if name == 'class'
                el.className = value
            else
                el.setAttribute(name, value)
        @

    prop: (name, value) ->
        if arguments.length == 1
            return if @elements[0]? then @elements[0][name] else undefined
        for el in @elements when el?
            el[name] = value
        @

    val: (value) ->
        if arguments.length == 0
            return if @elements[0]? then @elements[0].value else ''
        for el in @elements when el?
            el.value = value
        @

    children: (selector = null) ->
        kids = []
        for el in @elements when el?
            arr = Array::slice.call(el.children)
            if selector?
                arr = (child for child in arr when child.matches(selector))
            kids = kids.concat(arr)
        new MiniQuery(kids)

    eq: (index) ->
        new MiniQuery([@elements[index]])

    popup: (action) ->
        for el in @elements when el?
            if action == 'open'
                el.classList.add('is-open')
                document.body.classList.add('popup-open')
            else if action == 'close'
                el.classList.remove('is-open')
                unless document.querySelector('[data-role="popup"].is-open')
                    document.body.classList.remove('popup-open')
        @

    pagecontainer: (action, target) ->
        if action == 'change' and target?
            if window.changePage?
                window.changePage(target)
            else
                location.hash = target
        @

    checkboxradio: -> @
    button: -> @

window.$ = (arg, attrs = null) ->
    if typeof arg == 'function'
        if document.readyState == 'loading'
            document.addEventListener('DOMContentLoaded', arg)
        else
            arg()
        return new MiniQuery([])
    if arg == window or arg == document
        return new MiniQuery([arg])
    if typeof arg == 'string'
        trimmed = arg.trim()
        if trimmed[0] == '<' and trimmed[trimmed.length - 1] == '>'
            tag = trimmed.replace(/^<\s*|\s*>$/g, '')
            el = document.createElement(tag)
            if attrs? and typeof attrs == 'object'
                for k, v of attrs
                    if k == 'class'
                        el.className = v
                    else if k of el
                        el[k] = v
                    else
                        el.setAttribute(k, v)
            return new MiniQuery([el])
        return new MiniQuery($$(arg))
    if arg instanceof Element or arg instanceof HTMLDocument or arg == window
        return new MiniQuery([arg])
    if Array.isArray(arg)
        return new MiniQuery(arg)
    new MiniQuery([])

window.jQuery = window.$
$.Event = (name) -> new Event(name, {bubbles: true, cancelable: true})
$.mobile =
    loader:
        prototype:
            options: {}
    loading: (action, opts = {}) ->
        overlay = document.getElementById('vanillaLoadingOverlay')
        unless overlay
            overlay = document.createElement('div')
            overlay.id = 'vanillaLoadingOverlay'
            overlay.style.position = 'fixed'
            overlay.style.inset = '0'
            overlay.style.display = 'none'
            overlay.style.alignItems = 'center'
            overlay.style.justifyContent = 'center'
            overlay.style.background = 'rgba(0,0,0,.35)'
            overlay.style.zIndex = '9999'
            overlay.innerHTML = '<div style="background:#fff;padding:12px 16px;border-radius:8px;">Loading...</div>'
            document.body.appendChild(overlay)
        if action == 'show'
            overlay.style.display = 'flex'
            overlay.firstElementChild.textContent = opts.text or 'Loading...'
        else
            overlay.style.display = 'none'
$.mobile.pushStateEnabled = false
window.jqueryI18next ?= { init: -> }

window.__vanillaCordovaReady = not !!window.cordova

document.addEventListener 'deviceready', ->
    window.__vanillaCordovaReady = true
# --- end shim ---

crypto = require('crypto')
Const = require('./const')
Piece = require('./piece')
Board = require('./board')
Player = require('./player')

$ ->
    return new GameGUI()

Array::unique = ->
    output = {}
    output[@[key]] = @[key] for key in [0...@length]
    value for key, value of output

# djb2
hash = (str) ->
    h = 5381
    i = 0
    while i < str.length
        h = (h << 5) + h + str.charCodeAt(i)
        i++
    (h >>> 0).toString 16

class BoardGUI extends Board
    @appLocalize: ->
        lng = ''
        lng = localStorage.getItem('appLanguage')
        if !lng
            lng = 'ja'
        i18next.use(i18nextSprintfPostProcessor).init
            lng: lng
            fallbackLng: 'en'
            debug: true
            resources:
                en: translation:
                    title: 'Tori Shogi (Japanese Bird Chess)'
                    btn_first: 'Black'
                    btn_second: 'White'
                    btn_start: 'New Game'
                    btn_stop: 'Interrupt'
                    menu_title: 'Settings'
                    menu_turn: 'Turn / AI Level'
                    menu_first: 'Black'
                    menu_second: 'White'
                    menu_person: 'Man'
                    menu_ai: 'AI'
                    menu_level: 'AI Level'
                    menu_beginner: 'Novice'
                    menu_average: 'Intermediate'
                    menu_longtime: 'Senior'
                    menu_meditation: 'Expert'
                    menu_fonts: 'Piece Style'
                    menu_fonts_standard: 'Modern'
                    menu_fonts_kouzan: 'Traditional'
                    menu_fonts_illustrated: 'Illustrated'
                    menu_placement: 'Movement of the pieces'
                    menu_guide: 'Display movement guide.'
                    menu_about: 'About Tori Shogi'
                    menu_kifuinput: 'Input Record'
                    menu_btninput: 'Reading'
                    menu_kifudata: 'Please paste the record of game:'
                    dlg_promote: 'Promote?'
                    dlg_promote_yes: 'Promote'
                    dlg_promote_no: 'Not promote'
                    dlg_check: 'The Peng is in check!'
                    dlg_utifudume: 'Drop Pawn Mate!'
                    msgBlack: 'Black'
                    msgWhite: 'White'
                    msgTurn: '%s turn '
                    msgEvaluate: '(Evaluation: %s)'
                    msgWinner: '%s Win'
                    msgRestart: 'Restart'
                    msgInterrupt: 'Interrupt'
                    msgFirstWin: 'Black Win'
                    msgSecondWin: 'White Win'
                    msgThinking: 'thinking...'
                    msgSennitite: 'Repetition Draw'
                    msgKifuCopied: 'Game record copied.'
                    msgKifuError: 'Failed to copy game record.'
                    dlg2_exitTitle: 'Application Menu'
                    dlg2_exitItemYes: 'Exit'
                    dlg2_exitItemNo: 'Cancel'
                    dlg2_exit: 'Exit Application ?'
                    koma_front: 'Front'
                    koma_front_image: 'Front Image'
                    koma_front_moves: 'Moves'
                    koma_back: 'Back(Promoted)'
                    koma_back_image: 'Back Image(Promoted)'
                    koma_back_moves: 'Moves'
                    koma_otori: '<img class="first" src="./img/f_ou.svg" alt=""><br />Peng'
                    koma_otori_image: '<img class="first" src="./img/f_ou_image.svg" alt=""><br />Ootori'
                    koma_tsuru: '<img class="first" src="./img/f_ka.svg" alt=""><br />Crane'
                    koma_tsuru_image: '<img class="first" src="./img/f_ka_image.svg" alt=""><br />Tsuru'
                    koma_kiji: '<img class="first" src="./img/f_ki.svg" alt=""><br />Pheasant'
                    koma_kiji_image: '<img class="first" src="./img/f_ki_image.svg" alt=""><br />Kizi'
                    koma_left_uzura: '<img class="fluzura" src="./img/f_gi.svg" alt=""><br />Left Quail'
                    koma_left_uzura_image: '<img class="fluzura" src="./img/f_gi_image.svg" alt=""><br />Hidari Uzura'
                    koma_right_uzura: '<img class="fruzura" src="./img/f_ke.svg" alt=""><br />&emsp;Right Quail&emsp;'
                    koma_right_uzura_image: '<img class="fruzura" src="./img/f_ke_image.svg" alt=""><br />&emsp;Migi Uzura&emsp;'
                    koma_taka: '<img class="first" src="./img/f_ky.svg" alt=""><br />Hawk'
                    koma_taka_image: '<img class="first" src="./img/f_ky_image.svg" alt=""><br />Taka'
                    koma_kumataka: '<img class="first" src="./img/f_ny.svg" alt=""><br />Eagle'
                    koma_kumataka_image: '<img class="first" src="./img/f_ny_image.svg" alt=""><br />Kumataka'
                    koma_tsubame: '<img class="first" src="./img/f_fu.svg" alt=""><br />Swallow'
                    koma_tsubame_image: '<img class="first" src="./img/f_fu_image.svg" alt=""><br />Tsubame'

                    koma_kari: '<img class="first" src="./img/f_to.svg" alt=""><br />Wild Geese'
                    koma_kari_image: '<img class="first" src="./img/f_to_image.svg" alt=""><br />Kari'
                    menu_description_html: 'It is a board game born in Japan during the Edo period, but there will be no people who have played in Japan as well.<br />I wanted to play once and tried making it.<br />For detailed specifications please see <a href="https://happyclam.github.io/project/2019-01-03/torishogiapp"> blog post </a>, and see <a href="https://ja.wikipedia.org/wiki/禽将棋">Wikipedia</a> for histories.<br />We were allowed to use illustrations in the app by <a href="http://www.irasutoya.com">"Irasutoya"</a>.<br />We used a free font <a href="https://forest.watch.impress.co.jp/library/software/aoyagifont/">"Kouzan brush pen font"</a> owned by <a href="http://www7a.biglobe.ne.jp/~kouzan/">"Aoyagi Kouzan"</a> who can redistribute it.'
                ja: translation:
                    title: '禽将棋（Tori Shogi）'
                    btn_first: '先手'
                    btn_second: '後手'
                    btn_start: '新規対局'
                    btn_stop: '中断'
                    menu_title: '設定'
                    menu_turn: '先手・後手／ＡＩレベル'
                    menu_first: '先手'
                    menu_second: '後手'
                    menu_person: '人'
                    menu_ai: 'ＡＩ'
                    menu_level: 'ＡＩレベル'
                    menu_beginner: '弱い'
                    menu_average: '普通'
                    menu_longtime: '長考'
                    menu_meditation: '瞑想'
                    menu_fonts: '駒のスタイル'
                    menu_fonts_standard: '楷書'
                    menu_fonts_kouzan: '毛筆'
                    menu_fonts_illustrated: 'イラスト'
                    menu_placement: '駒の動き'
                    menu_guide: '駒の移動ガイドを表示する'
                    menu_about: '「禽将棋」について'
                    menu_kifuinput: '棋譜入力'
                    menu_btninput: '棋譜読込'
                    menu_kifudata: '棋譜を貼り付けてください:'
                    dlg_promote: '成りますか？'
                    dlg_promote_yes: '成る'
                    dlg_promote_no: '成らない'
                    dlg_check: '鵬が取られてしまいます'
                    dlg_utifudume: '打ち燕詰めです'
                    msgBlack: '先手'
                    msgWhite: '後手'
                    msgTurn: '%sの番です'
                    msgEvaluate: '（評価値: %s）'
                    msgWinner: '%sの勝ちです'
                    msgRestart: '再開'
                    msgInterrupt: '中断'
                    msgFirstWin: '先手の勝ちです'
                    msgSecondWin: '後手の勝ちです'
                    msgSennitite: '千日手です'
                    msgThinking: '考え中...'
                    msgKifuCopied: '棋譜をコピーしました'
                    msgKifuError: '棋譜のコピーに失敗しました'
                    dlg2_exitTitle: '終了メニュー'
                    dlg2_exitItemYes: '終了'
                    dlg2_exitItemNo: 'キャンセル'
                    dlg2_exit: 'アプリを終了しますか？'
                    koma_front: '表'
                    koma_front_image: '表画像'
                    koma_front_moves: '動き'
                    koma_back: '　裏（成駒）　'
                    koma_back_image: '裏画像（成駒）'
                    koma_back_moves: '動き'
                    koma_otori: '<img class="first" src="./img/f_ou.svg" alt=""><br />おおとり'
                    koma_otori_image: '<img class="first" src="./img/f_ou_image.svg" alt=""><br />Ootori'
                    koma_tsuru: '<img class="first" src="./img/f_ka.svg" alt=""><br />つる'
                    koma_tsuru_image: '<img class="first" src="./img/f_ka_image.svg" alt=""><br />Tsuru'
                    koma_kiji: '<img class="first" src="./img/f_ki.svg" alt=""><br />きじ'
                    koma_kiji_image: '<img class="first" src="./img/f_ki_image.svg" alt=""><br />Kizi'
                    koma_left_uzura: '<img class="fluzura" src="./img/f_gi.svg" alt=""><br />ひだり　うずら'
                    koma_left_uzura_image: '<img class="fluzura" src="./img/f_gi_image.svg" alt=""><br />Hidari Uzura'
                    koma_right_uzura: '<img class="fruzura" src="./img/f_ke.svg" alt=""><br />みぎ　うずら'
                    koma_right_uzura_image: '<img class="fruzura" src="./img/f_ke_image.svg" alt=""><br />Migi Uzura'
                    koma_taka: '<img class="first" src="./img/f_ky.svg" alt=""><br />たか'
                    koma_taka_image: '<img class="first" src="./img/f_ky_image.svg" alt=""><br />Taka'
                    koma_kumataka: '<img class="first" src="./img/f_ny.svg" alt=""><br />くまたか'
                    koma_kumataka_image: '<img class="first" src="./img/f_ny_image.svg" alt=""><br />Kumataka'
                    koma_tsubame: '<img class="first" src="./img/f_fu.svg" alt=""><br />つばめ'
                    koma_tsubame_image: '<img class="first" src="./img/f_fu_image.svg" alt=""><br />Tsubame'
                    koma_kari: '<img class="first" src="./img/f_to.svg" alt=""><br />かり'
                    koma_kari_image: '<img class="first" src="./img/f_to_image.svg" alt=""><br />Kari'
                    menu_description_html: '江戸時代に日本で生まれた禽将棋ですが、日本人でも遊んだことがある人はほとんどいないのではないでしょうか？<br />一度遊んでみたいと思い作ってみました。仕様に関しては<a href="https://happyclam.github.io/project/2019-01-03/torishogiapp">ブログ記事</a>を参照してください。<a href="https://ja.wikipedia.org/wiki/禽将棋">Wikipedia</a>に起源やルールも書かれています。<br />アプリ内で使用されているイラストは<a href="http://www.irasutoya.com">「いらすとや」様</a>のものを利用させていただきました。<br />将棋の駒に再配布可能な<a href="http://www7a.biglobe.ne.jp/~kouzan/">「青柳衡山」様</a>の<a href="https://forest.watch.impress.co.jp/library/software/aoyagifont/">「衡山毛筆フォント」</a>を利用させていただいてます。'
        # console.log '=== lng = ' + lng
        $ ->
            jqueryI18next.init i18next, $
            $('#home').localize()
            $('#win_menu').localize()
            # $('#popupCheckLeft').localize()
            $('[id=btnStart]').val(i18next.t('btn_start')).button 'refresh'
            $('[id=btnStop]').val(i18next.t('btn_stop')).button 'refresh'
            return

    constructor: ->
        super()
        @width = 0
        @height = 0
        # @statusarea = null
        @fonts = 0
        @latest = []
    display: (rev = false, pieceStyle = 0) ->
        if rev
            $("#surface").hide()
            $("#reverse").show()
            clsFName = 'firstR'
            clsSName = 'secondR'
            clsFLUName = 'fluzuraR'
            clsSLUName = 'sluzuraR'
            clsFRUName = 'fruzuraR'
            clsSRUName = 'sruzuraR'
        else
            $("#reverse").hide()
            $("#surface").show()
            clsFName = 'first'
            clsSName = 'second'
            clsFLUName = 'fluzura'
            clsSLUName = 'sluzura'
            clsFRUName = 'fruzura'
            clsSRUName = 'sruzura'

        s_motigoma = {"Ka": 0, "Ki": 0, "Gi": 0, "Ke": 0, "Ky": 0, "Fu": 0}
        for v,i in @pieces when v.turn == Const.SECOND && v.status == Const.Status.MOTIGOMA
            s_motigoma[v.name] += 1
        # if pieceStyle != 2
        #     for k,v of s_motigoma
        #         document.querySelectorAll('[id="s' + k + '"]').forEach (el) ->
        #             el.classList.remove("ui-illust-s" + k.toLowerCase())
        #             el.classList.add("ui-icon-s" + k.toLowerCase())
        #             el.textContent = v.toString()
        # else
        #     for k,v of s_motigoma
        #         document.querySelectorAll('[id="s' + k + '"]').forEach (el) ->
        #             el.classList.remove("ui-icon-s" + k.toLowerCase())
        #             el.classList.add("ui-illust-s" + k.toLowerCase())
        #             el.textContent = v.toString()

        for row in [1..@rows]
            for col in [@cols..1] by -1
                $('[id=b' + row.toString() + col.toString() + ']').css('background-color', '#FFFACD')
                $('[id=b' + row.toString() + col.toString() + ']').css('border-style', 'solid')
                koma = (v for v in @pieces when v.posi? && v.posi.toString() == [col, row].toString())[0]
                if koma?
                    switch koma.name
                        when "Gi"
                            $('[id=b' + koma.posi[0] + koma.posi[1] + ']').children('img').attr('src': (getImg.call @, koma), 'alt': koma.caption(), 'class': (if koma.turn == Const.FIRST then clsFLUName else clsSLUName))
                        when "Ke"
                            $('[id=b' + koma.posi[0] + koma.posi[1] + ']').children('img').attr('src': (getImg.call @, koma), 'alt': koma.caption(), 'class': (if koma.turn == Const.FIRST then clsFRUName else clsSRUName))
                        else
                            $('[id=b' + koma.posi[0] + koma.posi[1] + ']').children('img').attr('src': (getImg.call @, koma), 'alt': koma.caption(), 'class': (if koma.turn == Const.FIRST then clsFName else clsSName))
                else
                    $('[id=b' + col + row + ']').children('img').attr('src': './img/empty.svg', 'class': 'empty')
        $('[id=b' + @latest[0] + @latest[1] + ']').css('border-style', 'dashed') if @latest? && @latest.length == 2
        f_motigoma = {"Ka": 0, "Ki": 0, "Gi": 0, "Ke": 0, "Ky": 0, "Fu": 0}
        for v,i in @pieces when v.turn == Const.FIRST && v.status == Const.Status.MOTIGOMA
            f_motigoma[v.name] += 1
        if rev            
            if pieceStyle != 2
                for k,v of s_motigoma
                    document.querySelectorAll('[id="s' + k + '"]').forEach (el) ->
                        el.classList.remove("ui-illust-s" + k.toLowerCase())
                        el.classList.remove("ui-illust-f" + k.toLowerCase())
                        el.classList.remove("ui-icon-s" + k.toLowerCase())
                        el.classList.add("ui-icon-f" + k.toLowerCase())
                        el.textContent = v.toString()
                for k,v of f_motigoma
                    document.querySelectorAll('[id="f' + k + '"]').forEach (el) ->
                        el.classList.remove("ui-illust-f" + k.toLowerCase())
                        el.classList.remove("ui-illust-s" + k.toLowerCase())
                        el.classList.remove("ui-icon-f" + k.toLowerCase())
                        el.classList.add("ui-icon-s" + k.toLowerCase())
                        el.textContent = v.toString()
            else
                for k,v of s_motigoma
                    document.querySelectorAll('[id="s' + k + '"]').forEach (el) ->
                        el.classList.remove("ui-icon-s" + k.toLowerCase())
                        el.classList.remove("ui-icon-f" + k.toLowerCase())
                        el.classList.remove("ui-illust-s" + k.toLowerCase())
                        el.classList.add("ui-illust-f" + k.toLowerCase())
                        el.textContent = v.toString()
                for k,v of f_motigoma
                    document.querySelectorAll('[id="f' + k + '"]').forEach (el) ->
                        el.classList.remove("ui-icon-f" + k.toLowerCase())
                        el.classList.remove("ui-icon-s" + k.toLowerCase())
                        el.classList.remove("ui-illust-f" + k.toLowerCase())
                        el.classList.add("ui-illust-s" + k.toLowerCase())
                        el.textContent = v.toString()
        else        
            if pieceStyle != 2
                for k,v of s_motigoma
                    document.querySelectorAll('[id="s' + k + '"]').forEach (el) ->
                        el.classList.remove("ui-illust-s" + k.toLowerCase())
                        el.classList.remove("ui-illust-f" + k.toLowerCase())
                        el.classList.remove("ui-icon-f" + k.toLowerCase())
                        el.classList.add("ui-icon-s" + k.toLowerCase())
                        el.textContent = v.toString()
                for k,v of f_motigoma
                    document.querySelectorAll('[id="f' + k + '"]').forEach (el) ->
                        el.classList.remove("ui-illust-f" + k.toLowerCase())
                        el.classList.remove("ui-illust-s" + k.toLowerCase())
                        el.classList.remove("ui-icon-s" + k.toLowerCase())
                        el.classList.add("ui-icon-f" + k.toLowerCase())
                        el.textContent = v.toString()
            else
                for k,v of s_motigoma
                    document.querySelectorAll('[id="s' + k + '"]').forEach (el) ->
                        el.classList.remove("ui-icon-s" + k.toLowerCase())
                        el.classList.remove("ui-icon-f" + k.toLowerCase())
                        el.classList.remove("ui-illust-f" + k.toLowerCase())
                        el.classList.add("ui-illust-s" + k.toLowerCase())
                        el.textContent = v.toString()
                for k,v of f_motigoma
                    document.querySelectorAll('[id="f' + k + '"]').forEach (el) ->
                        el.classList.remove("ui-icon-f" + k.toLowerCase())
                        el.classList.remove("ui-icon-s" + k.toLowerCase())
                        el.classList.remove("ui-illust-s" + k.toLowerCase())
                        el.classList.add("ui-illust-f" + k.toLowerCase())
                        el.textContent = v.toString()
        return

    getImg = (piece) ->
        ret = ""
        switch piece.name
            when "Ou" # 鵬
                if piece.turn == Const.FIRST
                    if @fonts == 2
                        ret = "./img/f_ou_image.svg"
                    else if @fonts == 1
                        ret = "./img/f_ou_m.svg"
                    else
                        ret = "./img/f_ou.svg"
                else
                    if @fonts == 2
                        ret = "./img/s_ou_image.svg"
                    else if @fonts == 1
                        ret = "./img/s_ou_m.svg"
                    else
                        ret = "./img/s_ou.svg"
            when "Ka" # 鶴
                if piece.turn == Const.FIRST
                    if @fonts == 2
                        ret = "./img/f_ka_image.svg"
                    else if @fonts == 1
                        ret = "./img/f_ka_m.svg"
                    else
                        ret = "./img/f_ka.svg"
                else
                    if @fonts == 2
                        ret = "./img/s_ka_image.svg"
                    else if @fonts == 1
                        ret = "./img/s_ka_m.svg"
                    else
                        ret = "./img/s_ka.svg"
            when "Ki" # 雉
                if piece.turn == Const.FIRST
                    if @fonts == 2
                        ret = "./img/f_ki_image.svg"
                    else if @fonts == 1
                        ret = "./img/f_ki_m.svg"
                    else
                        ret = "./img/f_ki.svg"
                else
                    if @fonts == 2
                        ret = "./img/s_ki_image.svg"
                    else if @fonts == 1
                        ret = "./img/s_ki_m.svg"
                    else
                        ret = "./img/s_ki.svg"
            when "Gi" # 左鶉
                if piece.turn == Const.FIRST
                    if @fonts == 2
                        ret = "./img/f_gi_image.svg"
                    else if @fonts == 1
                        ret = "./img/f_gi_m.svg"
                    else
                        ret = "./img/f_gi.svg"
                else
                    if @fonts == 2
                        ret = "./img/s_gi_image.svg"
                    else if @fonts == 1
                        ret = "./img/s_gi_m.svg"
                    else
                        ret = "./img/s_gi.svg"
            when "Ke" # 右鶉
                if piece.turn == Const.FIRST
                    if @fonts == 2
                        ret = "./img/f_ke_image.svg"
                    else if @fonts == 1
                        ret = "./img/f_ke_m.svg"
                    else
                        ret = "./img/f_ke.svg"
                else
                    if @fonts == 2
                        ret = "./img/s_ke_image.svg"
                    else if @fonts == 1
                        ret = "./img/s_ke_m.svg"
                    else
                        ret = "./img/s_ke.svg"
            when "Ky" # 鷹、鵰
                if piece.status == Const.Status.URA
                    if piece.turn == Const.FIRST
                        if @fonts == 2
                            ret = "./img/f_ny_image.svg"
                        else if @fonts == 1
                            ret = "./img/f_ny_m.svg"
                        else
                            ret = "./img/f_ny.svg"
                    else
                        if @fonts == 2
                            ret = "./img/s_ny_image.svg"
                        else if @fonts == 1
                            ret = "./img/s_ny_m.svg"
                        else
                            ret = "./img/s_ny.svg"
                else
                    if piece.turn == Const.FIRST
                        if @fonts == 2
                            ret = "./img/f_ky_image.svg"
                        else if @fonts == 1
                            ret = "./img/f_ky_m.svg"
                        else
                            ret = "./img/f_ky.svg"
                    else
                        if @fonts == 2
                            ret = "./img/s_ky_image.svg"
                        else if @fonts == 1
                            ret = "./img/s_ky_m.svg"
                        else
                            ret = "./img/s_ky.svg"
            when "Fu" # 燕、雁
                if piece.status == Const.Status.URA
                    if piece.turn == Const.FIRST
                        if @fonts == 2
                            ret = "./img/f_to_image.svg"
                        else if @fonts == 1
                            ret = "./img/f_to_m.svg"
                        else
                            ret = "./img/f_to.svg"
                    else
                        if @fonts == 2
                            ret = "./img/s_to_image.svg"
                        else if @fonts == 1
                            ret = "./img/s_to_m.svg"
                        else
                            ret = "./img/s_to.svg"
                else
                    if piece.turn == Const.FIRST
                        if @fonts == 2
                            ret = "./img/f_fu_image.svg"
                        else if @fonts == 1
                            ret = "./img/f_fu_m.svg"
                        else
                            ret = "./img/f_fu.svg"
                    else
                        if @fonts == 2
                            ret = "./img/s_fu_image.svg"
                        else if @fonts == 1
                            ret = "./img/s_fu_m.svg"
                        else
                            ret = "./img/s_fu.svg"
        return ret

class State
    constructor:(@turn, @status, @posi = []) ->

class GameGUI
    # 同じ駒が複数使用されていることもあるので座標も含めてソート
    _sortCoordinate = (a, b) ->
        kinds = ["Ou", "Hi", "Ka", "Ki", "Gi", "Ke", "Ky", "Fu"]
        return kinds.indexOf(a["kind"]) - kinds.indexOf(b["kind"]) || a["turn"] - b["turn"] || a["status"] - b["status"] || a["posi0"] - b["posi0"] || a["posi1"] - b["posi1"]
    # 局面を比較するためHashを生成
    @make_hash = (board) ->
        rec = []
        for koma in board.pieces
            buf = {}
            buf["kind"] = koma.name
            buf["turn"] = koma.turn
            buf["status"] = koma.status
            buf["posi0"] = koma.posi[0]
            buf["posi1"] = koma.posi[1]
            rec.push(buf)
        rec.sort _sortCoordinate
        return hash(JSON.stringify(rec))
    constructor: ->
        # console.log("GameGUI.constructor")
        @selected = null; @posi = null
        @s_posi = null; @d_posi = null;@pre_posi = null;
        @interrupt_flg = false;  @auto_flg = false
        @history = []; @seq = null
        @duplication = []
        @first_player = null; @second_player = null;
        @check_guide = null
        @reverse = null
        @radio_depth_f = null;@radio_depth_s = null;
        @radio_fonts = null
        @first = new Player(Const.FIRST, true)
        @second = new Player(Const.SECOND, true)
        @teban = @first
        @board = new BoardGUI()
        @md5hash = null
        @setEventListener()
        @originalBoardImage = ""
    viewState: ->
        # console.log("viewState")
        for v,i in @board.pieces
            v.turn = @history[@seq]["board"][i].turn
            v.status = @history[@seq]["board"][i].status
            v.posi = @history[@seq]["board"][i].posi
        $('[id=naviSeq]').text(@seq.toString())
        @board.latest = @history[@seq]["latest"]; @board.display(@reverse, @board.fonts)
        return
    addState: (md5hash = null, latest = null, from = null, to = null, koma = null) ->
        # console.log("GameGUI.addState")
        # console.log("latest = #{latest}, from = #{from}, to = #{to}, koma = #{koma}")
        record = {}
        record["latest"] = if latest? then [].concat(latest) else null
        record["from"] = if from? then [].concat(from) else null
        record["to"] = if to? then [].concat(to) else null
        record["koma"] = if koma? then koma else null
        record["board"] = []
        for v in @board.pieces
            record["board"].push(new State(v.turn, v.status, [].concat(v.posi)))
        @history.push(record)
        @duplication.push(md5hash)
        $('[id=naviSeq]').text((@history.length - 1).toString())
        return
    makeRecord: ->
        # console.log("GameGUI.makeRecord")
        converted = @convert()
        linkStr = "https://github.com/happyclam/toriShogi"
        # window.plugins.socialsharing.share('\' #禽将棋 ' + linkStr + ' \n' + converted, 'torishogi', null, null);
        copyKifuToClipboard('\' #禽将棋 ' + linkStr + ' \n' + converted)
        return

    convert: ->
        # console.log("GameGUI.convert")
        if @history.length <= 0
            return ""
        if @history[0]["latest"]?
            radioNo = @history[0]["latest"][0]
        else
            radioNo = -1
        records = "'\n"
        records += "V2.2\n"
        if @first.human
            records += "N+Player\n"
        else
            records += "N+AI\n"
        if @second.human
            records += "N-Player\n"
        else
            records += "N-AI\n"
        if radioNo == -1
            records += @originalBoardImage
        else
            records += "P1-RU-KZ-TR-OO-TR-KZ-LU\n"
            records += "P2 *  *  * -TK *  *  * \n"
            records += "P3-TB-TB-TB-TB-TB-TB-TB\n"
            records += "P4 *  * -TB * +TB *  * \n"
            records += "P5+TB+TB+TB+TB+TB+TB+TB\n"
            records += "P6 *  *  * +TK *  *  * \n"
            records += "P7+LU+KZ+TR+OO+TR+KZ+RU\n"
        if @teban.turn == Const.SECOND
            records += "-\n"
        else
            records += "+\n"
        for v,i in @history
            continue if i == 0
            teban = if (i % 2) == 1 then "+" else "-"
            from = if v.from.length!=0 then v.from.toString().replace(",", "") else "00"
            to = if v.to.length!=0 then v.to.toString().replace(",", "") else ""
            records += teban + from + to + v.koma + "\n"
        return records

    inputRecord: ->
        # console.log("GameGUI.inputRecord")
        @board.pieces = []
        @history = []
        @duplication = []
        @seq = 0
        @originalBoardImage = ""
        try
            buf = $('#textKifu').val().split(/\r\n|\r|\n/)
            for v,i in buf
                continue if v.length == 0
                continue if v[0] == "\'"
                continue if v[0] == "V"
                continue if v[0] == "T"
                continue if v[0] == "%"
                continue if v[0] == "N"
                continue if v[0] == "$"
                switch v[0]
                    when "P"
                        # throw "1:Line = #{i + 1}: #{v}" unless isFinite(v[1])
                        @originalBoardImage += v + "\n"
                        if isFinite(v[1])
                            row = parseInt(v[1], 10)
                            cols = v.slice(2)
                            throw "01:Line = #{i + 1}: #{v}" unless (cols.length == Const.KIFU_ROW_LENGTH || cols.length == Const.KIFU_ROW_LENGTH_SUB)
                            for j in [1..@board.cols]
                                y = Const.KIFU_ROW_LENGTH - (Const.KIFU_KOMA_LENGTH * j)
                                col = cols[y..y+2]
                                continue if col.indexOf("*") >= 0
                                piece = makePiece.call @, col, [j, row]
                                if piece?
                                    @board.pieces.push(piece)
                                else
                                    throw "02:Line = #{i + 1}: #{v}"
                        else if (v[1] == "+" || v[1] == "-")
                            cols = v.split("00")
                            for j,k in cols
                                continue if k == 0
                                piece = makePiece.call @, v[1] + j
                                if piece?
                                    @board.pieces.push(piece)
                                else
                                    throw "03:Line = #{i + 1}: #{v}"
                        else
                            throw "04:Line = #{i + 1}: #{v}"
                        throw "09:Line = #{i}: #{v}" if @history.length > 0
                    when "+", "-"
                        if v.length == 1
                            @addState()
                            continue
                        from = [v[1], v[2]].map(Number)
                        turn = if v[0] == "+" then Const.FIRST else Const.SECOND
                        if v[1..2] == "00"
                            koma = (w for w in @board.pieces when w.posi.length == 0 && w.turn == turn && w.koma() == v[5..6])
                        else
                            koma = (w for w in @board.pieces when w.posi? && w.turn == turn && w.posi[0] == from[0] && w.posi[1] == from[1])
                        throw "05:Line = #{i + 1}: #{v}" if koma.length == 0
                        to = [v[3], v[4]].map(Number)
                        throw "08:Line = #{i + 1}: #{v}" unless checkKind.call @, v[5..6]
                        if @board.check_move(koma[0], to)
                            from = @board.move_capture(koma[0], to)
                            # 駒の種類が変わっていたら成ったと見做す
                            koma[0].status = Const.Status.URA if koma[0].koma() != v[5..6]
                        else
                            throw "06:Line = #{i + 1}: #{v}"
                        @md5hash = GameGUI.make_hash(@board)
                        @seq += 1
                        @addState(@md5hash, to, from, to, koma[0].koma())
                    else
                        throw "07:Line= #{i + 1}: #{v}"
        catch err
            console.log("Error: #{err}")
            @kifustatus.innerHTML = "Error: #{err}"
        finally
            if err?
                return false
            else
                @kifustatus.innerHTML = ""
                return true

    # ゲーム開始毎
    prepare: ->
        # console.log("GameGUI.prepare")
        @interrupt_flg = false; @auto_flg = false
        @history = []
        @duplication = []
        @seq = 0
        $('[id=naviSeq]').text('')
        $("[id=btnStart]").prop("disabled", true);@startbtn = true; $("[id=btnStop]").val(i18next.t('msgInterrupt')).button("refresh")
        $('[id=naviA]').hide()
        $('[id=spanStatus]').html(i18next.t('msgTurn', {postProcess: 'sprintf', sprintf: [i18next.t('msgBlack')]}))
        @teban = @first
        radioNo = 0
        @board.set_standard()
        @normal_weight()
        @set_gravity(1.0)
        @board.latest = []
        @addState(null, radioNo)
        @board.display(@reverse, @board.fonts)
        try
            @first_player.selectedIndex = parseInt(localStorage.getItem("first_playerTori")|0, 10)
            @second_player.selectedIndex = parseInt(localStorage.getItem("second_playerTori")|0, 10)
        catch err
            @first_player.selectedIndex = 0
            @second_player.selectedIndex = 0
        @first.human = if @first_player.selectedIndex == 1 then false else true
        @second.human = if @second_player.selectedIndex == 1 then false else true

    set_gravity: (seq) ->
        for v in @board.pieces
            v.gravity = seq
        return
    normal_weight: ->
        Piece.Ka.weight = [60, 60, 48]
        Piece.Ki.weight = [30, 30, 24]
        Piece.Gi.weight = [70, 70, 56]
        Piece.Ke.weight = [70, 70, 56]
        Piece.Ky.weight = [70, 160, 56]
        Piece.Fu.weight = [10, 20, 12]
        return
    auto_battle: (@seq) ->
        # console.log("auto_battle")
        @auto_flg = true
        if @teban.turn == Const.FIRST
            player = @first
            oppo = @second
            threshold = Const.MAX_VALUE
        else
            player = @second
            oppo = @first
            threshold = Const.MIN_VALUE
        temp = []; ret = []
        for i in [0,1,player.depth].unique()
            temp = []
            if i >= 2
                temp = player.prepare(@board, oppo, i, threshold)
            else
                player.pre_ahead = 0; oppo.pre_ahead = 0
                temp = player.think(@board, oppo, i, threshold)
            if @interrupt_flg
                @auto_flg = false
                $('[id=spanStatus]').html("")
                return
            if temp[0]?
                ret = [].concat(temp)
                break if (temp[2] >= Const.MAX_VALUE || temp[2] <= Const.MIN_VALUE)
            else
                break
        if ret[0]
            # 一手前のハッシュ値ですでに千日手判定されていればreturn
            chk_sennitite =  @sennitite(@md5hash)
            if chk_sennitite
                @board.latest = ret[1]; @board.display(@reverse, @board.fonts)
                @auto_flg = false
                return
            else if chk_sennitite == null && ret[4]["koma"]?
                ret[0] = ret[4]["koma"]
                ret[1] = ret[4]["posi"]
                ret[2] = ret[4]["score"]
                ret[3] = ret[4]["status"]
            if @board.check_move(ret[0], ret[1])
                src_posi = @board.move_capture(ret[0], ret[1])
                ret[0].status = ret[3]
            @md5hash = GameGUI.make_hash(@board)
            @seq += 1
            @addState(@md5hash, ret[1], src_posi, ret[1], ret[0].koma())
            if @history[0]["latest"]?
                @writeFile(Const.TEMP_HISTORY, @history);@writeFile(Const.TEMP_DUPLICATION, @duplication)
            if @sennitite(@md5hash)
                @board.latest = ret[1]; @board.display(@reverse, @board.fonts)
                @auto_flg = false
                return
            @teban = if (@seq % 2) == 0 then @first else @second
            if @teban.turn == Const.FIRST
                msgStr = i18next.t('msgTurn', {postProcess: 'sprintf', sprintf: [i18next.t('msgBlack')]})
                $('[id=spanStatus]').html(msgStr)
            else
                msgStr = i18next.t('msgTurn', {postProcess: 'sprintf', sprintf: [i18next.t('msgWhite')]})
                $('[id=spanStatus]').html(msgStr)
            $('[id=spanStatus]').html(msgStr + i18next.t('msgEvaluate', {postProcess: 'sprintf', sprintf: [ret[2].toString()]}))
        else
            if @teban.turn == Const.FIRST
                msgStr = i18next.t('msgWinner', {postProcess: 'sprintf', sprintf: [i18next.t('msgWhite')]})
                $('[id=spanStatus]').html(msgStr)
            else
                msgStr = i18next.t('msgWinner', {postProcess: 'sprintf', sprintf: [i18next.t('msgBlack')]})
                $('[id=spanStatus]').html(msgStr)
            $("[id=btnStart]").prop("disabled", false);@startbtn = false; $("[id=btnStop]").val(i18next.t('msgRestart')).button("refresh")
            $('[id=naviA]').show()
            @auto_flg = false
            return
        @board.latest = ret[1]; @board.display(@reverse, @board.fonts)
        if @interrupt_flg
            @auto_flg = false
            $('[id=spanStatus]').html("")
            return
        else
            if @auto_flg
                setTimeout (=>
                    @auto_battle(@seq)
                    ), 1000
        return

    # 起動時
    init: ->
        # console.log("GameGUI.init")
        @startbtn = null
        @first_player = document.getElementById("first_player")
        @second_player = document.getElementById("second_player")
        @radio_depth_f = document.getElementsByName("f-radio-depth")
        @radio_depth_s = document.getElementsByName("s-radio-depth")
        @radio_fonts = document.getElementsByName("radio-fonts")
        @kifustatus = document.getElementById("kifuStatus")
        # @naviA = document.getElementById("naviA")
        # @naviA.style.display = "none"
        @board.set_standard()
        try
            @reverse = false
            temp = JSON.parse(localStorage.getItem("movement_guideTori"))
            if temp == false
                @check_guide = false
                $("#check-guide").prop("checked", false)
            else
                @check_guide = true
                $("#check-guide").prop("checked", true)
            @first_player.selectedIndex = parseInt(localStorage.getItem("first_playerTori")|0, 10)
            @second_player.selectedIndex = parseInt(localStorage.getItem("second_playerTori")|0, 10)
            @first_player.dispatchEvent(new Event('change', {bubbles: true}))
            @second_player.dispatchEvent(new Event('change', {bubbles: true}))

            depth_f = parseInt(localStorage.getItem("f-radio-depthTori")|0, 10)
            depth_s = parseInt(localStorage.getItem("s-radio-depthTori")|0, 10)
            # if depth_f == 3
            #     @radio_depth_f[3].checked = true
            #     @first.depth = 4; @first.pre_select = 100
            if depth_f == 2
                @radio_depth_f[2].checked = true
                @first.depth = 3; @first.pre_select = 20
            else if depth_f == 1
                @radio_depth_f[1].checked = true
                @first.depth = 2; @first.pre_select = 40
            else
                @radio_depth_f[0].checked = true
                @first.depth = 1; @first.pre_select = 80
            # if depth_s == 3
            #     @radio_depth_s[3].checked = true
            #     @second.depth = 4; @second.pre_select = 100
            if depth_s == 2
                @radio_depth_s[2].checked = true
                @second.depth = 3; @second.pre_select = 20
            else if depth_s == 1
                @radio_depth_s[1].checked = true
                @second.depth = 2; @second.pre_select = 40
            else
                @radio_depth_s[0].checked = true
                @second.depth = 1; @second.pre_select = 80
            $("#level-first input[type='radio']").checkboxradio()
            $("#level-first input[type='radio']").checkboxradio('refresh')
            $("#level-second input[type='radio']").checkboxradio()
            $("#level-second input[type='radio']").checkboxradio('refresh')
            if @first_player.selectedIndex == 0
                $("#level-first input[type='radio']").checkboxradio('disable')
            else
                $("#level-first input[type='radio']").checkboxradio('enable')
            if @second_player.selectedIndex == 0
                $("#level-second input[type='radio']").checkboxradio('disable');
            else
                $("#level-second input[type='radio']").checkboxradio('enable');
            @board.fonts = parseInt(localStorage.getItem("radio-fontsTori")|0, 10)
            if @board.fonts == 2
                @radio_fonts[2].checked = true
                @radio_fonts[2].dispatchEvent(new Event('change', {bubbles: true}))
            else if @board.fonts == 1
                @radio_fonts[1].checked = true
                @radio_fonts[1].dispatchEvent(new Event('change', {bubbles: true}))
            else
                @radio_fonts[0].checked = true
                @radio_fonts[0].dispatchEvent(new Event('change', {bubbles: true}))
            setTimeout (=>
                event = new ($.Event)('special')
                $(document).trigger event
                ),500
        catch err
            console.log("=== Error ===")
            console.log(err)
            @first_player.selectedIndex = 0
            @second_player.selectedIndex = 0
            @radio_depth_f[0].checked = true
            @radio_depth_s[0].checked = true
            @radio_fonts[0].checked = true

        $('#btnRecord1').on 'click', (e) =>
            @makeRecord()
            return
        $('#btnRecord2').on 'click', (e) =>
            @makeRecord()
            return
        $('#btnReverse').on 'click', (e) =>
            @reverse = if @reverse then false else true
            @board.display(@reverse, @board.fonts)
            return
        $('#btnKifu').on 'click', (e) =>
            if @inputRecord()
                $('[id=naviSeq]').text('')
                @interrupt_flg = true
                $("[id=btnStop]").val(i18next.t('msgRestart')).button("refresh")
                $("[id=btnStart]").prop("disabled", false);@startbtn = false
                $('[id=naviA]').show()
                $('[id=spanStatus]').html("")
                window.changePage?('#home')
                @viewState()
            return
        $('[id=btnStart]').on 'click', (e) =>
            target = $(e.currentTarget)
            @prepare()
            @first.human = if @first_player.selectedIndex == 1 then false else true
            @second.human = if @second_player.selectedIndex == 1 then false else true
            if !@first.human && !@second.human
                $('[id=spanStatus]').html(i18next.t('msgThinking'))
                @board.display(@reverse, @board.fonts)
                setTimeout (=>
                    @auto_battle(@seq)
                    ), 1000
            else if not @first.human
                $('[id=spanStatus]').html(i18next.t('msgThinking'))
                setTimeout (=>
                    event = new ($.Event)('ai_thinking')
                    $(window).trigger event
                    ),500
            return

        $('[id=naviStart]').on 'click', (e) =>
            @seq = 0
            @viewState()
            return
        $('[id=naviPrev]').on 'click', (e) =>
            @seq -= 1 if @seq > 0
            @viewState()
            return
        $('[id=naviFollow]').on 'click', (e) =>
            @seq += 1 if @seq < (@history.length - 1)
            @viewState()
            return
        $('[id=naviEnd]').on 'click', (e) =>
            @seq = @history.length - 1
            @viewState()
            return
        for i in [1..7]
            for j in [1..7]
                $('[id=b' + i.toString() + j.toString() + ']').on 'click', (e) =>
                    @select([Number(e.currentTarget.dataset.col), Number(e.currentTarget.dataset.row)])
                    return
        $('[id=sFu]').on 'click', (e) =>
            @motigoma((if e.currentTarget.id[0] == "s" then Const.SECOND else Const.FIRST), e.currentTarget.id[1..2])
            return
        $('[id=sHi]').on 'click', (e) =>
            @motigoma((if e.currentTarget.id[0] == "s" then Const.SECOND else Const.FIRST), e.currentTarget.id[1..2])
            return
        $('[id=sKa]').on 'click', (e) =>
            @motigoma((if e.currentTarget.id[0] == "s" then Const.SECOND else Const.FIRST), e.currentTarget.id[1..2])
            return
        $('[id=sKi]').on 'click', (e) =>
            @motigoma((if e.currentTarget.id[0] == "s" then Const.SECOND else Const.FIRST), e.currentTarget.id[1..2])
            return
        $('[id=sGi]').on 'click', (e) =>
            @motigoma((if e.currentTarget.id[0] == "s" then Const.SECOND else Const.FIRST), e.currentTarget.id[1..2])
            return
        $('[id=sKe]').on 'click', (e) =>
            @motigoma((if e.currentTarget.id[0] == "s" then Const.SECOND else Const.FIRST), e.currentTarget.id[1..2])
            return
        $('[id=sKy]').on 'click', (e) =>
            @motigoma((if e.currentTarget.id[0] == "s" then Const.SECOND else Const.FIRST), e.currentTarget.id[1..2])
            return
        $('[id=fFu]').on 'click', (e) =>
            @motigoma((if e.currentTarget.id[0] == "s" then Const.SECOND else Const.FIRST), e.currentTarget.id[1..2])
            return
        $('[id=fHi]').on 'click', (e) =>
            @motigoma((if e.currentTarget.id[0] == "s" then Const.SECOND else Const.FIRST), e.currentTarget.id[1..2])
            return
        $('[id=fKa]').on 'click', (e) =>
            @motigoma((if e.currentTarget.id[0] == "s" then Const.SECOND else Const.FIRST), e.currentTarget.id[1..2])
            return
        $('[id=fKi]').on 'click', (e) =>
            @motigoma((if e.currentTarget.id[0] == "s" then Const.SECOND else Const.FIRST), e.currentTarget.id[1..2])
            return
        $('[id=fGi]').on 'click', (e) =>
            @motigoma((if e.currentTarget.id[0] == "s" then Const.SECOND else Const.FIRST), e.currentTarget.id[1..2])
            return
        $('[id=fKe]').on 'click', (e) =>
            @motigoma((if e.currentTarget.id[0] == "s" then Const.SECOND else Const.FIRST), e.currentTarget.id[1..2])
            return
        $('[id=fKy]').on 'click', (e) =>
            @motigoma((if e.currentTarget.id[0] == "s" then Const.SECOND else Const.FIRST), e.currentTarget.id[1..2])
            return
        $('#btnMenu').on 'click', (e) =>
            e.preventDefault?()
            if @startbtn
                @interrupted()
            window.changePage?('#win_menu')
            return
        $('[id=btnStop]').on 'click', (e) =>
            @interrupted()
        $('#btnCheckLeft').on 'click', (e) =>
            $('#popupCheckLeft').popup("close")
        $('#btnDropPawnMate').on 'click', (e) =>
            $('#popupDropPawnMate').popup("close")
        $('input[name=radio-fonts]').change ->
            idx = $('input[name=radio-fonts]:checked').val()
            try
                localStorage.setItem("radio-fontsTori", idx)
                setTimeout (=>
                    event = new ($.Event)('after_fonts')
                    $(document).trigger event
                ),500
            catch err
                console.log(err)
        $('input[name="f-radio-depth"]').on 'change', (e) =>
            target = $(e.currentTarget)
            try
                # if @radio_depth_f[3].checked
                #     localStorage.setItem("f-radio-depth77", 3)
                #     @first.depth = 4; @first.pre_select = 100
                if @radio_depth_f[2].checked
                    localStorage.setItem("f-radio-depthTori", 2)
                    @first.depth = 3; @first.pre_select = 20
                else if @radio_depth_f[1].checked
                    localStorage.setItem("f-radio-depthTori", 1)
                    @first.depth = 2; @first.pre_select = 40
                else
                    localStorage.setItem("f-radio-depthTori", 0)
                    @first.depth = 1; @first.pre_select = 80
            catch err
                console.log(err)
        $('input[name="s-radio-depth"]').on 'change', (e) =>
            target = $(e.currentTarget)
            try
                # if @radio_depth_s[3].checked
                #     localStorage.setItem("s-radio-depth77", 3)
                #     @second.depth = 4; @second.pre_select = 100
                if @radio_depth_s[2].checked
                    localStorage.setItem("s-radio-depthTori", 2)
                    @second.depth = 3; @second.pre_select = 20
                else if @radio_depth_s[1].checked
                    localStorage.setItem("s-radio-depthTori", 1)
                    @second.depth = 2; @second.pre_select = 40
                else
                    localStorage.setItem("s-radio-depthTori", 0)
                    @second.depth = 1; @second.pre_select = 80
            catch err
                console.log(err)
        $('#check-guide').on 'change', (e) =>
            try
                @check_guide = e.currentTarget.checked
                localStorage.setItem("movement_guideTori", @check_guide)
            catch err
                console.log(err)
        $('#first_player').on 'change', (e) =>
            target = $(e.currentTarget)
            try
                if target.prop('selectedIndex') == 0
                    $("#level-first input[type='radio']").checkboxradio('disable');
                else
                    $("#level-first input[type='radio']").checkboxradio('enable');
                localStorage.setItem("first_playerTori", target.prop('selectedIndex'))
            catch err
                console.log(err)
        $('#second_player').on 'change', (e) =>
            target = $(e.currentTarget)
            try
                if target.prop('selectedIndex') == 0
                    $("#level-second input[type='radio']").checkboxradio('disable');
                else
                    $("#level-second input[type='radio']").checkboxradio('enable');
                localStorage.setItem("second_playerTori", target.prop('selectedIndex'))
            catch err
                console.log(err)

    interrupted: ->
        # console.log("Game.interrupted")
        return unless @seq?
        if @startbtn
            @interrupt_flg = true
            $("[id=btnStop]").val(i18next.t('msgRestart')).button("refresh")
            $("[id=btnStart]").prop("disabled", false);@startbtn = false
            $('[id=naviA]').show()
            $('[id=spanStatus]').html("")
        else
            @interrupt_flg = false
            $("[id=btnStop]").val(i18next.t('msgInterrupt')).button("refresh")
            $("[id=btnStart]").prop("disabled", true);@startbtn = true
            $('[id=naviA]').hide()
            if (@seq % 2) == 0
                $('[id=spanStatus]').html(i18next.t('msgTurn', {postProcess: 'sprintf', sprintf: [i18next.t('msgBlack')]}))
            else
                $('[id=spanStatus]').html(i18next.t('msgTurn', {postProcess: 'sprintf', sprintf: [i18next.t('msgWhite')]}))
            @teban = if (@seq % 2) == 0 then @first else @second
            @first_player.selectedIndex = parseInt(localStorage.getItem("first_playerTori")|0, 10)
            @second_player.selectedIndex = parseInt(localStorage.getItem("second_playerTori")|0, 10)
            @first.human = if @first_player.selectedIndex == 1 then false else true
            @second.human = if @second_player.selectedIndex == 1 then false else true
            @history.splice(@seq + 1); @duplication.splice(@seq + 1)
            if !@first.human && !@second.human
                $('[id=spanStatus]').html(i18next.t('msgThinking'))
                setTimeout (=>
                    @auto_battle(@seq)
                    ), 1000
            else if not @teban.human
                $('[id=spanStatus]').html(i18next.t('msgThinking'))
                setTimeout (=>
                    event = new ($.Event)('ai_thinking')
                    $(window).trigger event
                    ),500
            else
                return if @sennitite(GameGUI.make_hash(@board))
                ret = []
                oppo = if (@teban.turn == Const.FIRST) then @second else @first
                threshold = if (@teban.turn == Const.FIRST) then Const.MAX_VALUE else Const.MIN_VALUE
                @teban.pre_ahead = 0; oppo.pre_ahead = 0
                ret = @teban.think(@board, oppo, 0, threshold)
                unless ret[0]
                    switch ret[2]
                        when Const.MAX_VALUE
                            $('[id=spanStatus]').html(i18next.t('msgFirstWin'))
                            $("[id=btnStart]").prop("disabled", false);@startbtn = false; $("[id=btnStop]").val(i18next.t('msgRestart')).button("refresh")
                            $('[id=naviA]').show()
                        when Const.MIN_VALUE
                            $('[id=spanStatus]').html(i18next.t('msgSecondWin'))
                            $("[id=btnStart]").prop("disabled", false);@startbtn = false; $("[id=btnStop]").val(i18next.t('msgRestart')).button("refresh")
                            $('[id=naviA]').show()
                        else
                            console.log("Error!")
                    @board.display(@reverse, @board.fonts)
        return

    sennitite: (h) ->
        b = (v for v in @duplication when v == h)
        if b.length == 3
            return null
        else if b.length >= 4
            $('[id=spanStatus]').html(i18next.t('msgSennitite'))
            $("[id=btnStart]").prop("disabled", false);@startbtn = false; $("[id=btnStop]").val(i18next.t('msgRestart')).button("refresh")
            $('[id=naviA]').show()
            return true
        else
            return false

    routine: (piece, posi, nari) ->
        # console.log("routine")
        src_posi = @board.move_capture(piece, posi)
        piece.status = Const.Status.URA if nari
        @md5hash = GameGUI.make_hash(@board)
        @seq += 1
        @addState(@md5hash, posi, src_posi, posi, piece.koma())
        if @history[0]["latest"]?
            @writeFile(Const.TEMP_HISTORY, @history);@writeFile(Const.TEMP_DUPLICATION, @duplication)
        if @sennitite(@md5hash)
            @board.latest = posi; @board.display(@reverse, @board.fonts)
            return
        @teban = if (@seq % 2) == 0 then @first else @second
        threshold = if @teban.turn == Const.FIRST then Const.MAX_VALUE else Const.MIN_VALUE
        switch @board.gameover()
            when Const.FIRST
                $('[id=spanStatus]').html(i18next.t('msgFirstWin'))
                $("[id=btnStart]").prop("disabled", false);@startbtn = false; $("[id=btnStop]").val(i18next.t('msgRestart')).button("refresh")
                $('[id=naviA]').show()
                @board.latest = posi; @board.display(@reverse, @board.fonts)
                return
            when Const.SECOND
                $('[id=spanStatus]').html(i18next.t('msgSecondWin'))
                $("[id=btnStart]").prop("disabled", false);@startbtn = false; $("[id=btnStop]").val(i18next.t('msgRestart')).button("refresh")
                $('[id=naviA]').show()
                @board.latest = posi; @board.display(@reverse, @board.fonts)
                return
            else
                if @teban.turn == Const.FIRST
                    $('[id=spanStatus]').html(i18next.t('msgTurn', {postProcess: 'sprintf', sprintf: [i18next.t('msgBlack')]}))
                else
                    $('[id=spanStatus]').html(i18next.t('msgTurn', {postProcess: 'sprintf', sprintf: [i18next.t('msgWhite')]}))
        @s_posi = null; @d_posi = null
        @board.latest = posi; @board.display(@reverse, @board.fonts)
        if @teban.human
            oppo = if @teban.turn == Const.FIRST then @second else @first
            ret = []
            # 詰みチェック
            @teban.pre_ahead = 0; oppo.pre_ahead = 0
            ret = @teban.think(@board, oppo, 0, threshold)
            unless ret[0]
                if @teban.turn == Const.FIRST
                    $('[id=spanStatus]').html(i18next.t('msgWinner', {postProcess: 'sprintf', sprintf: [i18next.t('msgWhite')]}))
                else
                    $('[id=spanStatus]').html(i18next.t('msgWinner', {postProcess: 'sprintf', sprintf: [i18next.t('msgBlack')]}))
                $("[id=btnStart]").prop("disabled", false);@startbtn = false; $("[id=btnStop]").val(i18next.t('msgRestart')).button("refresh")
                $('[id=naviA]').show()
                return
        else
            $('[id=spanStatus]').html(i18next.t('msgThinking'))
            setTimeout (=>
                event = new ($.Event)('ai_thinking')
                $(window).trigger event
                ),500

    touch: (piece, posi) ->
        # console.log("touch")
        return unless @startbtn
        return if @auto_flg
        unless piece?
            @s_posi = null
            return
        dest = (v for v in @board.pieces when v.posi? && v.posi.toString() == posi.toString())
        if dest.length != 0 && dest[0].turn == piece.turn
            @s_posi = null
            return
        move_piece = new Piece.Piece(piece.turn, piece.status, [].concat(piece.posi))
        if dest.length != 0
            dest_piece = new Piece.Piece(dest[0].turn, dest[0].status, [].concat(dest[0].posi))
        if @board.check_move(piece, posi)
            @board.move_capture(piece, posi)
        else
            @s_posi = null
            return

        if @teban.turn == Const.FIRST
            player = @second
            oppo = @first
            threshold = Const.MIN_VALUE
        else
            player = @first
            oppo = @second
            threshold = Const.MAX_VALUE
        @board.make_kiki(player.turn)
        king = (v for v in @board.pieces when v.name == 'Ou' && v.turn == @teban.turn)[0]

        if (king.posi.toString() in @board.kiki[player.turn].map (o) -> o.toString())
            $('#popupCheckLeft').popup("open")
            @s_posi = null
            piece.turn = move_piece.turn
            piece.status = move_piece.status
            piece.posi = move_piece.posi
            if dest.length != 0
                dest[0].turn = dest_piece.turn
                dest[0].status = dest_piece.status
                dest[0].posi = dest_piece.posi
            return

        if piece.name == 'Fu' && move_piece.status == Const.Status.MOTIGOMA
            ret = []
            player.pre_ahead = 0; oppo.pre_ahead = 0
            ret = player.think(@board, oppo, 0, threshold)
            if ret[2] >= Const.MAX_VALUE || ret[2] <= Const.MIN_VALUE
                if is_oute.call @, piece, posi
                    $('#popupDropPawnMate').popup("open")
                    @s_posi = null
                    piece.turn = move_piece.turn
                    piece.status = move_piece.status
                    piece.posi = move_piece.posi
                    return
        piece.turn = move_piece.turn
        piece.status = move_piece.status
        piece.posi = move_piece.posi
        if dest.length != 0
            dest[0].turn = dest_piece.turn
            dest[0].status = dest_piece.status
            dest[0].posi = dest_piece.posi

        if @board.check_move(piece, posi)
            if @board.check_promotion(piece, posi)
                @posi = posi
                @routine(piece, posi, true)
            else
                @routine(piece, posi, false)
        else
            @s_posi = null
        return

    motigoma: (turn, kind) ->
        # console.log("motigoma")
        return unless @startbtn
        $('[id=b' + @pre_posi[0] + @pre_posi[1] + ']').css('background-color', '#FFFACD') if @pre_posi
        @selected = (v for v in @board.pieces when v.turn == turn && v.name == kind && v.status == Const.Status.MOTIGOMA && v.turn == @teban.turn)[0]
        if @selected?
            @s_posi = not null
        return

    select: (posi) ->
        # console.log("select")
        $('[id=b' + posi[0] + posi[1] + ']').css('background-color', '#FFFACD')
        if !@s_posi
            @s_posi = posi
            @selected = (v for v in @board.pieces when v.posi? && v.posi.toString() == posi.toString() && v.turn == @teban.turn)[0]
            if @selected?
                $('[id=b' + posi[0] + posi[1] + ']').css('background-color', '#E3D7A6')
                @pre_posi = posi
                @guide(@selected) if @check_guide
            else
                @s_posi = null
        else
            @d_posi = posi
            if @pre_posi
                $('[id=b' + @pre_posi[0] + @pre_posi[1] + ']').css('background-color', '#FFFACD')
                for c in [1..@board.cols]
                    for r in [1..@board.rows]
                        unless ((r == posi[1]) && (c == posi[0]))
                            $('[id=b' + c.toString() + r.toString() + ']').css('background-color', '#FFFACD')
            @touch(@selected, @d_posi)
        return

    guide: (piece) ->
        # console.log("GameGUI.guide")
        for v in getClass(piece.name).getD(piece.turn, piece.status)
            buf = [].concat(piece.posi)
            buf[0] += v.xd; buf[1] += v.yd
            if v.series > 0
                cnt = v.series
                while (buf[0] in [1..@board.cols]) && (buf[1] in [1..@board.rows]) && cnt > 0
                    dest = (w for w in @board.pieces when w.posi? && w.posi[0] == buf[0] && w.posi[1] == buf[1])
                    if dest.length != 0
                        if (piece.turn != dest[0].turn)
                            $('[id=b' + buf[0].toString() + buf[1].toString() + ']').css('background-color', '#E6E6E6')
                        break
                    else
                        $('[id=b' + buf[0].toString() + buf[1].toString() + ']').css('background-color', '#E6E6E6')
                    buf[0] += v.xd; buf[1] += v.yd
                    cnt -= 1
            else
                dest = (w for w in @board.pieces when w.posi? && w.posi[0] == buf[0] && w.posi[1] == buf[1])
                if dest.length != 0
                    if (piece.turn != dest[0].turn)
                        $('[id=b' + buf[0].toString() + buf[1].toString() + ']').css('background-color', '#E6E6E6')
                else
                    if (buf[0] in [1..@board.cols]) && (buf[1] in [1..@board.rows])
                        $('[id=b' + buf[0].toString() + buf[1].toString() + ']').css('background-color', '#E6E6E6')
        return

    toast: (piece) ->
        # console.log("toast")
        toastStr = @getMovement(piece)
        return if toastStr == ""
        window.plugins.toast.showWithOptions
            message: toastStr
            duration: 'long'
            position: 'center'
            styling:
                opacity: 0.75
                backgroundColor: '#E6E6E6'
                textColor: '#000000'
                textSize: 28
                cornerRadius: 16
        return
    getMovement: (piece) ->
        # console.log("getMovement")
        ret = ""
        return ret unless piece?
        switch piece.name
            when "Ou"
                ret = "
                    |　|　|　|　|　|\n
                    |　|◯|◯|◯|　|\n
                    |　|◯|●|◯|　|\n
                    |　|◯|◯|◯|　|\n
                    |　|　|　|　|　|\n
                "
            when "Ky"
                if piece.status == Const.Status.URA
                    if piece.turn == Const.FIRST
                        ret = "
                            |＼|　|　|　|／|\n
                            |　|＼|◯|／|　|\n
                            |　|◯|●|◯|　|\n
                            |　|◯|｜|◯|　|\n
                            |◯|　|｜|　|◯|\n
                        "
                    else
                        ret = "
                            |◯|　|｜|　|◯|\n
                            |　|◯|｜|◯|　|\n
                            |　|◯|●|◯|　|\n
                            |　|／|◯|＼|　|\n
                            |／|　|　|　|＼|\n
                        "
                else
                    if piece.turn == Const.FIRST
                        ret = "
                            |　|　|　|　|　|\n
                            |　|◯|◯|◯|　|\n
                            |　|◯|●|◯|　|\n
                            |　|◯|　|◯|　|\n
                            |　|　|　|　|　|\n
                        "
                    else
                        ret = "
                            |　|　|　|　|　|\n
                            |　|◯|　|◯|　|\n
                            |　|◯|●|◯|　|\n
                            |　|◯|◯|◯|　|\n
                            |　|　|　|　|　|\n
                        "
            when "Ka"
                ret = "
                    |　|　|　|　|　|\n
                    |　|◯|◯|◯|　|\n
                    |　|　|●|　|　|\n
                    |　|◯|◯|◯|　|\n
                    |　|　|　|　|　|\n
                "
            when "Ki"
                if piece.turn == Const.FIRST
                    ret = "
                        |　|　|☆|　|　|\n
                        |　|　|　|　|　|\n
                        |　|　|●|　|　|\n
                        |　|◯|　|◯|　|\n
                        |　|　|　|　|　|\n
                    "
                else
                    ret = "
                        |　|　|　|　|　|\n
                        |　|◯|　|◯|　|\n
                        |　|　|●|　|　|\n
                        |　|　|　|　|　|\n
                        |　|　|☆|　|　|\n
                    "
            when "Gi"
                if piece.turn == Const.FIRST
                    ret = "
                        |　|　|｜|　|　|\n
                        |　|　|｜|　|　|\n
                        |　|　|●|　|　|\n
                        |　|◯|　|＼|　|\n
                        |　|　|　|　|＼|\n
                    "
                else
                    ret = "
                        |＼|　|　|　|　|\n
                        |　|＼|　|◯|　|\n
                        |　|　|●|　|　|\n
                        |　|　|｜|　|　|\n
                        |　|　|｜|　|　|\n
                    "
            when "Ke"
                if piece.turn == Const.FIRST
                    ret = "
                        |　|　|｜|　|　|\n
                        |　|　|｜|　|　|\n
                        |　|　|●|　|　|\n
                        |　|／|　|◯|　|\n
                        |／|　|　|　|　|\n
                    "
                else
                    ret = "
                        |　|　|　|　|／|\n
                        |　|◯|　|／|　|\n
                        |　|　|●|　|　|\n
                        |　|　|｜|　|　|\n
                        |　|　|｜|　|　|\n
                    "
            when "Fu"
                if piece.status == Const.Status.URA
                    if piece.turn == Const.FIRST
                        ret = "
                            |☆|　|　|　|☆|\n
                            |　|　|　|　|　|\n
                            |　|　|●|　|　|\n
                            |　|　|　|　|　|\n
                            |　|　|☆|　|　|\n
                        "
                    else
                        ret = "
                            |　|　|☆|　|　|\n
                            |　|　|　|　|　|\n
                            |　|　|●|　|　|\n
                            |　|　|　|　|　|\n
                            |☆|　|　|　|☆|\n
                        "
                else
                    if piece.turn == Const.FIRST
                        ret = "
                            |　|　|　|　|　|\n
                            |　|　|◯|　|　|\n
                            |　|　|●|　|　|\n
                            |　|　|　|　|　|\n
                            |　|　|　|　|　|\n
                        "
                    else
                        ret = "
                            |　|　|　|　|　|\n
                            |　|　|　|　|　|\n
                            |　|　|●|　|　|\n
                            |　|　|◯|　|　|\n
                            |　|　|　|　|　|\n
                        "
        return ret

    setBoardSize: (w, h) ->
        if w <= h
            @board.width = w * 0.70
            @board.height = w * 0.70
        else
            @board.width = h * 0.70
            @board.height = h * 0.70
        return

    checkHistoryFile: ->
        # console.log("GameGUI.checkHistoryFile")
        data = localStorage.getItem(Const.TEMP_HISTORY)
        if data?
            @history = JSON.parse(data)
            @seq = @history.length - 1
            @checkDuplicationFile()
        else
            @board.display(false, @board.fonts)
        $('[id=naviSeq]').text('')
        @interrupt_flg = true
        $("[id=btnStop]").val(i18next.t('msgRestart')).button("refresh")
        $("[id=btnStart]").prop("disabled", false);@startbtn = false
        $('[id=naviA]').show()
        $('[id=spanStatus]').html("")
        @viewState()
        return

    checkDuplicationFile: ->
        # console.log("GameGUI.checkDuplicationFile")
        data = localStorage.getItem(Const.TEMP_DUPLICATION)
        if data?
            @duplication = JSON.parse(data)
            @md5hash = @duplication[@duplication.length - 1]
        return

    writeFile: (fname, data) ->
        # console.log("GameGUI.writeFile")
        localStorage.setItem(fname, JSON.stringify(data));
        return

    setEventListener: ->
        $(document).on 'special', (e) =>
            # console.log("special")
            appLanguage = if (navigator.language or 'ja').toLowerCase().startsWith('ja') then 'ja' else 'en'
            localStorage.setItem("appLanguage", appLanguage)
            BoardGUI.appLocalize()
            @board.pieces = []
            @prepare()
            @checkHistoryFile()
            @checkDuplicationFile()
            return
        $(document).on 'after_fonts', (e) =>
            @board.fonts = parseInt(localStorage.getItem("radio-fontsTori")|0, 10)
            return
        $(window).on 'ai_thinking', (e) =>
            # console.log("ai_thinking")
            if @teban.turn == Const.FIRST
                player = @first
                oppo = @second
                player_threshold = Const.MAX_VALUE
                oppo_threshold = Const.MIN_VALUE
            else
                player = @second
                oppo = @first
                player_threshold = Const.MIN_VALUE
                oppo_threshold = Const.MAX_VALUE
            temp = []; ret = []
            # 対人戦の場合は相手玉を取るまで指す
            for i in [0,1,player.depth].unique()
                temp = []
                if i >= 2
                    temp = player.prepare(@board, oppo, i, player_threshold)
                else
                    player.pre_ahead = 0; oppo.pre_ahead = 0
                    temp = player.think(@board, oppo, i, player_threshold)
                if temp[0]?
                    ret = [].concat(temp)
                    break if (temp[2] >= Const.MAX_VALUE || temp[2] <= Const.MIN_VALUE)
                else
                    break
            if ret[0]
                # 一手前のハッシュ値ですでに千日手判定されていればreturn
                chk_sennitite =  @sennitite(@md5hash)
                if chk_sennitite
                    @board.latest = ret[1]; @board.display(@reverse, @board.fonts)
                    return
                else if chk_sennitite == null && ret[4]["koma"]?
                    ret[0] = ret[4]["koma"]
                    ret[1] = ret[4]["posi"]
                    ret[2] = ret[4]["score"]
                    ret[3] = ret[4]["status"]
                if @board.check_move(ret[0], ret[1])
                    src_posi = @board.move_capture(ret[0], ret[1])
                    ret[0].status = ret[3]
                @md5hash = GameGUI.make_hash(@board)
                @seq += 1
                @addState(@md5hash, ret[1], src_posi, ret[1], ret[0].koma())
                if @history[0]["latest"]?
                    @writeFile(Const.TEMP_HISTORY, @history);@writeFile(Const.TEMP_DUPLICATION, @duplication)
                if @sennitite(@md5hash)
                    @board.latest = ret[1]; @board.display(@reverse, @radio_fonts[2].checked)
                    return
                @teban = if (@seq % 2) == 0 then @first else @second
            else
                if @teban.turn == Const.FIRST
                    $('[id=spanStatus]').html(i18next.t('msgWinner', {postProcess: 'sprintf', sprintf: [i18next.t('msgWhite')]}))
                else
                    $('[id=spanStatus]').html(i18next.t('msgWinner', {postProcess: 'sprintf', sprintf: [i18next.t('msgBlack')]}))
                $("[id=btnStart]").prop("disabled", false);@startbtn = false; $("[id=btnStop]").val(i18next.t('msgRestart')).button("refresh")
                $('[id=naviA]').show()
                return

            # 詰みチェック
            tumi = []
            player.pre_ahead = 0; oppo.pre_ahead = 0
            tumi = oppo.think(@board, player, 0, oppo_threshold)
            unless tumi[0]
                switch tumi[2]
                    when Const.MAX_VALUE
                        $('[id=spanStatus]').html(i18next.t('msgFirstWin'))
                        $("[id=btnStart]").prop("disabled", false);@startbtn = false; $("[id=btnStop]").val(i18next.t('msgRestart')).button("refresh")
                        $('[id=naviA]').show()
                    when Const.MIN_VALUE
                        $('[id=spanStatus]').html(i18next.t('msgSecondWin'))
                        $("[id=btnStart]").prop("disabled", false);@startbtn = false; $("[id=btnStop]").val(i18next.t('msgRestart')).button("refresh")
                        $('[id=naviA]').show()
                    else
                        console.log("Error!")
                @board.display(@reverse, @board.fonts)
                return
            # 相手玉が自爆しても指し手を進めてしまうのでゲーム終了チェック
            switch @board.gameover()
                when Const.FIRST
                    $('[id=spanStatus]').html(i18next.t('msgFirstWin'))
                    $("[id=btnStart]").prop("disabled", false);@startbtn = false; $("[id=btnStop]").val(i18next.t('msgRestart')).button("refresh")
                    $('[id=naviA]').show()
                when Const.SECOND
                    $('[id=spanStatus]').html(i18next.t('msgSecondWin'))
                    $("[id=btnStart]").prop("disabled", false);@startbtn = false; $("[id=btnStop]").val(i18next.t('msgRestart')).button("refresh")
                    $('[id=naviA]').show()
                else
                    if @teban.turn == Const.FIRST
                        msgStr = i18next.t('msgTurn', {postProcess: 'sprintf', sprintf: [i18next.t('msgBlack')]})
                        $('[id=spanStatus]').html(msgStr)
                    else
                        msgStr = i18next.t('msgTurn', {postProcess: 'sprintf', sprintf: [i18next.t('msgWhite')]})
                        $('[id=spanStatus]').html(msgStr)
                    $('[id=spanStatus]').html(msgStr + i18next.t('msgEvaluate', {postProcess: 'sprintf', sprintf: [ret[2].toString()]}))
            @board.latest = ret[1]; @board.display(@reverse, @board.fonts)

        $(window).on 'load', (e) =>
            # console.log("=== Load ===")
            @setBoardSize(window.innerWidth, window.innerHeight)
            @init()

    copyKifuToClipboard = (kifuText) ->
        navigator.clipboard.writeText(kifuText)
        .then ->
            alert i18next.t('msgKifuCopied')
        .catch (err) ->
            console.error err
            alert i18next.t('msgKifuError')
        return

    is_oute = (piece, d_posi) ->
        oppo = if piece.turn == Const.FIRST then Const.SECOND else Const.FIRST
        oppo_king = (v for v in @board.pieces when v.turn == oppo && v.name == 'Ou')[0]
        buf = [].concat(d_posi)
        buf[0] += getClass(piece.name).getD(piece.turn, piece.status)[0].xd
        buf[1] += getClass(piece.name).getD(piece.turn, piece.status)[0].yd
        return (oppo_king.posi.toString() == buf.toString())

    checkKind = (str) ->
        return str in ["OO", "TK", "TR", "KZ", "LU", "RU", "TB", "KT", "KR"]

    makePiece = (str, posi = null) ->
        ret = null
        switch str[1..2]
            when "OO"
                if posi == null
                    if str[0] == "+"
                        ret = new Piece.Ou(Const.FIRST, Const.Status.MOTIGOMA)
                    else
                        ret = new Piece.Ou(Const.SECOND, Const.Status.MOTIGOMA)
                else
                    if str[0] == "+"
                        ret = new Piece.Ou(Const.FIRST, Const.Status.OMOTE, posi)
                    else
                        ret = new Piece.Ou(Const.SECOND, Const.Status.OMOTE, posi)
            when "TK"
                if posi == null
                    if str[0] == "+"
                        ret = new Piece.Ky(Const.FIRST, Const.Status.MOTIGOMA)
                    else
                        ret = new Piece.Ky(Const.SECOND, Const.Status.MOTIGOMA)
                else
                    if str[0] == "+"
                        ret = new Piece.Ky(Const.FIRST, Const.Status.OMOTE, posi)
                    else
                        ret = new Piece.Ky(Const.SECOND, Const.Status.OMOTE, posi)
            when "TR"
                if posi == null
                    if str[0] == "+"
                        ret = new Piece.Ka(Const.FIRST, Const.Status.MOTIGOMA)
                    else
                        ret = new Piece.Ka(Const.SECOND, Const.Status.MOTIGOMA)
                else
                    if str[0] == "+"
                        ret = new Piece.Ka(Const.FIRST, Const.Status.OMOTE, posi)
                    else
                        ret = new Piece.Ka(Const.SECOND, Const.Status.OMOTE, posi)
            when "KZ"
                if posi == null
                    if str[0] == "+"
                        ret = new Piece.Ki(Const.FIRST, Const.Status.MOTIGOMA)
                    else
                        ret = new Piece.Ki(Const.SECOND, Const.Status.MOTIGOMA)
                else
                    if str[0] == "+"
                        ret = new Piece.Ki(Const.FIRST, Const.Status.OMOTE, posi)
                    else
                        ret = new Piece.Ki(Const.SECOND, Const.Status.OMOTE, posi)
            when "LU"
                if posi == null
                    if str[0] == "+"
                        ret = new Piece.Gi(Const.FIRST, Const.Status.MOTIGOMA)
                    else
                        ret = new Piece.Gi(Const.SECOND, Const.Status.MOTIGOMA)
                else
                    if str[0] == "+"
                        ret = new Piece.Gi(Const.FIRST, Const.Status.OMOTE, posi)
                    else
                        ret = new Piece.Gi(Const.SECOND, Const.Status.OMOTE, posi)
            when "RU"
                if posi == null
                    if str[0] == "+"
                        ret = new Piece.Ke(Const.FIRST, Const.Status.MOTIGOMA)
                    else
                        ret = new Piece.Ke(Const.SECOND, Const.Status.MOTIGOMA)
                else
                    if str[0] == "+"
                        ret = new Piece.Ke(Const.FIRST, Const.Status.OMOTE, posi)
                    else
                        ret = new Piece.Ke(Const.SECOND, Const.Status.OMOTE, posi)
            when "TB"
                if posi == null
                    if str[0] == "+"
                        ret = new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA)
                    else
                        ret = new Piece.Fu(Const.SECOND, Const.Status.MOTIGOMA)
                else
                    if str[0] == "+"
                        ret = new Piece.Fu(Const.FIRST, Const.Status.OMOTE, posi)
                    else
                        ret = new Piece.Fu(Const.SECOND, Const.Status.OMOTE, posi)
            when "KT"
                if posi == null
                    if str[0] == "+"
                        ret = new Piece.Ky(Const.FIRST, Const.Status.MOTIGOMA)
                    else
                        ret = new Piece.Ky(Const.SECOND, Const.Status.MOTIGOMA)
                else
                    if str[0] == "+"
                        ret = new Piece.Ky(Const.FIRST, Const.Status.URA, posi)
                    else
                        ret = new Piece.Ky(Const.SECOND, Const.Status.URA, posi)
            when "KR"
                if posi == null
                    if str[0] == "+"
                        ret = new Piece.Fu(Const.FIRST, Const.Status.MOTIGOMA)
                    else
                        ret = new Piece.Fu(Const.SECOND, Const.Status.MOTIGOMA)
                else
                    if str[0] == "+"
                        ret = new Piece.Fu(Const.FIRST, Const.Status.URA, posi)
                    else
                        ret = new Piece.Fu(Const.SECOND, Const.Status.URA, posi)
        return ret
