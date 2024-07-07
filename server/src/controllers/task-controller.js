const db = require('../database/database');

exports.getTasks = async (req, res) => {
  try {
    db.all('SELECT * FROM tasks', (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ data: rows });
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
