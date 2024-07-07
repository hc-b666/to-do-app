const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const userRoutes = require('./routes/user-routes');
const taskRoutes = require('./routes/task-routes');

const app = express();
const PORT = 3000;
const FRONTEND_URL = 'http://localhost:6969';

app.use(cors({ origin: FRONTEND_URL }))
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
