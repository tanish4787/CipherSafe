import BreachModel from '../models/BreachModel.js'
import sendResponse from '../utils/sendResponse.js'
import checkEmailBreach from '../services/breachCheckService.js'


export const createBreachApp = async (req, res) => {
    try {
        const { appName, email } = req.body
        const userId = req.user.id
        if (!appName || !email) {
            return sendResponse(res, 400, false, null, 'appName and email are required')
        }


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


export const getAllBreaches = async (req, res) => {
    try {
        const userId = req.user.id;
        const breaches = await BreachModel.find({ userId });

        sendResponse(res, 200, true, breaches);
    } catch (error) {
        sendResponse(res, 500, false, null, error.message);
    }
}


export const updateBreach = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const updated = await BreachModel.findOneAndUpdate(
            { _id: id, userId },
            req.body,
            { new: true }
        );

        if (!updated) {
            return sendResponse(res, 404, false, null, 'Breach record not found');
        }

        sendResponse(res, 200, true, updated);
    } catch (error) {
        sendResponse(res, 500, false, null, error.message);
    }
}

export const deleteBreach = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const deleted = await BreachModel.findOneAndDelete({ _id: id, userId });

        if (!deleted) {
            return sendResponse(res, 404, false, null, 'Breach record not found');
        }

        sendResponse(res, 200, true, deleted);
    } catch (error) {
        sendResponse(res, 500, false, null, error.message);
    }
}
