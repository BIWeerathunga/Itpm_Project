import api from './api';

const createFeedback = (data) => {
  return api.post('/feedback', data);
};

const getAllFeedback = () => {
  return api.get('/feedback');
};

const updateFeedback = (id, data) => {
  return api.put(`/feedback/${id}`, data);
};

export default {
  createFeedback,
  getAllFeedback,
  updateFeedback
};