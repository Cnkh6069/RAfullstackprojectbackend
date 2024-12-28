const Expense = require("../databaseModel/expenseModel.js");
const Category = require("../databaseModel/categoryModel.js");
const Budget = require("../databaseModel/budgetModel.js");

//Creating a database query to get all expenses
const getAllExp = async (req, res) => {
  const { categoryID, budgetID } = req.query;
  try {
    let filter = {};
    if (categoryID) filter.categoryID = categoryID; // filter by type if provided

    //filter budgetID if provided
    if (budgetID) filter.budgetID = budgetID;

    const expense = await Expense.find(filter)
      .populate("categoryID")
      .populate("budgetID");

    res.json(expense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Create a new expense record and save it to the MongoDB
const addNewExp = async (req, res) => {
  const { expName, expAmt, categoryID, budgetID } = req.body;
  try {
    // Validate input data
    if (!expName || !expAmt) {
      return res
        .status(400)
        .json({ error: "Missing required fields: name and ID" });
    }

    // Create a new Expense document
    const newExpense = new Expense({
      expName,
      expAmt,
      categoryID,
      budgetID,
    });

    // Save the expense and fetch category and budget details concurrently
    const [savedExpense, category, budget] = await Promise.all([
      newExpense.save(),
      Expense.findById(newExpense._id).populate("categoryID"),
      Expense.findById(newExpense._id).populate("budgetID"),
    ]);

    // Respond with the saved expense including category and budget names
    res.status(201).json({
      ...savedExpense.toObject(),
      categoryName: category?.categoryID?.name || "Unknown Category",
      budgetName: budget?.budgetID?.budgetName || "Unknown Budget",
    });
  } catch (err) {
    console.error("Error adding new Expense:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Update by record
const updateExp = async (req, res) => {
  const { id } = req.params; // the identifief for the request.
  const updatedExp = req.body;

  try {
    console.log("Received expenseID:", id);
    console.log("Updating Expense with Expense ID:", id);

    //validate request body
    if (!updatedExp || Object.keys(updatedExp).length === 0) {
      return res
        .status(400)
        .json({ error: "Request body is empty or invalid" });
    }
    //Find and update the record
    const updatedDoc = await Expense.findByIdAndUpdate(
      id, //Filter by Expense ID
      updatedExp, //update with the request body
      { new: true } // Return the updated document
    )
      .populate("categoryID")
      .populate("budgetID");
    console.log("Updated record:", updatedExp);

    // Handle case when document is not found
    if (!updatedDoc) {
      return res.status(404).json({ error: "Expense record not found" });
    }
    console.log("Updated Expense:", updatedDoc);
    res.json(updatedDoc);
  } catch (err) {
    console.error("Error updating Expense:", err);
    res.status(500).json({ error: "Internal Server Error:" });
  }
};

// Delete function for one expense record
const deleteExpRecord = async (req, res) => {
  const { id } = req.params; // Extract expenseID from the route parameter

  try {
    const deletedRecord = await Expense.findByIdAndDelete(id); //update with the request body
    //if no record was found, send a 404 error
    if (!deletedRecord) {
      return res.status(404).json({ error: "Expense record not found" });
    }
    //send success response with the delete record
    res.json({
      message: "Expense record deleted successfully",
      data: deletedRecord,
    });
  } catch (err) {
    console.error("Error deleting Expense records", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getAllExp, addNewExp, updateExp, deleteExpRecord };
