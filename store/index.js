// 必须放到函数中，因为在服务端渲染期间运行都是同一个实例
// 为了防止数据冲突，需要把state定义成一个函数，返回数据对象
export const state = () => {
  return {
    user: null
  }
}

export const mutations = {
  setUser (state, data) {
    state.user = data
  }
}
// 服务端引入
const cookieparser = process.server ? require('cookieparser') : undefined

export const actions = {
  // 一个特殊的 action 方法，仅在服务端渲染期间自动调用
  // 作用： 初始化容器数据，传递数据给客户端使用
  nuxtServerInit({commit}, {req}) {
    // commit 用来提交mutation的方法， req服务端渲染期间请求的对象
    let user = null
    // 如果请求头中有 cookie，解析cookie
    if(req.headers.cookie) {
      // 用cookieparser包，将cookie字符串解析为对象，进行存储
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        // 防止解析问题
        user = JSON.parse(parsed.user)
      } catch (err) {
        
      }
    }
    commit('setUser', user)
  }
}

export const getter = {}