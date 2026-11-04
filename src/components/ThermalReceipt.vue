<script setup>
import { ref } from 'vue'
import { money } from '../utils/format'
import logo from '../assets/logo.png'

defineProps({
  receipt: { type: Object, required: true },
})


const el = ref(null)
// parent reads receiptRef.value.el for print / PDF export
defineExpose({ el })
</script>

<template>
  <div class="receipt" ref="el">
    <div class="r-head">
      <img :src="logo" alt="Rana Sanaullah Cargo" class="r-logo" />
      <div class="r-contact">Contact: 0305-9911139</div>
    </div>

    <div class="r-line"></div>
    <div class="r-row"><span class="r-row-label">Receipt #</span><b>{{ receipt.receiptNo }}</b></div>
    <div class="r-row"><span class="r-row-label">Date</span><span>{{ receipt.date }} {{ receipt.time }}</span></div>

    <div class="r-line"></div>
    <div class="r-title">SENDER</div>
    <div class="r-row"><span class="r-row-label">Name</span><span>{{ receipt.sender.name }}</span></div>
    <div class="r-row"><span class="r-row-label">Mobile</span><span>{{ receipt.sender.mobile }}</span></div>
    <div v-if="receipt.sender.cnic" class="r-row"><span class="r-row-label">CNIC</span><span>{{ receipt.sender.cnic }}</span></div>

    <div class="r-line"></div>
    <div class="r-title">RECEIVER</div>
    <div class="r-row"><span class="r-row-label">Name</span><span>{{ receipt.receiver.name }}</span></div>
    <div class="r-row"><span class="r-row-label">Mobile</span><span>{{ receipt.receiver.mobile }}</span></div>
    <div v-if="receipt.receiver.cnic" class="r-row"><span class="r-row-label">CNIC</span><span>{{ receipt.receiver.cnic }}</span></div>

    <div class="r-line"></div>
    <div class="r-title">SHIPMENT</div>
    <div class="r-row"><span class="r-row-label">From</span><span>{{ receipt.shipment.from }}</span></div>
    <div class="r-row"><span class="r-row-label">To</span><span>{{ receipt.shipment.to }}</span></div>
    <div class="r-row"><span class="r-row-label">Goods</span><span>{{ receipt.shipment.goods }}</span></div>
    <div class="r-row"><span class="r-row-label">Quantity</span><span>{{ receipt.shipment.quantity }}</span></div>
    <div class="r-row"><span class="r-row-label">Weight</span><span>{{ receipt.shipment.weight }} KG</span></div>

    <div class="r-line"></div>
    <div class="r-title">CHARGES</div>
    <div class="r-row"><span class="r-row-label">Rate / KG</span><span>{{ money(receipt.rate) }}</span></div>
    <div class="r-row"><span class="r-row-label">Total</span><b>{{ money(receipt.total) }}</b></div>
    <div v-if="receipt.taxEnabled" class="r-row"><span class="r-row-label">Tax ({{ receipt.taxPercent }}%)</span><span>-{{ money(receipt.tax) }}</span></div>
    <div v-if="receipt.taxEnabled" class="r-row"><span class="r-row-label">Net Total</span><b>{{ money(receipt.netTotal) }}</b></div>
    <div class="r-row"><span class="r-row-label">Paid</span><span>{{ money(receipt.paid) }}</span></div>
    <div class="r-row r-due"><span class="r-row-label">DUE</span><b>{{ money(receipt.due) }}</b></div>

    <div class="r-line"></div>
    <div class="r-foot">Thank you for choosing RS CARGO</div>
    <div class="r-foot small">Please keep this receipt for delivery</div>
  </div>
</template>

<style scoped>
.receipt {
  width: 80mm;
  height: auto;
  flex: none;
  align-self: flex-start;
  background: #fff;
  color: #000;
  padding: 5mm 4mm 6mm;
  font-family: 'Courier New', Courier, monospace;
  font-size: 12px;
  line-height: 1.35;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
}
.r-head { text-align: center; }
.r-logo { width: 100%; height: auto; display: block; margin: 0 auto 1.5mm; }
.r-contact { font-size: 14px; font-weight: 900; letter-spacing: 0.5px; }
.r-line { border-top: 1px dashed #000; margin: 2.5mm 0; }
.r-title { font-weight: 900; font-size: 12px; margin-bottom: 1mm; letter-spacing: 1px; }
.r-row { display: flex; justify-content: space-between; gap: 3mm; padding: 0.5mm 0; }
.r-row > span:first-child { flex: none; }
.r-row > span:last-child,
.r-row > b:last-child { text-align: right; word-break: break-word; }
.r-due {
  font-size: 15px;
  font-weight: 900;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  margin-top: 1.5mm;
  padding: 1.2mm 0;
}
.r-row-label {
  width: 30%;
}
.r-foot { text-align: center; font-weight: 700; }
.r-foot.small { font-weight: 400; font-size: 10px; margin-top: 1mm; }

@media print {
  .receipt { box-shadow: none; margin: 0; }
}
</style>