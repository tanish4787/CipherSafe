import cron from 'cron'
import breachMonitorJob from './jobs/breachMonitorjob.js'

cron.schedule('0 */6 * * *', async () => {
    console.log('Breach Monitoring....');
    
    await breachMonitorJob()
})