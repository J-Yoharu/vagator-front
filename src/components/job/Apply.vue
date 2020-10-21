<template>
<div>
    <alert-vue v-if="alert.visible" @closeAlert="alert.visible = $event" :type="alert.type" :message="alert.message"/>
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
                    <label><span class="f-red">*</span> Celular</label>
                    <input type="text" v-mask="'(##) #####-####'" required v-model="formField.phone" 
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
                name: '',
                surname: '',
                email: '',
                phone: '',
                why_hire: '',
                knows: '',
                file: ''
            },
            error:  false,
            success: false
        }
    },
    methods:{
        sendForm(){
            this.formField.phone = this.formField.phone.replace(/([^\d])+/gim, '');
            this.formField.knows == '' ? this.formField.knows = 'Não': false
            let formData = new FormData()
            formData.append('job_id', this.id)
            let settings = {headers: {'content-type': 'multipart / form-data'}}
            Object.keys(this.formField).forEach(field => {
                formData.append(field,this.formField[field])
            });
    
            this.$axios.post('/api/applicant/', formData, settings)
                .then(resp => {
                    this.clearPrivate();
                    this.clearDetail();
                    this.notification('success',resp.data.success)
                }).catch(error => {
                    this.notification('error', error.response.data.errors)
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