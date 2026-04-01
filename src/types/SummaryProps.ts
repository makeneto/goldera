import type { OperationResults } from "./OperationResults.ts"

export interface InvestorShare {
  name: string
  percentage: number
  amount: number
}

export interface SummaryProps {
  results: OperationResults
  isIntermediary?: boolean
  isInjectSummary?: boolean
  productName?: string
  grams?: number
  karats?: number
  investorShares?: InvestorShare[]
}
