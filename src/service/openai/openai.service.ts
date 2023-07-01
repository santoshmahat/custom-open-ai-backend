import { Configuration, OpenAIApi } from 'openai'
import { mainConfigs } from '../../config/config'

export default class OpenAIService {
   openAI: OpenAIApi

  constructor() {
    this.configureOpenAi()
  }

   private configureOpenAi() {
    const configuration = new Configuration({
      apiKey: mainConfigs.openAISecretKey
    })

    this.openAI = new OpenAIApi(configuration)
  }
}