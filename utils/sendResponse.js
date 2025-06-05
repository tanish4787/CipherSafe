const sendResponse = (res, statusCode, success, data = null, error = null) => {
    const response = { success };

    if (success) response.data = data;
    else response.error = error;

    return res.status(statusCode).json(response);
};

export default sendResponse;
