import { ReactElement } from "react";
import { Answer } from "../types/interfaces";

interface Props { answerObj: Answer }

export function VotesPrivew({ answerObj }: Props): ReactElement {
    return <div className="votes-privew">
        <p className="txt">{answerObj.answer}: </p>
        <div className="votes-num">{answerObj.votes}</div>
    </div>
} 