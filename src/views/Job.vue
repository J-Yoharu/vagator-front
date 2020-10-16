<template>
  <div class="bg-gray-100">
      <div class="bg-white">
            <div class="container mx-auto p-8">
                <h1 class="text-center font-bold text-gray-700 text-2xl">Software Engineer</h1>
                <div class="flex justify-center mt-3">
                    <div class="mr-2 text-lg text-gray-700">Marketing ·</div>
                    <div class="mr-2 text-lg text-gray-700">São Paulo ·</div>
                    <div class="mr-2 text-lg text-gray-700">Estágio ·</div>
                    <div class="mr-2 text-lg text-gray-700">Remoto </div>
                </div>
            </div>
            <hr class="border">
            <nav class="flex justify-center shadow-lg mb-10">
                <ul class="flex">
                    <router-link tag="li" :to="`/jobs/${id}`" 
                        class="py-3 mr-8 font-semibold text-lg cursor-pointer" 
                            active-class="border-b-4 border-red-700 f-red " exact>Detalhes da Vaga</router-link>

                    <router-link tag="li" :to="`/jobs/${id}/apply`" 
                        class="py-3 mr-8 font-semibold text-lg cursor-pointer" 
                        active-class="border-b-4 border-red-700 f-red " exact>Candidatar-se</router-link>
                </ul>
            </nav>
            <div class="container mx-auto">
                <router-view></router-view>
            </div>
      </div>
  </div>
</template>

<script>
export default {
    props:['id']
}
</script>

<style>

</style>