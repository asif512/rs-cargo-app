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
      <div class="r-contact">Contact: 0300-1712671</div>
    </div>

    <div class="r-line"></div>
    <div class="r-row"><b class="r-row-label">Receipt #</b><b>{{ receipt.receiptNo }}</b></div>
    <div class="r-row"><b class="r-row-label">Date</b><b>{{ receipt.date }} {{ receipt.time }}</b></div>

    <div class="r-line"></div>
    <div class="r-title">SENDER</div>
    <div class="r-row"><b class="r-row-label">Name</b><b>{{ receipt.sender.name }}</b></div>
    <div class="r-row"><b class="r-row-label">Mobile</b><b>{{ receipt.sender.mobile }}</b></div>
    <div v-if="receipt.sender.cnic" class="r-row"><b class="r-row-label">CNIC</b><b>{{ receipt.sender.cnic }}</b></div>

    <div class="r-line"></div>
    <div class="r-title">RECEIVER</div>
    <div class="r-row"><b class="r-row-label">Name</b><b>{{ receipt.receiver.name }}</b></div>
    <div class="r-row"><b class="r-row-label">Mobile</b><b>{{ receipt.receiver.mobile }}</b></div>
    <div v-if="receipt.receiver.cnic" class="r-row"><b class="r-row-label">CNIC</b><b>{{ receipt.receiver.cnic }}</b></div>

    <div class="r-line"></div>
    <div class="r-title">SHIPMENT</div>
    <div class="r-row"><b class="r-row-label">Booking Point</b><b>{{ receipt.shipment.from }}</b></div>
    <div class="r-row"><b class="r-row-label">Delivery Point</b><b>{{ receipt.shipment.to }}</b></div>
    <div class="r-row"><b class="r-row-label">Goods</b><b>{{ receipt.shipment.goods }}</b></div>
    <div class="r-row"><b class="r-row-label">Quantity</b><b>{{ receipt.shipment.quantity }}</b></div>
    <div class="r-row"><b class="r-row-label">Weight</b><b>{{ receipt.shipment.weight }} KG</b></div>

    <div class="r-line"></div>
    <div class="r-title">CHARGES</div>
    <div v-if="receipt.perKgEnagles" class="r-row"><b class="r-row-label">Rate / KG</b><b>{{ money(receipt.rate) }}</b></div>
    <div class="r-row"><b class="r-row-label">Total</b><b>{{ money(receipt.total) }}</b></div>
    <div v-if="receipt.taxEnabled" class="r-row"><b class="r-row-label">Tax ({{ receipt.taxPercent }}%)</b><b>{{ money(receipt.tax) }}</b></div>
    <div v-if="receipt.taxEnabled" class="r-row"><b class="r-row-label">Net Total</b><b>{{ money(receipt.netTotal) }}</b></div>
    <div class="r-row"><b class="r-row-label">Paid</b><b>{{ money(receipt.paid) }}</b></div>
    <div class="r-row r-due"><b class="r-row-label">DUE</b><b>{{ money(receipt.due) }}</b></div>

    <div class="r-line"></div>
    <div class="r-foot">Thank you for choosing RSC CARGO</div>
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
  width: 38%;
}
.r-foot { text-align: center; font-weight: 700; }
.r-foot.small { font-weight: 400; font-size: 10px; margin-top: 1mm; }

@media print {
  .receipt { box-shadow: none; margin: 0; }
}
</style>