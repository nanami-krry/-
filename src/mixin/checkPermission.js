import store from '@/store'
export default {
  methods: {
    // 去用户的points里面检查有没有key，有key则有权限，反之则没有
    checkPermission(key) {
      const { userInfo } = store.state.user
      if (userInfo.roles.points && userInfo.roles.points.length) {
        return userInfo.roles.points.some(item => item === key)
      }
      return false
    }
  }
}
