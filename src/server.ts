import express from "express";
import dotenv from "dotenv";

dotenv.config();

const APP = express();
const PORT = process.env.PORT;

APP.get("/", (req, res) => {
  res.send("Hello World!");
});

APP.listen(PORT, () => {
  console.log(`Backend app open on port ${PORT}`);
});
