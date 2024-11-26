const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/database");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

connectDB();

app.use("/api/auth", require("./routes/AuthRoute"));
app.use("/api/employee", require("./routes/UserRoute"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
