import axios from 'axios'

const BASE_URL = 'https://api.xposedornot.com/v1/check/email/'

const checkEmailBreach = async (email) => {
  try {
    const { data } = await axios.get(`${BASE_URL}${encodeURIComponent(email)}`)

    const breached = (data.Breaches?.length || 0) > 0 || (data.Pastes?.length || 0) > 0

    return {
      success: true,
      breached,
      details: {
        breaches: data.Breaches || [],
        pastes: data.Pastes || [],
      },
    }
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message || error.message || 'Failed to fetch breach data',
    };
  }
}

export default checkEmailBreach
