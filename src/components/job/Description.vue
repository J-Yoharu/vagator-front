<template>
  <div>
      <div>
          Textão {{id}}
      </div>
      <div>
          <router-link tag="button" :to="`${id}/apply`" class="p-5 w-full rounded-xl text-white text-2xl c-red">Candidatar-se para essa vaga</router-link>
      </div>
  </div>
</template>

<script>
export default {
    props:['id']
}
</script>

<style>

</style>