import { Request, Response } from 'express'
import { getById, updateVotes, insert } from './quest.service'

async function getQuestById(req: Request, res: Response) {
    try {
        const questId = req.params.id
        const quest = await getById(questId)
        res.send(quest)
    } catch (err) {
        res.status(500).send({ err: 'Failed to find question' })
    }
}

async function updateQuest(req: Request, res: Response) {
    try {
        const questId = req.params.id
        const { answer } = req.body
        const newQuest = await updateVotes(questId, answer)
        res.send(newQuest)
    } catch (err) {
        res.status(500).send({ err: 'Failed to update quest' })
    }
}

async function insertQuest(req: Request, res: Response) {
    console.log('insertQuest');
    
    try {
        const { type, quest, answers, correct } = req.body
        const newId = await insert(type, quest, answers, correct)
        console.log('insertQuest: id', newId);
        
        res.send(newId)
    } catch (err) {
        console.log('catch');
        
        res.status(500).send({ err: 'Failed to add quest' })
    }
}

export {
    getQuestById,
    updateQuest,
    insertQuest
}
