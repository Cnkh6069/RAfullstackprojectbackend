const mongoose = require("mongoose");

//creating a model scheme to structure how the collection called expenses will look like in the database

const expenseSchema = new mongoose.Schema(
  {
    expName: String,
    //To reference a fix model of categories and populate by ObjectID.
    categoryID: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        default: undefined,
      },
    ],
    expAmt: Number,
    //To reference a budgetID and populate by ObjectID.
    budgetID: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Budget",
        default: undefined,
      },
    ],
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
