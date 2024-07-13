const { query } = require('../database/database');
const { executeQuery, handleUnknownError } = require('../utils/utility-funcs');

exports.getTasks = async (req, res) => {
  const projectId = req.params.projectId;

  if (!projectId) {
    return res.status(400).json({ error: 'Bad request', status: 400 });
  }

  const getTasksSql = `SELECT * FROM projectsTasks WHERE project_id = ?`;

  try {
    const tasks = await query(getTasksSql, [projectId]);
    res.status(200).json({ tasks, status: 200 });
  } catch (error) {
    handleUnknownError(res, error);
  }
};

exports.postProjectTask = async (req, res) => {
  const projectId = req.params.projectId;
  
  if (!projectId) {
    return res.status(400).json({ error: 'Bad request', status: 400 });
  }
  
  const { title, description, status, deadline, user_id } = req.body;

  if (!title || !description || !status || !deadline || !user_id) {
    return res.status(400).json({ error: 'Bad request', status: 400 });
  }

  const postProjectTaskSql = `INSERT INTO projectsTasks (title, description, status, deadline, user_id, project_id) VALUES (?, ?, ?, ?, ?, ?)`;

  try {
    executeQuery(res, postProjectTaskSql, [title, description, status, deadline, user_id, projectId], () => {
      res.status(201).json({ message: 'Task created successfully', status: 201 });
    });
  } catch (error) {
    handleUnknownError(res, error);
  }
};

exports.editProjectTask = async (req, res) => {
  const taskId = req.params.taskId;
  const { title, description, status, deadline, user_id } = req.body;

  if (!taskId) {
    return res.status(400).json({ error: 'Bad request', status: 400 });
  }

  if (!title || !description || !status || !deadline || !user_id) {
    return res.status(400).json({ error: 'Bad request', status: 400 });
  }

  const editProjectTaskSql = `UPDATE projectsTasks SET title = ?, description = ?, status = ?, deadline = ?, user_id = ? WHERE id = ?`;

  try {
    executeQuery(res, editProjectTaskSql, [title, description, status, deadline, user_id, taskId], () => {
      res.status(200).json({ message: 'Task updated successfully', status: 200 });
    });
  } catch (error) {
    handleUnknownError(res, error);
  }
};

exports.deleteProjectTask = async (req, res) => {
  const taskId = req.params.taskId;

  if (!taskId) {
    return res.status(400).json({ error: 'Bad request', status: 400 });
  }

  const deleteProjectTaskSql = `DELETE FROM projectsTasks WHERE id = ?`;

  try {
    executeQuery(res, deleteProjectTaskSql, [taskId], () => {
      res.status(200).json({ message: 'Task deleted successfully', status: 200 });
    });
  } catch (error) {
    handleUnknownError(res, error);
  }
};

exports.getProject = async (req, res) => {
  const userId = req.user.userId;
  const projectId = req.params.projectId;

  if (!projectId) {
    return res.status(400).json({ error: 'Bad request', status: 400 });
  }

  const getProjectSql = `SELECT * FROM projects WHERE id = ? AND owner_id = ?`;

  try {
    const projects = await query(getProjectSql, [projectId, userId]);
    const project = projects[0];
    const statuses = project.statuses.split('/').filter(Boolean);
    const users_id = project.users_id.split('/').filter(Boolean);
    
    const resProject = { id: project.id, title: project.title, description: project.description, owner_id: project.owner_id, statuses, users_id };

    res.status(200).json({ project: resProject, status: 200 });
  } catch (error) {
    handleUnknownError(res, error);
  }
};

exports.getProjects = async (req, res) => {
  const userId = req.user.userId;
  const getProjectsSql = `SELECT id, title FROM projects WHERE owner_id = ?`;

  try {
    const projects = await query(getProjectsSql, [userId]);
    res.status(200).json({ projects, status: 200 });
  } catch (error) {
    handleUnknownError(res, error);
  }
};


// Request from client -> Array of numbers
exports.postProject = async (req, res) => {
  const userId = req.user.userId;
  const { title, description, statuses, users_id } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: 'Bad request', status: 400 });
  }
  let stats;

  if (!statuses) {
    stats = ['to do', 'in progress', 'done'];
  }

  const statusesString = statuses ? `/${statuses.join('/')}/` : `/${stats.join('/')}/`;
  const users_id_string = `/${users_id.join('/')}/`;

  const postProjectSql = `INSERT INTO projects (title, description, statuses, users_id, owner_id) VALUES (?, ?, ?, ?, ?)`;

  try {
    executeQuery(res, postProjectSql, [title, description, statusesString, users_id_string, userId], () => {
      res.status(201).json({ message: 'Project created successfully', status: 201 });
    });
  } catch (error) {
    handleUnknownError(res, error);
  }
};

exports.searchUsersId = async (req, res) => {
  const userId = req.user.userId;
  const { search } = req.params;

  if (!search) {
    return res.status(400).json({ error: 'Bad request', status: 400 });
  }

  const searchUsersSql = `SELECT id, username FROM users WHERE username LIKE ? AND id != ?`;

  try {
    const users = await query(searchUsersSql, [`%${search}%`, userId]);
    res.status(200).json({ users, status: 200 });
  } catch (error) {
    handleUnknownError(res, error);
  }
};

exports.addUserToProject = async (req, res) => {
  const userId = req.user.userId;
  const projectId = req.params.projectId;
  const { users_id } = req.body;

  if (!projectId || !users_id) {
    return res.status(400).json({ error: 'Bad request', status: 400 });
  }

  const users_id_string = `/${users_id.join('/')}/`;

  const addUserToProjectSql = `UPDATE projects SET users_id = ? WHERE id = ? AND owner_id = ?`;

  try {
    executeQuery(res, addUserToProjectSql, [users_id_string, projectId, userId], () => {
      res.status(200).json({ message: 'User added to project successfully', status: 200 });
    });
  } catch (error) {
    handleUnknownError(res, error);
  }
};

exports.editProject = async (req, res) => {
  const userId = req.user.userId;
  const projectId = req.params.projectId;
  const { title, description, statuses, users_id } = req.body;

  if (!projectId) {
    return res.status(400).json({ error: 'Bad request', status: 400 });
  }

  if (!title || !statuses) {
    return res.status(400).json({ error: 'Bad request', status: 400 });
  }

  const statusesString = `/${statuses.join('/')}/`;
  const users_id_string = `/${users_id.join('/')}/`;

  const editProjectSql = `UPDATE projects SET title = ?, description = ?, statuses = ?, users_id = ? WHERE id = ? AND owner_id = ?`;

  try {
    executeQuery(res, editProjectSql, [title, description, statusesString, users_id_string, projectId, userId], () => {
      res.status(200).json({ message: 'Project updated successfully', status: 200 });
    });
  } catch (error) {
    handleUnknownError(res, error);
  }
};

exports.deleteProject = async (req, res) => {
  const userId = req.user.userId;
  const projectId = req.params.projectId;

  if (!projectId) {
    return res.status(400).json({ error: 'Bad request', status: 400 });
  }

  const deleteProjectSql = `DELETE FROM projects WHERE id = ? AND owner_id = ?`;

  try {
    executeQuery(res, deleteProjectSql, [projectId, userId], () => {
      res.status(200).json({ message: 'Project deleted successfully', status: 200 });
    });
  } catch (error) {
    handleUnknownError(res, error);
  }
};
