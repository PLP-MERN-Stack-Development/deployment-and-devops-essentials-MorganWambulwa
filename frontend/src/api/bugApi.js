// src/api/bugApi.js
const axios = require('axios'); // Use CommonJS style for Jest compatibility

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/bugs';

const fetchBugs = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching bugs:', error);
    throw error;
  }
};

const addBug = async (bug) => {
  try {
    const response = await axios.post(API_URL, bug);
    return response.data;
  } catch (error) {
    console.error('Error adding bug:', error);
    throw error;
  }
};

const updateBug = async (id, updates) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updates);
    return response.data;
  } catch (error) {
    console.error('Error updating bug:', error);
    throw error;
  }
};

const deleteBug = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting bug:', error);
    throw error;
  }
};

module.exports = { fetchBugs, addBug, updateBug, deleteBug };
