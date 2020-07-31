module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views'
            }
        }
    },
    publicPath: process.env.NODE_ENV === 'production' ? '/mall/' : '/', //打包后的位置(如果不设置这个静态资源会报404)
    productionSourceMap:false,  //去掉打包的时候生成的map文件
    outputDir: 'dist',//打包后的目录名称
}