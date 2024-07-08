const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to SQLite database:', err.message);
    return;
  }
  console.log('Connected to SQLite database');

  initializeDatabase();
});

function initializeDatabase() {
  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        deadline TEXT NOT NULL,
        status TEXT NOT NULL,
        user_id INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );`,
      (err) => {
        if (err) {
          console.error('Error creating tasks table:', err.message);
          return;
        }
        console.log('tasks Table created or already exists');
      }
    );

    db.run(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL
      );`,
      (err) => {
        if (err) {
          console.error('Error creating users table:', err.message);
          return;
        }
        console.log('users Table created or already exists');
      }
    );

    db.run(
      `CREATE TABLE IF NOT EXISTS taskStatuses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        statuses TEXT NOT NULL,
        user_id INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );`, 
      (err) => {
        if (err) {
          console.error('Error creating taskStatuses table:', err.message);
          return;
        }
        console.log('taskStatuses Table created or already exists');
      }
    );
  });
}

function query(sql, params) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

module.exports = { db, query };
