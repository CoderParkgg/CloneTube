const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = { 
    entry :{
        main: "./src/client/js/main.js",
        videoPlayer:"./src/client/js/videoPlayer.js",
        recorder: "./src/client/js/recorder.js"
    },
    output : { 
        filename : 'js/[name].js',
        path : path.resolve(__dirname, "assets"),
        clean : true,
    },
    plugins: [new MiniCssExtractPlugin({
        filename : "css/styles.css"
    })],
    module : { 
        rules : [    
            {
                test : /\.js$/,
                use :  {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.scss$/,
                use : [
                    MiniCssExtractPlugin.loader, "css-loader", "sass-loader" 
                ]
            }
        ]
    },
    mode : 'development',
    watch : true,
}