import { ReactElement } from "react";

interface Props {
    insertId: string,
    finish: () => void
}

export function CreateSuc({ insertId, finish }: Props): ReactElement {
    return <div className="create-suc">
        <h2>Quest created successfully!</h2>
        <h2>New quest id is: {insertId}</h2>
        <button className="btn" onClick={finish}>OK</button>
    </div>
} 