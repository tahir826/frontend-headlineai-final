import axios from 'axios';

export const sendMessageToApi = async (message: string) => {
  const token = localStorage.getItem('access_token');
  const response = await axios.post(
    'https://healdineai.azurewebsites.net/ai/call_agent',
    { query: message },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};
