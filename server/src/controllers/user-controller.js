require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { db } = require('../database/database');

// 200 - OK
// 201 - Created
// 400 - Bad Request
// 401 - Unauthorized
// 500 - Internal Server Error

exports.signup = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Invalid username or password', status: 400 });
  }

  const checkUserSql = `SELECT * FROM users WHERE username = ?`;

  db.get(checkUserSql, [username], (err, row) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ error: 'Error checking username', status: 500 });
    }

    if (row) {
      return res.status(400).json({ error: 'Username already exists', status: 400 });
    } else {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const insertUserSql = `INSERT INTO users (username, password) VALUES (?, ?)`;

      db.run(insertUserSql, [username, hashedPassword], function(err) {
        if (err) {
          console.error('Error with creating user:', err.message);
          return res.status(500).json({ error: 'Error with creating user', status: 500 });
        }

        const userId = this.lastID;
        const taskStatuses = '/to do/doing/done';
        const insertTaskStatusesSql = `INSERT INTO taskStatuses (statuses, user_id) VALUES (?, ?)`;

        db.run(insertTaskStatusesSql, [taskStatuses, userId], function(err) {
          if (err) {
            console.error('Error with creating user:', err.message);
            return res.status(500).json({ error: 'Error with creating user', status: 500 });
          }
        });

        const token = jwt.sign({ userId, username }, process.env.SECRET_KEY, { expiresIn: '24h' });

        res.status(201).json({ token, status: 201 });
      });
    }
  });
};

exports.signin = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Invalid username or password', status: 400 });
  }

  const getUserSql = `SELECT * FROM users WHERE username = ?`;

  db.get(getUserSql, [username], (err, row) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ error: 'Error checking username', status: 500 });
    }

    if (!row) {
      return res.status(400).json({ error: 'Invalid username or password', status: 400 });
    }

    const isValidPassword = bcrypt.compareSync(password, row.password);

    if (!isValidPassword) {
      return res.status(400).json({ error: 'Invalid username or password', status: 400 });
    }

    const token = jwt.sign({ userId: row.id, username }, process.env.SECRET_KEY, { expiresIn: '24h' });

    res.status(200).json({ token, status: 200 });
  });
};
