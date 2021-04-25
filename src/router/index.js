import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  // 首页
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home/home')
  },
  // 购物车
  {
    path: '/cartlist',
    name: 'CartList',
    component: () => import('../views/CartList/CartList')
  },
  // 确认订单页面
  {
    path: '/orderconfirmmation/:id',
    name: 'OrderConfirmmation',
    component: () => import('../views/orderConfirmmation/OrderConfirmmation')
  },
  // 订单记录
  {
    path: '/orderlist',
    name: 'OrderList',
    component: () => import('../views/orderList/OrderList')
  },
  // 个人页面
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/My/User')
  },
  // 收货地址管理
  {
    path: '/useraddress',
    name: 'AddressList',
    component: () => import('../views/My/AddressList')
  },
  // 新增地址
  {
    path: '/useraddress/new',
    name: 'Address',
    component: () => import('../views/My/Address')
  },
  // 编辑地址
  {
    path: '/useraddress/edit/:id',
    name: 'Editaddress',
    component: () => import('../views/My/Editaddress')
  },
  // 登录
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/login'),
    beforeEnter (to, from, next) {
      const { isLogin } = localStorage
      isLogin ? next({ name: 'Home' }) : next()
    }
  },
  // 注册
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/register/Register'),
    beforeEnter (to, from, next) {
      const { isLogin } = localStorage
      isLogin ? next({ name: 'Home' }) : next()
    }
  },
  // 商店详情页
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import('../views/shop/Shop')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const { isLogin } = localStorage
  !isLogin && to.name !== 'Login' && to.name !== 'Register'
    ? next({ name: 'Login' })
    : next()
})

export default router
