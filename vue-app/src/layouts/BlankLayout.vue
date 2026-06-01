<template>
  <div class="blank-layout-wrapper">
    <slot></slot>
  </div>
</template>

<script setup>
// Minimal blank layout logic
</script>

<style scoped>
.blank-layout-wrapper {
  min-height: 100vh;
  width: 100%;
  background-color: var(--bg-cream);
}
</style>
