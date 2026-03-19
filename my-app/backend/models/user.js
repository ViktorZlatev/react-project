const db = require("../db/database");


db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
  )
`);


db.get("SELECT * FROM users WHERE email = ?", ["test@test.com"], (err, row) => {
  if (!row) {
    db.run(
      "INSERT INTO users(email,password) VALUES(?,?)",
      ["test@test.com", "123456"]
    );
  }
});

module.exports = db;