require('dotenv').config();
const jwt = require('jsonwebtoken');
const { query } = require('../database/database');

exports.getStatuses = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized', status: 401 }); // unauthorized
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized', status: 401 }); // unauthorized
      }

      const userId = decoded.userId;
      const querySql = 'SELECT * FROM taskStatuses WHERE user_id = ?';

      try {
        const statuses = await query(querySql, [userId]);
        const statusSegments = (statuses[0].statuses).split('/').filter(Boolean);

        res.json({ statusSegments, status: 200 }); // get statuses
      } catch (dberror) {
        console.error('Database error:', dberror);
        res.status(500).json({ error: 'Database error', status: 500 }); // server err
      }
    });
    
  } catch (err) {
    return res.status(500).json({ error: 'An unknown error occured', status: 500 }); // server err
  }
};
