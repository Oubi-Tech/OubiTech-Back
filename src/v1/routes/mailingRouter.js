import { Router } from 'express';
import mailingController from '../controllers/mailingController.js'


const mailingRouter = Router();

// /api/v1/mailing /send
mailingRouter.post('/send', mailingController.sendMail)

export default mailingRouter;