interface KaratSelectorProps {
    selected: number
    onSelect: (k: number) => void
}

const options = [9, 14, 18, 24]

export default function KaratSelector({
    selected,
    onSelect,
}: KaratSelectorProps) {
    return (
        <div className="form__karats">
            <p>
                Quilates (k) <span className="not-null">*</span>
            </p>
            <div>
                {options.map((k) => (
                    <span
                        key={k}
                        onClick={() => onSelect(k)}
                        style={{
                            backgroundColor:
                                selected === k ? "#0f5540" : "transparent",
                            color: selected === k ? "#ffffff" : "#333",
                            border: selected === k ? "none" : undefined,
                        }}
                    >
                        {k}
                    </span>
                ))}
            </div>
        </div>
    )
}
