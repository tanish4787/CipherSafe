import crypto from 'crypto'

const algorithm = 'aes-256-cbc'
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY

export const encryptData = (plainText) => {
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(ENCRYPTION_KEY), iv)

    let encrypted = cipher.update(plainText, 'utf-8', 'hex')

    encrypted += cipher.final('hex')

    return {
        encryptedData: encrypted,
        iv: iv.toString('hex')
    }
}

export const decryptData = (encryptedData, iv) => {
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(ENCRYPTION_KEY), Buffer.from(iv, 'hex'))

    let decrypted = decipher.update(encryptedData, 'hex', 'utf-8')
    decrypted += decipher.final('utf-8')

    return decrypted
}
