import type { SummaryProps } from "../types/SummaryProps"
import { formatCurrency } from "../utils/formatCurrency"
import { formatPercentage } from "../utils/formatPercentage"

export default function Summary({ results }: SummaryProps) {
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
                        <p>{formatCurrency(results.operationalPatrimony)}</p>
                    </div>
                </article>
            </div>
        </section>
    )
}
