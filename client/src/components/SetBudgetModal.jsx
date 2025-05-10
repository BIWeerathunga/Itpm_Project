import React, { useState } from "react";
import axios from "axios";
import { budgetUrl } from "../utils/ApiRequest";

const SetBudgetModal = ({ show, onClose, userId, onBudgetSet }) => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState("monthly");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  
  if (!show) return null;

  const validateForm = () => {
    if (!category) {
      setError("Please select a category");
      return false;
    }
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount");
      return false;
    }
    if (!frequency) {
      setError("Please select a frequency");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.log("Submitting budget:", { category, amount, frequency });
      
      const response = await axios.post(budgetUrl, {
        userId,
        category,
        limit: amount,
        frequency,
        currency: "USD",
        notificationThreshold: 80,
        highBudget: parseFloat(amount) >= 5000,
        notificationEmail: "yaseersuhana@gmail.com"
      });
      
      console.log("Budget set response:", response.data);
      
      // Reset form
      setCategory("");
      setAmount("");
      setFrequency("monthly");
      
      onBudgetSet(); // Refresh budgets
      onClose(); // Close the modal
    } catch (error) {
      console.error("Budget setting error:", error);
      setError(error.response?.data?.message || "Error setting budget. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={modalOverlay}>
      <div style={modalContent}>
        <h2>Set Budget</h2>
        
        {error && <div style={errorStyle}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            required
            style={inputStyle}
            disabled={isSubmitting}
          >
            <option value="">Select Category</option>
            <option value="Groceries">Groceries</option>
            <option value="Rent">Rent</option>
            <option value="Salary">Salary</option>
            <option value="Tip">Tip</option>
            <option value="Food">Food</option>
            <option value="Medical">Medical</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Transportation">Transportation</option>
            <option value="Other">Other</option>
          </select>
          
          <input
            type="number"
            placeholder="Amount (e.g., 500)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            style={inputStyle}
            disabled={isSubmitting}
          />
          
          <select 
            value={frequency} 
            onChange={(e) => setFrequency(e.target.value)} 
            required
            style={inputStyle}
            disabled={isSubmitting}
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          
          <div style={buttonContainer}>
            <button 
              type="submit" 
              style={submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Budget"}
            </button>
            <button 
              type="button" 
              onClick={onClose} 
              style={cancelButton}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetBudgetModal;

// Styles
const modalOverlay = {
  position: "fixed",
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContent = {
  background: "white",
  padding: "20px",
  borderRadius: "8px",
  width: "400px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

const buttonContainer = {
  display: "flex",
  justifyContent: "space-between",
  gap: "10px",
};

const submitButton = {
  padding: "10px 15px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  flex: 1,
};

const cancelButton = {
  padding: "10px 15px",
  backgroundColor: "#f44336",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  flex: 1,
};

const errorStyle = {
  backgroundColor: "#ffdddd",
  color: "#d32f2f",
  padding: "10px",
  borderRadius: "4px",
  marginBottom: "15px",
  fontSize: "14px",
};
