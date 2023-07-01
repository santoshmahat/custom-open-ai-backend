import * as express from 'express'
import { body } from 'express-validator'
import OpenAIService from '../service/openai/openai.service'
import { handleValidationError } from '../util/error.util'

const openAIService = new OpenAIService()

const MODEL = 'text-davinci-edit-001'

const validate = (method: string) => {
    switch (method) {
      case 'createEdit': {
        return [
          body('input', 'Input is a required.').notEmpty(),
          body('instruction', 'Instruction is a required.').notEmpty(),
        ]
      }
    }
  }

export default {
    createEdit: async (req: express.Request, res: express.Response) => {
        try {
            handleValidationError(req, res)

            const { input, instruction } = req.body
            const response = await openAIService.openAI.createEdit({
                model: MODEL,
                input,
                instruction
            })
            res.status(200).json({ data: response.data })
        } catch (error) {
            throw error
        }
    },

    validate
}