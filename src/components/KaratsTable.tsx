import { goldData } from "../data/katats";

export default function KaratsTable() {
    return (
        <div className="gold-table-container">
            <table className="gold-table">
                <thead>
                    <tr>
                        <th>Quilate</th>
                        <th>% de Ouro</th>
                        <th>Cor típica</th>
                        <th>Observações</th>
                        <th>Cor Visual</th>
                    </tr>
                </thead>
                <tbody>
                    {goldData.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <strong>{item.quilate}K</strong>
                            </td>
                            <td>{item.pureza}</td>
                            <td>{item.corTexto}</td>
                            <td>{item.observacao}</td>
                            <td>
                                <div
                                    className="color-box"
                                    style={{ backgroundColor: item.corHex }}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
