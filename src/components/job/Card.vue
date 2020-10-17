<template>
    <div class="bg-white w-100 rounded-lg p-5 mb-5 shadow-md">
       <router-link :to="`/jobs/${job.id}`">
            <div class="text-lg text-gray-700 flex justify-between">
                <span>{{job.created_at}}</span>
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
                <div class="mr-2 text-lg text-gray-700"> {{job.department.department}} </div>
                <div class="mr-2 text-lg text-gray-700"> · {{job.locale.locale}} </div>
                <div class="mr-2 text-lg text-gray-700"> · {{job.type.type}} </div>
                <div v-if="job.is_remote" class="mr-2 text-lg text-gray-700"> · Remoto </div>
            </div>
        </router-link>   
    </div>
</template>

<script>
export default {
    props:['job'],
    data(){
        return {
            date: ''
        }
    },
    methods: {
        toggleMenu() {
            document.querySelector(`#adminMenu${this.job.id}`).classList.toggle('hidden')
        },
        differenceBetweenDates(){
            let today = new Date(new Date().toJSON().slice(0,10).replace(/-/g,'/'))
            let postData = new Date(this.job.created_at.slice(0,10).replace(/-/g,'/'))
            let difference = (today.getTime() - postData.getTime()) / (1000 * 3600 * 24);
            return difference;
        },
        calcPostTime(){
                        if(this.differenceBetweenDates() == 0){
                return "Publicado Hoje"
            }
            return `Publicado há ${id} dias`;
        }
 
    },
    created(){
        this.differenceBetweenDates()
    }
}
</script>

<style>

</style>