const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')


module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, 'src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    }, 
    module: {
        rules: [
            {
                test: /\.js/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css/,
                use: [
                    'style-loader',
                    'css-loader'
                ]                                    
            },
            {
                test: /\.jpg|png|gif|woff|eot|ttf|svg|mp4|webm$/,
                use: {
                    loader: 'url-loader',                
                    /* Usamos la configuración del loader */
                    options: {
                        limit : 90000,  
                        /* asignar el peso máximo que un archivo 
                        puede tener para ser transformado en base64 */

                    }
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html')
        }),
        new webpack.HotModuleReplacementPlugin()        
    ],
    devServer:{
        contentBase: path.resolve(__dirname, 'dist'),
        open: true,
        port: 8080,
        hot: true
    }
}