//import the required dependencies installed such as express and cors to allow other ports to call to the database.
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Declare the port to listen to and initialise Express
const PORT = 3000;
const app = express();
const mongoose = require("mongoose");
//set 'strictQuery: false' to globally opt into filtering by properties that aren't in the Schema. (Included because it removes preparatory warnings for Mongoose 7.)

const mongoDB = process.env.DB_URI;
if (!mongoDB) {
  console.error(
    "DB_URI is not defined. Please set it in your environment variables."
  );
  process.exit(1);
}
mongoose.set("strictQuery", false);
mongoose.set("strictPopulate", false);
mongoose.connect(mongoDB);
console.log("Successfully connected to DB!");

// setting middleware to accept json request
app.use(express.json());
//allowing request from cross-origin
app.use(cors());

// declare and import any routes
const expenseRouter = require("./routers/expenseRouter.js");
app.use("/expenses", expenseRouter);

const categoryRouter = require("./routers/categoryRouter.js");
app.use("/categories", categoryRouter);

const budgetRouter = require("./routers/budgetRouter.js");
app.use("/budgets", budgetRouter);

const incomeRouter = require("./routers/incomeRouter.js");
app.use("/incomes", incomeRouter);

const userRouter = require("./routers/userRouter.js");
app.use("/users", userRouter);

// Health-check route
app.get("/", (req, res) => {
  res.json({ message: "Finance tracker backend is running!" });
});

// lets the app listen to queries and returns with responses
app.listen(PORT, () => {
  console.log(`Finance tracker app is listening on port ${PORT}`);
});
