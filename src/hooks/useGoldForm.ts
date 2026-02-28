import { useEffect, useMemo, useRef, useState } from "react"
import type { OperationResults } from "../types/OperationResults"

<<<<<<< HEAD
import { formatAmountInput } from "../utils/formatAmountInput"
import { parseAmountInput } from "../utils/parseAmountInput"
import {
    calculateGoldCost,
    computeOperationResults,
} from "../utils/calculateOperationResults"
=======
const karatValues: Record<number, number> = {
    9: 58300,
    14: 90700,
    18: 116700,
    24: 155600,
}
>>>>>>> df1f636ec93b5f55a441fefd2765bc516f90447c

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

    const goldCost = useMemo(
        () => calculateGoldCost(grams, karats),
        [grams, karats],
    )

    const handleAmountPaidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value
        const parsed = parseAmountInput(rawValue)
        setAmountPaid(parsed)
        setAmountPaidFormatted(formatAmountInput(rawValue))
        setOperationResults(null)
    }

    const isFormFilled = grams > 0 && karats > 0

    const handleCalculate = (): void => {
        setOperationResults(computeOperationResults(amountPaid, goldCost))
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
