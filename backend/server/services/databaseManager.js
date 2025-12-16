require('dotenv').config();
const DB_Link = process.env.MONGODB_URI || "mongodb://localhost/bookmarksDB";
const mongoose = require("mongoose");

const connectToBookmarkDB = async () => {
  mongoose.connect(DB_Link);
};

const getIdObject = (id) => {
  return new mongoose.Types.ObjectId(id);
};

module.exports = { connectToBookmarkDB, getIdObject };
