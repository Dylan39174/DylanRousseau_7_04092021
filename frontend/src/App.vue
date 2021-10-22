<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
  </div>
  <router-view/>
</template>

<style lang="scss">
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
.cursor_img{
  position: absolute;
  top: 25%;
  bottom: 0;
  right: 0;
  left: 72%;
}
.link{
  text-decoration: underline;
  cursor: pointer;
}
.cont_form{
  box-shadow: -8px -8px 6px 6px black !important;
}

</style>
