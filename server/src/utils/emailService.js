import nodemailer from "nodemailer";

// Create a transporter with direct Gmail configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-actual-email@gmail.com', // Replace with a real Gmail address
    pass: process.env.EMAIL_PASS || 'your-app-password', // Use an app password, not your regular password
  },
  debug: true, // Enable debugging
});

// Test the connection on startup
transporter.verify(function(error, success) {
  if (error) {
    console.error('Email service configuration error:', error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

export const sendEmail = async (to, subject, text) => {
  try {
    // Always send to this specific email
    const targetEmail = "yaseersuhana@gmail.com";
    
    console.log(`Preparing to send email to: ${targetEmail}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${text.substring(0, 50)}...`);
    
    const mailOptions = {
      from: process.env.EMAIL_USER || 'expense-tracker-notification@gmail.com',
      to: targetEmail,
      subject,
      text,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
    console.log('Response:', result.response);
    return true;
  } catch (error) {
    console.error('❌ EMAIL SENDING FAILED:');
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Error info:', error.response);
    return false;
  }
};

// Direct function to test email functionality
export const sendTestEmail = async () => {
  return await sendEmail(
    "yaseersuhana@gmail.com",
    "Test Email from Expense Tracker",
    "This is a test email to verify the email notification system is working correctly."
  );
};