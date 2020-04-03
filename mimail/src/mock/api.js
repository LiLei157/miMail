import Mock from 'mockjs'
import indexApi from './index/indexApi'

// 设置超时时间
Mock.setup({
    timeout:"1000-3000"
})

Mock.mock(/\/manager\/product\/list.do/,'get',indexApi.getProductList)
Mock.mock(/\/user\/login/,'post',indexApi.ToLogin)