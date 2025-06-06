import nodemailer from 'nodemailer'
import sendResponse from './sendResponse.js'

const transporter = nodemailer.createTransport({
    secure: true,
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
})

const sendMail = async (to, msg) => {
    try {
        const info = await transporter.sendMail({
            from: '"CipherSafe" <tanish4787@gmail.com>',
            to: to,
            subject: 'DATA BREACH ALERT..!!!',
            html: msg
        })
        console.log(`📧 Email sent to ${to}: ${info.messageId}`)

    } catch (error) {
        console.error(`❌ Failed to send email to ${to}:`, error.message)
    }


}

export default sendMail