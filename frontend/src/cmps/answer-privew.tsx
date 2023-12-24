import { ReactElement } from "react";

interface Props {
    answer: string,
    vote: (answer: string) => void
}

export function AnswerPrivew({ answer, vote }: Props): ReactElement {
    return <div className="answer-privew">
        <p className="txt">{answer}</p>
        <button className="btn" onClick={() => vote(answer)}>Vote</button>
    </div>
} 