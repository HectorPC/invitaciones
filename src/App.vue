<template>
  <div id="app">
    <app-header  v-if="!checkRouteInvitation" class="header"/>
    <app-header-responsive v-if="!checkRouteInvitation" class="header-responsive"/>
    <!-- <router-view></router-view> -->
    <home v-if="!checkRouteInvitation"/>
    <invitation v-if="checkRouteInvitation"/>
    <app-footer/>
  </div>
</template>

<script>
  import Header from './components/Header.vue'
  import HeaderResponsive from './components/HeaderResponsive.vue'
  import Home from './views/Home.vue'
  import Invitation from './views/Invitation.vue'
  import Footer from './components/Footer.vue'
  export default {
    name: 'App',
    components: {
      'app-header': Header,
      'app-header-responsive': HeaderResponsive,
      'home': Home,
      'invitation': Invitation,
      'app-footer': Footer
    },
    computed: {
      checkRouteInvitation() {
        var routeArray = this.$route.path.split('/');
        if(routeArray[1] == 'invitation') {
          return true;
        }
        return false;
      }
    }
  }
</script>

<style lang="scss">
  #app {
    font-family: 'Rajdhani', sans-serif;
  }

  .header-responsive {
    display: none;
  }

  @media (max-width: 768px) {
    .header {
      display: none;
    }
    .header-responsive {
      display: block;
      position: relative;
      height: 80px;
      z-index: 2;
      }
  
  }
</style>