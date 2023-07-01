import * as express from 'express'
import imageController from '../controller/image.controller';


const router = express.Router()

router.post('/generations', imageController.validate('createImage'), imageController.createImage)

router.post('/variations', imageController.validate('createImageVariation'), imageController.createImageVariation)


module.exports = router;
