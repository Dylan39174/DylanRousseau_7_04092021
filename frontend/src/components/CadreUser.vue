<template>
  <div class="cadreUser">
    <div class="w3-container w3-card w3-white w3-padding w3-round-large w3-margin-right">
      <h4 class="w3-center">{{userName}}</h4>
      <img v-bind:src="this.user.imageUrl" class="w3-circle pictureProfile" alt="Avatar">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CadreUser',
    data(){
      return {
        user: {},
        userName: ''
      }
    },
    methods: {
      loadImage(){
        this.user = JSON.parse(localStorage.getItem('user'));
        this.userName = this.user.userName
      }
    },
    beforeMount(){
      this.loadImage();
    }
  }
</script>

<style lang="scss" scoped>
.cadreUser{
  width: 200px;
  .pictureProfile{
    object-fit: cover;
    height:106px;
    width:106px;
    margin-bottom:20px;
  }
}

</style>