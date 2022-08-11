import { Logo } from '../logo'
import { ReactNode } from "react"
import { Footer } from "../footer"
import { NavBar } from "../navBar"


type Props = {
    children: ReactNode
}

export const Theme = ({ children }: Props) => {
    return (
        <div>
            <Logo />
            <NavBar />
            <div className="container">
                {children}
            </div>
            <Footer />
        </div>
    )
}