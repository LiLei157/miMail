module.exports = {
    devServer:{
        host:'localhost',
        port:8080,
        open:true,
        // proxy:{
        //     //设置代理
        //     '/activity':{
        //         target:'https://www.wanandroid.com',
        //         // changeOrigin:是否要将主机头的原点更改为目标头url地址
        //         changeOrigin:true,
        //         pathRewrite:{
        //             '/activity':'/activity'
        //         }
        //     }
        // }
    }
}