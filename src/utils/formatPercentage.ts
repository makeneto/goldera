export const formatPercentage = (value: number): string => {
  const formatted = value
    .toFixed(2)
    .replace(/\.00$/, "")
    .replace(/(\.\d)0$/, "$1")
  return `${formatted}%`
}
