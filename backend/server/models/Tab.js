const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TabSchema = new Schema({
  name: String,
  user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
});

const Tab = mongoose.model("tab", TabSchema);

module.exports = Tab;
