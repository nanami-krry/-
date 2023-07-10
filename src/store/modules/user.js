import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'
// 放置状态
const state = {
  token: getToken() // 设置token初始状态   token持久化 => 放到缓存中

}
const mutations = {
  // 设置token
  setToken(state, token) {
    state.token = token // 将数据设置给vuex

    setToken(token) // vuex和 缓存数据的同步
  },
  // 删除缓存
  removeToken(state) {
    state.token = null // 删除vuex的缓存置空
    removeToken() // 先清除 vuex  再清除缓存 vuex和 缓存数据的同步
  }
}
const actions = {
  async login(context, data) {
    const result = login(data) // 拿到token
    context.commit('setToken', result) // 设置token
  }
}
export default {
  namespace: true,
  state,
  mutations,
  actions
}
