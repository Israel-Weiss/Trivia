import { Router } from 'express'
import { getQuestById, updateQuest, insertQuest, } from './quest.controller'


export const questRoutes = Router()

questRoutes.get('/:id', getQuestById)
questRoutes.put('/:id', updateQuest)
questRoutes.post('/', insertQuest)
