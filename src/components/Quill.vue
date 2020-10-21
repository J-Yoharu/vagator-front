<template>
    <div class="bg-white z-0 border w-full">
        <div id="editor" class="h-56">

        </div> 
    </div>
</template>

<script>
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.core.css'
import Quill from 'quill'
export default {
    props:['loadText'],
    data(){
        return{
            quill:''
        }
    },
    mounted(){
        var options = {
        modules: {'toolbar': [
                [{ 'size': [] }],
                [{ 'align': [] }],
                [ 'bold', 'italic', 'underline' ],
                [ { 'list': 'ordered' }, { 'list': 'bullet'} ],
                [ 'link', ],
            ]
            
        },
        theme: 'snow'
        };
        this.quill = new Quill('#editor', options);
        this.quill.on('text-change',() => {
            this.$emit('updateQuillText',this.quill.root.innerHTML)
        });
    },watch:{
        loadText(){
            this.quill.root.innerHTML=this.loadText
        }
    }
}
</script>

<style>
.ql-size-huge{
    font-size: 1.5rem;
}
.ql-size-large{
    font-size: 1.125rem;
}
.ql-size-small{
    font-size: 0.875rem;
}
</style>