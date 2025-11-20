import axios from 'axios';

const VITE_API_URL = 'https://bug-tracker-l1td.onrender.com/api/bugs';

export const fetchBugs = async () => {
  try {
    const res = await axios.get(VITE_API_URL);
    return res.data.data || res.data;
  } catch (error) {
    console.error('Error fetching bugs:', error);
    throw error;
  }
};

export const createBug = async (bug) => {
  try {
    const res = await axios.post(VITE_API_URL, bug);
    return res.data;
  } catch (error) {
    console.error('Error creating bug:', error);
    throw error;
  }
};

export const updateBug = async (id, updatedBug) => {
  try {
    const res = await axios.put(`${VITE_API_URL}/${id}`, updatedBug);
    return res.data;
  } catch (error) {
    console.error('Error updating bug:', error);
    throw error;
  }
};

export const deleteBug = async (id) => {
  try {
    const res = await axios.delete(`${VITE_API_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error deleting bug:', error);
    throw error;
  }
};
