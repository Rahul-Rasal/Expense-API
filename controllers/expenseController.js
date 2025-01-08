import { Expense } from "../models/Expense.js";

export const addExpense = async (req, res) => {
  const userId = req.userId;
  const { title, amount, category, date, description } = req.body;
  const formattedDate = new Date(date);
  if (isNaN(formattedDate)) {
    return res.status(400).json({ message: "Invalid date format" });
  }

  const dateString = formattedDate.toISOString().split("T")[0];
  const newExpense = new Expense({
    title,
    amount,
    category,
    date: dateString,
    description,
    userId,
  });

  try {
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.json(400).json({ message: error.message });
  }
};

export const updateExpense = async (req, res) => {
  const { id } = req.params; // Expense ID
  const { title, amount, category, date, description } = req.body;

  try {
    const formattedDate = date
      ? new Date(date).toISOString().split("T")[0]
      : undefined;

    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      {
        title,
        amount,
        category,
        date: formattedDate,
        description,
      },
      { new: true } // Return the updated document
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllExpenses = async (req, res) => {
  const userId = req.userId;

  try {
    const expenses = await Expense.find({ userId });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getExpenseById = async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await Expense.findById(id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFilteredExpenses = async (req, res) => {
  const userId = req.userId;
  const { filter, start_date, end_date } = req.query;

  try {
    let filterQuery = { userId };

    // Apply filters based on the `filter` parameter
    if (filter === "past-week") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      filterQuery.date = { $gte: oneWeekAgo };
    } else if (filter === "last-month") {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      filterQuery.date = { $gte: oneMonthAgo };
    } else if (filter === "last-3-months") {
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      filterQuery.date = { $gte: threeMonthsAgo };
    } else if (filter === "custom" && start_date && end_date) {
      const start = new Date(start_date);
      const end = new Date(end_date);

      // Adjusting end date to include the full day
      end.setUTCHours(23, 59, 59, 999);

      filterQuery.date = { $gte: start, $lte: end };
    }

    // Fetch filtered expenses
    const expenses = await Expense.find(filterQuery).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching filtered expenses" });
  }
};
