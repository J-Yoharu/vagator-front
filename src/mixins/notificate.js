export default {
    methods: {
        notification(type, message){
            this.alert.visible = true
            this.alert.type = type
            this.alert.message = message
        }
    },
    data(){
        return{
            alert:{
                visible:false,
                type:'',
                message:''
            }
        }
    }
}