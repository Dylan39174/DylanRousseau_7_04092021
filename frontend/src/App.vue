<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
  </div>
  <router-view/>
</template>

<style lang="scss">
// .accueil{
//   background-image: url('./assets/img_accueil.jpg');
//   background-repeat: no-repeat;
// }
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  display: none;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.w3-button{
  transition: .5s;
  &:hover{
    border-color: black !important;
  }
}
.btn_form{
  margin: 30px 0px 0px 0px !important;
}

.link{
  text-decoration: underline;
  cursor: pointer;
  border: none;
  background-color: white;
}

.focus{
  &:focus{
    border-color: black;
  }
}

</style>
