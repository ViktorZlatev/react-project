const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db/database.sqlite", (err) => {
  if (err) console.error(err);
  else console.log("Connected to SQLite");
});

module.exports = db;