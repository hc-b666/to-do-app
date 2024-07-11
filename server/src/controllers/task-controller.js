const { db, query } = require('../database/database');

// Utility function to handle database queries
const executeQuery = async (res, sql, params, successCallback) => {
  try {
    const result = await query(sql, params);
    successCallback(result);
  } catch (dberr) {
    console.error('Database error:', dberr);
    res.status(500).json({ error: 'Database error', status: 500 });
  }
};

// Utility function to handle unknown errors
const handleUnknownError = (res, error) => {
  console.error('Unknown error:', error);
  res.status(500).json({ error: 'An unknown error occurred', status: 500 });
};

exports.getStatuses = async (req, res) => {
  const userId = req.user.userId;
  const querySql = `SELECT * FROM taskStatuses WHERE user_id = ?`;

  try {
    executeQuery(res, querySql, [userId], (statuses) => {
      const statusSegments = (statuses[0].statuses).split('/').filter(Boolean);
      res.status(200).json({ statusSegments, status: 200 });
    });
  } catch (error) {
    handleUnknownError(res, error);
  }
};

exports.postStatus = async (req, res) => {
  const userId = req.user.userId;
  const { statuses } = req.body;

  const statusesString = `/${statuses.join('/')}/`;
  const updateStatusSql = `UPDATE taskStatuses SET statuses = ? WHERE user_id = ?`;

  try {
    executeQuery(res, updateStatusSql, [statusesString, userId], () => {
      res.status(200).json({ message: 'Statuses updated successfully', status: 200 });
    });
  } catch (error) {
    handleUnknownError(res, error);
  }
};

exports.getTasks = async (req, res) => {
  const userId = req.user.userId;
  const querySql = `SELECT id, title, description, deadline, status FROM tasks WHERE user_id = ? AND DATE(deadline) = DATE('now')`;

  try {
    executeQuery(res, querySql, [userId], (tasks) => {
      res.status(200).json({ tasks, status: 200 });
    });
  } catch (error) {
    handleUnknownError(res, error);
  }
};

exports.getTodayTasksLength = async (req, res) => {
  const userId = req.user.userId;
  const getTodayTasksLengthSql = `SELECT COUNT(*) AS taskCount FROM tasks WHERE user_id = ? AND DATE(deadline) = DATE('now') AND status IN ('to do', 'doing')`;

  try {
    executeQuery(res, getTodayTasksLengthSql, [userId], (result) => {
      res.status(200).json({ length: result.taskCount, status: 200 });
    });
  } catch (error) {
    handleUnknownError(res, error);
  }
};

exports.postTask = async (req, res) => {
  const userId = req.user.userId;
  const { title, description, deadline, status } = req.body;

  const insertTaskSql = `INSERT INTO tasks (title, description, deadline, status, user_id) VALUES (?, ?, ?, ?, ?)`;

  try {
    db.run(insertTaskSql, [title, description, deadline, status, userId], function (err) {
      if (err) {
        console.error('Error with creating task:', err.message);
        return res.status(500).json({ error: 'Error with creating task', status: 500 });
      }
      res.status(201).json({ message: 'Task created successfully', status: 201 });
    });
  } catch (error) {
    handleUnknownError(res, error);
  }
};

exports.updateTaskStatus = async (req, res) => {
  const userId = req.user.userId;
  const taskId = req.params.taskId;

  if (!taskId) {
    return res.status(400).json({ error: 'No task id was provided', status: 400 });
  }

  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: 'Bad request', status: 400 });
  }

  const updateTaskStatusSql = `UPDATE tasks SET status = ? WHERE id = ? AND user_id = ?`;

  try {
    executeQuery(res, updateTaskStatusSql, [status, taskId, userId], () => {
      res.status(201).json({ message: 'Task updated successfully', status: 201 });
    });
  } catch (error) {
    handleUnknownError(res, error);
  }
};

exports.updateTask = async (req, res) => {
  const userId = req.user.userId;
  const taskId = req.params.taskId;

  if (!taskId) {
    return res.status(400).json({ error: 'No task id was provided', status: 400 });
  }

  const { title, description, deadline, status } = req.body;

  if (!title || !description || !deadline || !status) {
    return res.status(400).json({ error: 'Bad request', status: 400 });
  }

  const updateTaskSql = `UPDATE tasks SET title = ?, description = ?, deadline = ?, status = ? WHERE id = ? AND user_id = ?`;

  try {
    executeQuery(res, updateTaskSql, [title, description, deadline, status, taskId, userId], () => {
      res.status(201).json({ message: 'Task updated successfully', status: 201 });
    });
  } catch (error) {
    handleUnknownError(res, error);
  }
};

exports.deleteTask = async (req, res) => {
  const userId = req.user.userId;
  const taskId = req.params.taskId;

  if (!taskId) {
    return res.status(400).json({ error: 'No task id was provided', status: 400 });
  }

  const deleteTaskSql = `DELETE FROM tasks WHERE id = ? AND user_id = ?`;

  try {
    executeQuery(res, deleteTaskSql, [taskId, userId], () => {
      res.status(201).json({ message: 'Task deleted successfully', status: 201 });
    });
  } catch (error) {
    handleUnknownError(res, error);
  }
};
