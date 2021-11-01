<template>
  <div class="navBar">
    <div class="w3-top">
      <div class="w3-bar w3-black w3-theme-d2 w3-left-align w3-large">
        <a class="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-theme-d2" @click="openNav()"><i class="fa fa-bars"></i></a>
        <router-link to="/post" @click="changeMode('connection')" class="w3-bar-item w3-button w3-padding-large w3-theme-d4"><i class="fa fa-home" title="Fil d'actualité"></i></router-link>
        <!-- <a href="#" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="News"><i class="fa fa-globe"></i></a> -->
        <router-link to="/" @click="changeMode('modify')" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Paramêtres du compte"><i class="fa fa-user"></i></router-link>
        <span class="w3-bar-item w3-button w3-hide-small w3-right w3-padding-large w3-hover-white" title="Déconnexion" @click="exit()">
          <img v-bind:src="this.user.imageUrl" class="w3-circle w3-margin-right" style="height:23px;width:23px" alt="Avatar">Déconnexion
        </span>
      </div>
    </div>

    <div id="navDemo" class="w3-bar-block w3-theme-d2 w3-hide w3-hide-large w3-hide-medium w3-large">
      <a href="#" class="w3-bar-item w3-button w3-padding-large">Link 1</a>
      <a href="#" class="w3-bar-item w3-button w3-padding-large">Link 2</a>
      <a href="#" class="w3-bar-item w3-button w3-padding-large">Link 3</a>
      <a href="#" class="w3-bar-item w3-button w3-padding-large">My Profile</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NavBar',
    data(){
      return {
        user: {}
      }
    },
    methods:{
      exit(){
        this.changeMode('connection');
        localStorage.removeItem('user');
        this.$router.push('/');
      },
      changeMode(text){
        this.$store.commit('modifyMode', text);
      },
      openNav() {
        alert('bonjour');
        var x = document.getElementById("navDemo");
        if (x.className.indexOf("w3-show") == -1) {
          x.className += " w3-show";
        } else {
          x.className = x.className.replace(" w3-show", "");
        }
      }
    },
    beforeMount(){
      this.user = JSON.parse(localStorage.getItem('user'));
    }
  }
</script>

<style lang="scss" scoped>

</style>
