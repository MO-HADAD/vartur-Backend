<template>
  <a-menu v-model="current" mode="horizontal">
    <a-menu-item key="Home">
      <HomeOutlined />
      <router-link to="/">Home</router-link>
    </a-menu-item>
    <a-menu-item key="Add Product">
      <FormOutlined />
      <router-link to="/add-product">Add Product</router-link>
    </a-menu-item>
  </a-menu>
</template>
<script setup>
import { ref } from "vue";
import { FormOutlined, HomeOutlined } from "@ant-design/icons-vue";
const current = ref(["Home"]);
</script>
