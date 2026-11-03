<script setup>
defineProps({ title: { type: String, required: true } })
</script>

<template>
  <section class="card">
    <h3>{{ title }}</h3>
    <div class="grid">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.card {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 16px 18px 18px;
  margin-bottom: 16px;
}
.card h3 {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--brand-dark);
  margin-bottom: 12px;
}
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 16px;
}
@media (max-width: 520px) {
  .grid { grid-template-columns: 1fr; }
}
</style>