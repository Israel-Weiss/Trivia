import { ReactElement, useState } from "react";
import { SideBar } from './side-bar';
import { Link } from 'react-router-dom'


export function Header(): ReactElement {

    const [displayNav, setDisplayNav] = useState<boolean>(false)

    const toggleDisplay: () => void = () => {
        setDisplayNav(!displayNav)
    }

    return <header className="main-header">

        <div className="header-desktop">
            <nav className="navigate">
                <ul className="list">
                    <Link to={''} className="link"><li>Home</li></Link>
                    <Link to={'vote'} className="link"><li>Vote</li></Link>
                    <Link to={'create'} className="link"><li>Create</li></Link>
                </ul>
            </nav>
        </div>

        <div className="header-mobile">
            <h2 className="config">Configuration</h2>
            <button className="menu-btn" onClick={toggleDisplay}>
                <span _ngcontent-lvn-c33="">
                    <svg width="30" height="21" viewBox="0 0 30 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.25 2H28.75C29.4404 2 30 1.55228 30 1C30 0.447715 29.4404 0 28.75 0H1.25C0.559644 0 0 0.447715 0 1C0 1.55228 0.559644 2 1.25 2Z" fill="#233333"></path>
                        <path d="M28.75 10H1.25C0.559644 10 0 10.4477 0 11C0 11.5523 0.559644 12 1.25 12H28.75C29.4404 12 30 11.5523 30 11C30 10.4477 29.4404 10 28.75 10Z" fill="#233333"></path>
                        <path d="M28.75 19H1.25C0.559644 19 0 19.4477 0 20C0 20.5523 0.559644 21 1.25 21H28.75C29.4404 21 30 20.5523 30 20C30 19.4477 29.4404 19 28.75 19Z" fill="#233333"></path>
                    </svg>
                </span>
            </button>

            {displayNav && <button className="close-btn" onClick={toggleDisplay}>X</button>}
            {displayNav && <SideBar display={toggleDisplay} />}
        </div>



    </header >
}