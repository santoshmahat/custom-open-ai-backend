import { AppDataSource } from "./data-source"
import * as express from 'express';
import * as fileUpload from 'express-fileupload'
import * as dotEnv from 'dotenv'

dotEnv.config()

const PORT = process.env.PORT

AppDataSource.initialize().then(async () => {
  const app = express()

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(fileUpload())


  app.get('/', (req: express.Request, res: express.Response) => {
    res.send('ok')
  })

  // mount the router on the app 
  app.use('/api', require('./route'));



  app.listen(PORT, () => {
    console.log(`App is running at port ${PORT}`)
  })

}).catch(error => console.log(error))
