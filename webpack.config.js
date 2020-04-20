const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry : {'app' : './src/app.js', 'app-frame' : './src/app-frame.js'},
  output : {
    path : path.join(__dirname, 'dist'),
    filename : 'bundle.[name].js',
    publicPath : '/static/'
  },
  module : {
    rules : [
      {test : /\.css$/, loaders : [MiniCssExtractPlugin.loader, 'css-loader']},
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
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new webpack.DefinePlugin({
      API_BASE : JSON.stringify(process.env.API_BASE ||
                                "https://api.carolinaignites.org")
    })
  ],
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  devServer : {contentBase : path.join(__dirname, 'dist'), hot : true},
}
