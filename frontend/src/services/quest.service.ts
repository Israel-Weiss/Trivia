import { httpService } from "./http.service"
import { idResData, QuestResData, VotesResData } from "../types/interfaces"


export {
    getQuest,
    addQuest,
    updateQuest
}

async function getQuest(questId: string): Promise<QuestResData> {
    return await httpService.get(`quest/${questId}`)
}

async function addQuest(type: string, quest: string, answers: any, correct: any): Promise<string> {
    const body = {
        type,
        quest,
        answers,
        correct
    }
    const resData: idResData = await httpService.post(`quest`, body)
    return resData.insertId
}

async function updateQuest(questId: string, answer: string): Promise<VotesResData> {
    const body = {
        questId,
        answer
    }
    return await httpService.put(`quest/${questId}`, body)
}
