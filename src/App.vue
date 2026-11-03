<script setup>
import { ref, nextTick } from 'vue'
import BrandPanel from './components/BrandPanel.vue'
import PartyCard from './components/PartyCard.vue'
import ShipmentCard from './components/ShipmentCard.vue'
import ChargesCard from './components/ChargesCard.vue'
import TaxCard from './components/TaxCard.vue'
import ReceiptModal from './components/ReceiptModal.vue'
import { useReceiptForm } from './composables/useReceiptForm'
import { buildReceipt } from './utils/receipt'

const { form, errors, total, tax, netTotal, due, validate, reset } = useReceiptForm()
const receipt = ref(null) // snapshot shown in the modal

async function generateReceipt() {
  if (!validate()) {
    await nextTick()
    document.querySelector('.field.has-error input, .field.has-error textarea')?.focus()
    return
  }
  receipt.value = buildReceipt(form, {
    total: total.value,
    tax: tax.value,
    netTotal: netTotal.value,
    due: due.value,
  })
}
</script>

<template>
  <div class="app-shell">
    <BrandPanel />

    <main class="form-side">
      <div class="form-scroll">
        <h2 class="page-title">New Cargo Receipt</h2>

        <PartyCard title="Sender" prefix="sender" :party="form.sender" :errors="errors" />
        <PartyCard title="Receiver" prefix="receiver" :party="form.receiver" :errors="errors" />
        <ShipmentCard :shipment="form.shipment" :errors="errors" />
        <ChargesCard :charges="form.charges" :total="total" :due="due" :errors="errors" />
        <TaxCard :charges="form.charges" :tax="tax" :net-total="netTotal" />
      </div>

      <footer class="form-actions">
        <button type="button" class="btn ghost" @click="reset">Clear</button>
        <button type="button" class="btn primary" @click="generateReceipt">Generate Receipt</button>
      </footer>
    </main>
  </div>

  <ReceiptModal v-if="receipt" :receipt="receipt" @close="receipt = null" />
</template>

<style scoped>
.app-shell {
  display: grid;
  grid-template-columns: 320px 1fr;
  min-height: 100vh;
}
.form-side { display: flex; flex-direction: column; min-width: 0; height: 100vh; }
.form-scroll { flex: 1; overflow-y: auto; padding: 24px 28px; }
.page-title { font-size: 22px; margin-bottom: 16px; }
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 14px 28px;
  background: #fff;
  border-top: 1px solid var(--line);
}
.form-actions .btn.primary { min-width: 220px; }

@media (max-width: 860px) {
  .app-shell { grid-template-columns: 1fr; }
  .form-side { height: auto; }
  .form-scroll { overflow: visible; padding: 16px; }
  .form-actions { position: sticky; bottom: 0; padding: 12px 16px; }
  .form-actions .btn.primary { flex: 1; min-width: 0; }
}

@media print {
  .app-shell { display: none; }
}
</style>