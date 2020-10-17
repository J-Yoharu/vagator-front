<template>
  <div class="bg-gray-100">
      <div class="bg-white">
            <div class="container mx-auto p-8">
                <h1 class="text-center font-bold text-gray-700 text-2xl">{{job.title}}</h1>
                <div class="flex justify-center mt-3">
                    <div class="mr-2 text-lg text-gray-700">{{job.department.department}} </div>
                    <div class="mr-2 text-lg text-gray-700"> · {{job.locale.locale}} </div>
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
          vm.$axios.get(`http://127.0.0.1:8000/api/jobs/${vm.id}`).then((resp) => {
            console.log(resp);
            vm.job = resp.data;
          })
    })
  },
}
</script>

<style>

</style>