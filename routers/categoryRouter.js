// Import categoryController to allow the router file's reference
const categoryController = require("../controllers/categoryController.js");

const router = require("express").Router();

//Place all the controller queries into a router

router.get("/", categoryController.getAllCategory);
// router.post("/", budgetController.addNewBudget);
// router.put("/:id", budgetController.updateBudget);
// router.delete("/:id", budgetController.deleteBudgetRecord);

module.exports = router;
