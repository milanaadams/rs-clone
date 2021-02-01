const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, options) => {
  const isProduction = options.mode === 'production';

  const config = {
    mode: isProduction ? 'production' : 'development',
    devtool: 'source-map',
    watch: !isProduction,
    entry: ['./src/index.ts', './src/style.scss'],
    output: {
      path: path.join(__dirname, '/dist'),
      publicPath: './',
      filename: 'script.js'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    devServer: {
      contentBase: './dist',
      writeToDisk: true
    },

    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
            exclude: /node_modules/,
            use: [{
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            },
            {
              loader: 'ts-loader'
            }
          ]
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
          ]
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/i,
          use: [
              {
                  loader: 'file-loader',
                  options: {
                      name: '[name].[ext]',
                      outputPath: 'assets/',
                    }
              }
          ]
        },
        {
          test: /\.html$/i,
          loader: 'html-loader'
        }
      ]
    },

    plugins: [
      new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false,
      }), 
      new HtmlWebpackPlugin({
        template: './src/index.html'
    }),
      new MiniCssExtractPlugin({
        filename: 'style.css'
    }),
  ]
  }

  return config;
}