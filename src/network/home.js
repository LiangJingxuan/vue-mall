import { request } from 'network/request.js'

// 轮播图与分类
export function getHomeMultidata(){
  return request({
    url: '/mallapi/home/multidata'
  })
}

// 商品列表
export function getHomeGoods(type,page){
  return request({
    url: '/mallapi/home/data',
    params: {
      type,
      page
    }
  })
}