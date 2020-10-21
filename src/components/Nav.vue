<template>
<nav class="bg-white shadow-md relative">
  <div class="container mx-auto ">
    <div class="relative grid grid-cols-3 h-20">
        <div class="flex justify-start items-center">
          <div>
            <router-link v-if="user != null" tag="button" to="/jobs/create" 
              class="text-red-600 font-bold py-2 px-4 border-2 border-red-600 rounded">+ Nova Vaga
            </router-link>
          </div>
        </div>
       
        
        <router-link tag="a" to="/jobs" class="bg-white flex justify-center items-center">
          <div class="h-12 w-12 flex justify-center items-center rounded-full border-4 border-red-600">
              <img src="../assets/logo.png" class="h-75">
          </div>
        </router-link>

        <div v-if="user == null" class="flex justify-end">
          <router-link tag="button" to="/login" class="bg-white hover:bg-gray-100 font-bold text-red-600 font-semibold py-2 px-4">Login</router-link>
        </div>
        
        <div v-else class="flex justify-end items-center">
          <div>
              <div @click="toggleMenu" class="bg-white hover:bg-gray-100 font-bold text-red-600 font-semibold py-2 px-4 cursor-pointer">Olá {{user.name}}</div>
                
              <div class="hidden origin-top-right absolute right-0 w-32 rounded-md shadow-lg" id="menuUser">
                <div class="rounded-md bg-white shadow-xs">
                  <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      <span @click="logout" class="block px-4 py-2 text-sm leading-5 font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">Logout</span>
                  </div>
                </div>
              </div>
          </div>
        </div>

    </div>
  </div>
</nav>
</template>

<script>
export default {
  props:['user'],
  methods:{
      toggleMenu() {
        document.querySelector("#menuUser").classList.toggle('hidden')
      },
      logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.$router.push('/login')
      },
    }
}
</script>

<style>

</style>