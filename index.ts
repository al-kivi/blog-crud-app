import express from 'express';
import bodyParser from 'body-parser';
import sqlite3 from 'sqlite3';

const app = express();
const port = 3000;
const db = new sqlite3.Database('./blog.db');

app.use(bodyParser.json());

// Create
app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  db.run('INSERT INTO posts (title, content) VALUES (?, ?)', [title, content], function (err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(201).send({ id: this.lastID });
  });
});

// Read
app.get('/posts', (req, res) => {
  db.all('SELECT * FROM posts', [], (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(200).send(rows);
  });
});

// Update
app.put('/posts/:id', (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  db.run('UPDATE posts SET title = ?, content = ? WHERE id = ?', [title, content, id], function (err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(200).send({ changes: this.changes });
  });
});

// Delete
app.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM posts WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(200).send({ changes: this.changes });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
