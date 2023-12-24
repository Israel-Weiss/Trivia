import { Request, Response } from 'express'
import { QuestResById, updateVotes, insert } from './quest.service'
import { Answer, QuestRes, InsertReq, VotesRes, IdRes } from '../../types/interfaces'


async function getQuestById(req: Request, res: Response<QuestRes | unknown>) {
    try {
        const questId: string = req.params.id
        const quest: QuestRes = await QuestResById(questId)
        res.send(quest)
    } catch (err) {
        res.status(500).send({ err: 'Failed to find question' })
    }
}

async function updateQuest(req: Request, res: Response<VotesRes | unknown>) {
    try {
        const questId: string = req.params.id
        const answer: string = req.body.answer
        const answers: VotesRes = await updateVotes(questId, answer)
        res.send(answers)
    } catch (err) {
        res.status(500).send({ err: 'Failed to update quest' })
    }
}

async function insertQuest(req: Request, res: Response<IdRes | unknown>) {
    try {
        const { type, quest, answers, correct }: InsertReq = req.body
        const insertId: IdRes = await insert(type, quest, answers, correct)
        res.send(insertId)
    } catch (err) {
        res.status(500).send({ err: 'Failed to add quest' })
    }
}

export {
    getQuestById,
    updateQuest,
    insertQuest
}
