import path from 'path'
import ts from 'rollup-plugin-typescript2'//识别入口ts文件
import { terser } from 'rollup-plugin-terser'//代码压缩
import server from 'rollup-plugin-serve'//启动服务
import livereload from 'rollup-plugin-livereload'//热更新
import replace from 'rollup-plugin-replace'//注册浏览器参数
import { fileURLToPath } from 'url'
const __filenameNew = fileURLToPath(import.meta.url)
const __dirnameNew = path.dirname(__filenameNew)
const isDev = () => {
    return process.env.NODE_ENV === 'development'
}
export default {
    input: './src/example_02/index.ts',//入口
    //出口
    output: {
        file: path.resolve(__dirnameNew, './lib/index.js'),
        // format: 'umd',//输出格式
        sourcemap: true,//生成sourcemap文件，定位问题，否则定位的代码是打包后的文件
    },
    plugins: [
        ts(),
        isDev() && livereload(),//热更新组件
        terser({
            compress: {
                drop_console: !isDev(),//去除console
            }
        }),//压缩文件
        replace({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)//因为process是在node环境的下的参数，在浏览器上是访问不了的，所以需要注册到浏览器上
        }),
        isDev() && server({
            open: true,//是否启动打开页面
            port: 1988,//配置端口号
            openPage: '/public/index.html',//打开的页面
        }),

    ]

}