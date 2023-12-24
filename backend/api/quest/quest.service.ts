import { query } from '../../services/sql.service'
import { ResultSetHeader } from 'mysql2'
import { Answer, Quest, QuestRes, VotesRes } from '../../types/interfaces'


async function getById(questId: string): Promise<Quest> {
    try {
        const quests: Quest[] = await query(`SELECT * FROM questions WHERE id = ${questId}`) as Quest[]
        return quests[0]
    } catch (err) {
        throw err
    }
}

async function QuestResById(questId: string): Promise<QuestRes> {
    try {
        const quest: Quest = await getById(questId)
        const ansList: string[] = quest.answers.array.map((a) => a.answer)
        const poser: string = quest.quest
        return { quest: poser, ansList }
    } catch (err) {
        throw err
    }
}

async function updateVotes(questId: string, answer: string): Promise<VotesRes> {
    try {
        const quest: Quest = await getById(questId)
        const answers: Answer[] = quest.answers.array
        answers.forEach((a, i) => {
            if (a.answer === answer) answers[i].votes += 1
        })
        const jsonAns: string = JSON.stringify(answers)
        await query(`UPDATE questions SET answers = '{"array": ${jsonAns}}' WHERE id = ${questId}`)

        const updateQuest: Quest = await getById(questId)
        let isCorrect = null
        if (quest.type === 'trivia') isCorrect = answer === quest.correct ? true : false
        return { answers: updateQuest.answers.array, isCorrect }
    } catch (err) {
        throw err
    }
}

async function insert(type: string, quest: string, answers: string[], correct: string | null): Promise<{ insertId: number }> {
    try {
        const ansObjects: Answer[] = answers.map((ans) => ({ answer: ans, votes: 0 }))
        const jsonAns: string = JSON.stringify(ansObjects)
        const result: ResultSetHeader = await query(`INSERT INTO questions(type, quest, answers, correct) VALUES ('${type}', '${quest}', '{"array": ${jsonAns}}', '${correct}')`) as ResultSetHeader
        return { insertId: result.insertId }
    } catch (err) {
        throw err
    }
}

export {
    QuestResById,
    updateVotes,
    insert
}










