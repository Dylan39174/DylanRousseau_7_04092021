<template>
  <div class="post">
    <NavBar/>
    <div class="cont_post w3-container w3-padding w3margin-right">
      <CadreUser/>
      <div class="containerAllPosts">
        <NewPost/>
        <ul>
          <li v-for="post in posts" :key="post">
            <div class="onePost w3-container w3-padding w3-card w3-round w3-white w3-margin-top w3-margin-bottom">
              <h5 class="w3-left-align w3-bottombar"><span><img class="imgTitle w3-round-xxlarge w3-margin-right" v-bind:src="post.userImageUrl" alt=""></span><b>{{post.userName}}</b> | <span class="w3-small">{{post.createdAt}}</span></h5>
              <p class="w3-left-align w3-margin-left w3-margin-top">{{post.textPost}}</p>
              <img class="w3-round-large w3-border w3-margin-top w3-margin-bottom post_img" v-bind:src="post.imagePostUrl">
              <div class="visuLikeComment w3-border-top w3-border-grey w3-panel w3-margin-bottom">
                <span class="w3-left w3-small"><i class="far fa-thumbs-up"></i>255</span>
                <span class="w3-left w3-small w3-right lien-comment" @click="getAllComment(post.id)"><i class="far fa-comment-dots"></i>{{post.nbPost}}</span>
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
                      <h5 class="w3-left-align w3-small"><b>{{comment.userName}}</b> | {{comment.createdAt}}</h5>
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
  import NavBar from '../components/NavBar.vue';
  import CadreUser from '../components/CadreUser.vue';
  import NewPost from '../components/NewPost.vue';
  export default {

    components: { 
      NavBar, 
      CadreUser,
      NewPost 
    },
    name: 'Post',

    data(){
      return{
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
        this.imageUrl = this.user.imageUrl;
        this.userName = this.user.userName;
        this.getAllPosts();
      },
      editPost(){
        this.edit = true;
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
          fetch('http://localhost:3000/api/comment/count/' + this.posts[i].id)
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
            'Content-Type': 'application/json'
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
            for (var i = 0 ; i < this.comments.length ; i++){
              this.comments[i].createdAt = new Date(this.comments[i].createdAt);
              const options = { month: 'long', day: 'numeric' };
              this.comments[i].createdAt = this.comments[i].createdAt.toLocaleDateString('fr-FR', options);
            }
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
            min-width: 100%;
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