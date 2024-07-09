const { db, query } = require('../database/database');

exports.getStatuses = async (req, res) => {
  try {
    const userId = req.user.userId;
    const querySql = `SELECT * FROM taskStatuses WHERE user_id = ?`;

    try {
      const statuses = await query(querySql, [userId]);
      const statusSegments = (statuses[0].statuses).split('/').filter(Boolean);
      
      return res.status(200).json({ statusSegments, status: 200 });
    } catch (dberr) {
      console.error('Database error:', dberr);
      return res.status(500).json({ error: 'Database error', status: 500 });
    }
  } catch (err) {
    return res.status(500).json({ error: 'An unknown error occured', status: 500 }); 
  }
};

exports.postStatus = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { statuses } = req.body;

    const statusesString = `/${statuses.join('/')}/`;
    const updateStatusSql = `UPDATE taskStatuses SET statuses = ? WHERE user_id = ?`;

    try {
      await query(updateStatusSql, [statusesString, userId]);
      return res.status(200).json({ message: 'Statuses updated successfully', status: 200 });
    } catch (dberr) {
      console.error('Database error:', dberr);
      return res.status(500).json({ error: 'Database error', status: 500 });
    }
  } catch (error) {
    return res.status(500).json({ error: 'An unknown error occured', status: 500 });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const userId = req.user.userId;
    const querySql = `SELECT id, title, description, deadline, status FROM tasks WHERE user_id = ? AND DATE(deadline) = DATE('now')`;

    try {
      const tasks = await query(querySql, [userId]);

      return res.status(200).json({ tasks, status: 200 });
    } catch (dberr) {
      console.error('Database error:', dberr);
      return res.status(500).json({ error: 'Database error', status: 500 }); 
    }      
  } catch (err) {
    return res.status(500).json({ error: 'An unknown error occurred', status: 500 }); 
  }
};

exports.postTask = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { title, description, deadline, status } = req.body;

    const insertTaskSql = `INSERT INTO tasks (title, description, deadline, status, user_id) VALUES (?, ?, ?, ?, ?)`;

    db.run(insertTaskSql, [title, description, deadline, status, userId], function(err) {
      if (err) {
        console.error('Error with creating task:', err.message);
        return res.status(500).json({ error: 'Error with creating task', status: 500 });
      }

      return res.status(201).json({ message: 'Task created successfully', status: 201 });
    });
  } catch (err) {
    return res.status(500).json({ error: 'An unknown error occurred', status: 500 }); 
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { status } = req.body;
    const taskId = req.params.taskId;

    if (!taskId || !status) {
      return res.status(400).json({ error: 'No task id was provided', status: 400 });
    }

    const updateTaskStatusSql = `UPDATE tasks SET status = ? WHERE id = ? AND user_id = ?`;

    try {
      await query(updateTaskStatusSql, [status, taskId, userId]);
      
      return res.status(201).json({ message: 'Task updated successfully', status: 201 });
    } catch (dberr) {
      console.error('Error with updating the task:', dberr);
      return res.status(500).json({ error: 'Database error', status: 500 });
    }

  } catch (err) {
    return res.status(500).json({ error: 'An unknown error occured', status: 500 });
  }
};
