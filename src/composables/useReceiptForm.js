import { reactive, ref, computed, watch } from 'vue'
import { num, digits } from '../utils/format'
import { TAX_RATE } from '../utils/constants'

const emptyForm = () => ({
  sender: { name: '', mobile: '', cnic: '' },
  receiver: { name: '', mobile: '', cnic: '' },
  shipment: { from: '', to: '', goods: '', quantity: '', weight: '' },
  // charges.total: '' = automatic (kg x rate), otherwise the amount typed by the user
  charges: { rate: '', total: '', payment: '', addTax: false, isVisiblePerKGCharges: false },
})

export function useReceiptForm() {
  const form = reactive(emptyForm())
  const errors = reactive({}) // keys like 'sender.name', 'charges.rate'
  const submitted = ref(false)

  const autoTotal = computed(() => Math.round(num(form.shipment.weight) * num(form.charges.rate)))
  // user can type their own Total Charges; empty field = automatic. Weight and rate are never changed by this.
  const total = computed(() =>
    String(form.charges.total).trim() !== '' ? Math.round(num(form.charges.total)) : autoTotal.value
  )
  const tax = computed(() => (form.charges.addTax ? Math.round(total.value * TAX_RATE) : 0))
  const netTotal = computed(() => total.value + tax.value) // shown on the slip only
  const due = computed(() => Math.max((total.value + tax.value) - num(form.charges.payment), 0))

  function validate() {
    submitted.value = true
    const e = {}
    const need = (group, key, msg = 'Required') => {
      if (!String(form[group][key]).trim()) e[`${group}.${key}`] = msg
    }

    need('sender', 'name', 'Sender name is required')
    need('receiver', 'name', 'Receiver name is required')
    need('shipment', 'from')
    need('shipment', 'to')
    need('shipment', 'goods', 'Goods details are required')
    need('shipment', 'quantity', 'Required (e.g. 4 Bags)')

    for (const who of ['sender', 'receiver']) {
      if (digits(form[who].mobile).length !== 11) e[`${who}.mobile`] = 'Enter 11 digit number'
      if (form[who].cnic && digits(form[who].cnic).length !== 13) e[`${who}.cnic`] = 'CNIC must be 13 digits'
    }

    if (!(num(form.shipment.weight) > 0)) e['shipment.weight'] = 'Enter weight in kg'
    // if (!(num(form.charges.rate) > 0)) e['charges.rate'] = 'Enter rate per kg'
    if (!(total.value > 0)) e['charges.total'] = 'Total must be more than 0'
    if (num(form.charges.payment) < 0) e['charges.payment'] = 'Invalid amount'
    else if (num(form.charges.payment) > (total.value + tax.value)) e['charges.payment'] = 'Payment is more than total'

    Object.keys(errors).forEach((k) => delete errors[k])
    Object.assign(errors, e)
    return Object.keys(e).length === 0
  }

  // changing kg or rate recalculates the total automatically (clears a manually typed total)
  watch(() => [form.shipment.weight, form.charges.rate], () => {
    form.charges.total = ''
  })

  // after the first submit attempt, keep errors in sync while typing
  watch(form, () => {
    if (submitted.value) validate()
  }, { deep: true })

  function reset() {
    Object.assign(form, emptyForm())
    Object.keys(errors).forEach((k) => delete errors[k])
    submitted.value = false
  }

  return { form, errors, total, autoTotal, tax, netTotal, due, validate, reset }
}
