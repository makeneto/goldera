interface CustomerFieldsProps {
  onGramsChange: (g: number) => void
}

export default function CustomerFields({ onGramsChange }: CustomerFieldsProps) {
  return (
    <>
      <div>
        <label htmlFor="productName">
          <p>Produto</p>
          <input
            type="text"
            placeholder="Fio de ouro"
            name="productName"
            id="productName"
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
            onChange={(e) => onGramsChange(Math.max(0, Number(e.target.value)))}
          />
        </label>
      </div>
    </>
  )
}
