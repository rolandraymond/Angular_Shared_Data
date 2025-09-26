const router = require('express').Router();
const {
  fetchTodos,
  findTodoById,
  removeTodoById,
  createTodo
} = require('../store');
const {
  validateTodoInput
} = require('../validate');

function sendError(res, status, message, code) {
  return res.status(status).json({
    error: {
      message,
      code
    }
  });
}

router.get('/', async (req, res) => {
  const items = await fetchTodos();
  res.status(200).json({
    items,
    total: items.length
  });
});

router.get('/:id', async (req, res) => {
  const todo = await findTodoById(req.params.id);
  if (!todo) return sendError(res, 404, 'Todo not found', 'NOT_FOUND');
  res.status(200).json(todo);
});

router.delete('/:id', async (req, res) => {
  const ok = await removeTodoById(req.params.id);
  if (!ok) return sendError(res, 404, 'Todo not found', 'NOT_FOUND');
  res.status(204).send();
});

router.post('/', validateTodoInput, async (req, res) => {
  const todo = await createTodo(req.body.title, req.body.completed);
  res.status(201).json(todo);
});

module.exports = router;
