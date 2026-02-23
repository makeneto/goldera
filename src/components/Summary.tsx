interface SummaryProps {
    results: {
        capitalInvest: number
        goldCost: number
        lucroGrande: number
        roi: number
        margemLucro: number
        marcos: number
        reinvestment: number
    }
}

export default function Summary({ results }: SummaryProps) {
    const formatCurrency = (value: number): string => {
        return value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "AOA",
        })
    }

    const formatPercentage = (value: number): string => {
        return value.toFixed(2) + "%"
    }

    return (
        <section className="summary">
            <h1>Resumo da Operação</h1>

            <div className="summary__content">
                <article>
                    <div>
                        <h2>Capital Invest.</h2>
                        <p>{formatCurrency(results.capitalInvest)}</p>
                    </div>
                    <div>
                        <h2>Receita</h2>
                        <p>{formatCurrency(results.goldCost)}</p>
                    </div>
                    <div>
                        <h2>Lucro Bruto</h2>
                        <p>{formatCurrency(results.lucroGrande)}</p>
                    </div>
                    <div>
                        <h2>ROI</h2>
                        <p>{formatPercentage(results.roi)}</p>
                    </div>
                    <div>
                        <h2>Margem de Lucro</h2>
                        <p>{formatPercentage(results.margemLucro)}</p>
                    </div>
                </article>

                <article>
                    <div>
                        <h2>Marcos (30%)</h2>
                        <p>{formatCurrency(results.marcos)}</p>
                    </div>
                    <div>
                        <h2>Reinvestimento (70%)</h2>
                        <p>{formatCurrency(results.reinvestment)}</p>
                    </div>
                </article>
            </div>
        </section>
    )
}
