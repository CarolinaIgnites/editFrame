var path = require('path');
module.exports = {
  /*
    entry: './src/js/app.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },*/

    entry: {
        'app': './src/app.js',
        'app-frame': './src/app-frame.js' 
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'bundle.[name].js',
      publicPath: '/static/'
    },
    module: {
        rules: [{
                test: /\.css$/,
                loaders: [
                    'style-loader',
                    'css-loader'
                ]
            },

            {
                test: /\.(svg|gif|png|eot|woff|woff2|ttf)$/,
                loaders: [
                    'url-loader'
                ]
            }
        ]
    }
}