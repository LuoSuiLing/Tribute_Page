const webpack = require('webpack'); // 用于访问内置插件
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require("clean-webpack-plugin");
const copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: __dirname + '/src/js/main.js', //“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录
    output:{
        path: __dirname + '/dist',
        filename: "js/main-[chunkhash].js"
    },

    plugins:[
        new htmlWebpackPlugin({
            template: __dirname + '/src/index.html',
            filename: "index.html",
        }),
        new copyWebpackPlugin([{
            from: __dirname + '/src/css',
            to:__dirname + '/dist/css'
        }]),
        new webpack.BannerPlugin('版权所有，翻版必究'),
        //new webpack.HotModuleReplacementPlugin(),//热加载插件
        new cleanWebpackPlugin('dist', {
            root: __dirname,
            verbose: true,
            dry: false
        }),
    ],

    module: {
        rules: [
            {
                test:/\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test:/\.(png|jpg|gif|svg)$/i,
                loaders: [
                    'url-loader?limit=1000&name=img/[name]-[hash:5].[ext]',
                    'image-webpack'
                ]
            }
        ]
    },

    devtool: 'eval-source-map',

    //devServer: {
    //    contentBase: "./dist",//本地服务器所加载的页面所在的目录
    //    historyApiFallback: true,//不跳转
    //    inline: true,//实时刷新
    //    hot: true
    //}
};