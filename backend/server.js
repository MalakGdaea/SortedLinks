require('dotenv').config();

const express = require("express");
const PORT = process.env.PORT || 3012;
const { connectToBookmarkDB } = require("./server/services/databaseManager");
const app = express();

// Connect to database
connectToBookmarkDB();

// Import routes
const authRoutes = require("./server/routes/authRoutes");
const bookmarkRoutes = require("./server/routes/bookmarkRoutes");
const tabRoutes = require("./server/routes/tabRoutes");
const categoryRoutes = require("./server/routes/categoryRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS middleware
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE,PUT,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  next()
})

// Mount routes
app.use("/auth", authRoutes);
app.use("/bookmarks", bookmarkRoutes);
app.use("/tabs", tabRoutes);
app.use("/categories", categoryRoutes);

app.get("/", (req, res) => {
  res.send("Server is running")
})

// Centralized error handler (MUST be last)
const errorHandler = require("./server/middleware/errorHandler");
app.use(errorHandler);

app.listen(PORT, function () {
  console.log(`Running server on port ${PORT}`);
});
