<template>
  <div class="home">
    <NavBar v-if="getMode=='modify'"/>
    <div class="cont_form w3-padding w3-half w3-display-middle w3-round-xlarge w3-topbar w3-leftbar w3-border w3-row w3-white">
      <h1 class="w3-margin-bottom" v-if="mode=='login'&&getMode=='connection'"><b>Connexion</b></h1>
      <h1 class="w3-margin-bottom" v-if="mode=='signup'&&getMode=='connection'"><b>Inscription</b></h1>
      <h1 class="w3-margin-bottom" v-if="getMode=='modify'">Paramêtres</h1>

      <div v-if="getMode=='connection'">
        <div class="w3-container w3-row">
          <div class="formulaire-create w3-cell w3-col m8 w3-left-align">
            <label class="w3-large" v-if="mode=='signup'">Nom d'utilisateur :</label>
            <input class="userName w3-large w3-input w3-border w3-margin-bottom w3-medium w3-round" type="text" v-if="mode=='signup'" v-model="userName">
            <label class="w3-large">Adresse mail :</label>
            <input class="email w3-large w3-input w3-border w3-margin-bottom w3-round" type="email" v-model="email">
            <label class="w3-large">Mot de passe :</label>
            <input class="password w3-large w3-input w3-border w3-round w3-margin-bottom" type="password" v-model="password">
            <label class="w3-large" v-if="mode=='signup'">Photo de profil :</label><br>
            <input class="w3-margin-top" id="img-form" type="file" ref="file" v-if="mode=='signup'" @change="selectFile('img-form')">
          </div>
          <div class="w3-cell w3-col m4">
            <img class="cursor_img w3-border w3-leftbar w3-rightbar w3-topbar w3-bottombar w3-circle" src="../assets/cursor.png" alt="image d'un curseur" width="150">
          </div>
        </div>
        <div class="w3-display-container w3-margin-top w3-margin-bottom w3-border w3-border-red w3-pale-red" v-if="erreur!=''">
          <span @click="deleteError()" class="mess_error w3-button w3-display-topright">&times;</span>
          <p class="w3-text-red"><b>{{erreur}}</b></p>
        </div>
        <div class="w3-padding w3-large w3-button w3-pale-green w3-border w3-round-large" v-if="mode=='login'" @click="login()">Se connecter</div>
        <div class="w3-padding w3-large w3-button w3-pale-green w3-border w3-round-large w3-margin-left" v-if="mode=='login'" @click="remplir()">Connexion rapide</div>
        <div class="w3-margin w3-large w3-button w3-pale-green w3-border w3-round-large" v-if="mode=='signup'" @click="signup()">S'inscrire</div>
        <p v-if="mode=='login'">Je n'ai pas de compte: <span class="link w3-text-blue" @click="switchToCreateAccount()">M'inscrire</span></p>
        <p v-if="mode=='signup'">J'ai déjà un compte: <span class="link w3-text-blue" @click="switchToLogin()">Me connecter</span></p>
      </div>

      <div v-if="getMode=='modify'">
        <div class="params">
          <div class="infoUser w3-left-align w3-border w3-light-grey w3-padding w3-round-xlarge">
            <h3>Informations</h3>
            <h5><b>Nom d'utilisateur</b></h5>
            <span class="userName">{{user.userName}}</span>
            <h5><b>Adresse mail</b></h5>
            <span>{{user.email}}</span>
          </div>
          <div class="image w3-border w3-light-grey w3-padding w3-round-xlarge">
            <img id="loadUserImg" class="userImg w3-border w3-leftbar w3-rightbar w3-topbar w3-bottombar w3-circle" v-bind:src="user.imageUrl" alt=""> <br>
            <input type="file" id="imgUser" @change="selectFile('imgUser', 'loadUserImg')">
            <label for="imgUser" class="w3-button w3-round-large w3-light-grey w3-border w3-margin-top">Modifier</label>
          </div>
        </div>
        <div class="button w3-margin-top">
          <span class="w3-button w3-light-grey w3-round-large w3-border" @click="deleteProfile()">Supprimer mon compte</span>
          <span class="w3-button w3-light-grey w3-round-large w3-border">Enregistrer les modifications</span>
        </div>
      </div>
      <div class="err w3-container w3-padding w3-topbar w3-bottombar w3-leftbar w3-rightbar w3-pale-red w3-border-red w3-margin-top" v-if="alert==true"> 
        <span class="w3-text-red"><b>Identifiants incorrects !</b></span>
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import NavBar from '../components/NavBar.vue';
export default {
  name: 'Connection',
  components:{
    NavBar
  },
  data(){
    return {
      alert: false,
      user: {},
      mode: 'login',
      userName: '',
      email: '',
      password: '',
      file: null,
      erreur: '',
      modifPassword: false,
    }
  },
  computed:{
    getMode(){
      return this.$store.state.mode;
    }
  },
  methods: {
    switchToCreateAccount(){
      this.mode = 'signup';
      document.title = 'Groupomania | Inscription';
    },
    switchToLogin(){
      this.mode = 'login';
      document.title = 'Groupomania | Connexion';
    },
    selectFile(text, id){
      if(this.getMode=='modify'){
        var input = document.getElementById(text);
        var fReader = new FileReader();
        fReader.readAsDataURL(input.files[0]);
        fReader.onloadend = function(event){
          var img = document.getElementById(id);
          img.src = event.target.result;
        }
      }
      this.file = document.getElementById(text).files[0];
      console.log(this.file);
    },
    signup(){
      if(this.userName == '' || this.email == '' || this.password == ''){
        this.erreur = 'Vous devez remplir tous les champs !';
        document.querySelector('.mess_error').innerHTML = this.erreur;
        return 0;
      }
      const formData = new FormData()
        formData.append('userName', this.userName);
        formData.append('email', this.email);
        formData.append('password', this.password);
        if(this.file != null){
          formData.append('image', this.file);
        }
      fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        body: formData
      })
      .then((res) => {
        if(res.ok){
          return res.json();
        }else{
          return Promise.reject(res.json());
        }
      })
      .then(() => {
        this.login();
      })
      .catch((err) => {
        console.log(err)
      })
    },
    deleteError(){
      this.erreur = '';
    },
    login(){
      if(this.email == '' || this.password == ''){
        this.erreur = 'Vous devez remplir tous les champs !'
        document.querySelector('.mess_error').innerHTML = this.erreur;
        return 0;
      }
      var user = {
        email: this.email,
        password: this.password
      }
      user = JSON.stringify(user);
      fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: user
      })
      .then((res) => {
        if(res.ok){
          return res.json();
        }
        return Promise.reject(res.json());
      })
      .then((data) => {
        localStorage.setItem('user', JSON.stringify(data));
        this.$router.push('post');
      })
      .catch(() => {
        this.alert = true;
      })
    },
    remplir(){
      this.email = 'dylan@orange.fr';
      this.password = 'DYlan39300';
      document.querySelector('.email').value = this.email;
      document.querySelector('.password').value = this.password;
      this.login();
    },
    exit(){
      this.changeMode('connection');
      localStorage.removeItem('user');
      this.$router.push('/');
    },
    changeMode(text){
      this.$store.commit('modifyMode', text);
    },
    deleteProfile(){
      fetch('http://localhost:3000/api/user/' + this.user.userId, {
        method:'DELETE'
      })
      .then((res) => {
        if(res.ok){
          return res.json();
        }
      })
      .then(() => {
        this.exit();
      })
      .catch((err) => {
        console.log(err);
      })
    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'));
  }
}
</script>

<style lang="scss" scoped>
  .userName{
    text-transform: capitalize;
  }
  .formulaire-modif{
    h5{
      margin: 0 !important;
    }
    input{
      margin: 0 0 10px 0 !important;
    }
  }
  .profile_img{
    width: 150px;
    height: 150px;
    object-fit: cover;
  }
  .file{
    display: none;
  }
  .p-userName{
    text-transform: capitalize;
  }
  .cursor_img{
  position: absolute;
  top: 25%;
  bottom: 0;
  right: 0;
  left: 72%;
}
.userImg{
  width: 150px;
  height: 150px;
  object-fit: cover;
}
.params{
  display: flex;
  justify-content: space-around;
  h5{
    margin: 10px 0 0 0 !important;
  }
  .userName{
    text-transform: capitalize;
  }
}
.button{
  display: flex;
  justify-content: space-around !important;
  
}
.infoUser, .image, .button span{
  min-width: 250px;
}
#imgUser{
  display: none;
}
.err{
  position: relative;
  width: 40%;
  margin: auto auto;
}
</style>