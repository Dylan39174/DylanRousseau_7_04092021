<template>
  <div class="navBar">
    <div class="w3-top">
      <div class="w3-bar w3-black w3-theme-d2 w3-left-align w3-large">
        <span class="w3-bar-item w3-hide-small"><img src="../assets/groupo.png" alt="logo groupomania" width="65"></span>
        <div class="w3-dropdown-hover">
          <button class="w3-button w3-padding-large navbarName"><i class="fa fa-user w3-margin-right"></i>{{this.user.userName}}</button>
          <div class="w3-dropdown-content w3-bar-block w3-border">
            <button class="w3-bar-item w3-button w3-medium" @click="confirmation('deconnexion')">Déconnexon</button>
            <button class="w3-bar-item w3-button w3-medium" @click="confirmation('supprimer')">Supprimer mon compte</button>
          </div>
        </div>
      </div>
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
      confirmation(text){
        if(text=='deconnexion'){
          if(confirm('Se déconnecter ?')){
            this.exit();
          }
        }else if(text=='supprimer'){
          if(confirm('Supprimer mon compte ?')){
            this.deleteAccount();
          }
        }
      },
      exit(){
        localStorage.removeItem('user');
        this.$router.push('/');
      },
      openNav() {
        var x = document.getElementById("navDemo");
        if (x.className.indexOf("w3-show") == -1) {
          x.className += " w3-show";
        } else {
          x.className = x.className.replace(" w3-show", "");
        }
      },
      async deleteAccount(){

        let response = await fetch('http://localhost:3000/api/user/' + this.user.userId, {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).token
          }
        })
        let data = await response.json();
        if (response.ok){
          this.exit();
        }else{
          alert(data.Message);
        }
      },
    },
    beforeMount(){
      this.user = JSON.parse(localStorage.getItem('user'));
      
    },
  }
</script>

<style lang="scss" scoped>
  .navbarName{
    text-transform: capitalize;
  }
  .w3-bar-item{
    &:focus{
      background-color: grey;
    }
  }
  .navbarImage{
    object-fit: cover;
    border: 2px solid red;
  }
  .navbarright{
    display: flex;
    align-items: center;
  }
</style>
