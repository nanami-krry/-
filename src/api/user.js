import request from '@/utils/request'

export function login(data) {
  // 返会一个promise对象
  return request({
    url: '/sys/login', // 因为所有的接口都要跨域 表示所有的接口要带 /api
    method: 'post',
    data
  })
}
// 封装一个用户资料接收的接口
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}
// 获取用户的基本信息  现在写它 完全是为了显示头像
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
