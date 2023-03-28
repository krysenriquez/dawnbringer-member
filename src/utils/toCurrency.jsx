export const toCurrency = (value) =>
  new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(value)

export const toPoints = (value) => {
  return value.toLocaleString() + ' Point/s'
}

export const toMembershipPoints = (value, membership) => {
  return value.toLocaleString() + ' ' + membership + ' Point/s'
}

export const toNumber = (value) => {
  return value.toLocaleString('en-PH', {minimumFractionDigits: 2})
}
