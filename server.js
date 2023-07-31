const express = require('express');
const app = express();
const PORT = 3000;

const path = require('path');
const fs = require('fs');

// Middleware to parse JSON request body
app.use(express.json());

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

// API to get all of the notes
app.get('/api/notes', (req, res) => {
    // Read the JSON file to get the notes
    res.readFile(path.join(__dirname, 'db/db.json'), 'utf8', (err, data) => {
        // Check if there's an error
        if (err) {
            console.error('Error reading notes data:', err);
            return res.status(500).json({ error: 'Error reading notes data' });
        }

        let notes = [];
        // Parse the JSON data into an array
        try {
            notes = JSON.parse(data)
        }
        // Check if there's an error parsing the notes
        catch (err) {
            console.log('Error parsing JSON File:', err);
            return res.status(500).json({ error: 'Error parsing notes data' });
        }
    })
})

// API to add a new note

// API to delete a note

app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);