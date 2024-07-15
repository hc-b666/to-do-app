require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { z } = require('zod');
const { db } = require('../database/database');

const signupSchema = z.object({
  username: z.string().min(3).max(12),
  password: z.string().min(3).max(12),
});

exports.signup = (req, res) => {
  const { username, password } = req.body;

  const validateRequest = signupSchema.safeParse({ username, password });
  
  if (!validateRequest.success) {
    return res.status(400).json({ error: 'Invalid username or password' });
  }

  const validatedUsername = validateRequest.data.username;
  const validatedPassword = validateRequest.data.password;

  const checkUserSql = `SELECT * FROM users WHERE username = ?`;

  db.get(checkUserSql, [validatedUsername], (err, row) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ error: 'Error checking username' });
    }

    if (row) {
      return res.status(400).json({ error: 'Username already exists' });
    } else {
      const hashedPassword = bcrypt.hashSync(validatedPassword, 10);
      const insertUserSql = `INSERT INTO users (username, password) VALUES (?, ?)`;

      db.run(insertUserSql, [validatedUsername, hashedPassword], function(err) {
        if (err) {
          console.error('Error with creating user:', err.message);
          return res.status(500).json({ error: 'Error with creating user' });
        }

        const userId = this.lastID;
        const taskStatuses = '/to do/doing/done/';
        const insertTaskStatusesSql = `INSERT INTO taskStatuses (statuses, user_id) VALUES (?, ?)`;

        db.run(insertTaskStatusesSql, [taskStatuses, userId], function(err) {
          if (err) {
            console.error('Error with creating user:', err.message);
            return res.status(500).json({ error: 'Error with creating user' });
          }
        });

        const token = jwt.sign({ userId, validatedUsername }, process.env.SECRET_KEY, { expiresIn: '24h' });

        res.status(201).json({ token, status: 201 });
      });
    }
  });
};

const signinSchema = z.object({
  username: z.string().min(3).max(12),
  password: z.string().min(3).max(12),
});

exports.signin = (req, res) => {
  const { username, password } = req.body;

  const validateRequest = signinSchema.safeParse({ username, password });

  if (!validateRequest.success) {
    return res.status(400).json({ error: 'Invalid username or password' });
  }

  const validatedUsername = validateRequest.data.username;
  const validatedPassword = validateRequest.data.password;

  const getUserSql = `SELECT * FROM users WHERE username = ?`;

  db.get(getUserSql, [validatedUsername], (err, row) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ error: 'Error checking username' });
    }

    if (!row) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const isValidPassword = bcrypt.compareSync(validatedPassword, row.password);

    if (!isValidPassword) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: row.id, validatedUsername }, process.env.SECRET_KEY, { expiresIn: '24h' });

    res.status(200).json({ token, status: 200 });
  });
};
