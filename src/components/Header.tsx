interface HeaderProps {
    normalText?: string
    highlightedText?: string
}

export default function Header({ normalText, highlightedText }: HeaderProps) {
    return (
        <header className="header">
            <h1>
                {normalText} <br /> <span>{highlightedText}</span>
            </h1>
        </header>
    )
}
