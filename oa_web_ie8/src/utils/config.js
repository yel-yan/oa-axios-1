// 全局配置

let baseUrl = ''
let imgUrl
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://oa-api.1024web.cn'
  imgUrl = 'http://oa-api.1024web.cn/img/'
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = 'http://oa-api.1024web.cn'
  imgUrl = 'http://oa-api.1024web.cn/img/'
}

export {
  baseUrl,
  imgUrl,
}
