<template>
  <div class="post">
    <div class="w3-top">
      <div class="w3-bar w3-black w3-theme-d2 w3-left-align w3-large">
        <a class="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-theme-d2"><i class="fa fa-bars"></i></a>
        <a href="#" class="w3-bar-item w3-button w3-padding-large w3-theme-d4"><i class="fa fa-home"></i></a>
        <a href="#" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="News"><i class="fa fa-globe"></i></a>
        <a href="#" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Account Settings"><i class="fa fa-user"></i></a>
        <span class="w3-bar-item w3-button w3-hide-small w3-right w3-padding-large w3-hover-white" title="Déconnexion" @click="exit()">
          <img v-bind:src="this.imageUrl" class="w3-circle w3-margin-right" style="height:23px;width:23px" alt="Avatar">Déconnexion
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

    <div class="cont_post w3-container w3-padding w3margin-right" style="width: 95%;display: flex;">
      
      <div class="w3-cell w3-container w3-col m2 w3-margin-right">
        <div class="cadre w3-white w3-card w3-padding w3-round-large">
          <h4 class="w3-center">{{userName}}</h4>
          <img v-bind:src="this.imageUrl" class="w3-circle pictureProfile" style="height:106px;width:106px;margin-bottom:20px;" alt="Avatar">
        </div>
      </div>

      <div style="width: 50%;margin-left: 150px;">
        <div class="w3-container w3-padding w3-card w3-round w3-white">
          <h4 class="w3-leftbar w3-border-bottom w3-margin-bottom w3-left-align w3-padding">Nouveau post</h4>
          <textarea class="textPost w3-padding w3-round-large" name="text" rows="1" style="width:100%" placeholder="Écrire un message..." v-model="textPost"></textarea>
          <div class="cont-img w3-container w3-margin-top">
            <img src="" class="w3-round-xlarge w3-border w3-border-black" id="idTest" alt="" v-if="img==true">
          </div>
          <div class="w3-container w3-margin-top">
            <form>
              <input type="file" id="filePhoto" name="filePhoto" @change="loadImgPost()">
              <label for="filePhoto" class="w3-button w3-pale-blue w3-border w3-border-black w3-round-xlarge w3-margin-right"><i class="fa fa-camera" style="font-size:25px;color:green;"></i></label>
              <label for="file" class="w3-button w3-pale-blue w3-border w3-border-black w3-round-xlarge"><i class="fas fa-film" style="font-size:25px;color:green;"></i></label>
            </form>
          </div>
          <div class="w3-button btn w3-margin-top w3-margin-right w3-border w3-round-large w3-pale-green" v-if="newPost==true||textPost!=''" @click="sendPost()">Publier</div>
          <div class="w3-button btn w3-margin-top w3-border w3-round-large w3-pale-green" v-if="newPost==true||textPost!=''" @click="postCancel()">Annuler</div>
        </div>
        <ul>
          <li v-for="post in posts" :key="post">
            <!-- <p>bonjour</p> -->
            <div class="w3-container w3-padding w3-card w3-round w3-white w3-margin-top" style="float: center">
              <h5 class="w3-left-align w3-bottombar"><span><img class="imgTitle w3-round-xxlarge w3-margin-right" v-bind:src="post.userImageUrl" alt="" width="40" height="40"></span><b>{{post.userName}}</b> | <span class="w3-small">{{post.createdAt}}</span></h5>
              <p class="w3-left-align w3-margin-left w3-margin-top">{{post.textPost}}</p>
              <img class="w3-round-large w3-border w3-border-black w3-margin-top w3-margin-bottom post_img" v-bind:src="post.imagePostUrl">
              <div class="test w3-pale-green">
                <div class="w3-cell w3-left w3-margin-left icon"><i class="far fa-thumbs-up w3-large w3-margin-right"></i><span>J'aime</span></div>
                <div class="w3-cell w3-right w3-margin-right icon"><i class="far far fa-comment-alt w3-large w3-margin-right"></i><span>Commentaire</span></div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Post',
    data(){
      return{
        newPost: false,
        img: false,
        pictureFile: null,
        textPost: '',
        imagePostUrl: '',
        userName: '',
        posts: []
      }
    },
    methods:{
      exit(){
        localStorage.removeItem('user');
        this.$router.push('/');
      },
      loading(){
        const user = JSON.parse(localStorage.getItem('user'));
        this.imageUrl = user.imageUrl;
        this.userName = user.userName;
        this.getAllPosts();
      },
      loadImgPost(){
        this.newPost = true;
        this.img = true;
        var input = document.getElementById("filePhoto");
        var fReader = new FileReader();
        fReader.readAsDataURL(input.files[0]);
        fReader.onloadend = function(event){
          var img = document.getElementById("idTest");
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
      editPost(){
        this.edit = true;
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
      getAllPosts(){
        fetch('http://localhost:3000/api/post')
          .then((res) => {
            if(res.ok){
              return res.json();
            }
          })
          .then((data) => {
            var indexes = Array();
            var values = Array();
            for (var key in data) {
            indexes.push(key);
            values.push(data[key]);
            }
            this.posts = values[0];
            this.posts[0].createdAt = new Date(this.posts[0].createdAt);
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            this.posts[0].createdAt = this.posts[0].createdAt.toLocaleDateString('fr-FR', options);
          })
          .catch((err) => {
            console.log(err);
          })
      }
    },
    beforeMount(){
      this.loading();
    }
  }
</script>

<style lang="scss" scoped>
  .cont_post{
    margin: 80px auto 0px auto !important;
  }

  .icon{
    cursor: pointer;
    &:hover{
      color: rgb(126, 5, 126);
    }
  }

  #idTest{
    position: relative;
    width: 65%;
    height: 100%;
  }
  .user{
    position: relative;
    height: 100%;
  }
  .pictureProfile{
    object-fit: cover;
  }
  .post{
    position: relative;
  }

  textarea{
    outline: none;
  }
  h1{
    border-radius: 10px 100px / 120px;
  }
  h5, h4{
    text-transform: capitalize;
  }
  .btn{
    min-width: 150px;
  }
  #filePhoto{
    display: none;
  }
  ul{
    margin: 0;
    padding: 0;
    li{
      list-style-type: none;
      .imgTitle{
        object-fit: cover;
        background-position: center center;
      }
      
      p{
        margin: 30px 0 5px 30px !important;
      }
    }
    .post_img{
        position: relative;
        width: 65%;
        height: 100%;
      }
  }
</style>