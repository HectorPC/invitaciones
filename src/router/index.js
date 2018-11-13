import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Invitation from '../views/Invitation.vue'
import NotFound from '../views/NotFound.vue'

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
      path: '/invitation/:invitationType/:design/:srcImg/:title/:date/:hour/:description',
      name: 'Invitation',
      component: Invitation,
      props: true
    },
    {
      path: '/notfound',
      name: 'NotFound',
      component: NotFound,
      props: true
    }
  ]
})
