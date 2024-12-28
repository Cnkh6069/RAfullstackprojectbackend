const Category = require("../databaseModel/categoryModel.js");
const Income = require("../databaseModel/incomeModel.js");

//Create a income record
const addNewIncome = async (req, res) => {
  const { incomeName, incomeAmt, categoryID } = req.body;
  try {
    //validate input data
    if (!incomeName || !incomeAmt) {
      return res
        .status(400)
        .json({ error: "Missing required fields: name and ID" });
    }
    //create a new Income document and save it to the database.
    const newIncome = new Income({
      incomeName,
      incomeAmt,
      categoryID,
    });
    const savedIncome = await newIncome.save();
    res.status(201).json(savedIncome);
  } catch (err) {
    console.error("Error adding new Income:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//Read all income records
const getAllIncome = async (req, res) => {
  const { categoryID } = req.query;
  try {
    let filter = {};
    if (categoryID) filter.categoryID = categoryID; // filter by category type if provided

    const income = await Income.find(filter).populate("categoryID");

    res.json(income);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//Update a income record
const updateIncome = async (req, res) => {
  const { id } = req.params;
  const updatedIncome = req.body;

  try {
    console.log("Received IncomeID:", id);
    console.log("Updating Income with Income ID:", id);

    //validate request body
    if (!updatedIncome || Object.keys(updatedIncome).length === 0) {
      return res
        .status(400)
        .json({ error: "Request body is empty or invalid" });
    }
    //Find and update the record
    const updatedDoc = await Income.findByIdAndUpdate(
      id, //Filter by Income ID
      updatedIncome, // update with the request body
      { new: true }
    ).populate("categoryID");
    console.log("Updated record:", updatedIncome);

    // Handle case when document is not found
    if (!updatedDoc) {
      return res.status(404).json({ error: "Income record not found" });
    }
    console.log("Updated Income:", updatedDoc);
    res.json(updatedDoc);
  } catch (err) {
    console.error("Error updating Income:", err);
    res.status(500).json({ error: "Internal Server Error:" });
  }
};
//Delete a income record
const deleteIncomeRecord = async (req, res) => {
  const { id } = req.params; // Extract Income ID from the route parameter

  try {
    const deletedRecord = await Income.findByIdAndDelete(id); //update with the request body
    //if no record was found, send a 404 error
    if (!deletedRecord) {
      return res.status(404).json({ error: "Income record not found" });
    }
    //send success response with the delete record
    res.json({
      message: "Income record deleted successfully",
      data: deletedRecord,
    });
  } catch (err) {
    console.error("Error deleting Income records", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  addNewIncome,
  getAllIncome,
  updateIncome,
  deleteIncomeRecord,
};
