const express = require("express");
const router = express.Router();

// test route
router.get("/", (req, res) => {
  res.send("API is running");
});

module.exports = router;
