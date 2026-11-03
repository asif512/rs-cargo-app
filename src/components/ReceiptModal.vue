<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import ThermalReceipt from './ThermalReceipt.vue'
import { downloadElementAsPdf } from '../utils/pdf'

const props = defineProps({
  receipt: { type: Object, required: true },
})
const emit = defineEmits(['close'])

const receiptRef = ref(null)
const busy = ref(false)

function printReceipt() {
  window.print()
}

async function downloadReceipt() {
  if (busy.value || !receiptRef.value?.el) return
  busy.value = true
  try {
    await downloadElementAsPdf(receiptRef.value.el, `${props.receipt.receiptNo}.pdf`)
  } catch (err) {
    console.error(err)
    alert('Download failed. Please try again.')
  } finally {
    busy.value = false
  }
}

const onKey = (e) => {
  if (e.key === 'Escape') emit('close')
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <div class="modal-overlay" @click.self="emit('close')">
    <div class="modal" role="dialog" aria-modal="true" aria-label="Receipt preview">
      <header class="modal-head">
        <h3>Receipt Preview</h3>
        <button type="button" class="icon-btn" aria-label="Close" @click="emit('close')">&times;</button>
      </header>

      <div class="modal-body">
        <ThermalReceipt ref="receiptRef" :receipt="receipt" />
      </div>

      <footer class="modal-foot">
        <button type="button" class="btn ghost" :disabled="busy" @click="downloadReceipt">
          {{ busy ? 'Preparing...' : 'Download' }}
        </button>
        <button type="button" class="btn primary" @click="printReceipt">Print</button>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(17, 24, 39, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  z-index: 50;
}
.modal {
  background: #fff;
  border-radius: 14px;
  width: 100%;
  max-width: 420px;
  max-height: 94vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
}
.modal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid var(--line);
}
.modal-head h3 { font-size: 16px; }
.icon-btn {
  background: none;
  border: none;
  font-size: 26px;
  line-height: 1;
  color: var(--muted);
  padding: 0 6px;
}
.modal-body {
  overflow-y: auto;
  background: #e5e7eb;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.modal-foot {
  display: flex;
  gap: 12px;
  padding: 12px 16px;
  border-top: 1px solid var(--line);
}
.modal-foot .btn { flex: 1; padding: 12px 10px; }

/* print: show only the receipt at 80mm */
@media print {
  .modal-overlay {
    position: static;
    background: none;
    padding: 0;
    display: block;
  }
  .modal {
    box-shadow: none;
    border-radius: 0;
    max-width: none;
    max-height: none;
    overflow: visible;
    width: 80mm;
  }
  .modal-head,
  .modal-foot { display: none; }
  .modal-body {
    padding: 0;
    background: #fff;
    overflow: visible;
    display: block;
  }
}
</style>