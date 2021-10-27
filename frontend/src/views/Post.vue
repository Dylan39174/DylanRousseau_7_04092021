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

    <div class="cont_post w3-container w3-padding w3margin-right">
      
      <div class="w3-cell w3-container w3-col m2 w3-margin-right">
        <div class="w3-white w3-card w3-padding w3-round-large">
          <h4 class="w3-center">{{userName}}</h4>
          <img v-bind:src="this.imageUrl" class="w3-circle pictureProfile" alt="Avatar">
        </div>
      </div>

      <div class="containerAllPosts">
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
        <ul>
          <li v-for="post in posts" :key="post">
            <div class="onePost w3-container w3-padding w3-card w3-round w3-white w3-margin-top w3-margin-bottom">
              <h5 class="w3-left-align w3-bottombar"><span><img class="imgTitle w3-round-xxlarge w3-margin-right" v-bind:src="post.userImageUrl" alt=""></span><b>{{post.userName}}</b> | <span class="w3-small">{{post.createdAt}}</span></h5>
              <p class="w3-left-align w3-margin-left w3-margin-top">{{post.textPost}}</p>
              <img class="w3-round-large w3-border w3-margin-top w3-margin-bottom post_img" v-bind:src="post.imagePostUrl">
              <div class="visuLikeComment w3-border-top w3-border-grey w3-panel w3-margin-bottom">
                <span class="w3-left w3-small"><i class="far fa-thumbs-up"></i>255</span>
                <span class="w3-left w3-small w3-right lien-comment" @click="getAllComment(post.id)"><i class="far fa-comment-dots"></i>255</span>
              </div>
              <div class="w3-container">
                <span class="w3-button w3-half w3-round">J'aime</span>
                <span class="w3-button w3-half w3-round" @click="addComment=true">Commenter</span>
              </div>
              <div class="allComment w3-margin-top">
                <div v-if="addComment==true">
                  <div class="ajoutCommentaire w3-center w3-margin-bottom">
                    <img v-bind:src="user.imageUrl" alt="" class="imgTitle w3-round-xxlarge">
                    <textarea name="comment" type="text" rows="1" class="comment w3-round-xlarge w3-padding" placeholder="Ajouter un commentaire" v-model="textComment"></textarea>
                  </div>
                  <div class="w3-button w3-border w3-round-large" @click="sendComment(post.id, this.user.id)">Publier</div>
                </div>
                <ul v-if="vueComment==true&&commentPost==post.id">
                  <li v-for="comment in comments" :key="comment" class="w3-margin-top w3-padding w3-round-xlarge">
                    <div>
                      <img class="imgTitle w3-round-xxlarge w3-margin-right" v-bind:src="comment.userImageUrl" alt="">
                    </div>
                    <div class="textComment w3-light-grey w3-padding w3-round">
                      <h5 class="w3-left-align w3-small"><b>{{comment.userName}}</b></h5>
                      <span class="w3-left-align text">{{comment.textComment}}</span>
                    </div>
                  </li>
                </ul>
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
        posts: [],
        comments: [],
        commentPost: 0,
        vueComment: false,
        user:{},
        addComment: false,
        textComment: ''
      }
    },
    methods:{
      exit(){
        localStorage.removeItem('user');
        this.$router.push('/');
      },
      loading(){
        this.user = JSON.parse(localStorage.getItem('user'));
        this.imageUrl = this.user.imageUrl;
        this.userName = this.user.userName;
        this.getAllPosts();
      },
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
      },
      sendComment(id){
        var comment = {
          textComment: this.textComment,
          postId: id,
          userId: this.user.userId
        };
        comment = JSON.stringify(comment);
        fetch('http://localhost:3000/api/comment', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: comment
        })
        .then((res) => {
          if (res.ok){
            return res.json();
          }
        })
        .catch((err) => {
          console.log(err);
        })
      },
      getAllComment(id){
        fetch('http://localhost:3000/api/comment/' + id)
          .then((res) => {
            if(res.ok){
              return res.json();
            }
          })
          .then((data) => {
            this.commentPost = id;
            this.vueComment = true;
            var indexes = Array();
            var values = Array();
            for (var key in data) {
            indexes.push(key);
            values.push(data[key]);
            }
            this.comments = values[0];
            console.log(this.comments)
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
    width: 95%;
    display: flex;
    .pictureProfile{
      object-fit: cover;
      height:106px;
      width:106px;
      margin-bottom:20px;
    }
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
      ul{
        margin: 0;
        padding: 0;
        li{
          list-style-type: none;
          .onePost{
            float: left;
            .visuLikeComment{
              width:65%;
              margin:auto auto;
              i{
                margin-right: 5px;
              }
              .lien-comment{
                &:hover{
                  color: green;
                  cursor: pointer;
                }
              }
            }
            .post_img{
              position: relative;
              width: 65%;
              height: 100%;
            }
            .allComment{

              .ajoutCommentaire{
                width:75%;
                display:flex;
                align-items:center;
                justify-content:space-between;
                margin:auto auto;

                .comment{
                  width:90%;
                  height:auto;
                  border:1px solid grey;
                  outline: none;
                }
              }
              ul{

                li{
                  width: 75%;
                  display: flex;
                  justify-content: center;
                  margin:auto auto;

                  .textComment{
                    padding: 0;
                    display: flex;
                    flex-direction: column;
                    align-items: left;
                    min-width: 90%;
                    max-width: 90%;
                    h5{
                      margin: 0 !important;
                    }

                    .text{
                      width: 100%;
                      overflow-wrap: break-word;
                    }
                  }
                }
              }
            }
          }
          .imgTitle{
            object-fit: cover;
            background-position: center center;
            width: 40px;
            height: 40px;
          }
          p{
            margin: 30px 0 5px 30px !important;
          }
        }
      }
    }
  }

  h5, h4{
    text-transform: capitalize;
  }
  
  
</style>