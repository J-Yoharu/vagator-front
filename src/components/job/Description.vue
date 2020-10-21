<template>
  <div>
      <div class="ql-editor ql-container text-base" v-html="job.description"></div>
      <div>
          <router-link tag="button" :to="`${id}/apply`" class="p-5 w-full rounded-xl text-white text-2xl c-red">Candidatar-se para essa vaga</router-link>
      </div>
  </div>
</template>

<script>
import 'quill/dist/quill.snow.css'

export default {
    props:['id','job']
}
</script>

<style>

</style>