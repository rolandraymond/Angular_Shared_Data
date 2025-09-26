/** @typedef {{id:string|number,title:string,completed:boolean}} Todo */

let todos = [{
    id: '1',
    title: 'Learn Node.js',
    completed: false
  },
  {
    id: '2',
    title: 'Build a tiny API',
    completed: false
  }
];

async function fetchTodos() {
  return todos;
}

async function findTodoById(id) {
  const key = String(id);
  return todos.find(t => String(t.id) === key) || null;
}

async function removeTodoById(id) {
  const key = String(id);
  const idx = todos.findIndex(t => String(t.id) === key);
  if (idx === -1) return false;
  todos.splice(idx, 1);
  return true;
}

async function createTodo(title, completed = false) {
  const todo = {
    id: String(Date.now()),
    title,
    completed: !!completed
  };
  todos.push(todo);
  return todo;
}

module.exports = {
  fetchTodos,
  findTodoById,
  removeTodoById,
  createTodo
};
