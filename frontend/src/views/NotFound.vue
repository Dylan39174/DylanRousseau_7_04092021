<template>
  <div class="error">
    <div class="w3-card w3-round-xxlarge w3-border w3-half w3-display-topmiddle w3-margin-top w3-text-red">
      <img src="../assets/groupo.png" alt="logo groupomania">
      <h1>Erreur 404</h1>
      <p class="w3-large">Cette page est introuvable</p>
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
