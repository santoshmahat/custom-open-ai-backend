import * as express from 'express'
import editController from '../controller/edit.controller';

const router = express.Router()

router.post('/', editController.validate('createEdit'), editController.createEdit)


module.exports = router;

