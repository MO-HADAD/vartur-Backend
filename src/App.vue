<template>
  <div>
    <MyNav />
    <!-- <AddForm />
    <productsCatalog /> -->
    <router-view />
  </div>
</template>

<script>
import MyNav from "./components/MyNav";
// import AddForm from "./components/AddForm";
// import productsCatalog from "./components/productsCatalog.vue";

export default {
  name: "App",
  components: {
    MyNav,
    // AddForm,
    // productsCatalog,
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
