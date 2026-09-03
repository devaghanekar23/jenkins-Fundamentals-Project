const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory storage (no database)
let todos = [
  { id: 1, text: 'Learn Docker', done: false },
  { id: 2, text: 'Setup Jenkins pipeline', done: false }
];
let nextId = 3;

// Health check (useful for Jenkins/Docker health checks)
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Get all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Add a new todo
app.post('/todos', (req, res) => {
  const { text } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Todo text is required' });
  }
  const newTodo = { id: nextId++, text: text.trim(), done: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Toggle todo done/not-done
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const todo = todos.find(t => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  todo.done = !todo.done;
  res.json(todo);
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const exists = todos.some(t => t.id === id);
  if (!exists) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  todos = todos.filter(t => t.id !== id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Todo backend running on http://localhost:${PORT}`);
});
