import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import express from "express";
import connectDB from "./config/db.js";
import expenseRouter from "./routes/expenses.js";
import userRouter from "./routes/auth.js";

const app = express();
app.use(express.json());
app.use("/expenses", expenseRouter);
app.use("/users", userRouter);

connectDB().catch((error) => {
  console.log("DB connection calling failed", error);
});

const PORT = process.env.PORT || 1001;

app.listen(PORT, () => {
  console.log(`Server is Running on PORT : ${PORT}`);
});
