<template>
        <select name="opcoes" class="p-3 text-lg w-full rounded-lg border"
            @change="sendDepartment" v-model="select"> 
            <option value="" disabled selected hidden>Departamentos</option>
            <option value=""></option>
            <option v-for="department in departments" :key="department.id" :value="department.id"> {{department.department}} </option>
        </select>
</template>

<script>
export default {
    props:['clear','selected'],
    data(){
        return {
            departments: [],
            select:''
        }
    },
    methods:{
        getDepartments(){
        this.$axios.get(`/api/departments`,{
          }).then((resp) => {
              this.departments = resp.data
          })  
        },
        sendDepartment(){
            this.$emit('select', this.select)
        },
    },
    created(){
        this.getDepartments();
    },
    watch:{
        clear(){
            this.select = ''
            this.sendDepartment()
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