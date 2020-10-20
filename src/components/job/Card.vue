<template>
    <div class="bg-white w-100 rounded-lg p-5 mb-5 shadow-md">
            <div class="text-lg text-gray-700 flex justify-between">
                <div>
                    {{timePost}}
                </div>
                <!-- admin button -->
                <div v-if="user != null" class="relative inline-block text-left">
                    <button @click="toggleMenu" class="focus:outline-none">
                        <i class="fas fa-ellipsis-h"></i>
                    </button>
                
                    <div class="hidden origin-top-right absolute right-0 w-32 rounded-md shadow-lg" :id="`adminMenu${job.id}`">
                        <div class="rounded-md bg-white shadow-xs">
                        <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <router-link :to="`/jobs/${job.id}/update`" tag="button" class="block w-full px-4 py-2 text-sm leading-5 font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">Editar vaga</router-link>
                            <button @click="deleteJob" class="block w-full px-4 py-2 text-sm leading-5 f-red font-semibold hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900 " role="menuitem">Excluir</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <router-link :to="`/jobs/${job.id}`">
                <div class="mt-4 f-red font-semibold text-2xl">
                    {{job.title}}
                </div>
                <div class="flex mt-4">
                    <div class="mr-2 text-lg text-gray-700"> {{job.department.department}} </div>
                    <div class="mr-2 text-lg text-gray-700"> · {{job.locale.country}}, {{job.locale.state}}, {{job.locale.city}} </div>
                    <div class="mr-2 text-lg text-gray-700"> · {{job.type.type}} </div>
                    <div v-if="job.is_remote" class="mr-2 text-lg text-gray-700"> · Remoto </div>
                </div>
            </router-link>   
    </div>
</template>

<script>
export default {
    props:['job','user'],
    data(){
        return {
            timePost: '',
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
            let days = this.differenceBetweenDates()
            if(days == 0){
                this.timePost = "Publicado hoje"
            }else{
                this.timePost = `Publicado há ${days} ${days > 1 ? 'dias':'dia'}`;
            }
        },
        deleteJob(){
            this.$axios.delete(`/api/jobs/${this.job.id}`,{
                headers: { 
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `Bearer ${localStorage.token}`, 
                    mode:'no cors',
                }
            }).then(() =>{
                this.$emit('delete:job', this.job.id);
            })
        },
    },
    mounted(){
        this.calcPostTime();
    },
    updated(){
        this.calcPostTime();
    }
}
</script>

<style>

</style>