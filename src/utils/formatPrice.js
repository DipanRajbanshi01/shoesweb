export function formatPrice(amount) {
  return `Rs. ${Math.round(amount).toLocaleString('en-IN')}`
}

export function formatDiscount(original, sale) {
  const pct = Math.round(((original - sale) / original) * 100)
  return `-${pct}%`
}
