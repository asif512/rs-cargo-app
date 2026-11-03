<script setup>
import FormCard from './FormCard.vue'
import FormField from './FormField.vue'
import { maskMobile, maskCnic, applyMask } from '../utils/format'

const props = defineProps({
  title: { type: String, required: true }, // "Sender" | "Receiver"
  prefix: { type: String, required: true }, // "sender" | "receiver" (error key prefix)
  party: { type: Object, required: true }, // { name, mobile, cnic }
  errors: { type: Object, default: () => ({}) },
})

const err = (key) => props.errors[`${props.prefix}.${key}`]
</script>

<template>
  <FormCard :title="title">
    <FormField :label="`${title} Name`" :error="err('name')">
      <input v-model="party.name" type="text" placeholder="Full name" />
    </FormField>

    <FormField :label="`${title} Mobile`" :error="err('mobile')">
      <input
        :value="party.mobile"
        @input="party.mobile = applyMask($event, maskMobile)"
        type="tel"
        inputmode="numeric"
        placeholder="03XX-XXXXXXX"
      />
    </FormField>

    <FormField :label="`${title} CNIC`" :error="err('cnic')" full>
      <input
        :value="party.cnic"
        @input="party.cnic = applyMask($event, maskCnic)"
        type="text"
        inputmode="numeric"
        placeholder="XXXXX-XXXXXXX-X"
      />
    </FormField>
  </FormCard>
</template>