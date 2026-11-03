<script setup>
import FormCard from './FormCard.vue'
import FormField from './FormField.vue'

const props = defineProps({
  shipment: { type: Object, required: true }, // { from, to, goods, quantity, weight }
  errors: { type: Object, default: () => ({}) },
})

const err = (key) => props.errors[`shipment.${key}`]
</script>

<template>
  <FormCard title="Route & Goods">
    <FormField label="From" :error="err('from')">
      <input v-model="shipment.from" type="text" placeholder="City / area" />
    </FormField>

    <FormField label="To" :error="err('to')">
      <input v-model="shipment.to" type="text" placeholder="City / area" />
    </FormField>

    <FormField label="Goods Details" :error="err('goods')" full>
      <textarea v-model="shipment.goods" rows="2" placeholder="e.g. Clothes, shoes, household items"></textarea>
    </FormField>

    <FormField label="Quantity" :error="err('quantity')">
      <input v-model="shipment.quantity" type="text" placeholder="e.g. 4 Bags, 4 Cartons" />
    </FormField>

    <FormField label="Total Weight (KG)" :error="err('weight')">
      <input v-model="shipment.weight" type="number" min="0" step="any" placeholder="0" />
    </FormField>
  </FormCard>
</template>