import express from 'express';
import { sendTestEmail } from '../utils/emailService.js';

const router = express.Router();

// Route to test email functionality
router.get("/test-email", async (req, res) => {
  try {
    console.log("Testing email service...");
    const result = await sendTestEmail();
    
    return res.status(200).json({
      success: result,
      message: result ? "Test email sent successfully" : "Failed to send test email"
    });
  } catch (error) {
    console.error("Test email error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Error testing email service"
    });
  }
});

export default router;
