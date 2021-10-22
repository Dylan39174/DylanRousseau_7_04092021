<template>
  <div class="home">
    <div class="cont_form w3-padding w3-half w3-display-middle w3-round-xlarge w3-topbar w3-leftbar w3-border w3-row w3-white">
      <h1 class="w3-margin-bottom" v-if="mode=='login'"><b>Connexion</b></h1>
      <h1 class="w3-margin-bottom" v-else><b>Inscription</b></h1>
      <div class="w3-container w3-row">
        <div class="formulaire w3-cell w3-col m8 w3-left-align">
          <label class="w3-large" v-if="mode=='signup'">Nom d'utilisateur :</label>
          <input class="userName w3-large w3-input w3-border w3-margin-bottom w3-medium w3-round" type="text" v-if="mode=='signup'" v-model="userName">
          <label class="w3-large">Adresse mail :</label>
          <input class="email w3-large w3-input w3-border w3-margin-bottom w3-round" type="email" v-model="email">
          <label class="w3-large">Mot de passe :</label>
          <input class="password w3-large w3-input w3-border w3-round w3-margin-bottom" type="password" v-model="password">
          <label class="w3-large" v-if="mode=='signup'">Photo de profil :</label><br>
          <input class="file w3-margin-top" type="file" ref="file" v-if="mode=='signup'" @change="selectFile()">
        </div>
        <div class="w3-cell w3-col m4">
          <img class="cursor_img w3-border w3-leftbar w3-rightbar w3-topbar w3-bottombar w3-circle" src="../assets/cursor.png" alt="image d'un curseur" width="150">
        </div>
      </div>
      <div class="w3-display-container w3-margin-top w3-border w3-border-red w3-pale-red" v-if="erreur!=''">
        <span @click="deleteError()" class="mess_error w3-button w3-display-topright">&times;</span>
        <p class="w3-text-red"><b>{{erreur}}</b></p>
      </div>
      <div class="w3-padding w3-large w3-button w3-pale-green w3-border w3-round-large" v-if="mode=='login'" @click="login()">Se connecter</div>
      <div class="w3-padding w3-large w3-button w3-pale-green w3-border w3-round-large w3-margin-left" v-if="mode=='login'" @click="remplir()">Connexion rapide (dylan)</div>
      <div class="w3-margin w3-large w3-button w3-pale-green w3-border w3-round-large" v-else @click="signup()">S'inscrire</div>
      <p v-if="mode=='login'">Je n'ai pas de compte: <span class="link w3-text-blue" @click="switchToCreateAccount()">M'inscrire</span></p>
      <p v-else>J'ai déjà un compte: <span class="link w3-text-blue" @click="switchToLogin()">Me connecter</span></p>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src

export default {
  
  name: 'Connection',
  data(){
    return {
      mode: 'login',
      userName: '',
      email: '',
      password: '',
      file: null,
      erreur: ''
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
    selectFile(){
      this.file = document.querySelector('.file').files[0];
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
      })
      .then((data) => {
        localStorage.setItem('user', JSON.stringify(data));
        this.$router.push('post');
      })
      .catch((err) => {
        console.log(err);
      })
    },
    remplir(){
      this.email = 'dylan.rousseau77@orange.fr';
      this.password = 'TEst39300';
      document.querySelector('.email').value = this.email;
      document.querySelector('.password').value = this.password;
      this.login();
    }
  }
}
</script>