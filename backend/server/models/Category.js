const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: String,
  tab: { type: Schema.Types.ObjectId, ref: "tab" },
  user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
});

const Category = mongoose.model("category", CategorySchema);

module.exports = Category;
