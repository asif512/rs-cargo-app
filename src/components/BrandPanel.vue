<script setup>
</script>

<template>
  <aside class="brand">
    <img src="../../public/logo01.svg" alt="RS CARGO logo" class="brand-logo" />
    <h1>RS CARGO</h1>
    <p class="tagline">Fast &bull; Safe &bull; Reliable</p>
  </aside>
</template>

<style scoped>
.brand {
  background: linear-gradient(180deg, #111827 0%, #1f2937 100%);
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 32px 24px;
  position: sticky;
  top: 0;
  height: 100vh;
}
.brand-logo { width: 240px; height: auto; }
h1 { font-size: 34px; letter-spacing: 4px; font-weight: 800; color: var(--brand); }
.tagline { color: #d1d5db; letter-spacing: 2px; font-size: 13px; text-transform: uppercase; }

@media (max-width: 860px) {
  .brand { position: static; height: auto; flex-direction: row; justify-content: flex-start; padding: 16px; gap: 14px; }
  .brand-logo { width: 96px; height: auto; }
  h1 { font-size: 24px; }
}
</style>