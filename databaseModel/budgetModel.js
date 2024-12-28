const mongoose = require("mongoose");

//creating a model scheme to structure how the collection called budget will look like in the database

const budgetSchema = new mongoose.Schema({
  budgetName: String,
  budgetAmt: Number,
  budgetType: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: undefined,
    },
  ],
});

const Budget = mongoose.model("Budget", budgetSchema);

module.exports = Budget;
