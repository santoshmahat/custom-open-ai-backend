import * as express from 'express'
import { body, check } from 'express-validator'
import OpenAIService from '../service/openai/openai.service'
import { handleValidationError } from '../util/error.util'
import * as fs from 'fs'

const openAIService = new OpenAIService()

const validate = (method: string) => {
  switch (method) {
    case 'createImage': {
      return [
        body('prompt', 'Prompt is required.').notEmpty()
      ]
    }
    case 'createImageVariation': {
      return check('image')
        .custom((value, { req }) => {
          console.log('createImageVariation file 2', req.files)

          if (!req.files || !Object.keys(req.files).length) {
            return false; // return "non-falsy" value to indicate valid data"
          }
          return req.files
        }).withMessage('Image is required.')
    }
  }
}

export default {
  createImage: async (req: express.Request, res: express.Response) => {
    try {
      handleValidationError(req, res)

      const { prompt, count = 1, size = '1024x1024' } = req.body
      const response = await openAIService.openAI.createImage({
        prompt,
        n: count,
        size,
        response_format: 'url',
      })
      res.status(200).json({ data: response.data })
    } catch (error) {
      throw error
    }
  },

  createImageVariation: async (req: express.Request, res: express.Response) => {
    try {
      handleValidationError(req, res)

      const { count = 1, size = '1024x1024' } = req.body
      const { image } = req.files as any

      console.log('image', image.name, image)

      console.log('__dirname', __dirname, `${__dirname}/dog.png`)

      const images = fs.createReadStream(`${__dirname}/dog.png`)

      const response = await openAIService.openAI.createImageVariation(fs.createReadStream(`${__dirname}/dog.png`), count, size, 'url')

      res.status(200).json({ data: response.data })
    } catch (error) {
      console.log('error3232jsda kas', error)
      throw error.response
    }
  },

  validate
}