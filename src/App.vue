<template>
  <div>
    <MyNav />

    <router-view />
  </div>
</template>

<script>
import MyNav from "./components/MyNav";

export default {
  name: "App",
  components: {
    MyNav,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
