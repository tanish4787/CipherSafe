import axios from 'axios'

const checkEmailForBreach = async (email) => {
    try {
        const response = await axios.get(`https://haveibeenpwned.com/api/v3/breachedaccount/${email}`, {
            headers: {
                'hibp-api-key': process.env.HIBP_API_KEY,
                'User-Agent': 'CipherSafe-BreachChecker/1.0'
            },
            params: {
                truncateResponse: false
            }
        })

        return {
            breached: true,
            details: response.data
        }

    } catch (error) {
        if (error.response && error.response.status === 404) {
            return {
                breached: false,
                details: []
            }
        } else {
            console.error('HIBP Error:', error.message)
            return {
                breached: false,
                details: [],
                error: error.message
            }
        }
    }
}

export default checkEmailForBreach
