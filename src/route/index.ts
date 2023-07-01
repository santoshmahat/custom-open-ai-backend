import * as express from 'express'

const router = express.Router(); 

// mount our router onto the API router
router.use('/completions', require('./completion.route'));
router.use('/edits', require('./edit.route'));
router.use('/images', require('./image.route'));

module.exports = router;
