export function parseAmountInput(rawValue: string): number {
    const numericOnly = rawValue.replace(/\D/g, "")
    if (!numericOnly) return 0

    const value = Number(numericOnly) / 100
    return Math.max(0, value)
}
