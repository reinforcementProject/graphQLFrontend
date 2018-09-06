const path = require('fs');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: __dirname + '/client/index.js',
	output:{
		path : __dirname + '/build',
		filename:'webpack-bundle.js'
	},
	module:{
		rules:[
			{
				test:/\.js$/,
				exclude:/node_modules/,
				loader:['babel-loader']
			}
		]
	},
	devServer:{
		port:3000,
		contentBase: './client',
		proxy: {
      "/graphql": {
				changeOrigin: true,
				target:"http://127.0.0.1:4000/graphql",
			}
		}
	},
		plugins:[
			new CleanWebpackPlugin('build'),
			new HtmlWebpackPlugin({
				title:'Movies',
				filename:'index.html',
				template:'./index.html'
			})
		]
}
