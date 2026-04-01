import CustomerFields from "./CustomerFields"
import KaratSelector from "./KaratSelector"
import ResultSection from "./ResultSection"
import { useGoldForm } from "../hooks/useGoldForm"

export default function Form() {
  const {
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
  } = useGoldForm()

  return (
    <div className="form">
      <div className="form__container">
        <CustomerFields
          onProductNameChange={setProductName}
          onGramsChange={setGrams}
        />
        <KaratSelector selected={karats} onSelect={setKarats} />
      </div>

      {!isFormFilled ? (
        <img src="/gold-bar.jpg" className="gold-bars" alt="Gold Bars" />
      ) : (
        <ResultSection
          goldCost={goldCost}
          amountPaid={amountPaid}
          amountPaidFormatted={amountPaidFormatted}
          isIntermediary={isIntermediary}
          setIsIntermediary={setIsIntermediary}
          isInvestor={isInvestor}
          setIsInvestor={setIsInvestor}
          investorNames={investorNames}
          investorAmountsFormatted={investorAmountsFormatted}
          investorsTotal={investorsTotal}
          onInvestorNameChange={handleInvestorNameChange}
          onInvestorAmountChange={handleInvestorAmountChange}
          onAddInvestor={handleAddInvestor}
          onInject={handleInject}
          productName={productName}
          grams={grams}
          karats={karats}
          investorShares={investorShares}
          isInjectSummary={isInjectSummary}
          onAmountChange={handleAmountPaidChange}
          onCalculate={handleCalculate}
          operationResults={operationResults}
          summaryRef={summaryRef}
        />
      )}
    </div>
  )
}
