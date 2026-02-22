export default function Footer() {
    const now = new Date()
    const year = now.getFullYear()
    
    return <p className="footer">© {year}, Goldera</p>
}
