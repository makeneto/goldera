import { BookSearch, Calculator } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

export default function Navbar() {
    const location = useLocation()
    const isHome = location.pathname === "/"

    return (
        <nav>
            <NavLink to="/">
                <img src="/goldera-logo.webp" alt="Goldera Logo" />
            </NavLink>

            {isHome ? (
                <NavLink to="/karats">
                    <span>
                        <BookSearch />
                    </span>
                </NavLink>
            ) : (
                <NavLink to="/">
                    <span>
                        <Calculator />
                    </span>
                </NavLink>
            )}
        </nav>
    )
}
