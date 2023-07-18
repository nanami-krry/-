import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
import { getTimeStamp } from '@/utils/auth'

const TimeOut = 3600 // 定义时间
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 设置axios请求的基础的基础地址
  timeout: 10000 // 定义5秒超时
})
// 注册一个请求拦截器
service.interceptors.request.use(config => {
  // 在这个位置需要统一的去注入token
  if (store.getters.token) {
    // 检查时间戳是否超时，超时就执行以下函数
    if (IsCheckTimeOut()) {
      // 调用logout的action，去删除token，用户信息
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('用户连接超时'))
    }
    // 如果token存在 注入token
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config // 必须返回配置,是请求配置信息
}, error => {
  return Promise.reject(error)
})

// 注册一个相应拦截器
service.interceptors.response.use(response => {
  const { success, message, data } = response.data
  //   要根据success的成功与否决定下面的操作
  if (success) {
    return data
  } else {
    // 业务已经错误了 还能进then ? 不能 ！ 应该进catch
    Message.error(message) // 提示错误消息
    return Promise.reject(new Error(message))
  }
}, error => {
  if (error.response && error.response.data && error.response.data.code === 10002) {
    // 当等于10002的时候 表示 后端告诉我token超时了
    store.dispatch('user/logout') // 登出action 删除token
    router.push('/login')
  } else {
    Message.error(error.message) // 提示错误信息
  }
  return Promise.reject(error)
}
)
// 检查是否超时函数
function IsCheckTimeOut() {
  var currentTime = Date.now()
  var timeStamp = getTimeStamp()
  return (currentTime - timeStamp) / 1000 > TimeOut
}
export default service
