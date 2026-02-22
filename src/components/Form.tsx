import { CircleDollarSign } from "lucide-react"
import { useState } from "react"
import Summary from "./Summary"

interface OperationResults {
    capitalInvest: number
    goldCost: number
    lucroGrande: number
    roi: number
    margemLucro: number
    marcos: number
    makene: number
}

export default function Form() {
    const [grams, setGrams] = useState<number>(0)
    const [karats, setKarats] = useState<number>(0)
    const [amountPaid, setAmountPaid] = useState<number>(0)
    const [operationResults, setOperationResults] =
        useState<OperationResults | null>(null)

    const karatValues: Record<number, number> = {
        9: 59450,
        14: 87825,
        18: 112918,
        24: 150550,
    }

    const calculateGoldValue = (): string => {
        return (grams * karatValues[karats]).toLocaleString("pt-BR", {
            style: "currency",
            currency: "AOA",
        })
    }

    const isFormFilled = (): boolean => {
        return grams > 0 && karats > 0
    }

    const handleCalculate = (): void => {
        const goldCost = grams * karatValues[karats]
        const profit = goldCost - amountPaid
        const roi = (profit / amountPaid) * 100
        const marginPercentage = (profit / goldCost) * 100
        const marcosShare = profit * 0.4
        const makeneShare = profit * 0.6

        setOperationResults({
            capitalInvest: amountPaid,
            goldCost: goldCost,
            lucroGrande: profit,
            roi: roi,
            margemLucro: marginPercentage,
            marcos: marcosShare,
            makene: makeneShare,
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
                            onChange={(e) =>
                                setGrams(Math.max(0, Number(e.target.value)))
                            }
                        />
                    </label>
                </div>

                <div className="form__karats">
                    <p>
                        Kilates (k) <span className="not-null">*</span>
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

            {!isFormFilled() ? <img src="/gold-bar.jpg" className="gold-bars" alt="Gold Bars" />
            
            : (
                <>
                    <p className="goldPrice">
                        <CircleDollarSign /> Este ouro custa{" "}
                        <span>{calculateGoldValue()}</span>
                    </p>

                    <div className="form__amountPaid">
                        <div>
                            <label htmlFor="name">
                                <p>Valor pago ao cliente</p>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    name="igrams"
                                    id="grams"
                                    onChange={(e) =>
                                        setAmountPaid(
                                            Math.max(0, Number(e.target.value))
                                        )
                                    }
                                />
                            </label>
                        </div>

                        <button type="button" onClick={handleCalculate}>
                            Calcular
                        </button>
                    </div>

                    {operationResults && <Summary results={operationResults} />}
                </>
            )}
        </div>
    )
}
