const express = require('express');
const todoRoutes = require('./routes/todo');

const app = express();
app.use(express.json());

app.use('/api/todos', todoRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: {
      message: 'Not found',
      code: 'NOT_FOUND'
    }
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  const code = err.code || 'INTERNAL_ERROR';
  const message = err.message || 'Something went wrong';
  res.status(status).json({
    error: {
      message,
      code
    }
  });
});

module.exports = app;
