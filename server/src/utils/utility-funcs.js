const { query } = require('../database/database');

exports.executeQuery = async (res, sql, params, successCallback) => {
  try {
    const result = await query(sql, params);
    successCallback(result);
  } catch (dberr) {
    console.error('Database error:', dberr);
    res.status(500).json({ error: 'Database error', status: 500 });
  }
};

exports.handleUnknownError = (res, error) => {
  console.error('Unknown error:', error);
  res.status(500).json({ error: 'An unknown error occurred', status: 500 });
};
