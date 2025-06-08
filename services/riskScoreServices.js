export const calculateRiskScore = ({ sharedData = [], breached = false }) => {
    let score = 0

    if (sharedData.includes('location')) score += 30
    if (sharedData.includes('contacts')) score += 30
    if (sharedData.includes('email')) score += 20
    if (sharedData.includes('files')) score += 20

    if (breached) score += 50

    let level = 'Low'
    if (score >= 70) level = 'High'
    else if (score >= 40) level = 'Medium'

    return { score, level }
}

export const updateRiskScoresForUser = async (userId) => {
    const apps = await AppModel.find({ userId });

    for (const app of apps) {
        const { score, level } = calculateRiskScore({
            sharedData: app.sharedData,
            breached: true 
                });

        app.riskScore = score;
        app.riskLevel = level;
        await app.save();
    }
};