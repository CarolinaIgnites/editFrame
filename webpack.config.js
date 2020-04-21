const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
  entry : {'app' : './src/app.js', 'app-frame' : './src/app-frame.js'},
  output : {
    path : path.join(__dirname, 'dist'),
    filename : 'bundle.[name].js',
    publicPath : '/static/'
  },
  module : {
    rules : [
      {test : /\.css$/, loaders : [ 'style-loader', 'css-loader' ]},
      {
        test : /\.(svg|gif|png|eot|woff|woff2|ttf)$/,
        loaders : [ 'url-loader' ]
      },
      {
        test : /\.html$/i,
        loader : 'html-loader',
      },
    ]
  },
  plugins : [
    new HtmlWebpackPlugin({
      template : 'src/html/index.html',
      filename : 'index.html',
      chunks : [ 'app' ],
    }),
    new HtmlWebpackPlugin({
      template : 'src/html/frame.html',
      filename : 'frame.html',
      chunks : [ 'app-frame' ],
    }),
    new webpack.DefinePlugin({
      API_BASE : JSON.stringify(process.env.API_BASE ||
                                "https://api.carolinaignites.org")
    })
  ],
  devServer : {contentBase : path.join(__dirname, 'dist'), hot : true},

}
