<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import ClientLayout from "./layouts/ClientLayout.vue";
import AdminLayout from "./layouts/AdminLayout.vue";
import BlankLayout from "./layouts/BlankLayout.vue";

const route = useRoute();

const currentLayout = computed(() => {
  if (route.meta.layout === "admin") return AdminLayout;
  if (route.meta.layout === "blank") return BlankLayout;
  return ClientLayout;
});
</script>

<template>
  <component :is="currentLayout">
    <router-view />
  </component>
</template>

<style></style>
