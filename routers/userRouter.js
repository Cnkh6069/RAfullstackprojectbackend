// Import userController to allow the router file's reference
const userController = require("../controllers/userController.js");

const router = require("express").Router();

//Place all the controller queries into a router

// router.get("/", userController.getAllIncome);
router.post("/register", userController.createUserAcct);
router.post("/login", userController.userAuth);
// router.put("/:id", incomeController.updateIncome);
// router.delete("/:id", incomeController.deleteIncomeRecord);

module.exports = router;
