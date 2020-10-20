<template>
<div class="bg-white">
  <div class="container mx-auto py-5">
    <h1 class="text-2xl font-semibold">Carreiras na UOTZ</h1>
      <hr class="border">
        <p class="mt-4"> 
        Destacamos pessoas que vão além, <strong>originais, apaixonadas, proativas, comunicativas e flexíveis.</strong>  Pessoas com perfil <strong>analítico,
        desafiador, investigativo, e crítico, boa capacidade de relacionamento, perfil hands on, versátil e muita vontade de fazer
        acontecer.</strong> Interesse em sistemas, tecnologias, novidades do <strong>ambiente digital e ferramentas ágeis.</strong> 
        Se você gosta de <strong> trabalhar em equipe</strong> e possui <strong> inciativas para resolver problemas </strong>, com certeza é a pessoa ideal para ser <strong class="f-red">UOTER</strong>.
        </p>  
  </div>

  <div class="bg-gray-100 pb-5 pt-6">
      <div class="container mx-auto">
        <div class="flex justify-between mb-5">
          <h2 class="text-2xl font-semibold">Vagas de emprego</h2> 
          <span class="text-gray-700 font-semibold">{{this.jobs.total}} vagas de emprego</span>
        </div>
        
          <div class="mb-10">
            <form @submit.prevent="search">
            <div class="bg-white w-full px-5 border rounded-md inline-flex items-center">
              <input type="text" class="w-full text-lg py-5 leading-tight focus:outline-none placeholder-gray-600" v-model="title" placeholder="Pesquisar vagas de emprego...">
              <button @click="search" class="focus:outline-none"><i class="p-4 fa fa-2x fa-search"></i></button>
            </div>
            
            <div class="mt-5 flex justify-around mb-6">

              <div class="w-full mr-5 text-gray-600">
                <locale @select="selected.locale = $event" />
              </div>

              <div class="w-full mr-5 text-gray-600">
                <department @select="selected.department = $event"/>
              </div>
              
              <div class="border w-full mr-5 rounded-md text-gray-600">
                <type @select="selected.type = $event"/>
              </div>

              <div class="w-full text-gray-600 flex items-center">
                <div class="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="toggle" id="toggle" v-model="selected.remote" 
                    class="toggle-checkbox focus:outline-none absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-400 appearance-none cursor-pointer"/>
                  <label for="toggle" class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-400 cursor-pointer"></label>
              </div>
              <span for="toggle" class="text-lg font-bold text-gray-600">Somente remoto</span>
              </div>
          
            </div>
            </form>
          </div>

          <job-card @delete:job="deleteJob($event)" :user.sync="user" v-for="(job,index) in jobs.data" :key="index" :job="job"/>
          <div v-if="jobs.data == ''" class="flex justify-center p-5 text-2xl">Sem resultados</div>
       
           <div class="flex justify-center mb-5">
              <nav class="relative z-0 inline-flex shadow-sm">
                <button :disabled="jobs.prev_page_url == null ? true:false" @click="paginate('prev')" :class="jobs.prev_page_url == null ? 'border border-gray-300 cursor-default bg-gray-200':'border border-blue-300'" class="px-2 py-2 rounded-l-md border bg-white text-sm leading-5 font-medium text-blue-500 hover:text-blue-800 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100" aria-label="Previous">
                  <!-- Heroicon name: chevron-left -->
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
              
                <button :disabled="jobs.next_page_url == null ? true:false"  @click="paginate('next')" :class="jobs.next_page_url == null ? 'border border-gray-300 cursor-default bg-gray-200':'border border-blue-300'" class="px-2 py-2 rounded-r-md bg-white text-sm leading-5 font-medium text-blue-500 hover:text-blue-800 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150" aria-label="Next">
                  <!-- Heroicon name: chevron-right -->
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>

          <div v-if="user == null" class="bg-white w-100 rounded-lg p-8 mb-5 flex justify-between items-center shadow-md">
            <div class=" text-xl pl-3 mr-2 text-gray-600">
                Não encontrou o cargo certo? Envie o seu currículo por e-mail para ser considerado novas vagas no futuro. 
            </div>
            <div>
              <button class="w-64 c-red text-white py-3 rounded-lg">Enviar meu currículo por e-mail</button>
            </div>
          </div>
      </div>
    </div>
  </div>
  
</template>

<script>

import JobCard from '../components/job/Card'
import Locale from '../components/Locales'
import Type from '../components/Types'
import Department from '../components/Departments'

import 'axios'

export default {
  props:['user'],
  data(){
    return{
      jobs: [],
      title:'',
      job: {
        types: [],
        locales: [],
        departaments: []
      },
      selected:{
        locale:'',
        department:'',
        type:'',
        remote:false,
      }
    }
  },
    components:{
      JobCard,
      Locale,
      Type,
      Department
  },
  methods:{
    deleteJob(jobDeleteId){
      this.jobs.data = this.jobs.data.filter(job => {
        if(job.id == jobDeleteId){
          return null
        }
        return job
      })
    },
    search(){
        this.$axios.get(`/api/jobs/search`,{
            params:{
              title:this.title,
              locale:this.selected.locale,
              department:this.selected.department,
              type:this.selected.type,
              remote:this.selected.remote
            }
          }).then((resp) => {
            this.jobs = resp.data;
          })
    },
    paginate(url){
      url == 'next' ? url = this.jobs.next_page_url: url = this.jobs.prev_page_url
        this.$axios.get(url).then((resp) => {
            window.scrollTo(0,0)
            this.jobs = resp.data;
          })
    }
  },
  mounted(){
          this.$axios.get(`/api/jobs/filters`).then((resp) => {
            this.job.types = resp.data.types
            this.job.locales = resp.data.locales
            this.job.departaments = resp.data.departments
          })

          this.$axios.get(`/api/jobs`).then((resp) => {
            console.log(resp.data)
            this.jobs = resp.data;
          })
  },
}
</script>

<style>
.toggle-checkbox:checked {
  right: 0;
  border-color: #68D391;
  outline:none;
}
.toggle-checkbox:checked + .toggle-label {
  background-color: #68D391;
  outline:none;
}
</style>