module.exports =
  context: __dirname + ''
  entry: coffee: './gameGui.coffee'
  output:
    path: __dirname + ''
    filename: './torishogi.js'
  devtool: 'cheap-source-map'
  module: rules: [
    {
      test: /\.coffee$/
      exclude: /node_modules/
      use: ['babel-loader', 'coffee-loader']
    }
  ]
  resolve: extensions: [
    '.js'
    '.json'
    '.coffee'
  ]
