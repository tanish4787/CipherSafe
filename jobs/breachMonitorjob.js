import AppModel from '../models/AppModel.js'
import BreachModel from '../models/BreachModel.js'
import checkEmailBreach from '../services/checkEmailBreach.js'
import sendMail from '../utils/emailUtility.js'
import sendResponse from '../utils/sendResponse.js'

const breachMonitorJob = async () => {
    try {
        const apps = await BreachModel.find()

        for (const app of apps) {
            const result = await checkEmailBreach(app.email)

            if (result.success) {
                const newStatus = result.breached ? 'breached' : 'safe';
                const detailsChanged =
                    JSON.stringify(app.details) !== JSON.stringify(result.details);

                if (app.status !== newStatus || detailsChanged) {
                    app.status = newStatus;
                    app.details = result.details;
                    await app.save();

                    if (newStatus === 'breached') {
                        const user = await UserModel.findById(app.userId);
                        if (user?.email) {
                            await sendMail(
                                user.email,
                                '⚠️ Data Breach Alert!',
                                `
                  <p>Hi ${user.name || 'User'},</p>
                  <p>Your tracked app <strong>${app.appName}</strong> linked to <strong>${app.email}</strong> has been found in a data breach.</p>
                  <p>Please log in to CipherSafe and take necessary actions.</p>
                  <br/>
                  <p>Stay Safe,<br/>CipherSafe Team</p>
                `
                            );
                            console.log(`📧 Email sent to ${user.email} for app "${app.appName}"`);
                        }
                    }
                }
            } else {
                console.error(`❌ Breach check failed for ${app.email}: ${result.message}`);
            }
        }

        console.log(`✅ Breach Monitor Job finished at ${new Date().toISOString()}`);
    } catch (error) {
        sendResponse(res, 400, false, null, error.message)
    }
}

export default breachMonitorJob