const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { userRoutes, taskRoutes, projectRoutes } = require('./routes');

const app = express();
const PORT = 3000;
const allowedOrigins = ['http://localhost:6969', 'http://localhost:5173'];

app.use(cors({ 
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
  }));

app.use(express.json());
app.use(morgan('dev'));
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/projects', projectRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
