import { CircleDollarSign, TriangleAlert } from "lucide-react"
import Summary from "./Summary"
import { formatCurrency } from "../utils/formatCurrency"
import type { OperationResults } from "../types/OperationResults"

interface ResultSectionProps {
    goldCost: number
    amountPaid: number
    amountPaidFormatted: string
    onAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onCalculate: () => void
    operationResults: OperationResults | null
    summaryRef: React.RefObject<HTMLDivElement | null>
}

export default function ResultSection({
    goldCost,
    amountPaid,
    amountPaidFormatted,
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

            {operationResults && amountPaid > goldCost && (
                <p className="information information--warning">
                    <TriangleAlert />
                    Foi pago{" "}
                    <span>{formatCurrency(amountPaid - goldCost)}</span> a mais.
                </p>
            )}

            {operationResults && operationResults.lucroGrande > 0 && (
                <div ref={summaryRef}>
                    <Summary results={operationResults} />
                </div>
            )}
        </>
    )
}
