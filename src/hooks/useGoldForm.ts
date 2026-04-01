import { useEffect, useMemo, useRef, useState } from "react"
import type { OperationResults } from "../types/OperationResults"

import { formatAmountInput } from "../utils/formatAmountInput"
import { parseAmountInput } from "../utils/parseAmountInput"
import {
  calculateGoldCost,
  computeOperationResults,
} from "../utils/calculateOperationResults"

export function useGoldForm() {
  const [grams, setGrams] = useState<number>(0)
  const [karats, setKarats] = useState<number>(0)
  const [amountPaid, setAmountPaid] = useState<number>(0)
  const [amountPaidFormatted, setAmountPaidFormatted] = useState<string>("")
  const [isIntermediary, setIsIntermediary] = useState<boolean>(false)
  const [isInvestor, setIsInvestor] = useState<boolean>(false)
  const [productName, setProductName] = useState<string>("")
  const [investorNames, setInvestorNames] = useState<string[]>(["", ""])
  const [investorAmounts, setInvestorAmounts] = useState<number[]>([0, 0])
  const [investorAmountsFormatted, setInvestorAmountsFormatted] = useState<
    string[]
  >(["", ""])
  const [operationResults, setOperationResults] =
    useState<OperationResults | null>(null)
  const [isInjectSummary, setIsInjectSummary] = useState<boolean>(false)
  const [investorShares, setInvestorShares] = useState<
    Array<{ name: string; percentage: number; amount: number }>
  >([])
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

  const resetSummary = (): void => {
    setOperationResults(null)
    setIsInjectSummary(false)
    setInvestorShares([])
  }

  const handleAmountPaidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    const parsed = parseAmountInput(rawValue)
    setAmountPaid(parsed)
    setAmountPaidFormatted(formatAmountInput(rawValue))
    resetSummary()
  }

  const handleInvestorNameChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const nextNames = [...investorNames]
    nextNames[index] = e.target.value
    setInvestorNames(nextNames)
    resetSummary()
  }

  const handleInvestorAmountChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const rawValue = e.target.value
    const parsed = parseAmountInput(rawValue)

    const nextAmounts = [...investorAmounts]
    const nextFormatted = [...investorAmountsFormatted]

    nextAmounts[index] = parsed
    nextFormatted[index] = formatAmountInput(rawValue)

    setInvestorAmounts(nextAmounts)
    setInvestorAmountsFormatted(nextFormatted)
    resetSummary()
  }

  const investorsTotal = useMemo(
    () => investorAmounts.reduce((total, value) => total + value, 0),
    [investorAmounts],
  )

  const isFormFilled = grams > 0 && karats > 0

  const handleCalculate = (): void => {
    setIsInjectSummary(false)
    setInvestorShares([])
    setOperationResults(computeOperationResults(amountPaid, goldCost))
  }

  const handleAddInvestor = (): void => {
    setInvestorNames((current) => [...current, ""])
    setInvestorAmounts((current) => [...current, 0])
    setInvestorAmountsFormatted((current) => [...current, ""])
    resetSummary()
  }

  const handleInject = (): void => {
    if (!investorsTotal) {
      return
    }

    const results = computeOperationResults(investorsTotal, goldCost)
    const shares = investorAmounts.map((amount, index) => {
      const percentage = investorsTotal ? amount / investorsTotal : 0
      return {
        name: investorNames[index] || `Investidor ${index + 1}`,
        percentage: percentage * 100,
        amount: results.goldCost * percentage,
      }
    })

    setOperationResults(results)
    setInvestorShares(shares)
    setIsInjectSummary(true)
  }

  return {
    grams,
    setGrams,
    karats,
    setKarats,
    amountPaid,
    amountPaidFormatted,
    isIntermediary,
    setIsIntermediary,
    isInvestor,
    setIsInvestor,
    investorNames,
    investorAmountsFormatted,
    investorsTotal,
    handleInvestorNameChange,
    handleInvestorAmountChange,
    handleAddInvestor,
    handleInject,
    productName,
    setProductName,
    investorShares,
    isInjectSummary,
    operationResults,
    summaryRef,
    goldCost,
    handleAmountPaidChange,
    isFormFilled,
    handleCalculate,
  }
}
