<template>
  <div id="app" class="flex flex-col h-screen justify-between">
    <navbar v-if="this.$route.path != '/login'" :user.sync="user"/>

    <router-view class="mb-auto" :user.sync="user" @update:user="user = $event"/>

    <footer-vagator v-if="this.$route.path != '/login'"/>
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
      user:null,
  }
  },
  methods:{
    getUserLogged() {
       if (localStorage.user == null) {
        this.user = null;
      }
      else {
        this.user = JSON.parse(localStorage.user);
      }
    }
  },
  mounted(){
    this.getUserLogged()
    console.log(this.user);
  }
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
