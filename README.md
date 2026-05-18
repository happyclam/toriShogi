![Banner](./docs/img/background.png)
# <ruby>禽将棋<rp>（</rp><rt>とりしょうぎ</rt><rp>）</rp></ruby>(Japanese Bird Chess)

江戸時代に日本で生まれた禽将棋です。
現代の将棋と似てますが、すべての駒に鳥の名前が付いています。
昔Androidアプリとして公開していたものを、イラスト駒を追加してPC版として公開しました。  

|駒の種類  | 楷書駒 | 毛筆駒 | イラスト駒 |
|:-----  | :-----: | :-----: | :-----: |
| 鵬<br />Ootori | <img src="./github/f_ou.svg" width="64"> | <img src="./github/f_ou_m.svg" width="64"> | <img src="./github/f_ou_image.svg" width="64"> |
| 鷹<br />Taka | <img src="./github/f_ky.svg" width="64"> | <img src="./github/f_ky_m.svg" width="64"> | <img src="./github/f_ky_image.svg" width="64"> |
| 鵰<br />Kumataka | <img src="./github/f_ny.svg" width="64"> | <img src="./github/f_ny_m.svg" width="64"> | <img src="./github/f_ny_image.svg" width="64"> |
| 鶴<br />Tsuru | <img src="./github/f_ka.svg" width="64"> | <img src="./github/f_ka_m.svg" width="64"> | <img src="./github/f_ka_image.svg" width="64"> |
| 雉<br />Kizi | <img src="./github/f_ki.svg" width="64"> | <img src="./github/f_ki_m.svg" width="64"> | <img src="./github/f_ki_image.svg" width="64"> |
| 左鶉<br />Hidari Uzura | <img src="./github/f_gi.svg" width="64"> | <img src="./github/f_gi_m.svg" width="64"> | <img src="./github/f_gi_image.svg" width="64"> |
| 右鶉<br />Migi Uzura | <img src="./github/f_ke.svg" width="64"> | <img src="./github/f_ke_m.svg" width="64"> | <img src="./github/f_ke_image.svg" width="64"> |
| 燕<br />Tsubame | <img src="./github/f_fu.svg" width="64"> | <img src="./github/f_fu_m.svg" width="64"> | <img src="./github/f_fu_image.svg" width="64"> |
| 雁<br />Kari | <img src="./github/f_to.svg" width="64"> | <img src="./github/f_to_m.svg" width="64"> | <img src="./github/f_to_image.svg" width="64"> |


# 関連記事
* [「禽将棋」アプリリリースしました](https://happyclam.github.io/software/2019-01-02/torishogi)
* [「禽将棋」アプリについて](https://happyclam.github.io/project/2019-01-03/torishogiapp)

# 機能
* 多言語UI（日本語、英語）
* SVG駒使用。フォント駒（楷書、毛筆）とイラスト駒
* AI対戦
* 一手毎の棋譜保存機能
* 棋譜入出力機能（棋譜はCSA形式に倣ってますが独自形式です）

# ビルド
```
$ node --version
v18.20.8
$ npm install
$ npm run dev
```

# テスト
```
$ NODE_OPTIONS="--max-old-space-size=24576" npx mocha --require coffeescript/register --require test/setup.coffee "test/**/*.coffee"
```

# クレジット
* 鳥のイラストは、Irasutoya氏の作品を基にしています。  
  https://www.irasutoya.com/

  これらの画像は、本プロジェクトで使用するために、修正およびSVGアセットに変換されています。
* 毛筆フォントは、青柳衡山氏の再配布可能な「衡山毛筆フォント」を利用しています。  
  http://www7a.biglobe.ne.jp/~kouzan/  
  https://forest.watch.impress.co.jp/library/software/aoyagifont/


# Play online
https://happyclam.github.io/toriShogi/

