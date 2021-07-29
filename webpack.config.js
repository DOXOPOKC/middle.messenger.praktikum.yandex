const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.scss?$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.svg?$/,
        loader: 'file-loader',
      },
      {
        test: /\.pug?$/,
        use: 'pug-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: [/node_modules/, /test/, /\.spec\.ts$/],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.pug',
      filename: 'index.html',
      minify: false,
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.pug'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    hot: true,
  },
};
