import * as sqlite3 from "sqlite3";
import * as path from "path";
// Data Access Object

const sqlite = sqlite3.verbose();
const dbPath = path.resolve(__dirname, "addressData.db");

const db = new sqlite.Database(dbPath, (err: any) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the in-memory SQLite database.");
});

// Creates the DB table for data storage
// db.run(`CREATE TABLE langs(name text)`);

// Data to be stored
const languages = ["C++", "Python", "Java", "C#", "Go"];

// Use the map method to map each element in the laguages array into (?)
// ~and then join all placeholders together.
const placeholders = languages.map((language) => "(?)").join(",");
const sql = `INSERT INTO langs(name) VALUES ` + placeholders;
console.log(sql);

db.run(sql, languages, function (err) {
  if (err) {
    return console.log(err.message);
  }
  // get the last insert id
  console.log(`Rows inserted ${this.changes}`);
});

db.close((err: any) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Database connection closed.");
});
