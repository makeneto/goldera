import type { OperationResults } from "../types/OperationResults"
import { karatValues } from "../constants/karatValues"

export function calculateGoldCost(grams: number, karats: number): number {
    const unitPrice = karatValues[karats] ?? 0
    return grams * unitPrice
}

export function computeOperationResults(
    amountPaid: number,
    goldCost: number,
): OperationResults {
    const profit = goldCost - amountPaid
    const roi = (profit / amountPaid) * 100
    const marginPercentage = (profit / goldCost) * 100
    const personalUseShare = profit * 0.3
    const reserveShare = profit * 0.1
    const reinvestmentShare = profit * 0.6

    const operationalPatrimony = goldCost - personalUseShare

    return {
        capitalInvest: amountPaid,
        goldCost: goldCost,
        lucroGrande: profit,
        roi: roi,
        margemLucro: marginPercentage,
        personalUse: personalUseShare,
        reserve: reserveShare,
        reinvestment: reinvestmentShare,
        operationalPatrimony: operationalPatrimony,
    }
}
