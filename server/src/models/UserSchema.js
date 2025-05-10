import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: validator.isEmail,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password Must Be Atleast 6 characters"],
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false,
    },
    avatarImage: {
        type: String,
        default: ""
    },
    transactions: {
        type: [],
    },
    budgets: [{
        category: String,
        limit: Number,
        currentSpending: { type: Number, default: 0 },
        currency: String,
        notificationThreshold: { type: Number, default: 80 }
    }],
    notificationPreferences: {
        email: Boolean,
        inApp: { type: Boolean, default: true },
        push: Boolean
    },
    baseCurrency: {
        type: String,
        default: "USD",
        enum: ["USD", "EUR", "GBP", "INR", "JPY", "CAD", "AUD"]
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model("User", userSchema);

export default User;