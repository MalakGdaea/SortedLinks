require('dotenv').config();
const cookieParser = require("cookie-parser");

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
app.use(cookieParser());

// CORS middleware
const allowedOrigins = [
  'http://localhost:3000',
  'https://sortedlinks.xyz',
  'https://sortedlinks.vercel.app/'
];

app.use(function (req, res, next) {
  const origin = req.headers.origin;

  // Dynamically allow the origin if it's in our whitelist
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE,PUT,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');

  // Handle preflight (OPTIONS)
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

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
