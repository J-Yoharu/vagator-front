<template>
  <div id="app" class="flex flex-col h-screen justify-between">
    <navbar v-if="!routeLoginActive"/>

    <router-view class="mb-auto" @routeLogin="routeLoginActive = $event"/>

    <footer-vagator v-if="!routeLoginActive"/>
  </div>
</template>

<script>
import Navbar from './components/Nav'
import FooterVagator from './components/Footer'
export default {
  name: 'App',
  components: {
    Navbar,
    FooterVagator
  },
  data(){
    return{
      routeLoginActive: false,
    }
  },
}
</script>

<style>
.c-red{
  background-color:#d9003c;
}
.f-red{
  color:#d9003c;
}
</style>
