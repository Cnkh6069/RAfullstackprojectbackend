// Import budgetController to allow the router file's reference
const budgetController = require("../controllers/budgetController.js");

const router = require("express").Router();

//Place all the controller queries into a router

router.get("/", budgetController.getAllBudget);
router.post("/", budgetController.addNewBudget);
router.put("/:id", budgetController.updateBudget);
router.delete("/:id", budgetController.deleteBudgetRecord);

module.exports = router;
