// Import expenseController to allow the router file's reference
const expenseController = require("../controllers/expenseController.js");

const router = require("express").Router();

//1. Create a route to get all expenses with the ability to filter by category.

router.get("/", expenseController.getAllExp);
router.post("/", expenseController.addNewExp);
router.put("/:id", expenseController.updateExp);
router.delete("/:id", expenseController.deleteExpRecord);

module.exports = router;
