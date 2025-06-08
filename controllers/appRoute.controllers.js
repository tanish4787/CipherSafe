import AppModel from '../models/AppModel.js'
import { calculateRiskScore } from '../services/riskScoreServices.js'
import sendResponse from '../utils/sendResponse.js'


export const createApp = async (req, res) => {
    try {
        const { appName, sharedData } = req.body;

        if (!appName || !sharedData) {
            return sendResponse(res, 400, false, null, "App Name or Shared Data fields required.");
        }

        const { score, level } = calculateRiskScore({
            sharedData,
            breached: false,
        })

        const newApp = new AppModel({
            userId: req.user.id,
            appName,
            sharedData,
            riskScore: score,
            riskLevel: level,
        })

        const saveApp = await newApp.save()
        sendResponse(res, 201, true, saveApp)

    } catch (error) {
        sendResponse(res, 400, false, null, error.message)
    }
}

export const getAllApps = async (req, res) => {
    try {
        const apps = await AppModel.find({ userId: req.user.id })
        sendResponse(res, 201, true, apps)
    }
    catch (error) {
        sendResponse(res, 400, false, null, error.message)

    }
}


export const updateApp = async (req, res) => {
    try {
        const { id } = req.params;
        const { appName, sharedData } = req.body;

        if (!id) return sendResponse(res, 400, false, null, 'App ID is required in params');

        const app = await AppModel.findOne({ _id: id, userId: req.user.id });

        if (!app) {
            return sendResponse(res, 404, false, null, 'App not found');
        }

        if (appName) app.appName = appName;

        if (sharedData) {
            app.sharedData = sharedData;

            const { score, level } = calculateRiskScore({
                sharedData,
                breached: app.breachStatus === 'breached',
            });

            app.riskScore = score;
            app.riskLevel = level;
        }

        const updatedApp = await app.save();
        sendResponse(res, 200, true, updatedApp);

    } catch (error) {
        sendResponse(res, 400, false, null, error.message);
    }
}


export const deleteApp = async (req, res) => {

    try {
        const { id } = req.params
        if (!id) return sendResponse(res, 400, false, null, "App ID req in params.")


        const deletedApp = await AppModel.findOneAndDelete({
            _id: id,
            userId: req.user.id
        })
        if (!deletedApp) {
            return sendResponse(res, 400, false, null, "App Name or Shared Data fields required.")

        }
        sendResponse(res, 201, true, deletedApp)



    } catch (error) {
        sendResponse(res, 400, false, null, error.message)

    }
}
