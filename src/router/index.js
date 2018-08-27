import Vue from 'vue'
import Router from 'vue-router'

import store from '../vuex/index'

import Login from '@/views/Login'
import Signup from '@/views/Signup'
import Username from '@/views/Username'
import Avatar from '@/views/Avatar'
import Password from '@/views/Password'
import Reset from '@/views/Reset'

Vue.use(Router)

export default new Router({

  routes: [{
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/username',
    name: 'Username',
    component: Username
  },
  {
    path: '/avatar',
    name: 'Avatar',
    component: Avatar
  },
  {
    path: '/password',
    name: 'Password',
    component: Password
  },
  {
    path: '/reset',
    name: 'Reset',
    component: Reset
  }
  ]
})
