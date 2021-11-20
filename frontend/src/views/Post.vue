<template>
  <div class="post">
    <NavBar v-if="auth==true"/>
    <div class="containerPage w3-padding">
      <div class="leftCard w3-card w3-col w3-round-large w3-border w3-border-black w3-hide-medium w3-hide-small" style="width: 15%;">

      </div>
      <div class="cont_post w3-container w3-col">

        <div class="containerAllPosts">

          <!-- bloc-edition-post -->
          <h1 class="w3-xxlarge">groupomania | fil d'actualité</h1>

          <section class="newPost w3-container w3-padding w3-card w3-round w3-white">
            <h2 class="w3-leftbar w3-border-bottom w3-margin-bottom w3-left-align w3-padding w3-xlarge">nouveau post</h2>
            <textarea class="textPost w3-padding w3-round-large" name="text" rows="1" placeholder="Écrire un message..." v-model="textPost"></textarea>
            <div class="cont-img w3-container w3-margin-top">
              <img id="loadImagePost" class="w3-round-xlarge w3-border w3-border-black" alt="Aperçu de l'image avant la publication" v-if="img==true">
            </div>
            <div class="w3-container w3-margin-top">
              <form>
                <input type="file" id="filePhoto" @change="loadImgPost()">
                <button class="btn w3-button w3-border w3-border-black w3-round-large w3-margin-right" @click="openImg()">Image | <i class="fa fa-camera iconPost"></i></button>
              </form>
            </div>
            <button name="postPublier" class="w3-button btn w3-margin-top w3-margin-right w3-border w3-round-large" v-if="newPost==true||textPost!=''" @click="sendPost()">Publier</button>
            <button name="postAnnuler" class="w3-button btn w3-margin-top w3-border w3-round-large" v-if="newPost==true||textPost!=''" @click="postCancel()">Annuler</button>
          </section>

          <!-- fin bloc -->

          <!-- liste des posts -->
          <section id="listePosts">
            <ul>
              <li v-for="post in posts" :key="post">
                <!-- visu one post -->
                <article>
                  <div class="onePost w3-container w3-padding w3-card w3-round w3-white w3-margin-top w3-margin-bottom">
                    <div class="postTitle w3-left-align w3-bottombar w3-padding">
                      <div class="postUserName">
                        <img class="imgTitle w3-round-xxlarge w3-margin-right" v-bind:src="post.userImageUrl" alt="Photo de profil de l'auteur du post">
                        <h2 class="w3-large"><b>{{post.userName}}</b> | <span class="w3-small">{{post.createdAt}}</span></h2>
                      </div>
                      <div>
                        <button name="deletePost" class="deleteIcone w3-padding w3-round-large w3-light-grey w3-border w3-border-grey" title="Supprimer" @click="erreur='';alertCommentId=0;contenu='post';alertPostId=post.id" v-if="post.userId==this.user.userId||this.user.userId==1"><i class="fas fa-times"></i></button>
                      </div>
                    </div>
                    <div v-if="contenu!=''&&alertPostId==post.id" class="confirm w3-display-container w3-border w3-round-xlarge w3-margin-top w3-border-red w3-pale-red w3-padding">
                      <span @click="deleteError()" class="mess-error w3-button w3-display-topright">&times;</span>
                      <span class="w3-large">Supprimer ce {{contenu}} ?</span>
                      <div class="w3-container w3-pale-red w3-text-red">
                        <span>{{erreur}}</span>
                      </div>
                      <div class="zoneBouton w3-margin-top">
                        <button class="w3-button w3-margin-right w3-border-grey w3-border w3-round" @click="deletePost(post.id, post.userId)">Oui</button>
                        <button class="w3-button w3-border w3-border-grey w3-round" @click="deleteError()">Non</button>
                      </div>
                    </div>
                    <p class="w3-left-align w3-margin-left w3-margin-top w3-margin-bottom">{{post.textPost}}</p>
                    <img v-if="post.imagePostUrl!=''&&post.imagePostUrl!=null" class="w3-round-large w3-border w3-margin-top w3-margin-bottom post_img" v-bind:src="post.imagePostUrl" alt="image du post">
                    <div class="visuLikeComment w3-border-top w3-border-grey w3-panel w3-margin-bottom w3-margin-top">
                      <span class="w3-left w3-small"><i class="far fa-thumbs-up"></i></span>
                      <button name="visuComment" class="w3-left w3-small w3-right w3-white lien-comment" @click="getAllComment(post.id)" title="Commentaires"><i class="far fa-comment-dots"></i>{{post.nbPost}}</button>
                    </div>
                    
                    <div class="w3-container zone-btn-reaction">
                      <button name="like" class="btnReaction w3-button w3-round">J'aime</button>
                      <button name="comment" class="btnReaction w3-button w3-round" @click="addComment=true">Commenter</button>
                    </div>
                    <!-- bloc commentaires -->
                    <div class="allComment w3-margin-top">
                      <div v-if="addComment==true">
                        <div class="ajoutCommentaire w3-center w3-margin-bottom">
                          <img v-bind:src="user.imageUrl" alt="Photo de profil de l'auteur du commentaire" class="imgTitle w3-round-xxlarge">
                          <textarea name="comment" type="text" rows="1" class="comment w3-round-xlarge w3-padding" placeholder="Ajouter un commentaire" v-model="textComment"></textarea>
                        </div>
                        <input type="button" value="Publier" class="w3-button w3-border w3-round-large" @click="sendComment(post.id, this.user.id)">
                      </div>

                      <ul v-if="vueComment==true&&commentPost==post.id">
                        <li v-for="comment in comments" :key="comment" class="w3-margin-top w3-padding w3-round-xlarge">
                          <div>
                            <img class="imgTitle w3-round-xxlarge w3-margin-right" v-bind:src="comment.userImageUrl" alt="">
                          </div>
                          <div class="textComment w3-light-grey w3-padding w3-round">
                            <div class="w3-left-align titreComment">
                              <div>
                                <h3 class="w3-medium"><b>{{comment.userName}}</b> | {{comment.createdAt}}</h3>
                              </div>
                              <div>
                                <button name="deleteComment" class="deleteIcone w3-padding-small w3-round-large" title="Supprimer" @click="alertPostId=0;contenu='commentaire';alertCommentId=comment.id" v-if="comment.userId==this.user.userId||this.user.userId==1"><i class="fas fa-times"></i></button>
                              </div>
                            </div>
                            
                            <span class="w3-left-align text">{{comment.textComment}}</span>
                            <div v-if="contenu!=''&&alertCommentId==comment.id" class="commentConfirm w3-display-container w3-pale-red w3-padding w3-round-large w3-margin-top w3-border w3-border-red">
                              <span @click="deleteError()" class="mess-error w3-button w3-display-topright">&times;</span>
                              <span>Supprimer ce {{contenu}} ?</span><br>
                              <span class="w3-text-red w3-margin-top">{{erreur}}</span>
                              <div class="zoneBouton w3-margin-top">
                                <button class="w3-button w3-tiny w3-margin-right w3-border-grey w3-border w3-round" @click="deleteComment(comment.id, comment.userId)">Oui</button>
                                <button class="w3-button w3-tiny w3-border w3-border-grey w3-round" @click="deleteError()">Non</button>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </article>
              </li>
            </ul>
          </section>
          <!-- fin de la liste des posts -->

          <!-- block suppression posts et commentaires -->
          
          <!-- Fin du block de suppression -->
        </div>
      </div>
      <div class="rightCard w3-card w3-col w3-round-large w3-border w3-border-black w3-hide-medium w3-hide-small" style="width: 15%;">
      </div>
    </div>
  </div>
  
</template>

<script>
  import NavBar from '../components/NavBar.vue'
  export default {
    name: 'Post',
    components:{
      NavBar
    },
    data(){
      return{
        auth: false,
        alert: false,
        newPost: false, 
        img: false,
        pictureFile: null,
        textPost: '',
        contenu: '',
        alertPostId: 0,
        alertCommentId: 0,
        erreur:'',
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
      loading(){
        this.user = JSON.parse(localStorage.getItem('user'));
        document.title = 'Groupomania | Fil d\'actualité';
        if(this.user != null){
          this.imageUrl = this.user.imageUrl;
          this.userName = this.user.userName;
          this.auth = true;
          document.querySelector('body').className = 'w3-light-grey'
          this.getAllPosts();
        }else{
          this.$router.push('/');
        }
      },
      deleteError(){
        this.erreur = '';
        this.contenu = '';
      },
      openImg(){
        document.getElementById('filePhoto').click();
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
        this.file = null;
        this.pictureFile = null;
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
          headers:{
            'Authorization': 'Bearer ' + user.token 
          },
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
        fetch('http://localhost:3000/api/post', {
          headers:{
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).token
          }
        })
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
            for (var i = 0 ; i < this.posts.length ; i++){
              this.posts[i].createdAt = new Date(this.posts[i].createdAt);
              const options = { month: 'long', day: 'numeric' };
              this.posts[i].createdAt = this.posts[i].createdAt.toLocaleDateString('fr-FR', options);
            }
            this.addNbPost(this.posts.length);
        })
      },
      addNbPost(nbPosts){
        for(let i = 0 ; i < nbPosts ; i++){
          fetch('http://localhost:3000/api/comment/count/' + this.posts[i].id, {
            headers:{
              'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).token
            }
          })
            .then((res) => {
              if(res.ok){
                return res.json();
              }
            })
            .then((data) => {
              this.posts[i].nbPost = data.count;
            })
            .catch((err) => {
              console.log(err);
            })
        }
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
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).token
          },
          body: comment
        })
        .then((res) => {
          if (res.ok){
            return res.json();
          }
        })
        .then(() => {
          this.getAllPosts();
          document.querySelector('.comment').value = '';
          this.addComment = false;
          this.vueComment = false;
        })
        .catch((err) => {
          console.log(err);
        })
      },
      getAllComment(id){
        fetch('http://localhost:3000/api/comment/' + id, {
          headers:{
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).token
          }
        })
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
            for (var i = 0 ; i < this.comments.length ; i++){
              this.comments[i].createdAt = new Date(this.comments[i].createdAt);
              const options = { month: 'long', day: 'numeric' };
              this.comments[i].createdAt = this.comments[i].createdAt.toLocaleDateString('fr-FR', options);
            }
          })
          .catch((err) => {
            console.log(err);
          })
      },
      async deletePost(postid, userMadeId){
        let user = {
          userId: this.user.userId, 
          userMadeId: userMadeId
        }
        let response = await fetch('http://localhost:3000/api/post/' + postid, {
          method: 'DELETE',
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).token
          },
          body: JSON.stringify(user)
        })
        let data = await response.json();
        if(response.ok){
          this.contenu = '';
          this.erreur = '';
          this.alertPostId = 0;
          this.getAllPosts();
        }else{
          if(data.Message!=''){
            this.erreur = data.Message;
          }
        }
      },
      async deleteComment(commentId, commentUserMadeId){
                                                            
        let response = await fetch('http://localhost:3000/api/comment/' + commentId, {
          method: 'DELETE',
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).token
          },
          body: JSON.stringify({userId: this.user.userId, userMadeId: commentUserMadeId})
        })
        let data = await response.json();
        if(response.ok){
          this.contenu = '';
          this.erreur = '';
          this.alertCommentId = 0;
          this.vueComment = false;
          this.getAllPosts();
        }else{
          if(data.Message!=''){
            this.erreur = data.Message;
          }
        }
      },
      async DeletePost(postId, postUserId){
        let userId = this.user.userID;
        let response = await fetch('http://localhost:3000/api/post/' + postId, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.user.token
          },
          body: JSON.stringify({userId: userId, userMadeId: postUserId})
        })
        let data = await response.json();
        if(response.ok){
          this.erreur = '';
          this.getAllPosts();
        }else{
          console.log(data.Message)
          if(data.Message != ''){
            this.erreur = data.Message;
          }
        }
        
      }
    },
    beforeMount(){
      this.loading();
    }
  }
</script>

<style lang="scss" scoped>
  h1{
    margin: 0 0 30px 0 !important;
    @media screen and (max-width: 1250px) {
      font-size: 30px !important;
    }
    @media screen and (max-width: 992px) {
      font-size: 25px !important;
      margin: 0 0 15px 0 !important;
    }
    @media screen and (max-width: 600px) {
      font-size: 20px !important;
      // margin: 0 0 15px 0 !important;
    }
  }
  h2{
    @media screen and (max-width: 992px) {
      font-size: 20px !important;
    }
    @media screen and (max-width: 600px) {
      font-size: 17px !important;
    }
  }
  .containerPage{
    margin: 50px auto 0px auto !important;
    display: flex;
    justify-content: space-evenly;
    @media screen and (max-width: 400px) {
      padding: 0 !important;
    }
  }

  .rightCard, .leftCard{
    margin-top: 80px !important;
    background: url('../assets/background.jpg');
    opacity: .4;
  }
  .newPost{
    
    min-width: 100% !important;
  }
  .cont_post{
    width: 50%;
    display: flex;
    @media screen and (max-width: 992px){
      width: 80%;
    }
    @media screen and (max-width: 600px){
      width: 95%;
    }
    @media screen and (max-width: 400px){
      width: 100%;
      margin: 0 !important;
      padding: 0 !important;
    }
    .pictureProfile{
      object-fit: cover;
      height:106px;
      width:106px;
      margin-bottom:20px;
    }
    .containerAllPosts{
      min-width: 100%;
      margin: auto auto;
      .textPost{
        width: 100%;
      }
      .iconPost{
        font-size:25px;
        color:green;
        @media screen and (max-width: 700px) {
          font-size: 20px !important;
        }
      }
      .btn{
        min-width: 150px;
        @media screen and (max-width: 700px) {
          min-width: 100px;
          font-size: 13px !important;
        }
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
            min-width: 100%;
            .postTitle{
              display: flex;
              justify-content: space-between;
              .postUserName{
                display: flex;
                align-items: center;
                h2{
                  @media screen and (max-width: 400px) {
                    font-size: 14px !important;
                  }
                }
              }
            }
            .visuLikeComment{
              width:65%;
              margin:auto auto;
              i{
                margin-right: 5px;
              }
              .lien-comment{
                border: none;
                &:hover{
                  color: green;
                  cursor: pointer;
                }
              }
            }
            .zone-btn-reaction{
              width: 100%;
              display: flex;
              justify-content: space-evenly;
        
              .btnReaction{
                width: 45% !important;
                @media screen and (max-width: 700px) {
                  font-size: 13px !important;
                  position: relative;
                  // width: 30%;
                }
                @media screen and (max-width: 700px) {
                  // width: 20%;
                }
              }
            }
            
            .post_img{
              position: relative;
              width: 70%;
              height: 100%;
              @media screen and (max-width: 450px) {
                width: 100%;
              }
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
                  // outline: none;
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
                    .titreComment{
                      display: flex;
                      justify-content: space-between;
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
  h1,h2,h3{
    text-transform: capitalize;
  }
  h6{
    margin: 0;
  }
  .deleteIcone{
    border: 1px solid transparent;
    transition: .3s;
    @media screen and (max-width: 600px) {
      padding: 0 5px 0 5px !important;
    }
    &:hover{
      cursor: pointer;
      border-color: white !important;
      background-color: black !important;
      color: white !important;
      border-radius: 20% 30% !important;
      
    }
  }
  .mess-error{
    border-top-right-radius: 16px;
  }

</style>