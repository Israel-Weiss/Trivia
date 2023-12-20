import { httpService } from "./http.service"

export {
    getQuest,
    addQuest,
    updateQuest
}


async function getQuest(questId: string): Promise<any> {
    return await httpService.get(`quest/${questId}`)
}

async function addQuest(type: string, quest: string, answers: any, correct: any): Promise<any> {
    const body = {
        type,
        quest,
        answers,
        correct
    }
    console.log('addQuest ', body);
    
    return await httpService.post(`quest`, body)
}

async function updateQuest(questId: any, answer: string): Promise<any> {
    const body = {
        questId,
        answer
    }
    return await httpService.put(`quest/${questId}`, body)
}
