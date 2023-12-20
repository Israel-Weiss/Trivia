import { ReactElement, useState } from "react"
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


    const handleChange = (ev: React.FormEvent<HTMLInputElement | HTMLSelectElement>): void => {
        ev.preventDefault()
        const field: string = ev.currentTarget.name
        setFormFields({ ...formFields, [field]: ev.currentTarget.value })
    }

    const onAddQuest = async (ev: React.FormEvent<HTMLFormElement>): Promise<void> => {
        ev.preventDefault()

        if (!formFields.type) alert('Please set a type!')
        else if (!formFields.quest) alert('Please set a quest!')
        else if (!formFields.answers1) alert('Please set a answers 1!')
        else if (!formFields.answers2) alert('Please set a answers 2!')
        else if (!formFields.answers3) alert('Please set a answers 3!')
        else if (!formFields.correct && formFields.type === 'trivia') alert('Please set a correct answers!')

        else {
            const aswers = [formFields.answers1, formFields.answers2, formFields.answers3]
            await addQuest(formFields.type, formFields.quest, aswers, formFields.correct)
            setFormFields({
                type: '',
                quest: '',
                answers1: '',
                answers2: '',
                answers3: '',
                correct: ''
            })
        }
    }

    return <div className="main-create">
        <h1 className="title">Vote Page</h1>

        <div className="create-continer">
            <form onSubmit={onAddQuest}>
                <div className="lable">
                    <label htmlFor=""> &nbsp; &nbsp; &nbsp; &nbsp;Type: </label>
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
                    <label htmlFor=""> &nbsp; Answers 1: </label>
                    <input className='input' id="answers1" type='text' name='answers1' onChange={handleChange} value={formFields.answers1} />
                </div>

                <div className="lable">
                    <label htmlFor=""> &nbsp; Answers 2: </label>
                    <input className='input' id="answers2" type='text' name='answers2' onChange={handleChange} value={formFields.answers2} />
                </div>

                <div className="lable">
                    <label htmlFor=""> &nbsp; Answers 3: </label>
                    <input className='input' id="answers3" type='text' name='answers3' onChange={handleChange} value={formFields.answers3} />
                </div>

                <div className="lable">
                    <label htmlFor=""> &nbsp; Correct: </label>
                    <input className='input' id="correct" type='text' name='correct' onChange={handleChange} value={formFields.correct} />
                </div>

                <div className="lable">
                    <button className='apply'>Apply</button>
                </div>
            </form>
        </div>

    </div>
}