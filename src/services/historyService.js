import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const saveToHistory = async (imageUrl, extractedText, analysis) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.post(`${API_URL}/history`, {
      imageUrl,
      extractedText,
      analysis
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return response.data;
  } catch (error) {
    console.error('Error saving to history:', error);
    throw new Error('Failed to save scan to history');
  }
};

export const getHistory = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.get(`${API_URL}/history`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching history:', error);
    throw new Error('Failed to fetch scan history');
  }
};