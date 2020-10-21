<template>
   <div class="fixed z-50 border-l-4 py-4 p-5 rounded shadow-lg flex items-center justify-between mb-2 mr-2 bottom-0 right-0 w-1/4" 
        :class="type == 'success' ? 'bg-green-600' : 'bg-red-600'" role="alert">
        <div class="">
            <p class="font-bold mb-1 text-2xl">{{type}}</p>
            <p style="word-break: break-all" class="text-grey-dark inline-block">{{message}}</p>
        </div>
        <div class="">
            <i class="fas fa-times mx-2 fa-2x text-grey-darker cursor-pointer" @click="close"></i>
        </div>
    </div>
</template>

<script>
export default {
    props:['type','message'],
    methods:{
        close(){
            this.$emit('closeAlert',false)
        }
    }
}
</script>

<style>

</style>