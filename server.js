const express = require("express");
const errorHandler = require("./Middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const contactRoute = require("./routes/contactRoute")

connectDb();
const app = express();

const port = process.env.port || 3000;

app.use(express.json());
app.use("/api/contacts", contactRoute);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });