export interface Answer {
    answer: string,
    votes: number
}

export interface idResData {
    insertId: string
}

export interface QuestResData {
    quest: string,
    ansList: string[]
}

export interface VotesResData {
    answers: Answer[],
    isCorrect: boolean | null
}
