import * as express from 'express'
import { body, validationResult } from 'express-validator'
import OpenAIService from '../service/openai/openai.service'
import { handleValidationError } from '../util/error.util'

const openAIService = new OpenAIService()

const MODEL = 'text-davinci-003'


const validate = (method: string) => {
  switch (method) {
    case 'createCompletion': {
      return [
        body('prompt', 'Prompt is a required.').notEmpty()
      ]
    }
  }
}

export default {
  createCompletion: async (req: express.Request, res: express.Response) => {
    try {
      handleValidationError(req, res)

      const { prompt } = req.body

      const response = await openAIService.openAI.createCompletion({
        model: MODEL,
        prompt: prompt,
        max_tokens: 2000
      })

      res.status(200).json({ data: response.data })
    } catch (error) {
      throw error
    }
  },
  
  validate
}