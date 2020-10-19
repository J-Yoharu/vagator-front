<template>
 <div class="bg-gray-300">
        <div class="bg-white border-b-2 p-8">
            <div class="container mx-auto flex items-center">
                <i class="fa fa-2x fa-chevron-left pr-5 text-gray-400" aria-hidden="true"></i>
                <h1 class="text-2xl font-semibold">Atualizar vaga</h1>
            </div>
        </div>

        <div class="bg-gray-100 pb-5 pt-6">
            <div class="container mx-auto">
                <div class="text-gray-600 text-lg">
                    <span class="f-red">*</span> Campos obrigatórios
                </div>

                <div class="mt-5 mb-8">
                    <form action="">
                        <div class="flex justify-around">
                            <div class="w-full mb font-semibold text-lg text-gray-600">
                                <label><span class="f-red">*</span> Nome da vaga</label>
                                <input  type="text" required 
                                    class="block w-full p-2 border border-gray-300 bg-white rounded focus:outline-none">
                            </div>
                        </div>

                        <div class="mt-6 flex justify-around">
                            <div class="w-full mr-4 font-semibold text-lg text-gray-600">
                                <label><span class="f-red">*</span> País</label>
                                <input  type="text" required 
                                    class="block w-full p-2 border border-gray-300 bg-white rounded focus:outline-none">
                            </div>
                            <div class="w-full ml-4 font-semibold text-lg text-gray-600">
                                <label><span class="f-red">*</span> Cidade</label>
                                <input type="text" required 
                                    class="block w-full p-2 border border-gray-300 bg-white rounded focus:outline-none">
                            </div>
                        </div>

                        <div class="mt-6 flex justify-around">
                            <div class="w-full mr-4 font-semibold text-lg text-gray-600">
                                <label><span class="f-red">*</span> Estado</label>
                                <input type="text" required 
                                    class="block w-full p-2 border border-gray-300 bg-white rounded focus:outline-none">
                            </div>
                            <div class="w-full ml-4 font-semibold text-lg text-gray-600">
                                <label><span class="f-red">*</span> Departamento</label>
                                <input type="text" required 
                                    class="block w-full p-2 border border-gray-300 bg-white rounded focus:outline-none">
                            </div>
                        </div>

                        <div class="mt-6 flex justify-around">
                            <div class="w-full mr-4 font-semibold text-lg text-gray-600">
                                <label><span class="f-red">*</span> Tipo do emprego</label>
                                <input type="email" required 
                                    class="block w-full p-2 border border-gray-300 bg-white rounded focus:outline-none">
                            </div>
                            <div class="w-full flex items-center pt-6 ml-4 font-semibold text-lg text-gray-600">
                                <div class="relative inline-block w-12 mr-2 select-none transition duration-200 ease-in">
                                    <input type="checkbox" id="toggle" class="toggle-checkbox focus:outline-none absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-400 appearance-none cursor-pointer"/>
                                    <label for="toggle" class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-400 cursor-pointer"></label>
                                </div>
                                <span for="toggle" class="text-lg font-bold text-gray-600">Somente remoto</span>
                            </div>
                        </div>

                        <div class="w-full mt-6">
                            <label class="font-semibold text-lg text-gray-600"><span class="f-red">*</span> Descrição da Vaga</label>
                            <div class="bg-white ">
                                <div id="editor" class="" style="min-height:10rem">

                                </div> 
                            </div>
                        
                        </div>
                        <div class="flex mt-10 justify-end">
                            <router-link tag="button" to="/jobs" 
                                class="px-8 py-3 font-semibold text-gray-600 text-2xl rounded-xl mr-5">Cancelar</router-link>
                            <button @click.prevent="send" class="px-8 py-3 font-semibold text-white text-2xl rounded-2xl c-red">Cadastrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['id','user'],
    data(){
        return{
            job:''
        }
    },
    beforeRouteEnter(to, from, next){
        next(vm =>{
            setTimeout(()=>{
                if(vm.user != null){
                    vm.$axios.get(`${process.env.VUE_APP_BACKEND_URL}/api/jobs/${vm.id}`).then(resp =>{
                        console.log(resp)
                    })
                    return true
                }else{
                    console.log("usuário errado")
                    vm.$router.push('/jobs')
                }
            },100)
        })
    }
}
</script>

<style>

</style>