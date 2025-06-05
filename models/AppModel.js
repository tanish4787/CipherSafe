import mongoose from 'mongoose'

const appSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },

    appName: {
        type: String,
        required: true,
    },

    sharedData: {
        email: {
            type: Boolean,
            default: false
        },
        phone: {
            type: Boolean,
            default: false
        },
        location: {
            type: Boolean,
            default: false
        }
    }

}, { timestamps: true })

const AppModel = mongoose.model('AppModel', appSchema)
export default AppModel