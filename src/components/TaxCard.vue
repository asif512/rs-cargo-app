<script setup>
import FormCard from './FormCard.vue'
import FormField from './FormField.vue'
import { TAX_PERCENT } from '../utils/constants.js'

defineProps({
  charges: { type: Object, required: true }, // uses charges.addTax
  tax: { type: Number, required: true },
  netTotal: { type: Number, required: true },
})
</script>

<template>
  <FormCard title="Tax">
    <label class="check">
      <input v-model="charges.addTax" type="checkbox" />
      <span>Tax ({{ TAX_PERCENT }}%)</span>
    </label>

    <template v-if="charges.addTax">
      <FormField :label="`Tax ${TAX_PERCENT}% (Rs.)`">
        <input :value="tax" type="text" readonly class="readonly" />
      </FormField>
      <FormField label="Net Total (Rs.)">
        <input :value="netTotal" type="text" readonly class="readonly" />
      </FormField>
    </template>
  </FormCard>
</template>