import express from "express";

import {
  addExpense,
  deleteExpense,
  getAllExpenses,
  getExpenseById,
  getFilteredExpenses,
  updateExpense,
} from "../controllers/expenseController.js";
import { isAuth } from "../middleware/isAuth.js";

const expenseRouter = express.Router();
expenseRouter.get("/getFilteredExpenses", isAuth, getFilteredExpenses);
expenseRouter.post("/addExpense", isAuth, addExpense);
expenseRouter.put("/updateExpense/:id", isAuth, updateExpense);
expenseRouter.get("/getAllExpenses", isAuth, getAllExpenses);
expenseRouter.get("/getExpense/:id", isAuth, getExpenseById);
expenseRouter.delete("/deleteExpense/:id", isAuth, deleteExpense);

export default expenseRouter;
