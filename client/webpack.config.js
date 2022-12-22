// const path = require("path");
// const webpack = require("webpack");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// module.exports = {
//   mode: "development",
//   context: path.resolve(__dirname),
//   entry: {
//     polyfills: "./src/polyfills.ts",
//     app: "./src/main.ts",
//   },
//   stats: "normal",
//   output: {
//     clean: true,
//     path: path.resolve(__dirname, "dist"), // путь к каталогу выходных файлов - папка public
//     publicPath: "/",
//     filename: "[name].[fullhash].js",
//   },
//   devtool: "eval-cheap-source-map",
//   devServer: {
//     historyApiFallback: true,
//     port: 4200, ////////////
//     open: true,
//     hot: true,
//     compress: true,
//   },
//   resolve: {
//     extensions: [".ts", ".js"],
//   },
//   module: {
//     rules: [
//       {
//         test: /\.ts$/,
//         use: [
//           "babel-loader",
//           {
//             loader: "ts-loader",
//             options: { configFile: path.resolve(__dirname, "tsconfig.json") },
//           },
//           // "angular2-template-loader",
//           "angular-router-loader",
//         ],
//         exclude: ["/node_modules/"],
//       },
//       {
//         test: /\.html$/,
//         loader: "html-loader",
//       },
//       {
//         test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
//         loader: "file-loader",
//         options: {
//           name: "[name].[fullhash].[ext]",
//         },
//       },
//       {
//         test: /\.(scss|css)$/,
//         // exclude: path.resolve(__dirname, "src/app"),
//         use: [
//           MiniCssExtractPlugin.loader, //
//           "style-loader",
//           "css-loader",
//           "postcss-loader",
//           "sass-loader",
//           "raw-loader", //
//         ],
//       },
//     ],
//   },
//   plugins: [
//     new webpack.ContextReplacementPlugin(
//       /angular(\\|\/)core/,
//       path.resolve(__dirname, "src"), // каталог с исходными файлами
//       {} // карта маршрутов
//     ),
//     new HtmlWebpackPlugin({
//       template: path.resolve(__dirname, "./src/index.html"),
//       filename: "index.html",
//     }),
//     new MiniCssExtractPlugin({
//       filename: "[name].[contenthash].css",
//     }),
//     new webpack.LoaderOptionsPlugin({
//       htmlLoader: {
//         minimize: false,
//       },
//     }),
//   ],
// };
