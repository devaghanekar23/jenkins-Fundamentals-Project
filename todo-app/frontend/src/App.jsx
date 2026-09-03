import React, { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const fetchTodos = async () => {
    try {
      const res = await fetch(`${API_URL}/todos`);
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      setError('Backend se connect nahi ho pa raha. Kya backend chal raha hai?');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      const res = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      const newTodo = await res.json();
      setTodos([...todos, newTodo]);
      setText('');
    } catch (err) {
      setError('Todo add nahi ho saka.');
    }
  };

  const toggleTodo = async (id) => {
    const res = await fetch(`${API_URL}/todos/${id}`, { method: 'PUT' });
    const updated = await res.json();
    setTodos(todos.map(t => (t.id === id ? updated : t)));
  };

  const deleteTodo = async (id) => {
    await fetch(`${API_URL}/todos/${id}`, { method: 'DELETE' });
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div className="container">
      <h1>📝 Todo App</h1>
      {error && <p className="error">{error}</p>}

      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          placeholder="Naya todo likhein..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={todo.done ? 'done' : ''}>
            <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
            <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>✕</button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && !error && <p>Koi todo nahi hai. Naya add karein!</p>}
    </div>
  );
}

export default App;
