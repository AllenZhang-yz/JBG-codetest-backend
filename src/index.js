require("dotenv").config();
const express = require("express");
require("express-async-errors");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes");
const { connectToDB } = require("./utils/db");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;
const morganLog =
  process.env.NODE_ENV === "production" ? morgan("common") : morgan("dev");

app.use(helmet());
app.use(morganLog);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: "GET,PUT,POST,OPTIONS",
    allowedHeaders: "Content-Type,Authorization"
  })
);
app.use(express.json());

app.use("/api", routes);
app.use(errorHandler);

connectToDB()
  .then(() => {
    console.log("DB Connected");
    app.listen(PORT, () => {
      console.log(`server listen on port ${PORT}`);
    });
  })
  .catch(e => {
    console.log("DB Connection failed");
    console.log(e.message);
    process.exit(1);
  });
