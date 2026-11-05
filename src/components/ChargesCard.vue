<script setup>
import FormCard from './FormCard.vue'
import FormField from './FormField.vue'

const props = defineProps({
  charges: { type: Object, required: true }, // { rate, payment }
  total: { type: Number, required: true },
  due: { type: Number, required: true },
  errors: { type: Object, default: () => ({}) },
})

const err = (key) => props.errors[`charges.${key}`]
</script>

<template>
  <FormCard title="Charges">
    <FormField label="Per KG Charges (Rs.)" :error="err('rate')">
      <input v-model="charges.rate" type="number" min="0" step="any" placeholder="0" />
    </FormField>

    <FormField label="Total Charges (Rs.)">
      <input :value="total" type="text" readonly class="readonly" />
    </FormField>

    <FormField label="Payment (Rs.)" :error="err('payment')">
      <input v-model="charges.payment" type="number" min="0" step="any" placeholder="0" />
    </FormField>

    <FormField label="Due (Rs.)">
      <input :value="due" type="text" readonly class="readonly due" />
    </FormField>

    <div class="rate-checkbox">
      <label class="check">
        <input v-model="charges.isVisiblePerKGCharges" type="checkbox" />
        <span>Show Per KG Charges</span>
      </label>
    </div>
  </FormCard>
</template>