import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

/** Renders an element to a PDF page that is exactly as wide as a thermal roll (80mm). */
export async function downloadElementAsPdf(el, fileName, widthMm = 80) {
  const canvas = await html2canvas(el, {
    scale: 3,
    backgroundColor: '#ffffff',
    useCORS: true,
  })
  const h = (canvas.height * widthMm) / canvas.width
  const pdf = new jsPDF({
    orientation: h > widthMm ? 'portrait' : 'landscape',
    unit: 'mm',
    format: [widthMm, h],
  })
  pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, widthMm, h)
  pdf.save(fileName)
}