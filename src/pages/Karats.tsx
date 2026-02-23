import Footer from "../components/Footer"
import Header from "../components/Header"
import KaratsTable from "../components/KaratsTable"
import Navbar from "../components/Navbar"

export default function Karats() {
    return (
        <>
            <Navbar />
            <Header
                normalText="Reconheça o quilate."
                highlightedText="Domine a negociação."
            />
            <KaratsTable />
            <Footer />
        </>
    )
}
