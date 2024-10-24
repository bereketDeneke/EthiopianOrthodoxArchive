const axios = require('axios');

exports.handler = async function (event, context) {
  const { prompt, apiKey } = JSON.parse(event.body);

  const baseUrl = "https://integrate.api.nvidia.com/v1";
  const headers = {
    "Authorization": `Bearer ${apiKey}`,
    "Content-Type": "application/json"
  };

  const payload = {
    "model": "nvidia/llama-3.1-nemotron-70b-instruct",
    "messages": [{ "role": "user", "content": prompt }],
    "temperature": 0.5,
    "top_p": 1,
    "max_tokens": 1024,
    "stream": true
  };

  try {
    const response = await axios.post(`${baseUrl}/chat/completions`, payload, { headers });
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error('Error fetching Nvidia API:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error fetching Nvidia API' }),
    };
  }
};
