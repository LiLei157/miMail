import Mock from 'mockjs'
import indexApi from './index/indexApi'

// 设置超时时间
Mock.setup({
    timeout:"1000-3000"
})

Mock.mock(/\/index\/getProductList/,'get',indexApi.getProductList)
Mock.mock(/\/login/,'post',indexApi.ToLogin)