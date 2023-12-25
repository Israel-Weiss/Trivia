import { ReactElement, useRef, useState, useEffect } from "react"
import { AnswerPrivew } from "../cmps/answer-privew"
import { VotesPrivew } from "../cmps/votes-privew"
import { getQuest, updateQuest } from "../services/quest.service"
import { QuestResData, VotesResData, Answer } from "../types/interfaces"

export function Vote(): ReactElement {

    const [quest, setQuest] = useState<QuestResData>({
        quest: '',
        ansList: []
    })

    const [comment, setComment] = useState<VotesResData>({
        answers: [],
        isCorrect: null
    })

    const [wait, setWait] = useState(false)

    const currentId = useRef('')

    useEffect(() => {
        focusInput()
    })

    const inputElement = useRef<HTMLInputElement>(null)
    const focusInput = () => {
        if (inputElement.current) inputElement.current.focus()
    }


    const handleChange = (ev: React.FormEvent<HTMLInputElement>): void => {
        ev.preventDefault()
        currentId.current = ev.currentTarget.value
    }

    const onGetQuest = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        setWait(true)
        const quest: QuestResData = await getQuest(currentId.current)
        console.log('onGetQuest', currentId.current);
        setQuest(quest)
        setWait(false)
    }

    const vote = async (answer: string) => {
        setWait(true)
        const voteRes: VotesResData = await updateQuest(currentId.current, answer)
        setComment(voteRes)
        setQuest({
            quest: '',
            ansList: []
        })
        setWait(false)
    }

    const finish = () => {
        currentId.current = ''
        setComment({
            answers: [],
            isCorrect: null
        })
    }

    return <div className="main-continer vote">
        <h1 className="title">Vote Page</h1>

        {wait && <h3>Please wait while we load data..</h3>}

        {(!currentId.current && !wait) && <div className="reqQuest">
            <h2>Please enter quest id</h2>
            <form onSubmit={onGetQuest}>
                <div className="lable">
                    <label htmlFor="">Quest id: </label>
                    <input className='input' id="quest" type='text' name='quest' onChange={handleChange} ref={inputElement} />
                </div>
                <button className='apply'>Apply</button>
            </form>
        </div>}

        {(quest.quest && !wait) && <div>
            <h2>{quest.quest}</h2>
            {quest.ansList.map((answer: string) => < AnswerPrivew answer={answer} vote={vote} key={answer} />)}
        </div>}

        {comment.answers[0] && <div className="results">
            <h2>Votes for each answer</h2>
            {comment.answers.map((answer: Answer) => < VotesPrivew answerObj={answer} key={answer.answer} />)}
            {comment.isCorrect && <h2 className="correct">The answer is correct !!</h2>}
            {comment.isCorrect === false && <h2 className="incorrect">The answer is not correct</h2>}
            <button className="btn" onClick={finish}>Finish</button>
        </div>}
    </div>
}

