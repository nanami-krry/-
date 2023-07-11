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
  }]
}
