import axios from 'axios';
import Transaction from "../models/TransactionModel.js";
import User from "../models/UserSchema.js";

const API_KEY = process.env.CURRENCY_API_KEY || 'your_api_key_here';

export const convertCurrency = async (amount, fromCurrency, toCurrency) => {
    try {
        if (fromCurrency === toCurrency) return amount;
        
        const response = await axios.get(
            `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
        );
        const rate = response.data.rates[toCurrency];
        return amount * rate;
    } catch (error) {
        console.error("Currency conversion error:", error);
        return amount; // Fallback to original amount
    }
};

export const updateTransactionCurrency = async (req, res) => {
    try {
        const { transactionId, newCurrency } = req.body;
        const transaction = await Transaction.findById(transactionId);
        
        if (!transaction) {
            return res.status(404).json({ success: false, message: "Transaction not found" });
        }

        const convertedAmount = await convertCurrency(
            transaction.amount,
            transaction.currency,
            newCurrency
        );

        transaction.currency = newCurrency;
        transaction.convertedAmount = convertedAmount;
        await transaction.save();

        return res.status(200).json({
            success: true,
            message: "Currency updated",
            transaction
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getUserBaseCurrency = async (userId) => {
    try {
        const user = await User.findById(userId);
        return user?.baseCurrency || 'USD';
    } catch (error) {
        console.error("Error getting user base currency:", error);
        return 'USD';
    }
};

export const setUserBaseCurrency = async (req, res) => {
    try {
        const { userId, currency } = req.body;
        const user = await User.findByIdAndUpdate(
            userId,
            { baseCurrency: currency },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Base currency updated",
            user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};