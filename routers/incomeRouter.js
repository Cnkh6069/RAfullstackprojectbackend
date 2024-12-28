// Import incomeController to allow the router file's reference
const incomeController = require("../controllers/incomeController.js");
const Category = require("../databaseModel/categoryModel.js");

const router = require("express").Router();

//Place all the controller queries into a router

router.get("/", incomeController.getAllIncome);
router.post("/", incomeController.addNewIncome);
router.put("/:id", incomeController.updateIncome);
router.delete("/:id", incomeController.deleteIncomeRecord);

module.exports = router;
