<template>
<div class="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="border border-black-300 rounded-md p-4 shadow-md bg-white " style="width:23rem"> 
    <div>
        <div class="mx-auto h-12 w-12 flex justify-center items-center rounded-full border-4 border-red-600">
            <img src="../assets/logo.png" class="h-75">
        </div>
        
      <h4 class="mt-6 text-center text-gray-900">
        Aquisição de talentos
      </h4>
    </div>
    <form class="mt-8" @submit.prevent="login">
      <div class="rounded-md">
        <div class="font-semibold text-gray-600">
            <label>E-mail</label>
          <input aria-label="Email address" name="email" type="email" v-model="email" required class="block w-full p-2 border border-gray-300 rounded focus:outline-none">
        </div>
        <div class="mt-3 font-semibold text-gray-600">
            <label>Senha</label>
          <input aria-label="Password" name="password" type="password" v-model="password" required class="block w-full p-2 border border-gray-300 rounded focus:outline-none">
        </div>
      </div>
        
      <div v-if="error != ''"  class="mt-5">
        <div role="alert">
            <div class="border text-center rounded-md border-red-400 rounded-b bg-red-100 p-2">
                <p>{{error}}</p>
            </div>
        </div>
      </div>

      <div class="mt-6">
        <button type="submit" class="w-full flex justify-center py-2 px-4 border text-white rounded-md focus:outline-none c-red">
          Entrar
        </button>
      </div>
    </form>
  </div>
</div>
</template>

<script>

export default {
  data(){
    return{
      email: 'jonathas@gmail.com',
      password: 123,
      error:''
    }
  },
  methods: {
    login(){
    this.$axios(`${process.env.VUE_APP_BACKEND_URL}/sanctum/csrf-cookie`).then(() => {
            this.$axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/login`,{
                  email: this.email,
                  password: this.password
            }).then(response => {
              this.$emit('update:user', response.data.user)
              localStorage.token = response.data.token
              localStorage.user = JSON.stringify(response.data.user)
              this.$router.push('/jobs')

            }).catch(err =>{
              this.error = err.response.data.error
            })
        });
    }
  },
  mounted(){
    // this.$validate = null
  },
  beforeRouteEnter(to, from, next){
    next((vm)=>{
      vm.$emit('update:user', null)
    })
  }
}

</script>

<style>

</style>