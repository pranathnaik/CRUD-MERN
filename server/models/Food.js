const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
  foodname: {
    type: String,
    required: true,
    unique: true,
  },
  daysSinceate: {
    type: Number,
    required: true,
  },
});

const Food = mongoose.model("FoodData", FoodSchema);

module.exports = Food;
