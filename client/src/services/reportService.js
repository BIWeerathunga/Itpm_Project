// services/reportService.js
import api from './api';

const generateFeedbackReport = (format = 'excel', startDate, endDate) => {
  const params = { format };
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;
  
  return api.get('/reports/feedback', { 
    params,
    responseType: 'blob' // Important for file downloads
  });
};

const generateInquiryReport = (format = 'excel', startDate, endDate) => {
  const params = { format };
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;
  
  return api.get('/reports/inquiries', { 
    params,
    responseType: 'blob' // Important for file downloads
  });
};

export default {
  generateFeedbackReport,
  generateInquiryReport
};