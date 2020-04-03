export default {
    getProductList: () => {
        return {
            status: 0,
            message: '请求成功',
            data: [{
                    id: '10001',
                    name: "小米10",
                    subtitle: "晓龙865/1亿像素相机",
                    mainImage: "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0099822e42b4428cb25c4cdebc6ca53d.jpg?thumb=1&w=250&h=250&f=webp&q=90",
                    price: 3999,
                    discount:3699,
                    isNew:true
                },
                {
                    id: '10002',
                    label: "Redmi K30",
                    subtitle: "120Hz高帧率流速屏,全速热爱",
                    mainImage: "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/2c16238f786e4f93bdb175d7bf21aa47.jpg?thumb=1&w=250&h=250&f=webp&q=90",
                    price: 1599,
                    discount:1599,
                },
                {
                    id: '10003',
                    label: "Redmi K20 Pro 尊享版",
                    subtitle: "骁龙855 Plus， 弹出全面屏",
                    mainImage: "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/8737a33c78a94bc36afb860ab23b3939.jpg",
                    price: 3999,
                    discount:3999,
                    isNew:true
                }, {
                    id: '10004',
                    label: "小米CC9 Pro",
                    subtitle: "一亿像素 五射四闪",
                    mainImage: "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/07270cc09689eb9b13b29aa9f6bc41eb.jpg?thumb=1&w=250&h=250",
                    price: 2799,
                    discount:2599
                },
                {
                    id: '10005',
                    label: "Redmi 8",
                    subtitle: "5000mA超长续航",
                    mainImage: "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/d295c4fb500d163a7045dc715b47f808.jpg?thumb=1&w=250&h=250",
                    price: 799,
                    discount:749
                },
                {
                    id: '10006',
                    label: "Redmi 8A",
                    subtitle: "5000mA超长续航",
                    mainImage: "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c924c3f3436b6934495fd98f159ee3f7.jpg?thumb=1&w=250&h=250",
                    price: 599,
                    discount:549
                }, 
                {
                    id: '10007',
                    label: "Redmi Note Pro",
                    subtitle: "6400万全场景四射",
                    mainImage: "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/6f2493e6c6fe8e2485c407e5d75e3651.jpg?thumb=1&w=250&h=250",
                    price: 1399,
                    discount:1299
                }, 
                {
                    id: '10008',
                    label: "小米10",
                    subtitle: "晓龙865/1亿像素相机",
                    mainImage: "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0099822e42b4428cb25c4cdebc6ca53d.jpg?thumb=1&w=250&h=250&f=webp&q=90",
                    price: 3999,
                    discount:3999
                }
            ]
        }
    },
    ToLogin:(config)=>{
      //对传递进来的参数进行解构赋值，获取到用户名和密码进行比较
      let body = JSON.parse(config.body)
      let {user,pwd} = {user:body.user,pwd:body.password}
      console.log(user,pwd)
      console.log(user == 'admin' && pwd == 'admin')
      if(user === 'admin' && pwd === 'admin'){
          console.log('su....')
        return{
            status:0,
            message:'登录成功',
            data:{
                userId:1002,
                username:user,
                userToken:JSON.stringify(user + '-' + new Date().getTime()),
            }
        }
      }else{
          console.log('err...')
          return{
              status:-1,
              message:'账号或密码错误',
          }
      } 
    }
}