
interface Answer {
    answer: string,
    votes: number
}

interface Quest {
    id: number,
    type: string,
    quest: string,
    answers: { array: Answer[] },
    correct: string | null
}

interface InsertReq {
    type: string,
    quest: string,
    answers: string[],
    correct: string | null
}

interface QuestRes {
    quest: string,
    ansList: string[]
}

interface VotesRes {
    answers: Answer[],
    isCorrect: boolean | null
}

interface IdRes {
    insertId: number
}

export { Answer, Quest, InsertReq, QuestRes, VotesRes, IdRes }
