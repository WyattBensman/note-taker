const express = require('express');
const app = express();
const PORT = 3000;

const path = require('path');
// Require Database
const notes = require('./db/db.json')

// Serve static files from the "public" folder
app.use(express.static('public'));

// Render the home page
app.get('/', (req, rese) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

// Render the notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);