const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRoutes");
const taskRouter = require("./routes/taskRoutes");

const CLIENT_URL = process.env.CLIENT_URL;
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

const app = express(); // Define app here since {server, app} is removed

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(
  cors({
    credentials: true,
    origin: [CLIENT_URL],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-access-token"],
  }),
);

app.use(cookieParser());

if (!DB_URL) {
  console.error("DB_URL is missing. Please set it in your .env file.");
} else {
  mongoose
    .connect(DB_URL)
    .then(() => {
      console.log("Connected to mongodb successfully.");
    })
    .catch((e) => {
      console.error("Mongodb connection error", e.message);
    });
}

app.get("/", (req, res) => {
  res.send("<h1>server is ready</h1>");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tasks", taskRouter);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
