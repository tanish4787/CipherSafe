import BreachModel from '../models/BreachModel.js'
import sendResponse from '../utils/sendResponse.js'
import checkEmailBreach from '../services/breachService.js'


export const createBreachApp = async (req, res) => {
    try {
        const { appName, email } = req.body
        const userId = req.user.id

        const breachResult = await checkEmailBreach(email)

        const newBreach = new BreachModel({
            userId,
            appName,
            email,
            details: breachResult?.details || [],
            status: breachResult?.breached ? 'breached' : 'safe',
        })

        const saved = await newBreach.save()
        sendResponse(res, 201, true, saved)


    } catch (error) {
        sendResponse(res, 500, false, null, error.message)
    }
}