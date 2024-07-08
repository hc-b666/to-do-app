require('dotenv').config();
const jwt = require('jsonwebtoken');
const { db, query } = require('../database/database');

exports.getStatuses = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized', status: 401 }); 
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized', status: 401 }); 
      }

      const userId = decoded.userId;
      const querySql = 'SELECT * FROM taskStatuses WHERE user_id = ?';

      try {
        const statuses = await query(querySql, [userId]);
        const statusSegments = (statuses[0].statuses).split('/').filter(Boolean);

        res.status(200).json({ statusSegments, status: 200 }); 
      } catch (dberr) {
        console.error('Database error:', dberr);
        res.status(500).json({ error: 'Database error', status: 500 }); 
      }
    });
  } catch (err) {
    return res.status(500).json({ error: 'An unknown error occured', status: 500 }); 
  }
};

exports.getTasks = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized', status: 401 }); 
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized', status: 401 }); 
      }

      const userId = decoded.userId;
      const querySql = `SELECT id, title, description, deadline FROM tasks WHERE user_id = ?`;

      try {
        const tasks = await query(querySql, [userId]);
        console.log(tasks);

        res.status(200).json({ tasks, status: 200 });
      } catch (dberr) {
        console.error('Database error:', dberr);
        res.status(500).json({ error: 'Database error', status: 500 }); 
      }      
    });
  } catch (err) {
    return res.status(500).json({ error: 'An unknown error occured', status: 500 }); 
  }
};

exports.postTask = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized', status: 401 }); 
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized', status: 401 }); 
      }

      const userId = decoded.userId;
      const { title, description, deadline, status } = req.body;

      const insertTaskSql = `INSERT INTO tasks (title, description, deadline, status, user_id) VALUES (?, ?, ?, ?, ?)`;

      db.run(insertTaskSql, [title, description, deadline, status, userId], function(err) {
        if (err) {
          console.error('Error with creating task:', err.message);
          return res.status(500).json({ error: 'Error with creating task', status: 500 });
        }

        res.status(201).json({ message: 'Task created successfully', status: 201 });
      });
    });
  } catch (err) {
    return res.status(500).json({ error: 'An unknown error occured', status: 500 }); 
  }
};
