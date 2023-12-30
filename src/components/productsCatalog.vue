<template>
  <div>
    <a-flex
      gap="16"
      wrap="wrap"
      justify="space-around"
      style="margin-top: 20px"
    >
      <a-card
        hoverable
        style="width: 240px"
        v-for="product in products"
        :key="product.id"
      >
        <template #cover>
          <img alt="product picture" :src="product.picture" />
        </template>
        <a-card-meta :title="product.name">
          <template #description>{{ product.category.name }}</template>
        </a-card-meta>
      </a-card>
    </a-flex>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    this.getProducts();
  },
  methods: {
    async getProducts() {
      try {
        const response = await axios.get("http://localhost:5000/product");
        this.products = response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
  },
};
</script>

<style>
img {
  max-width: 100%;
  height: auto;
}
</style>
