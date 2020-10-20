<template>
        <select name="opcoes" class="p-3 text-lg w-full rounded-lg border" 
            @change="sendType" v-model="select"> 
            <option value="" disabled selected hidden>Tipos</option>
            <option value=""></option>
            <option v-for="type in types" :key="type.id" :value="type.id"> {{type.type}} </option>
        </select>
</template>

<script>
export default {
    props:['clear','selected'],
    data(){
        return {
            types: [],
            select:''
        }
    },
    methods:{
        getTypes(){
        this.$axios.get(`/api/types`,{
          }).then((resp) => {
              this.types = resp.data
          })  
        },
        sendType(){
             this.$emit('select', this.select)
        }
    },
    created(){
        this.getTypes();
    },
    watch:{
        clear(){
            this.select = ''
            this.sendType()
        },
        selected(){
            this.select = this.selected.id
            this.$emit('select',this.select)
        }
    }
}
</script>

<style>

</style>