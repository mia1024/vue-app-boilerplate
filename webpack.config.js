const HtmlWebpackPlugin = require("html-webpack-plugin");
const {VueLoaderPlugin} = require("vue-loader");
const webpack = require("webpack");
const path = require("path");
require("@vue/compiler-sfc")

module.exports = {
    resolve: {
        extensions: ['.ts', '.js', '.vue'],
        alias: {
            "vue": "vue/dist/vue.runtime.esm-bundler.js",
            // "vue":"vue/dist/vue.esm-bundler.js",
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                },
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.(css|woff|ttf|png|svg)/i,
                type: 'asset'
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    'css-loader',
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass"),
                        },
                    }
                ]
            }
        ]
    },
    devtool: "source-map",
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist',),
        clean: true
    },
    entry: [
        path.resolve(__dirname,"src/index.ts")
    ],
    stats: {
        errorDetails: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            inject: true,
            templateContent: `
                <div id="app"></div>
          `
        }),
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            "__VUE_PROD_DEVTOOLS__": false,
            "__VUE_OPTIONS_API__": true
        }),
    ],
    devServer: {
        client: {
            progress: true
        }
    },
    mode: "development"
}
