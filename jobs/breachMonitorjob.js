import BreachModel from '../models/BreachModel.js'
import checkEmailBreach from '../services/checkEmailBreach.js'
import sendMail from '../utils/emailUtility.js'
import { updateRiskScoresForUser } from '../services/riskScoreServices.js'
import { clerkClient } from '@clerk/clerk-sdk-node'

const breachMonitorJob = async () => {
    try {
        const apps = await BreachModel.find()

        for (const app of apps) {
            const result = await checkEmailBreach(app.email)

            if (result.success) {
                const newStatus = result.breached ? 'breached' : 'safe'
                const detailsChanged = JSON.stringify(app.details) !== JSON.stringify(result.details)

                if (app.status !== newStatus || detailsChanged) {
                    app.status = newStatus
                    app.details = result.details
                    await app.save()

                    if (newStatus === 'breached') {
                        const user = await clerkClient.users.getUser(app.userId)
                        const email = user?.emailAddresses?.[0]?.emailAddress
                        const name = user?.firstName || user?.username || 'User'

                        if (email) {
                            await sendMail(
                                email,
                                '⚠️ Data Breach Alert!',
                                `
                <p>Hi ${name},</p>
                <p>Your tracked app <strong>${app.appName}</strong> linked to <strong>${app.email}</strong> has been found in a data breach.</p>
                <p>Please log in to CipherSafe and take necessary actions.</p>
                <br/>
                <p>Stay Safe,<br/>CipherSafe Team</p>
              `
                            )
                            console.log(`📧 Email sent to ${email} for app "${app.appName}"`)
                        }
                        await updateRiskScoresForUser(app.userId)
                    }
                }
            } else {
                console.error(`❌ Breach check failed for ${app.email}: ${result.message}`)
            }
        }

        console.log(`✅ Breach Monitor Job finished at ${new Date().toISOString()}`)
    } catch (error) {
        console.error('❌ Breach Monitor Job Error:', error.message)
    }
}

export default breachMonitorJob
