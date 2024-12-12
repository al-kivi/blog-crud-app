// Create Contact
app.post('/contacts', (req, res) => {
  const { name, email, phone } = req.body;
  db.run('INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)', [name, email, phone], function (err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(201).send({ id: this.lastID });
  });
});

// Read Contacts
app.get('/contacts', (req, res) => {
  db.all('SELECT * FROM contacts', [], (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(200).send(rows);
  });
});

// Update Contact
app.put('/contacts/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  db.run('UPDATE contacts SET name = ?, email = ?, phone = ? WHERE id = ?', [name, email, phone, id], function (err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(200).send({ changes: this.changes });
  });
});

// Delete Contact
app.delete('/contacts/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM contacts WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(200).send({ changes: this.changes });
  });
});
