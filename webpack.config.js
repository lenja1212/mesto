const path = require("path");//import path from "path";
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 

module.exports = {
  entry: {main: "./src/index.js"},
  output: {
      path: path.resolve(__dirname, "dist"),
      filename: "main.js",
      publicPath: '',
  },
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, './dist'),
    compress: true,
    port: 8080,
    open: true
  },
  module:{
    rules: [
        {
            test: /\.js$/,
            use: "babel-loader",
            exclude: "/node_modules/"
        },
        {
            // регулярное выражение, которое ищет все файлы с такими расширениями
            test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
            type: 'asset/resource'
        },
        {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, {
              loader: 'css-loader',
              options: { importLoaders: 1 }
            },
            'postcss-loader']
        }            
    ]
  },
  plugins: [
      new HtmlWebpackPlugin({
          template: "./src/index.html"
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin()
  ]
};