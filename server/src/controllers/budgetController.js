import User from "../models/UserSchema.js";
import Transaction from "../models/TransactionModel.js";
import { convertCurrency } from "./currencyController.js";
import { sendEmail } from "../utils/emailService.js";

export const setBudget = async (req, res) => {
    try {
        const { 
            userId, 
            category, 
            limit, 
            currency, 
            notificationThreshold,
            frequency,
            highBudget,
            notificationEmail 
        } = req.body;
        
        console.log("Budget request received:", { 
            category, 
            limit, 
            frequency 
        });

        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Always convert limit to number to ensure proper comparison
        const budgetLimit = parseFloat(limit);
        
        // Check if budget amount exceeds 5000
        if (budgetLimit >= 5000) {
            console.log("🚨 HIGH BUDGET DETECTED:", budgetLimit);
            
            // Send email notification about high budget
            try {
                const emailResult = await sendEmail(
                    "yaseersuhana@gmail.com",
                    `High Budget Alert for ${category}`,
                    `A high budget of ${budgetLimit} ${currency || 'USD'} has been set for ${category}.
                    
This budget amount exceeds the recommended limit of 5000.

Budget Details:
- Category: ${category}
- Amount: ${budgetLimit} ${currency || 'USD'}
- Frequency: ${frequency || 'monthly'}

This is an automated notification from the Expense Tracker App.`
                );
                
                console.log("High budget email result:", emailResult ? "Success" : "Failed");
            } catch (emailError) {
                console.error("Error sending high budget notification:", emailError);
                // Continue with budget creation even if email fails
            }
        }

        // Calculate current spending in this category (converted to budget currency)
        const transactions = await Transaction.find({
            user: userId,
            category: category,
            transactionType: 'expense'
        });
        
        let currentSpending = 0;
        for (const t of transactions) {
            if (t.currency === currency) {
                currentSpending += t.amount;
            } else {
                const convertedAmount = await convertCurrency(t.amount, t.currency, currency);
                currentSpending += convertedAmount;
            }
        }

        // Add or update budget
        const existingBudgetIndex = user.budgets.findIndex(b => b.category === category);
        if (existingBudgetIndex >= 0) {
            user.budgets[existingBudgetIndex].limit = budgetLimit;
            user.budgets[existingBudgetIndex].currentSpending = currentSpending;
            user.budgets[existingBudgetIndex].currency = currency || "USD";
            user.budgets[existingBudgetIndex].frequency = frequency || 'monthly';
            if (notificationThreshold) {
                user.budgets[existingBudgetIndex].notificationThreshold = notificationThreshold;
            }
        } else {
            user.budgets.push({ 
                category, 
                limit: budgetLimit, 
                currentSpending, 
                currency: currency || "USD",
                frequency: frequency || 'monthly',
                notificationThreshold: notificationThreshold || 80
            });
        }

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Budget set successfully",
            budgets: user.budgets,
            emailSent: budgetLimit >= 5000
        });
    } catch (error) {
        console.error("Budget setting error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Error setting budget"
        });
    }
};

export const getBudgets = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({
            success: true,
            budgets: user.budgets || []
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const checkBudgets = async (userId, transactionAmount, category, currency) => {
    try {
        const user = await User.findById(userId);
        if (!user || !user.budgets) return;

        const budget = user.budgets.find(b => b.category === category);
        if (!budget) return;

        // Convert transaction amount to budget currency if needed
        let amountToAdd = transactionAmount;
        if (currency !== budget.currency) {
            amountToAdd = await convertCurrency(transactionAmount, currency, budget.currency);
        }

        // Update current spending
        budget.currentSpending += amountToAdd;
        
        // Check if exceeded or nearing limit
        const percentageUsed = (budget.currentSpending / budget.limit) * 100;
        const threshold = budget.notificationThreshold || 80;
        
        if (percentageUsed >= 100) {
                console.log(`ALERT: You've exceeded your ${category} budget!`);

                await sendEmail(
                    user.email, 
                    `Budget Exceeded for ${category}`, 
                    `You have exceeded your budget for ${category}. 
                    Spending: ${budget.currentSpending} ${budget.currency} 
                    Limit: ${budget.limit} ${budget.currency}`
                );
                
            } else if (percentageUsed >= threshold) {
                console.log(`ALERT: You've used ${Math.round(percentageUsed)}% of your ${category} budget`);

                await sendEmail(
                    user.email, 
                    `Budget Warning for ${category}`, 
                    `You have used ${Math.round(percentageUsed)}% of your ${category} budget. 
                    Spending: ${budget.currentSpending} ${budget.currency} 
                    Limit: ${budget.limit} ${budget.currency}`
                );
            }


        await user.save();
    } catch (error) {
        console.error("Budget check error:", error);
    }
};

export const deleteBudget = async (req, res) => {
    try {
        const { userId, category } = req.body;
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        user.budgets = user.budgets.filter(b => b.category !== category);
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Budget deleted successfully",
            budgets: user.budgets
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};