<template>
  <div class="error">
    <div class="w3-card w3-round-xxlarge w3-border w3-half w3-display-middle w3-margin-top w3-text-red w3-padding">
      <img src="../assets/groupo.png" alt="logo groupomania">
      <h1>Erreur 404</h1>
      <p class="w3-large">Cette page est introuvable</p>
      <span class="w3-button w3-round w3-border" @click="this.$router.push('/post');">Retour</span>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'NotFound'
  }
</script>

<style lang="scss" scoped>
  .error{
    background-color: red;
  }
</style>
