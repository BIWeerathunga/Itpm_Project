import React, { useState } from "react";
import axios from "axios";
import { budgetUrl } from "../utils/ApiRequest";

const SetBudgetModal = ({ show, onClose, userId, onBudgetSet }) => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState("Monthly");

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(budgetUrl, {
        userId,
        category,
        amount,
        frequency,
      });
      onBudgetSet();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Error setting budget");
    }
  };

  return React.createElement(
    "div",
    { style: modalOverlay },
    React.createElement(
      "div",
      { style: modalContent },
      React.createElement("h2", null, "Set Budget"),
      React.createElement(
        "form",
        {
          onSubmit: handleSubmit,
          style: { display: "flex", flexDirection: "column", gap: "10px" },
        },
        React.createElement("input", {
          type: "text",
          placeholder: "Category (e.g., Food)",
          value: category,
          onChange: (e) => setCategory(e.target.value),
          required: true,
        }),
        React.createElement("input", {
          type: "number",
          placeholder: "Amount (e.g., 500)",
          value: amount,
          onChange: (e) => setAmount(e.target.value),
          required: true,
        }),
        React.createElement(
          "select",
          {
            value: frequency,
            onChange: (e) => setFrequency(e.target.value),
          },
          React.createElement("option", { value: "Daily" }, "Daily"),
          React.createElement("option", { value: "Weekly" }, "Weekly"),
          React.createElement("option", { value: "Monthly" }, "Monthly"),
          React.createElement("option", { value: "Yearly" }, "Yearly")
        ),
        React.createElement(
          "div",
          { style: { display: "flex", gap: "10px" } },
          React.createElement("button", { type: "submit" }, "Save"),
          React.createElement(
            "button",
            { type: "button", onClick: onClose },
            "Cancel"
          )
        )
      )
    )
  );
};

export default SetBudgetModal;

const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
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
};
