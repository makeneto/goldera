import { lazy, Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoadingPage from "./components/LoadingPage"

const Home = lazy(() => import("./pages/Home"))
const Karats = lazy(() => import("./pages/Karats"))

export default function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<LoadingPage />}>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/karats" element={<Karats />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}
