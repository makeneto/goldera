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
                                    <span>
                                        {formatCurrency(amountPaid - goldCost)}
                                    </span>
                                </>
                            )}
                        </aside>
                    </label>
                </div>

                <div className="intermediary">
                    <label htmlFor="isIntermediary">
                        <p>Intermediário</p>
                        <label className="switch">
                            <input
                                type="checkbox"
                                name="intermediary"
                                id="isIntermediary"
                                checked={isIntermediary}
                                onChange={(e) =>
                                    setIsIntermediary(e.target.checked)
                                }
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
                    Calcular
                </button>
            </div>

            {operationResults && operationResults.lucroGrande > 0 && (
                <div ref={summaryRef}>
                    <Summary
                        results={operationResults}
                        isIntermediary={isIntermediary}
                    />
                </div>
            )}
        </>
    )
}
