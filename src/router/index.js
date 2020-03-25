import Vue from 'vue'
import Router from 'vue-router'
const manageplatform = () => import('@/components/manageplatform');
const imgupload = () => import('@/components/imgupload');
const h5producer = () => import('@/components/h5producer');
const stzhuanqu = () => import('@/components/stzhuanqu');
const movieupload = () => import('@/components/movieupload');
const bgupload = () => import('@/components/bgupload');
const login = () => import('@/components/login');
const moviemanager = () => import('@/components/moviemanager');
const gameupload = () => import('@/components/gameupload');
const home = () => import('@/components/home')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/manageplatform',
      name: 'manageplatform',
      component: manageplatform,
      children:[
        {
          path: '/home',
          name: 'home',
          component: home,
        },
        {
          path: '/imgupload',
          name: 'imgupload',
          component: imgupload,
        },
        {
          path: '/h5producer',
          name: 'h5producer',
          component: h5producer,
        },
        {
          path: '/stzhuanqu',
          name: 'stzhuanqu',
          component: stzhuanqu,
        },
        {
          path: '/bgupload',
          name: 'bgupload',
          component: bgupload,
        },
        {
          path: '/movieupload',
          name: 'movieupload',
          component: movieupload,
        },
        {
          path: '/moviemanager',
          name: 'moviemanager',
          component: moviemanager,
        },
        {
          path: '/gameupload',
          name: 'gameupload',
          component: gameupload,
        },
      ]
    }
  ]
})
