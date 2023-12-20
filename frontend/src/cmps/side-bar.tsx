import { ReactElement } from "react"
import { Link } from 'react-router-dom'

interface Props { display: () => void }

export function SideBar({ display }: Props): ReactElement {

    return <div className="side-bar-continer">
        <Link to={''}><div onClick={display}>Home</div></Link>
        <Link to={'vote'}><div onClick={display}>Vote</div></Link>
        <Link to={'create'}><div onClick={display}>Create</div></Link>
    </div>
}

