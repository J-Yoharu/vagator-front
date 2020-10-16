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
    <form class="mt-8" action="#" method="POST">
      <input type="hidden" name="remember" value="true">
      <div class="rounded-md">
        <div class="font-semibold text-gray-600">
            <label>E-mail</label>
          <input aria-label="Email address" name="email" type="email" required class="block w-full p-2 border border-gray-300 rounded focus:outline-none">
        </div>
        <div class="mt-3 font-semibold text-gray-600">
            <label>Senha</label>
          <input aria-label="Password" name="password" type="password" required class="block w-full p-2 border border-gray-300 rounded focus:outline-none">
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
  beforeRouteEnter(to, from, next){
    next(vm => {
        vm.$emit("routeLogin",true)
    })
  }
}
</script>

<style>

</style>