const path = require('path')

module.exports = {
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
            }
        ]
    }
}