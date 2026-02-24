interface CustomerFieldsProps {
    onGramsChange: (g: number) => void
}

export default function CustomerFields({ onGramsChange }: CustomerFieldsProps) {
    return (
        <>
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
                            onGramsChange(Math.max(0, Number(e.target.value)))
                        }
                    />
                </label>
            </div>
        </>
    )
}
