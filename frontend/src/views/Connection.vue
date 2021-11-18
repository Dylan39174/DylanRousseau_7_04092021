<template>
  <div class="home">
    <NavBar v-if="getMode=='modify'"/>
    <div class="cont_form w3-padding w3-display-middle w3-round-xlarge w3-topbar w3-leftbar w3-border w3-border-black w3-row w3-white">
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
            <label class="w3-large">Mot de passe : <span class="w3-small w3-text-red" v-if="mode=='signup'">(entre 6 et 30 caractères,1 Maj mini, 1 Min mini, 1 chiffre mini)</span></label>
            <input class="password w3-large w3-input w3-border w3-round w3-margin-bottom" type="password" v-model="password">
            <label class="w3-button w3-round-large w3-border w3-light-grey" for="img-form" v-if="mode=='signup'">Photo de profil</label>
            <input class="w3-margin-top" id="img-form" type="file" ref="file" v-if="mode=='signup'" @change="selectFile('img-form')">
          </div>
          <div class="w3-cell w3-col m4 w3-hide-medium w3-hide-small">
            <img class="icon" src="../assets/icon.png" alt="icon groupomania" width="150">
          </div>
        </div>
        <div class="w3-display-container w3-margin-top w3-margin-bottom w3-border w3-border-red w3-pale-red" v-if="erreur!=''">
          <span @click="deleteError()" class="mess_error w3-button w3-display-topright">&times;</span>
          <p class="w3-text-red"><b>{{erreur}}</b></p>
        </div>

        <p v-if="mode=='login'">Je n'ai pas de compte: <input type="button" class="w3-text-blue link focus" @click="switchToCreateAccount()" value="M'inscrire"></p><!--changement de formulaire-->
        <p v-if="mode=='signup'">J'ai déjà un compte: <input type="button" class="w3-text-blue link focus" @click="switchToLogin()" value="Me connecter"></p><!--changement de formulaire-->
        
        <input type="button" class="bouton w3-padding w3-large w3-button w3-pale-green w3-border w3-round-large focus" v-if="mode=='login'" @click="login()" value="Se connecter">
        <input type="button" class="bouton w3-padding w3-large w3-button w3-pale-green w3-border w3-round-large focus" v-if="mode=='signup'" @click="signup()" value="S'inscrire">

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
      this.userName = '';
      this.email = '';
      this.password = '';
      this.file = null;
      document.title = 'Groupomania | Inscription';
    },
    switchToLogin(){
      this.mode = 'login';
      this.userName = '';
      this.email = '';
      this.password = '';
      this.file = null;
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
    async signup(){
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
      let response =  await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        body: formData
      })
      let data = await response.json();
      if (response.ok){
        this.login();
      }else{
        this.erreur = data.Message;
        if(data.error != null){
          let champ = data.error.original.sqlMessage;
          if (champ.indexOf('userName') > 0){
            this.erreur = 'Ce nom d\'utilisateur est déjà utilisé !';
          }else if (champ.indexOf('email') > 0){
            this.erreur = 'Cette adresse mail est déjà utilisé !';
          }
        }
      }
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
        this.erreur = 'Identifiants incorrect';
      })
    },
    exit(){
      this.changeMode('connection');
      localStorage.removeItem('user');
      this.$router.push('/');
    },
    changeMode(text){
      this.$store.commit('modifyMode', text);
    },
    async deleteProfile(){
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
        this.erreur = data.Message;
      }
    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'));
    document.querySelector('body').className = 'w3-light-grey accueil';
  }
}
</script>

<style lang="scss" scoped>
  h1{
    @media screen and (max-width: 992px) {
      font-size: 26px;
    }
  }
  .logoGroupo{
    width: 300px;
  }
  .cont_form{
    width: 75%;
    box-shadow: -8px -8px 6px 6px #673ab7 !important;
    @media screen and (max-width: 500px){
      width: 100%;
      box-shadow: none !important;
    }
  }
  #img-form{
    display: none;
  }
  .formulaire-create{
    @media screen and (max-width: 992px) {
      width: 100% !important;
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
  .icon{
    position: absolute;
    top: 25%;
    bottom: 0;
    right: 0;
    left: 72%;
  }
  label, input{
    @media screen and (max-width: 700px) {
      font-size: 16px !important;
    }
  }
  .err{
    position: relative;
    width: 40%;
    margin: auto auto;
  }
  .bouton{
    @media screen and (max-width: 700px) {
      font-size: 16px !important;
    }
  }
</style>