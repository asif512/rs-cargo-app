<script setup>
defineProps({
  label: { type: String, required: true },
  error: { type: String, default: '' },
  full: { type: Boolean, default: false },
})
</script>

<template>
  <label class="field" :class="{ full, 'has-error': error }">
    <span>{{ label }}</span>
    <slot />
    <small v-if="error" class="err">{{ error }}</small>
  </label>
</template>