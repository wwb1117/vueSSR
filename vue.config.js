const path = require('path');
const webpack = require("webpack")
const resolve = (dir) => path.join(__dirname, dir);

const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
const nodeExternals = require("webpack-node-externals");
const merge = require("lodash.merge");
const TARGET_NODE = process.env.WEBPACK_TARGET === "node";
const target = TARGET_NODE ? "server" : "client";


let computeBaseUrl = function(){
	if (process.env.VUE_APP_MYENV === 'test') {
		return 'https://dev.cdn.mamaqunaer.com/pos/'
	}
	if (process.env.VUE_APP_MYENV === 'production') {
		return 'https://cdn.mamaqunaer.com/pos/'
	}
	if (process.env.VUE_APP_MYENV === 'pre') {
		return 'https://pre-cdn.mamaqunaer.com/pos/'
	}
	if (process.env.VUE_APP_MYENV === 'development') {
		return ''
	}
}
module.exports = {
	baseUrl: computeBaseUrl(),
	filenameHashing: false,
	devServer: {
		host: '0.0.0.0',
		disableHostCheck: true,
        port: 8098,
		proxy: {
			'/api': {
				// target: 'http://192.168.1.192:8055',
				// target: 'http://192.168.0.107:9016',
				target: 'http://dev.pos.mamaqunaer.com',
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	},
	configureWebpack: {
		entry: `./src/entry-${target}.js`,
		devtool: 'source-map',
		target: TARGET_NODE ? "node" : "web",
		node: TARGET_NODE ? undefined : false,
		output: {
			libraryTarget: TARGET_NODE ? "commonjs2" : undefined
		},
		externals: TARGET_NODE ? nodeExternals({
			// 不要外置化 webpack 需要处理的依赖模块。
			// 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
			// 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
			whitelist: [/\.css$/]
			}) : undefined,
		optimization: {
			splitChunks: undefined
		},
		plugins: [
			TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin(),
			new webpack.ProvidePlugin({
				jQuery: "jquery",
				$: "jquery"
			})
		]
    },
	chainWebpack: config => {

		config.plugins.delete('preload')
		config.plugins.delete('prefetch')

		config.module
			.rule("vue")
			.use("vue-loader")
			.tap(options => {
				merge(options, {
					optimizeSSR: false
				})
			})

		// 添加别名
		config.resolve.alias
			.set('@', resolve('src'))
			.set('views', resolve('src/views'))
			.set('directive', resolve('src/directive'))
			.set('api', resolve('src/api'))
			.set('utils', resolve('src/utils'))
			.set('assets', resolve('src/assets'))
			.set('components', resolve('src/components'))

		// config.output.filename('[name].js').end()

		config.module  //解决字体文件跨域问题
			.rule('fonts')
			.use('url-loader')
			.loader('url-loader')
			.tap(args => {
				args.limit = 1000
				return args
			})

	}
}