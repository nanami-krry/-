import axios from 'axios'
const service = axios.create()
// 注册一个请求拦截器
service.interceptors.request.use()
// 注册一个相应拦截器
service.interceptors.response.use()
export default service
