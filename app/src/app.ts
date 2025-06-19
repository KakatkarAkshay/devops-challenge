import express from "express";
import env from "./env";
const app = express();

app.get("/", (req, res) => {
  res.json({
    timestamp: new Date().toISOString(),
    ip: req.ip,
  });
});

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
