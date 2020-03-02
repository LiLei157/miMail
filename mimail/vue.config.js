module.exports = {
    devServer:{
        host:'localhost',
        port:8080,
        open:true,
        proxy:{
            //设置代理
            '/api':{
                target:'http://mall-pre.springboot.cn',    // 将主机域名端口指向目标域名
                // changeOrigin:是否要将主机头的原点更改为目标头url地址
                changeOrigin:true,
                pathRewrite:{
                    '/api':''
                }
            }
        }
    }
}