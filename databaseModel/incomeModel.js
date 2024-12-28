const mongoose = require("mongoose");

//creating a model scheme to structure how the collection called income will look like in the database

const incomeSchema = new mongoose.Schema(
  {
    incomeName: String,
    incomeAmt: Number,
    categoryID: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        default: undefined,
      },
    ],
  },
  { timestamps: true }
);

const Income = mongoose.model("Income", incomeSchema);

module.exports = Income;
