import { query } from '../../services/sql.service'

async function getById(questId: string): Promise<any> {
    try {
        const quest = await query(`SELECT * FROM questions WHERE id = ${questId}`)
        return quest
    } catch (err) {
        throw err
    }
}

async function updateVotes(questId: any, answer: string): Promise<any> {
    try {
        await query(`UPDATE questions SET votes = votes + 1 WHERE id = ${questId}`)
        const newQuest = await getById(questId)
        return newQuest
    } catch (err) {
        throw err
    }
}

async function insert(type: string, quest: string, answers: [], correct: any): Promise<any> {
    try {
        const result: any = await query(`INSERT INTO questions(type, quest, answers, correct) VALUES (type, quest, answers, correct)`)
        console.log('result ', result.insertId);
        
        return result.insertId
    } catch (err) {
        throw err
    }
}



export {
    getById,
    updateVotes,
    insert
}






