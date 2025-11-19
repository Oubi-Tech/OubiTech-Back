import mailingService from '../services/mailingService.js'


async function sendMail(req, res, next) {
    try {
        const result = await mailingService.sendMail(req.body);

        return res.status(200).json({
            ...result,
            statusCode: 200
        });
    } catch(error) {
        // Pass the error to the global error handler
        next(error);
    }
}

export default {
    sendMail
};