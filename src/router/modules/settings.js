import Layout from '@/layout'

export default {
  path: '/settings',
  name: 'settings',
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/setting'),
    meta: { title: '公司设置', icon: 'setting' }
  }]
}
