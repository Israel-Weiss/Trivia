import { ReactElement } from "react"
import { Link } from 'react-router-dom'

interface Props { display: () => void }

export function SideBar({ display }: Props): ReactElement {

    return <div className="side-bar-continer">
        <Link to={''}><li onClick={display}>Home</li></Link>
        <Link to={'vote'}><li onClick={display}>Vote</li></Link>
        <Link to={'create'}><li onClick={display}>Create</li></Link>
    </div>
}

