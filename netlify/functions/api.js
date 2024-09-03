// netlify/functions/api.js
exports.handler = async (event, context) => {
    // Handle your request here
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Hello from Netlify Functions!' }),
    };
  };
  