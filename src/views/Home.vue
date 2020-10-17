<template>
<div class="bg-white">
  <div class="container mx-auto py-5">
    <h1 class="text-2xl font-semibold">Carreiras na UOTZ</h1>
      <hr class="border">
        <p class="mt-4"> 
        Destacamos pessoas que vão além, originais, apaixonadas, proativas, comunicativas e flexíveis. Pessoas com perfil analítico,
        desafiador, investigativo, e crítico, boa capacidade de relacionamento, perfil hands on, versátil e muita vontade de fazer
        acontecer. Interesse em sistemas, tecnologias, novidades do ambiente digital e ferramentas ágeis.
        Se você gosta de trabalhar em equipe e possui inciativas para resolver problemas, com certeza é a pessoa ideal para ser UOTER.
        </p>  
  </div>

  <div class="bg-gray-100 pb-5 pt-6">
      <div class="container mx-auto">
        <div class="flex justify-between mb-5">
          <h2 class="text-2xl font-semibold">Vagas de emprego</h2> 
          <span class="text-gray-700 font-semibold">4 vagas de emprego</span>
        </div>
        
          <form action="" class="mb-10">

            <div class="bg-white w-full p-1 border rounded-md inline-flex items-center">
              <i class="p-4 fa fa-2x fa-search"></i>
              <input type="text" class="w-full text-lg py-5 leading-tight focus:outline-none placeholder-gray-600" v-model="search" placeholder="Pesquisar vagas de emprego...">
            </div>
            
            <div class="mt-5 flex justify-around mb-6">

              <div class="w-full mr-5 text-gray-600">
                <select name="opcoes" class="p-3 text-lg w-full rounded-lg border" placeholder="Local">
                  <option value="" disabled selected hidden>Local</option>
                  <option value=""></option>
                  <option v-for="locale in job.locales" :key="locale" :value="locale">{{locale}}</option>
                </select>
              </div>

              
              <div class="w-full mr-5 text-gray-600">
                <select name="opcoes" class="p-3 text-lg w-full rounded-lg border" @change="filter()" v-model="fieldDepartament" placeholder="Local">
                  <option value="" disabled selected hidden>Departamento</option>
                  <option value=""></option>
                  <option v-for="departament in job.departaments" :key="departament" :value="departament">{{departament}}</option>
                </select>
              </div>

              
              <div class="border w-full mr-5 rounded-md text-gray-600">
                <select name="opcoes" class="p-3 text-lg w-full" placeholder="Local">
                  <option value="" disabled selected hidden>Tipo de emprego</option>
                  <option value=""></option>
                  <option v-for="type in job.types" :key="type" :value="type">{{type}}</option>
                </select>
              </div>

              <div class="w-full text-gray-600 flex items-center">
                <div class="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="toggle" id="toggle" class="toggle-checkbox focus:outline-none absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-400 appearance-none cursor-pointer"/>
                  <label for="toggle" class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-400 cursor-pointer"></label>
              </div>
              <span for="toggle" class="text-lg font-bold text-gray-600">Somente remoto</span>
              </div>
          
            </div>
          </form>

          <job-card v-for="job in jobCard" :key="job.id" :job="job"/>
          <div v-if="jobCard == ''">NO TIENE</div>
          <div class="bg-white w-100 rounded-lg p-8 mb-5 flex justify-between items-center shadow-md">
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
import 'axios'

export default {
  data(){
    return{
      jobs: [],
      jobCard: [],
      search: '',
      job: {
        types: [],
        locales: [],
        departaments: []
      },
      fieldDepartament: ''
    }
  },
  methods:{
    filter(evt){
      console.log(evt)
      this.jobCard = this.jobs.filter(job =>{
         if (job.title.includes(this.search)) {
          return job
         }
      })
    },
    undecorate(string){
        if(string != undefined){
            string = string.toLowerCase()
            string = string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            return string
        }
        return false
    }
  },
  watch:{
    search(){
      this.filter();
    },
  },
  beforeRouteEnter(to, from, next){
    next(vm => {
          vm.$axios.get('http://127.0.0.1:8000/api/jobs/').then((resp) => {
            console.log(resp);
            vm.jobs = resp.data;
            vm.jobCard = resp.data;
          })
    })
  },
  mounted(){
          this.$axios.get('http://127.0.0.1:8000/api/filter').then((resp) => {
            this.job.types = resp.data.types
            this.job.locales = resp.data.locales
            this.job.departaments = resp.data.actuations

            console.log(resp.data)
          })
  },
  components:{
    JobCard,
  }
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