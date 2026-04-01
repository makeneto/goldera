interface CustomerFieldsProps {
  onProductNameChange: (value: string) => void
  onGramsChange: (g: number) => void
}

export default function CustomerFields({
  onProductNameChange,
  onGramsChange,
}: CustomerFieldsProps) {
  return (
    <>
      <div className="productData">
        <label htmlFor="productName">
          <p>
            Produto <span className="not-null">*</span>
          </p>
          <input
            type="text"
            placeholder="Fio de ouro"
            name="productName"
            id="productName"
            className="field"
            autoComplete="off"
            onChange={(e) => onProductNameChange(e.target.value)}
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
            onChange={(e) => onGramsChange(Math.max(0, Number(e.target.value)))}
          />
        </label>
      </div>
    </>
  )
}
