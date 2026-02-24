import { useEffect, useMemo, useRef, useState } from "react"
import type { OperationResults } from "../types/OperationResults.ts"

const karatValues: Record<number, number> = {
    9: 57000,
    14: 88700,
    18: 114000,
    24: 152000,
}

export function useGoldForm() {
    const [grams, setGrams] = useState<number>(0)
    const [karats, setKarats] = useState<number>(0)
    const [amountPaid, setAmountPaid] = useState<number>(0)
    const [amountPaidFormatted, setAmountPaidFormatted] = useState<string>("")
    const [operationResults, setOperationResults] =
        useState<OperationResults | null>(null)
    const summaryRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (operationResults && summaryRef.current) {
            summaryRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [operationResults])

    const goldCost = useMemo(() => {
        const unit = karatValues[karats] ?? 0
        return grams * unit
    }, [grams, karats])

    const formatAmountInput = (value: string): string => {
        const numericValue = value.replace(/\D/g, "")
        if (!numericValue) return ""

        const decimalNumber = Number(numericValue) / 100

        return decimalNumber.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })
    }

    const handleAmountPaidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value
        const numericOnly = rawValue.replace(/\D/g, "")
        const numericValue = numericOnly ? Number(numericOnly) / 100 : 0
        const formattedValue = formatAmountInput(rawValue)

        setAmountPaid(Math.max(0, numericValue))
        setAmountPaidFormatted(formattedValue)
        setOperationResults(null)
    }

    const isFormFilled = grams > 0 && karats > 0

    const handleCalculate = (): void => {
        const profit = goldCost - amountPaid
        const roi = (profit / amountPaid) * 100
        const marginPercentage = (profit / goldCost) * 100
        const marcosShare = profit * 0.3
        const reinvestmentShare = profit * 0.7

        setOperationResults({
            capitalInvest: amountPaid,
            goldCost: goldCost,
            lucroGrande: profit,
            roi: roi,
            margemLucro: marginPercentage,
            marcos: marcosShare,
            reinvestment: reinvestmentShare,
        })
    }

    return {
        grams,
        setGrams,
        karats,
        setKarats,
        amountPaid,
        amountPaidFormatted,
        operationResults,
        summaryRef,
        goldCost,
        handleAmountPaidChange,
        isFormFilled,
        handleCalculate,
    }
}
