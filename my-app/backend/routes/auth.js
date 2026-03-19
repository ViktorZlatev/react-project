const express = require("express");
const router = express.Router();
const db = require("../db/database");

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  db.get(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, user) => {
      if (err) return res.status(500).json({ error: "Database error" });

      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      res.json({
        token: "simple-token",
        user: { id: user.id, email: user.email },
      });
    }
  );
});

module.exports = router;