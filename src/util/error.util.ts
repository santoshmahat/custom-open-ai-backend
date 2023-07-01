import * as express from 'express'
import { validationResult } from 'express-validator'


export const handleValidationError = (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return
    }
}