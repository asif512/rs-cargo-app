import { num } from './format'
import { TAX_PERCENT } from './constants'

/** Sequential receipt number, remembered in this browser. */
export function nextReceiptNo() {
  let n
  try {
    n = (parseInt(localStorage.getItem('rs-cargo-last-no'), 10) || 0) + 1
    localStorage.setItem('rs-cargo-last-no', String(n))
  } catch (_) {
    n = Math.floor(Math.random() * 900000) + 100000
  }
  return `RS-${String(n).padStart(6, '0')}`
}

/** Snapshot of the form that the receipt shows. */
export function buildReceipt(form, { total, tax, netTotal, due }) {
  const now = new Date()
  return {
    receiptNo: nextReceiptNo(),
    date: now.toLocaleDateString('en-GB'),
    time: now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    sender: { ...form.sender },
    receiver: { ...form.receiver },
    shipment: { ...form.shipment, weight: num(form.shipment.weight) },
    rate: num(form.charges.rate),
    total,
    taxEnabled: !!form.charges.addTax,
    perKgEnagles: !!form.charges.isVisiblePerKGCharges,
    taxPercent: TAX_PERCENT,
    tax,
    netTotal,
    paid: num(form.charges.payment),
    due,
  }
}