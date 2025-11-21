import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const fetchBugs = async () => {
  try {
    const res = await axiosInstance.get('/api/bugs');
    return res.data.data || res.data;
  } catch (err) {
    console.error('Fetch bugs error:', err.response ? err.response.data : err);
    throw err;
  }
};

export const addBug = async (bug) => {
  try {
    const res = await axiosInstance.post('/api/bugs', bug);
    return res.data.data || res.data;
  } catch (err) {
    console.error('Add bug error:', err.response ? err.response.data : err);
    throw err;
  }
};

export const updateBug = async (id, updates) => {
  try {
    const res = await axiosInstance.put(`/api/bugs/${id}`, updates);
    return res.data.data || res.data;
  } catch (err) {
    console.error('Update bug error:', err.response ? err.response.data : err);
    throw err;
  }
};

export const deleteBug = async (id) => {
  try {
    await axiosInstance.delete(`/api/bugs/${id}`);
  } catch (err) {
    console.error('Delete bug error:', err.response ? err.response.data : err);
    throw err;
  }
};
