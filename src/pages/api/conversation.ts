import axios from 'axios';

export const sendMessageToApi = async (message: string) => {
  const token = localStorage.getItem('access_token');
  const response = await axios.post(
    'https://headlineai.graycoast-7c0c32b7.eastus.azurecontainerapps.io/ai/call_agent',
    { query: message },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};
