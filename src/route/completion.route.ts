import * as express from 'express'
import completionController from '../controller/completion.controller'

const router = express.Router()

router.post('/', completionController.validate('createCompletion'), completionController.createCompletion)


module.exports = router;
