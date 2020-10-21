<template>
    
    <span class="loader"></span>
      
   
</template>

<script>
export default {
    props:['text'],
}
</script>

<style>
.loader {
  border: 3px solid #f3f3f3; /* Light grey */
  border-top: 3px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  animation: spin 2s linear infinite;
}

</style>