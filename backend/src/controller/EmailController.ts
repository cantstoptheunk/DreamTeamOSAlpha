import dotenv from 'dotenv'
import { Router } from 'express';
const ENV_VARS = dotenv.config().parsed as any

const EmailRouter = Router();

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(ENV_VARS.SENDGRID_API_KEY)

const createOne = async (req: any, res: any, next: any) => {
    const msg = {
        to: ENV_VARS.EMAIL_ADDRESS,
        from: ENV_VARS.EMAIL_ADDRESS,
        subject: 'Stock Data DreamTeam',
        text: 'Testing email DreamTeam',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }

    sgMail
        .send(msg)
        .then((response: any) => {
            console.log(response[0].statusCode)
            console.log(response[0].headers)
        })
        .catch((error: any) => {
            console.error(error)
        })
}

EmailRouter.post('/', createOne)

export default EmailRouter
