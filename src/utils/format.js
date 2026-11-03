export const num = (v) => {
    const n = parseFloat(v)
    return Number.isFinite(n) ? n : 0
  }
  
  export const digits = (v) => String(v).replace(/\D/g, '')
  
  export const money = (n) => `Rs. ${Number(n).toLocaleString('en-US')}`
  
  /** 03XX-XXXXXXX */
  export const maskMobile = (v) => {
    const d = digits(v).slice(0, 11)
    return d.length > 4 ? `${d.slice(0, 4)}-${d.slice(4)}` : d
  }
  
  /** XXXXX-XXXXXXX-X */
  export const maskCnic = (v) => {
    const d = digits(v).slice(0, 13)
    let out = d.slice(0, 5)
    if (d.length > 5) out += `-${d.slice(5, 12)}`
    if (d.length > 12) out += `-${d.slice(12)}`
    return out
  }
  
  /** Use in templates: @input="model.mobile = applyMask($event, maskMobile)" */
  export function applyMask(event, masker) {
    const masked = masker(event.target.value)
    event.target.value = masked
    return masked
  }