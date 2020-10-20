<template>
<div>
    <alert-vue v-if="alert.visible" @closeAlert="alert.visible = $event" :type="alert.type" :message="alert.message"/>
    <div class="flex justify-center">
        <div v-if="success" role="alert" class="w-1/2">
            <div class="bg-green-500 text-white font-bold rounded-t px-4 py-2">
                Sucesso!
            </div>
            <div class="border border-t-0 border-green-400 rounded-b bg-red-100 px-4 py-3">
                <p>Seu cadastro foi concluido com sucesso.<router-link to="/jobs" tag="a" class="text-blue-700">clique aqui </router-link>para ver mais vagas</p>
            </div>
        </div>
    </div>
    <div v-if="error" class="flex justify-center">
        <div role="alert" class="w-1/2">
            <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                Erro!
            </div>
            <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3">
                <p>Há campos obrigatórios não preenchidos, favor preencher todos.</p>
            </div>
        </div>
    </div>
    <div class="text-gray-600 text-lg">
        <span class="f-red">*</span> Campos obrigatórios
    </div>

    <div class="mt-4 flex justify-between">
        <h1 class="text-gray-600 font-medium text-2xl">
            Informações pessoais
        </h1>
        <button @click.prevent="clearPrivate">limpar</button>
    </div>

    <hr class="border">

    <div class="mt-5 mb-8">
        <form action="">
            
            <div class="flex justify-around">
                <div class="w-full mr-4 font-semibold text-lg text-gray-600">
                    <label><span class="f-red">*</span> Nome </label>
                    <input type="email" v-model="formField.name" required 
                        class="block w-full p-2 border border-gray-300 bg-white rounded focus:outline-none">
                </div>
                <div class="w-full ml-4 font-semibold text-lg text-gray-600">
                    <label><span class="f-red">*</span> Sobrenome</label>
                    <input type="email" v-model="formField.surname" required 
                        class="block w-full p-2 border border-gray-300 bg-white rounded focus:outline-none">
                </div>
            </div>

            <div class="mt-6 flex justify-around">
                <div class="w-full mr-4 font-semibold text-lg text-gray-600">
                    <label><span class="f-red">*</span> E-mail</label>
                    <input type="email" v-model="formField.email" required 
                        class="block w-full p-2 border border-gray-300 bg-white rounded focus:outline-none">
                </div>
                <div class="w-full ml-4 font-semibold text-lg text-gray-600">
                    <label><span class="f-red">*</span> Telefone</label>
                    <input type="text" id="phone" required v-model="formField.phone" 
                        class="block w-full p-2 border border-gray-300 bg-white rounded focus:outline-none">
                </div>
            </div>

            <div class="w-full mt-6 font-semibold text-lg text-gray-600">
                <label><span class="f-red">*</span> Curriculo</label>
                <input type="file" ref="file" v-on:change="handleFileUpload()" id="file" required class="hidden">
                <div class="mt-4 h-32">
                    <label for="file">
                        <div class="h-full text-gray-400 cursor-pointer flex justify-center items-center border border-dashed appearance-none">
                            <div v-if="formField.file == ''"><span class="f-red">Enviar um arquivo </span>⠀ou arraste e solte aqui</div>
                            <div v-else class="text-black">o arquivo "{{formField.file.name}}" foi selecionado</div>
                        </div>
                    </label>
                </div>
            </div>

            <div class="mt-4 flex justify-between">
                <h1 class="text-gray-600 font-medium text-2xl">
                    Detalhes
                </h1>
                <button @click.prevent="clearDetail">limpar</button>
            </div>

            <hr class="border">

            <div class="w-full mt-4 font-semibold text-lg text-gray-600">
                <label><span class="f-red">*</span> Por que devemos contratá-lo? (em vez de outro candidato principal em sua área).</label>
                <textarea name="" v-model="formField.why_hire" style="resize:none"
                    class="block w-full h-40 p-2 border border-gray-300 bg-white rounded focus:outline-none">
                </textarea>
            </div>

            <div class="w-full mt-4 font-semibold text-lg text-gray-600">
                <label><span class="f-red">*</span> Você conhece alguém que trabalha na UOTZ? se sim, escreva o nome dele aqui :).</label>
                <textarea name="" v-model="formField.knows" style="resize:none"
                    class="block w-full h-40 p-2 border border-gray-300 bg-white rounded focus:outline-none">
                </textarea>
            </div>
        </form>
    </div>
    <div>
          <button @click="sendForm" class="p-5 w-full rounded-xl text-white text-2xl c-red">Enviar minha candidatura</button>
    </div>
</div>
</template>

<script>
import notificate from '../../mixins/notificate'
export default {
    mixins: [notificate],
    props:['id'],
    data(){
        return{
            formField:{
                name: 'tets',
                surname: 'aa',
                email: 'a',
                phone: 11940757445,
                why_hire: 'a',
                knows: 'a',
                file: ''
            },
            error:  false,
            success: false
        }
    },
    methods:{
        sendForm(){

            let formData = new FormData()
            formData.append('job_id', this.id)
            let settings = {headers: {'content-type': 'multipart / form-data'}}
            Object.keys(this.formField).forEach(field => {
                formData.append(field,this.formField[field])
            });
    
            this.$axios.post('/api/applicant/', formData, settings)
                .then(resp => {
                    console.log(resp)
                    this.clearPrivate();
                    this.clearDetail();
                    this.notification('success',resp.data.success)
                }).catch(error => {
                    console.log(error.response)
                    this.notification('error', 'Algo de errado não deu certo')
                })
        },

        clearPrivate(){
            this.formField.name = ''
            this.formField.surname = ''
            this.formField.email = ''
            this.formField.phone = ''
            this.formField.file = ''
        },
        clearDetail(){
            this.formField.why_hire = ''
            this.formField.knows = ''
        },
        handleFileUpload(){
            this.formField.file = this.$refs.file.files[0]
        }
    },created(){
   
    }
}
</script>

<style>

</style>