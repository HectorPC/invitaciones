import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Invitation from '../views/Invitation.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/invitation/:id',
      name: 'Invitation',
      component: Invitation,
      props: true
    }
  ]
})
