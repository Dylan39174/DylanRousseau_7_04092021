<template>
  <div class="NavBar">
    <div class="w3-top">
      <div class="w3-bar w3-black w3-theme-d2 w3-left-align w3-large">
        <a class="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-theme-d2"><i class="fa fa-bars"></i></a>
        <a href="#" class="w3-bar-item w3-button w3-padding-large w3-theme-d4"><i class="fa fa-home"></i></a>
        <a href="#" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="News"><i class="fa fa-globe"></i></a>
        <a href="#" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Account Settings"><i class="fa fa-user"></i></a>
        <span class="w3-bar-item w3-button w3-hide-small w3-right w3-padding-large w3-hover-white" title="Déconnexion" @click="exit()">
          <img v-bind:src="this.user.imageUrl" class="w3-circle w3-margin-right" style="height:23px;width:23px" alt="Avatar">Déconnexion
        </span>
      </div>
    </div>
<!-- Navbar on small screens -->
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
        user: {},
      }
    },
    methods: {
      loadImage(){
        this.user = JSON.parse(localStorage.getItem('user'));
      },
      exit(){
        localStorage.removeItem('user');
        this.$router.push('/');
      }
    },
    beforeMount(){
      this.loadImage();
    }
  }
</script>
