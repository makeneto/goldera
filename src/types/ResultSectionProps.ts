import type { OperationResults } from "./OperationResults"

export interface ResultSectionProps {
  goldCost: number
  amountPaid: number
  amountPaidFormatted: string
  isIntermediary: boolean
  setIsIntermediary: (value: boolean) => void
  isInvestor: boolean
  setIsInvestor: (value: boolean) => void
  investorNames: string[]
  investorAmountsFormatted: string[]
  investorsTotal: number
  onInvestorNameChange: (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void
  onInvestorAmountChange: (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void
  onAddInvestor: () => void
  onInject: () => void
  productName: string
  grams: number
  karats: number
  investorShares: Array<{ name: string; percentage: number; amount: number }>
  isInjectSummary: boolean
  onAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onCalculate: () => void
  operationResults: OperationResults | null
  summaryRef: React.RefObject<HTMLDivElement | null>
}
