import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/user/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: ()=> import('../views/user/RegisterView.vue')
    },
    {
      path: '/login/forget',
      name: 'forgetPassword',
      component: ()=> import('../views/user/ForgetPwView.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: ()=> import('../views/user/UserCenterView.vue')
    },

    //公告
    {
      path: '/notify',
      name: 'notify',
      component: ()=> import('../views/notify/NotifyMain.vue')
    },
    {
      path: '/notify/edit',
      name: 'notifyEdit',
      component: ()=> import('../views/notify/NotifyEdit.vue')
    },
    {
      path: '/notify/view',
      name: 'notifyView',
      component: ()=> import('../views/notify/NotifyView.vue')
    },
  ]
})

export default router
