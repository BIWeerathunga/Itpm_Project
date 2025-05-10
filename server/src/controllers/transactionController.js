import Transaction from "../models/TransactionModel.js";
import User from "../models/UserSchema.js";
import moment from "moment";
import { checkBudgets } from "./budgetController.js";
import { convertCurrency, getUserBaseCurrency } from "./currencyController.js";

export const addTransactionController = async (req, res) => {
    try {
        const {
            title,
            amount,
            description,
            date,
            category,
            userId,
            transactionType,
            currency
        } = req.body;

        if (!title || !amount || !description || !date || !category || !transactionType) {
            return res.status(400).json({
                success: false,
                message: "Please Fill all fields",
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const baseCurrency = user.baseCurrency || 'USD';
        const transactionCurrency = currency || baseCurrency;
        let convertedAmount = amount;

        if (transactionCurrency !== baseCurrency) {
            convertedAmount = await convertCurrency(amount, transactionCurrency, baseCurrency);
        }

        const newTransaction = await Transaction.create({
            title,
            amount,
            description,
            date,
            category,
            user: userId,
            transactionType,
            currency: transactionCurrency,
            convertedAmount,
            baseCurrency
        });

        user.transactions.push(newTransaction);
        await user.save();

        if (transactionType === 'expense') {
            await checkBudgets(userId, amount, category, transactionCurrency);
        }

        return res.status(201).json({
            success: true,
            message: "Transaction Added Successfully",
            transaction: newTransaction
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

export const getAllTransactionController = async (req, res) => {
    try {
        const { userId, type, frequency, startDate, endDate } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        const query = {
            user: userId,
        };

        if (type !== 'all') {
            query.transactionType = type;
        }

        if (frequency !== 'custom') {
            query.date = {
                $gt: moment().subtract(Number(frequency), "days").toDate()
            };
        } else if (startDate && endDate) {
            query.date = {
                $gte: moment(startDate).toDate(),
                $lte: moment(endDate).toDate(),
            };
        }

        const transactions = await Transaction.find(query);

        return res.status(200).json({
            success: true,
            transactions: transactions,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

export const deleteTransactionController = async (req, res) => {
    try {
        const transactionId = req.params.id;
        const userId = req.body.userId;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }
        const transactionElement = await Transaction.findByIdAndDelete(
            transactionId
        );

        if (!transactionElement) {
            return res.status(400).json({
                success: false,
                message: "Transaction not found",
            });
        }

        user.transactions = user.transactions.filter(
            (transaction) => transaction._id.toString() !== transactionId
        );

        await user.save();

        return res.status(200).json({
            success: true,
            message: `Transaction successfully deleted`,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

export const updateTransactionController = async (req, res) => {
    try {
        const transactionId = req.params.id;

        const { title, amount, description, date, category, transactionType, currency } =
            req.body;

        const transactionElement = await Transaction.findById(transactionId);

        if (!transactionElement) {
            return res.status(400).json({
                success: false,
                message: "Transaction not found",
            });
        }

        if (title) transactionElement.title = title;
        if (description) transactionElement.description = description;
        if (amount) transactionElement.amount = amount;
        if (category) transactionElement.category = category;
        if (transactionType) transactionElement.transactionType = transactionType;
        if (date) transactionElement.date = date;
        if (currency) {
            transactionElement.currency = currency;
            const baseCurrency = await getUserBaseCurrency(transactionElement.user);
            if (currency !== baseCurrency) {
                transactionElement.convertedAmount = await convertCurrency(
                    amount || transactionElement.amount,
                    currency,
                    baseCurrency
                );
            } else {
                transactionElement.convertedAmount = amount || transactionElement.amount;
            }
        }

        await transactionElement.save();

        return res.status(200).json({
            success: true,
            message: `Transaction Updated Successfully`,
            transaction: transactionElement,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};