import { CircleDollarSign, Plus } from "lucide-react"
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
  onAddInvestor,
  onInject,
  productName,
  grams,
  karats,
  investorShares,
  isInjectSummary,
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
          <div className="investors__header">
            <div>
              <p className="investors__title">Investidores</p>
              <p className="investors__subtitle">
                {investorNames.length} Investidores
              </p>
            </div>

            <button type="button" onClick={onAddInvestor}>
              <Plus />
            </button>
          </div>

          <div className="form__container investors__data investors__data--header">
            <p>Investidor</p>
            <p>Valor Invest.</p>
          </div>

          {investorNames.map((name, index) => (
            <div className="form__container" key={index}>
              <div className="investors__data">
                <input
                  type="text"
                  placeholder="Nome"
                  className="field"
                  value={name}
                  onChange={(e) => onInvestorNameChange(index, e)}
                  autoComplete="off"
                  aria-label="Nome do investidor"
                />
                <input
                  type="text"
                  placeholder="40.000,00"
                  className="field"
                  value={investorAmountsFormatted[index] ?? ""}
                  onChange={(e) => onInvestorAmountChange(index, e)}
                  autoComplete="off"
                  aria-label="Valor investido"
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            className="investors__total-button"
            onClick={onInject}
            disabled={investorsTotal === 0}
          >
            Injetar <span>{formatCurrency(investorsTotal)}</span>
          </button>
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
          <Summary
            results={operationResults}
            isIntermediary={isIntermediary}
            isInjectSummary={isInjectSummary}
            productName={productName}
            grams={grams}
            karats={karats}
            investorShares={investorShares}
          />
        </div>
      )}
    </>
  )
}
