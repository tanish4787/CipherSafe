import mongoose from "mongoose";

const breachSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
        },
        appName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true

        },
        breachFound: {
            type: Boolean,
            default: false
        },
        details: {
            type: [String],
            default: []
        },
        lastChecked: {
            type: Date,
            default: Date.now()
        },
    }, { timestamps: true }

)



const BreachModel = mongoose.model('BreachModel', breachSchema)
export default BreachModel