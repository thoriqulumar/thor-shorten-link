const apiResponse = (statusCode, message, data) => {
  return {
    code: statusCode,
    response: {
      message: message,
      data: data,
    },
  };
};

module.exports = apiResponse;
