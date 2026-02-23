import { CircleDollarSign, TriangleAlert } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import Summary from "./Summary"

interface OperationResults {
    capitalInvest: number
    goldCost: number
    lucroGrande: number
    roi: number
    margemLucro: number
    marcos: number
    reinvestment: number
}

export default function Form() {
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

    const karatValues: Record<number, number> = {
        9: 59450,
        14: 87825,
        18: 112918,
        24: 150550,
    }

    const calculateGoldValueNumber = (): number => {
        const unit = karatValues[karats] ?? 0
        return grams * unit
    }

    const formatCurrency = (value: number): string => {
        return value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "AOA",
        })
    }

    const formatAmountInput = (value: string): string => {
        const numericValue = value.replace(/\D/g, "")
        if (!numericValue) return ""

        // Converter para número decimal (últimos 2 dígitos são centavos)
        const decimalNumber = Number(numericValue) / 100

        // Formatar com 2 casas decimais no padrão pt-BR
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

    const isFormFilled = (): boolean => {
        return grams > 0 && karats > 0
    }

    const handleCalculate = (): void => {
        const goldCost = calculateGoldValueNumber()
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

    return (
        <div className="form">
            <div className="form__container">
                <div>
                    <label htmlFor="name">
                        <p>Cliente</p>
                        <input
                            type="text"
                            placeholder="Maria Augusto"
                            name="iname"
                            id="name"
                            className="field"
                            autoComplete="off"
                        />
                    </label>
                    <label htmlFor="grams">
                        <p>
                            Gramas (g) <span className="not-null">*</span>
                        </p>
                        <input
                            type="number"
                            placeholder="0.00"
                            name="igrams"
                            id="grams"
                            className="field"
                            onChange={(e) =>
                                setGrams(Math.max(0, Number(e.target.value)))
                            }
                        />
                    </label>
                </div>

                <div className="form__karats">
                    <p>
                        Quilates (k) <span className="not-null">*</span>
                    </p>
                    <div>
                        <span
                            onClick={() => setKarats(9)}
                            style={{
                                backgroundColor:
                                    karats === 9 ? "#0f5540" : "transparent",
                                color: karats === 9 ? "#ffffff" : "#333",
                                border: karats === 9 ? "none" : undefined,
                            }}
                        >
                            9
                        </span>
                        <span
                            onClick={() => setKarats(14)}
                            style={{
                                backgroundColor:
                                    karats === 14 ? "#0f5540" : "transparent",
                                color: karats === 14 ? "#ffffff" : "#333",
                                border: karats === 14 ? "none" : undefined,
                            }}
                        >
                            14
                        </span>
                        <span
                            onClick={() => setKarats(18)}
                            style={{
                                backgroundColor:
                                    karats === 18 ? "#0f5540" : "transparent",
                                color: karats === 18 ? "#ffffff" : "#333",
                                border: karats === 18 ? "none" : undefined,
                            }}
                        >
                            18
                        </span>
                        <span
                            onClick={() => setKarats(24)}
                            style={{
                                backgroundColor:
                                    karats === 24 ? "#0f5540" : "transparent",
                                color: karats === 24 ? "#ffffff" : "#333",
                                border: karats === 24 ? "none" : undefined,
                            }}
                        >
                            24
                        </span>
                    </div>
                </div>
            </div>

            {!isFormFilled() ? (
                <img
                    src="/gold-bar.jpg"
                    className="gold-bars"
                    alt="Gold Bars"
                />
            ) : (
                <>
                    <p className="information information--price">
                        <CircleDollarSign /> Este ouro custa{" "}
                        <span>
                            {formatCurrency(calculateGoldValueNumber())}
                        </span>
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
                                        onChange={handleAmountPaidChange}
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
                            onClick={handleCalculate}
                        >
                            Calcular
                        </button>
                    </div>

                    {operationResults &&
                        amountPaid > calculateGoldValueNumber() && (
                            <p className="information information--warning">
                                <TriangleAlert />
                                Foi pago{" "}
                                <span>
                                    {formatCurrency(
                                        amountPaid - calculateGoldValueNumber(),
                                    )}
                                </span>{" "}
                                a mais.
                            </p>
                        )}

                    {operationResults && operationResults.lucroGrande > 0 && (
                        <div ref={summaryRef}>
                            <Summary results={operationResults} />
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
