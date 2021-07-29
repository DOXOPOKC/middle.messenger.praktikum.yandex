const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: './src/core/index.ts',
	experiments: {
		asset: true,
	},
	module: {
		rules: [
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.pug$/i,
				use: 'pug-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.ts$/i,
				use: [
					{
						loader: 'ts-loader',
						options: {
							configFile: path.resolve(__dirname, 'tsconfig.json'),
							transpileOnly: true,
						},
					},
				],
				exclude: /(node_modules)/,
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader', 'postcss-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/core/index.pug',
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true,
			},
			chunksSortMode: 'auto',
		}),
	],
	resolve: {
		extensions: ['.ts', '.js', '.pug'],
		alias: {
			'@': path.resolve(__dirname, 'src/'),
		},
		fallback: {
			path: require.resolve('path-browserify'),
			fs: false,
		},
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
		assetModuleFilename: 'assets/[name][ext]',
    clean: true,
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 3000,
		hot: true,
	},
};
