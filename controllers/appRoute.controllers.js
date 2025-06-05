import { AppModel } from '../models/AppModel.js'
import sendResponse from '../utils/sendResponse.js'


export const createApp = async (req, res) => {
    try {
        const { appName, sharedData } = req.body

        if (!appName || !sharedData) {
            return handleError(res, "App Name or Shared Data fields required.")
        }

        const newApp = new AppModel({
            userId: req.user.id,
            appName,
            sharedData: sharedData || {}
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
        const { id } = req.params
        if (!id) return sendResponse(res, 400, false, null, 'App ID is req in params')


        const updatedApp = await AppModel.findOneAndUpdate(
            {
                _id: id,
                userId: req.user.id
            },
            req.body,
            { new: true }
        )

        if (!updatedApp) {
            return sendResponse(res, 400, false, null, "App not Found.")
        }

        sendResponse(res, 201, true, updatedApp)

    } catch (error) {
        sendResponse(res, 400, false, null, error.message)

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
