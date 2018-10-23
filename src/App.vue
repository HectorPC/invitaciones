<template>
  <div id="app">
    <app-header></app-header>
    <app-header-responsive v-show="isVisibleResponsive"></app-header-responsive>
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
  data() {
    return {
      isVisibleResponsive: false
    }
  },
  components: {
    'app-header': Header,
    'app-header-responsive': HeaderResponsive,
    'app-footer': Footer
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Rajdhani', sans-serif;
  
}
</style>
