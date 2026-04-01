import { CircleDollarSign } from "lucide-react"
import Summary from "./Summary"
import { formatCurrency } from "../utils/formatCurrency"
import type { OperationResults } from "../types/OperationResults"

interface ResultSectionProps {
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
  onAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onCalculate: () => void
  operationResults: OperationResults | null
  summaryRef: React.RefObject<HTMLDivElement | null>
}

export default function ResultSection({
  goldCost,
  amountPaid,
  amountPaidFormatted,
  isIntermediary,
  setIsIntermediary,
  isInvestor,
  setIsInvestor,
  investorNames,
  investorAmountsFormatted,
  investorsTotal,
  onInvestorNameChange,
  onInvestorAmountChange,
  onAmountChange,
  onCalculate,
  operationResults,
  summaryRef,
}: ResultSectionProps) {
  return (
    <>
      <p className="information information--price">
        <CircleDollarSign /> Este ouro custa{" "}
        <span>{formatCurrency(goldCost)}</span>
      </p>

      <div className="toggle-space">
        <label htmlFor="isInvestor">
          <p>+1 Investidor</p>
          <label className="switch">
            <input
              type="checkbox"
              name="investor"
              id="isInvestor"
              checked={isInvestor}
              onChange={(e) => setIsInvestor(e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </label>
      </div>

      {isInvestor ? (
        <section className="investors">
          <p className="investors__title">Investidores</p>
          <p className="investors__subtitle">2 Investidores</p>

          <div className="form__container">
            <div>
              <label>
                <p>Investidor</p>
                <input
                  type="text"
                  placeholder="Makene"
                  className="field"
                  value={investorNames[0]}
                  onChange={(e) => onInvestorNameChange(0, e)}
                  autoComplete="off"
                />
              </label>
              <label>
                <p>Valor Invest.</p>
                <input
                  type="text"
                  placeholder="40.000,00"
                  className="field"
                  value={investorAmountsFormatted[0]}
                  onChange={(e) => onInvestorAmountChange(0, e)}
                  autoComplete="off"
                />
              </label>
            </div>
          </div>

          <div className="form__container">
            <div>
              <input
                type="text"
                placeholder="José"
                className="field"
                value={investorNames[1]}
                onChange={(e) => onInvestorNameChange(1, e)}
                autoComplete="off"
              />
              <input
                type="text"
                placeholder="10.000,00"
                className="field"
                value={investorAmountsFormatted[1]}
                onChange={(e) => onInvestorAmountChange(1, e)}
                autoComplete="off"
              />
            </div>
          </div>
        </section>
      ) : (
        <div className="form__amountPaid">
          <div>
            <label htmlFor="amountPaid">
              <p>Valor pago ao cliente</p>
              <div className="field field--amountPaid">
                <input
                  type="text"
                  placeholder="0,00"
                  name="amountPaid"
                  id="amountPaid"
                  value={amountPaidFormatted}
                  onChange={onAmountChange}
                  autoComplete="off"
                />
                <span>AOA</span>
              </div>

              <aside className="information--warning">
                {operationResults && amountPaid > goldCost && (
                  <>
                    Excedente de
                    <span>{formatCurrency(amountPaid - goldCost)}</span>
                  </>
                )}
              </aside>
            </label>
          </div>

          <div className="toggle-space">
            <label htmlFor="isIntermediary">
              <p>Intermediário</p>
              <label className="switch">
                <input
                  type="checkbox"
                  name="intermediary"
                  id="isIntermediary"
                  checked={isIntermediary}
                  onChange={(e) => setIsIntermediary(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </label>
          </div>

          <button
            type="button"
            disabled={!amountPaid}
            style={{ opacity: amountPaid ? 1 : 0.6 }}
            onClick={onCalculate}
          >
            {isInvestor ? formatCurrency(investorsTotal) : "Calcular"}
          </button>
        </div>
      )}

      {operationResults && operationResults.lucroGrande > 0 && (
        <div ref={summaryRef}>
          <Summary results={operationResults} isIntermediary={isIntermediary} />
        </div>
      )}
    </>
  )
}
