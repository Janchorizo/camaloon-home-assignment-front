const path = require('path');
const webpack = require('webpack');

const outputDirectory = './dist'
const stage = process.env.STAGE === 'dev' ? 'dev' : 'prod';

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname,outputDirectory)
  },
  resolve: {
    alias: {
      common: path.resolve(__dirname, "src/common"),
      pages: path.resolve(__dirname, "src/pages"),
      components: path.resolve(__dirname, "src/components"),
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
        use: 'url-loader'
      },
      {
        test: /^(?!.*?\.module).*\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.module\.css$/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            modules: true
          }
        }]
      }
    ]
  },
  devServer: {
    hot: true,
    port: 3000,
    host: '0.0.0.0',
    contentBase: './static',
    publicPath: '/',
    historyApiFallback: true
  },
  devtool: "cheap-module-source-map",
  plugins: [
    new webpack.DefinePlugin({
      __STAGE__: `"${stage}"`
    })
  ]
};
