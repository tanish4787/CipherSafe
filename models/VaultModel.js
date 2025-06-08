import mongoose from 'mongoose'

const vaultSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },

        title: {
            type: String,
            required: true
        },
        encryptedData: {
            type: String,
            required: true
        },
        iv: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    })

const VaultModel = mongoose.model('VaultModel', vaultSchema)
export default VaultModel 