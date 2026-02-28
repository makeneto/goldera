export const formatAmountInput = (value: string): string => {
    const numericValue = value.replace(/\D/g, "")
    if (!numericValue) return ""

    const decimalNumber = Number(numericValue) / 100

    return decimalNumber.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })
}
