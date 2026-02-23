import Footer from "../components/Footer"
import Form from "../components/Form"
import Header from "../components/Header"
import Navbar from "../components/Navbar"

export default function Home() {
    return (
        <>
            <Navbar />
            <Header
                normalText="Precisão na avaliação."
                highlightedText="Clareza no lucro."
            />
            <Form />
            <Footer />
        </>
    )
}
