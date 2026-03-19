const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db/database.sqlite", (err) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("Connected to SQLite");
  }
});


db.run(`
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    body TEXT
  )
`, (err) => {
  if (err) {
    console.error("Error creating table:", err.message);
  }
});


db.get("SELECT COUNT(*) as count FROM items", (err, row) => {
  if (err) {
    console.error("Error counting items:", err.message);
    return;
  }

  
  if (!row || row.count === 0) {
    console.log("Seeding items...");

    const stmt = db.prepare("INSERT INTO items(title, body) VALUES(?, ?)");

    for (let i = 1; i <= 10; i++) {
      stmt.run(`Item ${i}`, `This is the detail for item ${i}`);
    }

    stmt.finalize();
  }
});

module.exports = db;