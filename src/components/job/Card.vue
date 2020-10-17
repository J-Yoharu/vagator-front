<template>
    <div class="bg-white w-100 rounded-lg p-5 mb-5 shadow-md">
       <router-link :to="`/jobs/${job.id}`">
            <div class="text-lg text-gray-700 flex justify-between">
                <span>Publicado há 2 dias</span>
                <!-- admin button -->
                <div class="relative inline-block text-left">
                    <button @click="toggleMenu" class="focus:outline-none">
                        <i class="fas fa-ellipsis-h"></i>
                    </button>
                
                    <div class="hidden origin-top-right absolute right-0 w-32 rounded-md shadow-lg" :id="`adminMenu${job.id}`">
                        <div class="rounded-md bg-white shadow-xs">
                        <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <a href="#" class="block px-4 py-2 text-sm leading-5 font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">Editar vaga</a>
                            <a href="#" class="block px-4 py-2 text-sm leading-5 f-red font-semibold hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900 " role="menuitem">Excluir</a>
                        </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-4 f-red font-semibold text-2xl">
                {{job.title}}
            </div>
            <div class="flex mt-4">
                <div class="mr-2 text-lg text-gray-700"> {{job.actuation_field}} </div>
                <div class="mr-2 text-lg text-gray-700"> · {{job.locale}} </div>
                <div class="mr-2 text-lg text-gray-700"> · {{job.job_type}} </div>
                <div v-if="job.is_remote" class="mr-2 text-lg text-gray-700"> · Remoto </div>
            </div>
        </router-link>   
    </div>
</template>

<script>
export default {
    props:['job'],
    mounted(){
        console.log(this.n)
    },
    methods: {
        toggleMenu() {
            document.querySelector(`#adminMenu${this.job.id}`).classList.toggle('hidden')
        }
    }
}
</script>

<style>

</style>