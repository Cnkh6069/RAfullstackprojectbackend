const mongoose = require("mongoose");

//creating a model scheme to structure how the collection called category will look like in the database

const categorySchema = new mongoose.Schema({
  categoryName: String,
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
