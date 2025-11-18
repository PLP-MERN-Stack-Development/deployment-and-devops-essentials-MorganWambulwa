import axios from 'axios';

// Backend route (Render deployment URL)
const API_URL = 'https://deployment-and-devops-essentials-3twx.onrender.com';

// Fetch all bugs
export const fetchBugs = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/bugs`);
    return res.data.data || res.data;
  } catch (err) {
    console.error('Fetch bugs error:', err.response ? err.response.data : err);
    throw err;
  }
};

// Add a new bug
export const addBug = async (bug) => {
  try {
    const res = await axios.post(`${API_URL}/api/bugs`, bug);
    return res.data.data || res.data;
  } catch (err) {
    console.error('Add bug error:', err.response ? err.response.data : err);
    throw err;
  }
};

// Update an existing bug
export const updateBug = async (id, updates) => {
  try {
    const res = await axios.put(`${API_URL}/api/bugs/${id}`, updates);
    return res.data.data || res.data;
  } catch (err) {
    console.error('Update bug error:', err.response ? err.response.data : err);
    throw err;
  }
};

// Delete a bug
export const deleteBug = async (id) => {
  try {
    await axios.delete(`${API_URL}/api/bugs/${id}`);
  } catch (err) {
    console.error('Delete bug error:', err.response ? err.response.data : err);
    throw err;
  }
};
