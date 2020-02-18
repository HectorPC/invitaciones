import Vue from 'vue'
import Router from 'vue-router'
import HomeInvitation from '../views/HomeInvitation.vue'
import HomeList from '../views/HomeList.vue'
import Invitation from '../views/Invitation.vue'
import NotFound from '../views/NotFound.vue'
import ChoiceHome from '../views/ChoiceHome.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'ChoiceHome',
      component: ChoiceHome
    },
    {
      path: '/homeInvitation',
      name: 'HomeInvitation',
      component: HomeInvitation
    },
    {
      path: '/invitation/:invitationType/:design/:srcImg/:title/:date/:hour/:description',
      name: 'Invitation',
      component: Invitation,
      props: true
    },
    {
      path: '/homeList/:jsonData?/:listType?',
      name: 'HomeList',
      component: HomeList
    },
    {
      path: '/notfound',
      name: 'NotFound',
      component: NotFound,
      props: true
    }
  ]
})
