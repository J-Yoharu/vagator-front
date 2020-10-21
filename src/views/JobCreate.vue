<template>
    <div class="bg-gray-300">
        <alert-vue v-if="alert.visible" @closeAlert="alert.visible = $event" :type="alert.type" :message="alert.message"/>
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
                        <div class="flex">
                            <div class="w-full mb font-semibold text-lg text-gray-600">
                                <label><span class="f-red">*</span> Nome da vaga</label>
                                <input  type="text" v-model="title" required 
                                    class="block w-full p-2 border border-gray-300 bg-white rounded focus:outline-none">
                            </div>
                        </div>

                        <div class="mt-6 flex justify-around">
                            <div class="w-full mr-4 font-semibold text-lg text-gray-600">
                                <label><span class="f-red">*</span> Cidade</label>
                                <locale  @select="setLocale($event)" :clear="clearFields" :city="true"/>
                            </div>
                            <div class="w-full ml-4 font-semibold text-lg text-gray-600">
                                <label><span class="f-red">*</span> Estado</label>
                                <input disabled v-model="state" type="text" required 
                                    class="block w-full p-2 border border-gray-300 bg-white rounded focus:outline-none cursor-not-allowed">
                            </div>
                        </div>

                        <div class="mt-6 flex justify-around">
                            <div class="w-full mr-4 font-semibold text-lg text-gray-600">
                                <label><span class="f-red">*</span> País</label>
                                <input disabled v-model="country" type="text" required 
                                    class="block w-full p-2 border border-gray-300 bg-white rounded focus:outline-none cursor-not-allowed">
                            </div>
                            <div class="w-full ml-4 font-semibold text-lg text-gray-600">
                                <label><span class="f-red">*</span> Departamento</label>
                                <department @select="department = $event" :clear="clearFields"/>
                            </div>
                        </div>

                        <div class="mt-6 flex justify-around">
                            <div class="w-full mr-4 font-semibold text-lg text-gray-600">
                                <label><span class="f-red">*</span> Tipo do emprego</label>
                                <type @select="type = $event" :clear="clearFields"/>
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
                            <!-- <textarea v-model="description" class="w-full h-32"></textarea> -->
                            <label class="font-semibold text-lg text-gray-600"><span class="f-red">*</span> Descrição da Vaga</label>
                            <quill :submit="submit" @updateQuillText="quillText = $event" />

                        </div>
                        <div class="flex mt-10 justify-end">
                            <router-link tag="button" to="/jobs" 
                                class="px-8 py-3 font-semibold text-gray-600 text-2xl rounded-xl mr-5">Cancelar</router-link>
                            <button @click.prevent="send" class="px-4 py-3 font-semibold text-white text-2xl rounded-2xl c-red">Cadastrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
/*eslint-disable*/
import Locale from '../components/Locales'
import Type from '../components/Types'
import Department from '../components/Departments'
import notificate from '../mixins/notificate'
import Quill from '../components/Quill'

export default {
    mixins: [notificate],
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
            quillText: '',
            submit:false
        }
    },
    components:{
        Locale,
        Type,
        Department,
        Quill
    },
    methods: {
        send(){
            this.submit=true
            let user = JSON.parse(localStorage.user)
            let error = null
            this.$axios.post(`/api/jobs`,{
                title: this.title,
                department_id: this.department,
                locale_id: this.locale,
                type_id: this.type,
                is_remote: this.remote,
                description: this.quillText,
                user_id: user.id
            }).then((resp) => {
                    this.clearFields=true
                    this.title = ""
                    this.department = ""
                    this.locale = ""
                    this.type = ""
                    this.remote = ""
                    this.description = ""
                    this.submit=false
                    this.notification('success',resp.data.success)
                }).catch(err =>{
                    error = true
                    this.notification('error', err.response.data.errors)
                })
                error != null ? false:this.clearFields=false
            
        },
        setLocale(locale){
            this.locale = locale.id
            this.country = locale.country
            this.state = locale.state
        },  
    },
}
</script>

<style>

</style>