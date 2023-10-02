require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT;
const connectDB = require("./config/dbConn");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsOptions");

connectDB();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use("/", require("./routes/authRoutes"));
app.use("/user", require("./routes/userRoutes"));
app.use("/post", require("./routes/postRoutes"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
