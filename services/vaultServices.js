import VaultModel from '../models/VaultModel.js'
import { encryptData, decryptData } from '../utils/vaultUtility.js'

export const createVaultItem = async (userId, title, content) => {
    const { encryptedData, iv } = encryptData(content)

    const newItem = await VaultModel.create({
        userId,
        title,
        encryptedData,
        iv,
    })
    return {
        _id: newItem._id,
        title: newItem.title,
        createdAt: newItem.createdAt,
    }
}

export const getVaultItem = async (userId) => {
    const items = await VaultModel.find({ userId })

    return items.map((item) => ({
        _id: item._id,
        title: item.title,
        content: decryptData(item.encryptedData, item.iv),
        createdAt: item.createdAt
    }))
}

export const updateVaultItem = async (userId, vaultId, newContent) => {
    const item = await VaultModel.findOne({ _id: vaultId, userId })
    if (!item) return null

    const { encryptedData, iv } = encryptData(newContent)

    item.encryptedData = encryptedData
    item.iv = iv
    await item.save()

    return {
        _id: item._id,
        title: item.title,
        updatedAt: item.updatedAt
    }
}

export const deleteVaultItem = async (userId, vaultId) => {
    const result = await VaultModel.findOneAndDelete({ _id: vaultId, userId })
    return result ? true : false
}