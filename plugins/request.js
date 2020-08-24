// 基于axios 的请求模块
import axios from 'axios'

// 基本请求路径
export const request = axios.create({
  baseURL: 'https://conduit.productionready.io/'
})

// 通过插件获取上下文对象
//  插件导出函数必须作为 default 成员
export default ({ store }) => {
  // 请求拦截器
  // 任何请求经过该拦截器
  // 在拦截器中做公共业务处理，在此处设置token
  request.interceptors.request.use(function (config) {
    const {user}  = store.state
    console.log('123')
    if(user && user.token){
      config.headers.Authorization = `Token ${user.token}`
    }
    return config
  }, function (error) {
    // 请求失败，请求尚未发出
    return Promise.reject(error)
  })
}
