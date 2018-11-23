<template>
  <div id="app">
    <app-header  v-if="!checkRouteInvitation" class="header"></app-header>
    <app-header-responsive v-if="!checkRouteInvitation" class="header-responsive"></app-header-responsive>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import Header from './components/Header.vue'
  import HeaderResponsive from './components/HeaderResponsive.vue'
  import Footer from './components/Footer.vue'
  export default {
    name: 'App',
    components: {
      'app-header': Header,
      'app-header-responsive': HeaderResponsive,
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