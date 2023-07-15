import Layout from '@/layout'

export default {
  path: '/employees',
  name: 'employees',
  component: Layout,
  children: [{
    // 为空时表示二级路由的默认路由，既显示了layout,有显示了employees这个组件
    path: '',
    component: () => import('@/views/employees'),
    meta: { title: '员工管理', icon: 'people' }
  },
  {
    path: 'detail/:id', // query传参 动态路由传参
    component: () => import('@/views/employees/detail'),
    hidden: true, // 不在左侧菜单显示
    meta: {
      title: '员工详情' // 标记当前路由规则的中文名称 后续在做左侧菜单时 使用
    }
  }]
}
