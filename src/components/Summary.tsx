import type { SummaryProps } from "../types/SummaryProps"
import { formatCurrency } from "../utils/formatCurrency"
import { formatPercentage } from "../utils/formatPercentage"

export default function Summary({ results, isIntermediary }: SummaryProps) {
    if (isIntermediary) {
        const intermediaryShare = results.lucroGrande * 0.25
        const lucroLiquidoRestante = results.lucroGrande - intermediaryShare
        const personalUse = lucroLiquidoRestante * 0.3
        const reserve = lucroLiquidoRestante * 0.1
        const reinvestment = lucroLiquidoRestante * 0.6
        const operationalPatrimony =
            results.capitalInvest + (lucroLiquidoRestante - personalUse)

        return (
            <section className="summary">
                <h1>Resumo da Operação</h1>

                <div className="summary__content">
                    <article>
                        <div>
                            <h2>Capital Investido</h2>
                            <p>{formatCurrency(results.capitalInvest)}</p>
                        </div>
                        <div>
                            <h2>Receita</h2>
                            <p>{formatCurrency(results.goldCost)}</p>
                        </div>
                    </article>

                    <article>
                        <div>
                            <h2>Lucro Bruto</h2>
                            <p>{formatCurrency(results.lucroGrande)}</p>
                        </div>
                        <div>
                            <h2>ROI</h2>
                            <p>{formatPercentage(results.roi)}</p>
                        </div>
                        <div>
                            <h2>Margem de lucro</h2>
                            <p>{formatPercentage(results.margemLucro)}</p>
                        </div>
                    </article>

                    <article>
                        <div>
                            <h2>Intermediário (25%)</h2>
                            <p>{formatCurrency(intermediaryShare)}</p>
                        </div>
                        <div>
                            <h2>Lucro líquido restante</h2>
                            <p>{formatCurrency(lucroLiquidoRestante)}</p>
                        </div>
                    </article>

                    <article>
                        <div>
                            <h2>Uso pessoal (30%)</h2>
                            <p>{formatCurrency(personalUse)}</p>
                        </div>
                        <div>
                            <h2>Reserva estratégica (10%)</h2>
                            <p>{formatCurrency(reserve)}</p>
                        </div>
                        <div>
                            <h2>Reinvestimento (60%)</h2>
                            <p>{formatCurrency(reinvestment)}</p>
                        </div>
                    </article>

                    <article>
                        <div>
                            <h2>Patrimônio operacional</h2>
                            <p>{formatCurrency(operationalPatrimony)}</p>
                        </div>
                    </article>
                </div>
            </section>
        )
    }

    const personalUseNonInter = results.personalUse
    const operationalPatrimonyNonInter =
        results.capitalInvest + (results.lucroGrande - personalUseNonInter)

    return (
        <section className="summary">
            <h1>Resumo da Operação</h1>

            <div className="summary__content">
                <article>
                    <div>
                        <h2>Capital Investido</h2>
                        <p>{formatCurrency(results.capitalInvest)}</p>
                    </div>
                    <div>
                        <h2>Receita</h2>
                        <p>{formatCurrency(results.goldCost)}</p>
                    </div>
                </article>

                <article>
                    <div>
                        <h2>Lucro Bruto</h2>
                        <p>{formatCurrency(results.lucroGrande)}</p>
                    </div>
                    <div>
                        <h2>ROI</h2>
                        <p>{formatPercentage(results.roi)}</p>
                    </div>
                    <div>
                        <h2>Margem de lucro</h2>
                        <p>{formatPercentage(results.margemLucro)}</p>
                    </div>
                </article>

                <article>
                    <div>
                        <h2>Uso pessoal (30%)</h2>
                        <p>{formatCurrency(results.personalUse)}</p>
                    </div>
                    <div>
                        <h2>Reserva estratégica (10%)</h2>
                        <p>{formatCurrency(results.reserve)}</p>
                    </div>
                    <div>
                        <h2>Reinvestimento (60%)</h2>
                        <p>{formatCurrency(results.reinvestment)}</p>
                    </div>
                </article>

                <article>
                    <div>
                        <h2>Patrimônio operacional</h2>
                        <p>{formatCurrency(operationalPatrimonyNonInter)}</p>
                    </div>
                </article>
            </div>
        </section>
    )
}
