var webpack = require('webpack');

module.exports = {
	entry: [
		'script!jquery/dist/jquery.min.js',
		'script!foundation-sites/dist/js/foundation.min.js',
		'./app/app.jsx'
	],
	externals: {
		jquery: 'jQuery'
	},
	plugins: [
		new webpack.ProvidePlugin({
			'$': 'jquery',
			'jQuery': 'jquery'
		})
	],
	output: {
		path: __dirname,
		filename: './public/bundle.js'
	},
	resolve: {
		root: __dirname,
		alias: {
			Main: 'app/components/Main.jsx',
			Nav: 'app/components/Nav.jsx',
			Tetra: 'app/components/Tetra.jsx',
			Papa: 'node_modules/papaparse/papaparse.min.js',
			Stats: 'app/logic/stats.js',
			Graph: 'app/logic/graph.js',
			applicationStyles: 'app/styles/app.scss',
			grid: 'file-loader!app/styles/textures/pps.png'
		},
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [
			{
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015', 'stage-0']
				},
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/
			},
			{
				loader: "file-loader?name=/public/icons/[name].[ext]",
				test: /\.(jpe?g|png|gif|svg)$/i
			}
		]
	},
	devtool: 'cheap-module-eval-source-map'
};
