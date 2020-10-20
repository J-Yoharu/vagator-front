<template>
  <div class="bg-gray-100">
      <div class="bg-white">
            <div class="container mx-auto p-8">
                <h1 class="text-center font-bold text-gray-700 text-2xl">{{job.title}}</h1>
                <div class="flex justify-center mt-3">
                    <div class="mr-2 text-lg text-gray-700">{{job.department.department}} </div>
                    <div class="mr-2 text-lg text-gray-700"> ·  {{job.locale.country}}, {{job.locale.state}}, {{job.locale.city}}  </div>
                    <div class="mr-2 text-lg text-gray-700">· {{job.type.type}} </div>
                    <div v-if="job.is_remote" class="mr-2 text-lg text-gray-700"> · Remoto</div>
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
    props:['id'],
    data(){
        return{
            job:{
                department: '',
                locale: '',
                type: ''
            }
        }
    },
    beforeRouteEnter(to, from, next){
    next(vm => {
          vm.$axios.get(`/api/jobs/${vm.id}`).then((resp) => {
              if(Object.keys(resp.data).length !=0){
                  vm.job = resp.data;           
                  return true
            } 
            next('/jobs/error') 
          })
    })
  },
}
</script>

<style>

</style>