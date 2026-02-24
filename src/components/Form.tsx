import CustomerFields from "./CustomerFields"
import KaratSelector from "./KaratSelector"
import ResultSection from "./ResultSection"
import { useGoldForm } from "../hooks/useGoldForm"

export default function Form() {
    const {
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
    } = useGoldForm()

    return (
        <div className="form">
            <div className="form__container">
                <CustomerFields onGramsChange={setGrams} />
                <KaratSelector selected={karats} onSelect={setKarats} />
            </div>

            {!isFormFilled ? (
                <img
                    src="/gold-bar.jpg"
                    className="gold-bars"
                    alt="Gold Bars"
                />
            ) : (
                <ResultSection
                    goldCost={goldCost}
                    amountPaid={amountPaid}
                    amountPaidFormatted={amountPaidFormatted}
                    onAmountChange={handleAmountPaidChange}
                    onCalculate={handleCalculate}
                    operationResults={operationResults}
                    summaryRef={summaryRef}
                />
            )}
        </div>
    )
}
