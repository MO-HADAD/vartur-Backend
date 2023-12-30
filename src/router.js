import { createRouter, createWebHistory } from "vue-router";
import AddForm from "./components/AddForm";
import productsCatalog from "./components/productsCatalog.vue";

const routes = [
  { path: "/", component: productsCatalog },
  { path: "/add-product", component: AddForm },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
