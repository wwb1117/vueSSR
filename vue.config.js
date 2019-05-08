const path = require('path');
const webpack = require("webpack")
const resolve = (dir) => path.join(__dirname, dir);

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
        port: 8099,
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
		plugins: [
			new webpack.ProvidePlugin({
				jQuery: "jquery",
				$: "jquery"
			})
		]
    },
	chainWebpack: config => {

		config.plugins.delete('preload')
		config.plugins.delete('prefetch')

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