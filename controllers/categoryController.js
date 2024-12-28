const Category = require("../databaseModel/categoryModel.js");

//Create a query to get all the category entries
const getAllCategory = async (req, res) => {
  const {} = req.query;
  try {
    const category = await Category.find();

    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// //Create a new budget record and save it to the MongoDB
// const addNewBudget = async (req, res) => {
//   const { budgetName, budgetAmt, categoryID } = req.body;
//   try {
//     //validate input data
//     if (!budgetName || !budgetAmt) {
//       return res
//         .status(400)
//         .json({ error: "Missing required fields: name and ID" });
//     }
//     //create a new Expense document and save it to the database.
//     const newBudget = new Budget({
//       budgetName,
//       budgetAmt,
//       budgetType,
//     });
//     const savedBudget = await newBudget.save();
//     res.status(201).json(savedBudget);
//   } catch (err) {
//     console.error("Error adding new Budget:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
// //Update a budget record
// const updateBudget = async (req, res) => {
//   const { id } = req.params; // the identifief for the request.
//   const updatedBudget = req.body;

//   try {
//     console.log("Received budgetID:", id);
//     console.log("Updating Budget with Budget ID:", id);

//     //validate request body
//     if (!updatedBudget || Object.keys(updatedBudget).length === 0) {
//       return res
//         .status(400)
//         .json({ error: "Request body is empty or invalid" });
//     }
//     //Find and update the record
//     const updatedDoc = await Budget.findByIdAndUpdate(
//       id, //Filter by Budget ID
//       updatedBudget, //update with the request body
//       { new: true } // Return the updated document
//     ).populate("budgetType");
//     console.log("Updated record:", updatedBudget);

//     // Handle case when document is not found
//     if (!updatedDoc) {
//       return res.status(404).json({ error: "Expense record not found" });
//     }
//     console.log("Updated Budget:", updatedDoc);
//     res.json(updatedDoc);
//   } catch (err) {
//     console.error("Error updating Budget:", err);
//     res.status(500).json({ error: "Internal Server Error:" });
//   }
// };
// //Delete a budget record
// const deleteBudgetRecord = async (req, res) => {
//   const { id } = req.params; // Extract BudgetId from the route parameter

//   try {
//     const deletedRecord = await Budget.findByIdAndDelete(id); //update with the request body
//     //if no record was found, send a 404 error
//     if (!deletedRecord) {
//       return res.status(404).json({ error: "Budget record not found" });
//     }
//     //send success response with the delete record
//     res.json({
//       message: "Budget record deleted successfully",
//       data: deletedRecord,
//     });
//   } catch (err) {
//     console.error("Error deleting Budget records", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
module.exports = {
  getAllCategory,
};
