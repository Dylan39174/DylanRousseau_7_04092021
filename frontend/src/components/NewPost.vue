<template>
  <div class="newPost">
    <div class="w3-container w3-padding w3-card w3-round w3-white">
      <h4 class="w3-leftbar w3-border-bottom w3-margin-bottom w3-left-align w3-padding">Nouveau post</h4>
      <textarea class="textPost w3-padding w3-round-large" name="text" rows="1" placeholder="Écrire un message..." v-model="textPost"></textarea>
      <div class="cont-img w3-container w3-margin-top">
        <img id="loadImagePost" class="w3-round-xlarge w3-border w3-border-black" alt="" v-if="img==true">
      </div>
      <div class="w3-container w3-margin-top">
        <form>
          <input type="file" id="filePhoto" name="filePhoto" @change="loadImgPost()">
          <label for="filePhoto" class="w3-button w3-pale-blue w3-border w3-border-black w3-round-xlarge w3-margin-right"><i class="iconPost fa fa-camera"></i></label>
          <label for="file" class="w3-button w3-pale-blue w3-border w3-border-black w3-round-xlarge"><i class="iconPost fas fa-film"></i></label>
        </form>
      </div>
      <div class="w3-button btn w3-margin-top w3-margin-right w3-border w3-round-large w3-pale-green" v-if="newPost==true||textPost!=''" @click="sendPost()">Publier</div>
      <div class="w3-button btn w3-margin-top w3-border w3-round-large w3-pale-green" v-if="newPost==true||textPost!=''" @click="postCancel()">Annuler</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewPost',
  data(){
    return {
      pictureFile: null,
      img: false,
      newPost: false,
      textPost: '',
    }
  },
  methods: {
    loadImgPost(){
      this.newPost = true;
      this.img = true;
      var input = document.getElementById("filePhoto");
      var fReader = new FileReader();
      fReader.readAsDataURL(input.files[0]);
      fReader.onloadend = function(event){
        var img = document.getElementById("loadImagePost");
        img.src = event.target.result;
      }
      this.pictureFile = document.getElementById('filePhoto').files[0];
    },
    postCancel(){
      document.querySelector('.textPost').value = '';
      this.textPost = '';
      this.newPost = false;
      this.img = false;
    },
    sendPost(){
      const user = JSON.parse(localStorage.getItem('user'));
      const formData = new FormData();
      formData.append('textPost', this.textPost);
      formData.append('userId', user.userId);
      if(this.pictureFile != null){
        formData.append('image', this.pictureFile);
      }
      fetch('http://localhost:3000/api/post', {
        method: 'POST',
        body: formData
      })
      .then((res) => {
        if(res.ok){
          return res.json();
        }
      })
      .then(() => {
        this.postCancel();
        this.getAllPosts();
      })
      .catch((err) => {
        console.log(err);
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.containerAllPosts{
  width: 50%;
  margin-left: 150px;
  .textPost{
    width: 100%;
  }
  .iconPost{
    font-size:25px;
    color:green;
  }
  .btn{
    min-width: 150px;
  }
  #filePhoto{
    display: none;  
  }
  .cont-img{
    #loadImagePost{
      position: relative;
      width: 65%;
      height: 100%;
    }
  }
}
</style>