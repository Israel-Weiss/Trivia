import { ReactElement, useState, useEffect, useRef } from "react"
import { CreateSuc } from "../cmps/create-suc"
import { addQuest } from "../services/quest.service"

export function Create(): ReactElement {

    const [formFields, setFormFields] = useState({
        type: 'poll',
        quest: '',
        answers1: '',
        answers2: '',
        answers3: '',
        correct: ''
    })

    const [stepNum, setStepNum] = useState(0)
    const [wait, setWait] = useState(false)


    useEffect(() => {
        if ((!formFields.quest || !formFields.answers1
            || !formFields.answers2 || !formFields.answers3)) {
            if (stepNum === 0 || stepNum === 3) return
            setStepNum(0)
        }
        else if (formFields.type === 'trivia' && !formFields.correct) setStepNum(1)
        else if (formFields.quest && formFields.answers1 && formFields.answers2 && formFields.answers3) setStepNum(2)
    }, [formFields])

    const insertId = useRef('')

    const handleChange = async (ev: React.FormEvent<HTMLInputElement | HTMLSelectElement>): Promise<void> => {
        ev.preventDefault()
        const field: string = ev.currentTarget.name
        setFormFields({ ...formFields, [field]: ev.currentTarget.value })
    }

    const onAddQuest = async (ev: React.FormEvent<HTMLFormElement>): Promise<void> => {
        ev.preventDefault()
        setWait(true)
        const aswers = [formFields.answers1, formFields.answers2, formFields.answers3]
        insertId.current = await addQuest(formFields.type, formFields.quest, aswers, formFields.correct)
        setFormFields({
            type: '',
            quest: '',
            answers1: '',
            answers2: '',
            answers3: '',
            correct: ''
        })
        setStepNum(3)
        setWait(false)
    }

    const finish = (() => {
        insertId.current = ''
        setStepNum(0)
    })

    return <div className="main-continer create">
        <h1 className="title">Create Quest</h1>

        {wait && <h3>Please wait while we load data..</h3>}

        <div className="create-continer">
            <form onSubmit={onAddQuest}>
                <p>Please set the question type and write a question and three answers.
                    in a 'Trivia' type question choose the correct answer</p>
                <div className="lable">
                    <label htmlFor="">Type: </label>
                    <select className='select' id="type" name='type' onChange={handleChange} value={formFields.type} >
                        <option value='poll'>Poll</option>
                        <option value='trivia'>Trivia</option>
                    </select>
                </div>

                <div className="lable">
                    <label htmlFor="">Quest: </label>
                    <input className='input' id="quest" type='text' name='quest' onChange={handleChange} value={formFields.quest} />
                </div>

                <div className="lable">
                    <label htmlFor="">Answers 1: </label>
                    <input className='input' id="answers1" type='text' name='answers1' onChange={handleChange} value={formFields.answers1} />
                </div>

                <div className="lable">
                    <label htmlFor="">Answers 2: </label>
                    <input className='input' id="answers2" type='text' name='answers2' onChange={handleChange} value={formFields.answers2} />
                </div>

                <div className="lable">
                    <label htmlFor="">Answers 3: </label>
                    <input className='input' id="answers3" type='text' name='answers3' onChange={handleChange} value={formFields.answers3} />
                </div>

                {(stepNum >= 1 && formFields.type === 'trivia') && <div className="lable">
                    <label htmlFor="">Correct: </label>
                    <select className='select correct' id="correct" name='correct' onChange={handleChange} value={formFields.correct} >
                        <option value=''>Please select the correct answer</option>
                        <option value={formFields.answers1}>{formFields.answers1}</option>
                        <option value={formFields.answers2}>{formFields.answers2}</option>
                        <option value={formFields.answers3}>{formFields.answers3}</option>
                    </select>
                </div>}

                {(stepNum === 2 && (formFields.correct || formFields.type === 'poll') && !wait) &&
                    <div className="lable">
                        <button className='apply'>Apply</button>
                    </div>}
            </form>
        </div>

        {stepNum === 3 && < CreateSuc insertId={insertId.current} finish={finish} />}

    </div>
}