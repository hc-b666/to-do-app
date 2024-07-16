const { z } = require('zod');
const { db } = require('../database/database');
const { executeQuery, handleUnknownError } = require('../utils/utility-funcs');

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

exports.getUpcomingTasks = async (req, res) => {
  const userId = req.user.userId;
  const querySql = `SELECT id, title, description, deadline, status FROM tasks WHERE user_id = ? AND DATE(deadline) BETWEEN DATE('now') AND DATE('now', '+6 days')`;
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

const taskSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  deadline: z.string(),
  status: z.union([z.literal(0), z.literal(1)]),
});

exports.postTask = async (req, res) => {
  const userId = req.user.userId;
  const { title, description, deadline, status } = req.body;

  const validateRequest = taskSchema.safeParse({ title, description, deadline, status });

  if (!validateRequest.success) {
    return res.status(400).json({ error: 'Invalid task data' });
  }

  const validatedTitle = validateRequest.data.title;
  const validatedDescription = validateRequest.data.description;
  const validatedDeadline = validateRequest.data.deadline;
  const validatedStatus = validateRequest.data.status;

  const insertTaskSql = `INSERT INTO tasks (title, description, deadline, status, user_id) VALUES (?, ?, ?, ?, ?)`;

  try {
    db.run(insertTaskSql, [validatedTitle, validatedDescription, validatedDeadline, validatedStatus, userId], function (err) {
      if (err) {
        console.error('Error with creating task:', err.message);
        return res.status(500).json({ error: 'Error with creating task' });
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
