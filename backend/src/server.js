const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { default: userRouter } = require("./router/userRouter");
const { default: productRouter } = require("./router/productRouter");

dotenv.config();
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../uploads")));
app.use(express.static(path.join(__dirname, "../uploads_empty")));

app.use((error, req, res, next) => {
  res.status(err.status || 500);
  res.send(error.message || "서버에서 에러가 났습니다");
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅mongoose connect!"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello, world!!!");
});

app.use("/user", userRouter);
app.use("/product", productRouter);

app.listen(port, () => {
  console.log(`🔥app listen http://localhost:${port}/`);
});
