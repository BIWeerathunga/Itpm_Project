import { sendEmail } from './emailService.js';

// Test function to verify email functionality
const testEmailService = async () => {
  console.log('Testing email service...');
  
  try {
    const result = await sendEmail(
      'yaseersuhana@gmail.com',
      'Test Email from Expense Tracker',
      'This is a test email to verify that the email service is working correctly.'
    );
    
    console.log('Email test result:', result);
  } catch (error) {
    console.error('Email test failed:', error);
  }
};

// Run the test
testEmailService();
