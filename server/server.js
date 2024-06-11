import {} from "dotenv/config";
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "MERN Auth Server is running." });
});

app.listen(8080, () => {
  console.log("Server connected to http://localhost:8080");
});
