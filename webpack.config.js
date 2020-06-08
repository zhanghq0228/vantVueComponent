const path = require("path");
const webpack = require("webpack");
const uglify = require("uglifyjs-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),//输出路径
    publicPath: '/dist/',
    library: 'departmentStaff',    // require时的模块名
    filename: 'vue-department-staff.js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  devServer: {
    port:8088
  },
  module: {
    rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        },
        {
            test: /\.less$/,
            use: [
                { loader: "vue-style-loader" },
                { loader: "css-loader" },
                { loader: "less-loader" }
            ]
        },
        {
            test: /\.js$/,
            exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
            loader: 'babel-loader'
        },
        {
            test: /\.(png|jpg|gif|ttf|svg|woff|eot)$/,
            loader: 'url-loader',
            query: {
                limit: 30000,
                name: '[name].[ext]?[hash]'
            }
        }
    ]
  },
};