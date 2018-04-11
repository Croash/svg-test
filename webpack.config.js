const path = require('path')

const loaders = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: [
      'babel-loader',
    ],
  }
]


module.exports = {
  entry: './src/index.js',
  module:{
    loaders: [
      {test: /\.css$/,loader: 'style-loader!css-loader'},
      {test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192'}
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
}
