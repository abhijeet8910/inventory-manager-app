import express from "express";

const app = express();

app.get("/health", (req, res) => {
  res.status(200).json({ message: "ok" });
});

app.listen(5501, () => {
  console.log(`Identity Service running on port 5501 ...`);
});
