const formatResponse = (data, message = "Success") => ({
    success: true,
    message,
    data,
  });
  
  module.exports = { formatResponse };
  