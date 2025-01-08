import mongoose, { Schema } from "mongoose";

const ExpenseSchema = new Schema({
  title: String,
  amount: Number,
  category: {
    type: String,
    enum: [
      "Groceries",
      "Leisure",
      "Electronics",
      "Utilities",
      "Clothing",
      "Health",
      "Others",
    ],
  },
  date: {
    type: Date,
  },
  description: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export const Expense = mongoose.model("Expense", ExpenseSchema);
