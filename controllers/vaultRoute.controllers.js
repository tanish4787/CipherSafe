import { getVaultItem, createVaultItem, updateVaultItem, deleteVaultItem } from '../services/vaultServices.js'
import sendResponse from '../utils/sendResponse.js'

export const createVaultItemController = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.userId;

        if (!title || !content) {
            return sendResponse(res, 400, false, null, 'Title and content are required.')
        }

        const vaultItem = await createVaultItem(userId, title, content);
        return sendResponse(res, 201, true, vaultItem);
    } catch (error) {
        console.error('Vault Create Error:', error);
        return sendResponse(res, 500, false, null, 'Something went wrong while creating vault item.')
    }
}

export const getVaultItemsController = async (req, res) => {
    try {
        const userId = req.userId;
        const items = await getVaultItem(userId)
        return sendResponse(res, 200, true, items)
    } catch (error) {
        console.error('Vault Fetch Error:', error)
        return sendResponse(res, 500, false, null, 'Failed to fetch vault items.');
    }
}

export const updateVaultItemController = async (req, res) => {
    try {
        const { id } = req.params
        const { content } = req.body
        const userId = req.userId

        if (!content) {
            return sendResponse(res, 400, false, null, 'Updated content is required.')
        }

        const updatedItem = await updateVaultItem(userId, id, content)
        if (!updatedItem) {
            return sendResponse(res, 404, false, null, 'Vault item not found.')
        }

        return sendResponse(res, 200, true, updatedItem)
    } catch (error) {
        console.error('Vault Update Error:', error)
        return sendResponse(res, 500, false, null, 'Failed to update vault item.')
    }
}

export const deleteVaultItemController = async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.userId

        const deleted = await deleteVaultItem(userId, id)
        if (!deleted) {
            return sendResponse(res, 404, false, null, 'Vault item not found or already deleted.')
        }

        return sendResponse(res, 200, true, { deleted: true })
    } catch (error) {
        console.error('Vault Delete Error:', error)
        return sendResponse(res, 500, false, null, 'Failed to delete vault item.')
    }
}
