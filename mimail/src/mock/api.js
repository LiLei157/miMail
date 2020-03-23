import Mock from 'mockjs'
import indexApi from './index/indexApi'

// 设置超时时间
Mock.setup({
    timeout:"200-1000"
})

Mock.mock(/\/index\/getProductList/,'get',indexApi.getProductList)