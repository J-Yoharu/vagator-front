<template>
    <div class="bg-gray-300">
        <div class="bg-white border-b-2 p-8">
            <div class="container mx-auto flex items-center">
                <i class="fa fa-2x fa-chevron-left pr-5 text-gray-400" aria-hidden="true"></i>
                <h1 class="text-2xl font-semibold">Cadastrar nova vaga</h1>
            </div>
        </div>

        <div class="bg-gray-100 pb-5 pt-6">
            <div class="container mx-auto">
                <div class="text-gray-600 text-lg">
                    <span class="f-red">*</span> Campos obrigatórios
                </div>

                <div class="mt-5 mb-8">
                    <form>
                        <div class="flex justify-around">
                            <div class="w-full mb font-semibold text-lg text-gray-600">
                                <label><span class="f-red">*</span> Nome da vaga</label>
                                <input  type="text" v-model="title" required 
                                    class="block w-full p-2 border border-gray-300 bg-white rounded focus:outline-none">
                            </div>
                        </div>

                        <div class="mt-6 flex justify-around">
                            <div class="w-full mr-4 font-semibold text-lg text-gray-600">
                                <label><span class="f-red">*</span> Cidade</label>
                                <locale  @select="setLocale($event)" :selected="selected.locale" :clear="clearFields" :city="true"/>
                            </div>
                            <div class="w-full ml-4 font-semibold text-lg text-gray-600">
                                <label><span class="f-red">*</span> Estado</label>
                                <input disabled v-model="state" type="text" required 
                                    class="block w-full p-2 border border-gray-300 bg-white rounded focus:outline-none">
                            </div>
                        </div>

                        <div class="mt-6 flex justify-around">
                            <div class="w-full mr-4 font-semibold text-lg text-gray-600">
                                <label><span class="f-red">*</span> País</label>
                                <input disabled v-model="country" type="text" required 
                                    class="block w-full p-2 border border-gray-300 bg-white rounded focus:outline-none">
                            </div>
                            <div class="w-full ml-4 font-semibold text-lg text-gray-600">
                                <label><span class="f-red">*</span> Departamento</label>
                                <department @select="department = $event" :selected="selected.department"  :clear="clearFields"/>
                            </div>
                        </div>

                        <div class="mt-6 flex justify-around">
                            <div class="w-full mr-4 font-semibold text-lg text-gray-600">
                                <label><span class="f-red">*</span> Tipo do emprego</label>
                                <type @select="type = $event" :selected="selected.type" :clear="clearFields"/>
                            </div>
                            <div class="w-full flex items-center pt-6 ml-4 font-semibold text-lg text-gray-600">
                                <div class="relative inline-block w-12 mr-2 select-none transition duration-200 ease-in">
                                    <input v-model="remote" type="checkbox" id="toggle" class="toggle-checkbox focus:outline-none absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-400 appearance-none cursor-pointer"/>
                                    <label for="toggle" class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-400 cursor-pointer"></label>
                                </div>
                                <span for="toggle" class="text-lg font-bold text-gray-600">Somente remoto</span>
                            </div>
                        </div>

                        <div class="w-full mt-6">
                            <textarea v-model="description" class="w-full h-32"></textarea>
                            <!-- <label class="font-semibold text-lg text-gray-600"><span class="f-red">*</span> Descrição da Vaga</label>
                            <div class="bg-white ">
                                <div id="editor" class="" style="min-height:10rem">

                                </div> 
                            </div> -->
                        
                        </div>
                        <div class="flex mt-10 justify-end">
                            <router-link tag="button" to="/jobs" 
                                class="px-8 py-3 font-semibold text-gray-600 text-2xl rounded-xl mr-5">Cancelar</router-link>
                            <button @click.prevent="send" class="px-8 py-3 font-semibold text-white text-2xl rounded-2xl c-red">Alterar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
/*eslint-disable*/
import Quill from 'quill'
import Locale from '../components/Locales'
import Type from '../components/Types'
import Department from '../components/Departments'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.core.css'

export default {
    props:['id'],
    data(){
        return {
            title: '',
            department: '',
            locale: '',
            type: '',
            remote: false,
            state: '',
            country:'',
            description:'',
            clearFields:false,
            selected:''
        }
    },
    components:{
        Locale,
        Type,
        Department
    },
    methods: {
         getJob(){
        this.$axios.get(`/api/jobs/${this.id}`,{
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            }
          }).then((resp) => {
            this.title = resp.data.title
            this.selected = resp.data
            this.remote = resp.data.is_remote
            this.description = resp.data.description
          })
        },
        send(){
            this.$axios.put(`/api/jobs/${this.id}`,{
                title: this.title,
                department_id: this.department,
                locale_id: this.locale,
                type_id: this.type,
                is_remote: this.remote,
                description: this.description,
            },{headers: { 
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `Bearer ${localStorage.token}`, 
                    mode:'no cors',
                }}).then((resp) => {
                    console.log("deu tudo certo")
                }).catch(error =>{
                    console.log(error)
                })
                this.clearFields=false
        },
        setLocale(locale){
            this.locale = locale.id
            this.country = locale.country
            this.state = locale.state
        }
        
    },
    mounted(){
        this.getJob()
        var options = {
        debug: 'info',
        modules: {'toolbar': [
                [ 'bold', 'italic', 'underline' ],
                [ { 'list': 'ordered' }, { 'list': 'bullet'} ],
                [ 'link', ],
                [ 'code-block' ],
            ]
            
        },
        theme: 'snow'
        };
        // var quill = new Quill('#editor', options);
    }
}
</script>

<style>

.ql-font-roboto {
  font-family: 'Roboto', sans-serif;
}
</style>