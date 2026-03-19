const express = require("express");
const router = express.Router();
const db = require("../db/database");


router.get("/", (req, res) => {
  db.all("SELECT * FROM items", [], (err, rows) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(rows);
  });
});


router.get("/:id", (req, res) => {
  db.get("SELECT * FROM items WHERE id = ?", [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (!row) return res.status(404).json({ message: "Item not found" });
    res.json(row);
  });
});


router.delete("/:id", (req, res) => {
  db.run("DELETE FROM items WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ message: "Database error" });

    if (this.changes === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Deleted successfully" });
  });
});

module.exports = router;