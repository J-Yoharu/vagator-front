<template>
        <select name="opcoes" class="p-3 text-lg w-full rounded-lg border" 
            @change="sendSelect" v-model="select"> 
            <option value="" disabled hidden>Local</option>
            <option value=""></option>
            <option v-for="locale in locales" :key="locale.id" :value="locale"> {{ (city) ? locale.city : `${locale.city}, ${locale.state}, ${locale.country}`  }} </option>
        </select>
</template>

<script>
export default {
    props:['city','clear','selected'],
    data(){
        return {
            locales: [],
            select: '',
            locale: {}
        }
    },
    methods:{
        getLocales(){
        this.$axios.get(`/api/locales`,{
          }).then((resp) => {
              console.log("respondeuuu")
              this.locales = resp.data
            console.log(resp)
          })  
        },
        sendSelect(){
            this.$emit('select',this.select)
        },
    },
    created(){
        this.getLocales();
    },
    watch:{
        clear(){
            this.select = ''
            this.$emit('select',this.select)
        },
        selected(){
            this.select = this.selected
            this.$emit('select',this.select)
        }
    }
}
</script>

<style>

</style>