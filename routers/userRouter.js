// Import userController to allow the router file's reference
const userController = require("../controllers/userController.js");

const router = require("express").Router();

//Place all the controller queries into a router

// router.get("/", userController.getAllIncome);
router.post("/register", userController.registerUser);
router.post("/login", userController.userAuth);
router.get("/lists", userController.getAllUser);

module.exports = router;
