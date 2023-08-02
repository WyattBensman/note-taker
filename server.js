const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


// Middleware to parse JSON request body
app.use(express.json());

// Require Database
const notes = require('./db/db.json')

// Serve static files from the "public" folder
app.use(express.static('public'));

// Render the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

// Render the notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// API to get all of the notes
app.get('/api/notes', (req, res) => {
    // Read the JSON file to get/read the notes
    fs.readFile(path.join(__dirname, 'db/db.json'), 'utf8', (err, data) => {
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

        res.json(notes)
    })
})

// API to add a new note
app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;

    if (!title || !text) {
        return res.status(400).json({ error: 'Note title and text required' })
    }

    // Read the JSON file to get/read the notes
    fs.readFile(path.join(__dirname, 'db/db.json'), 'utf8', (err, data) => {
        // Check if there's an error
        if (err) {
            console.error('Error reading notes data:', err);
            return res.status(500).json({ error: 'Error reading notes data' });
        }

        let notesData = [];
        // Parse the JSON data into an array
        try {
            notesData = JSON.parse(data)
        }
        // Check if there's an error parsing the notes
        catch (err) {
            console.log('Error parsing JSON File:', err);
            return res.status(500).json({ error: 'Error parsing notes data' });
        }

        const newNote = {
            id: uuidv4(),
            title,
            text
        }

        notesData.push(newNote);

        fs.writeFile(path.join(__dirname, 'db/db.json'), JSON.stringify(notesData), (err) => {
            if (err) {
                console.error('Error writing notes data:', err);
                return res.status(500).json({ error: 'Error writing notes data' });
            }

            res.json(newNote);
        });
    });
});

// API to delete a note
app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;

    fs.readFile(path.join(__dirname, 'db/db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading notes data:', err);
            return res.status(500).json({ error: 'Error reading notes data' });
        }

        let notes = [];
        try {
            notes = JSON.parse(data);
        } catch (parseError) {
            console.error('Error parsing notes data:', parseError);
            return res.status(500).json({ error: 'Error parsing notes data' });
        }

        const updatedNotes = notes.filter((note) => note.id !== noteId);

        fs.writeFile(path.join(__dirname, 'db/db.json'), JSON.stringify(updatedNotes), (err) => {
            if (err) {
                console.error('Error writing notes data:', err);
                return res.status(500).json({ error: 'Error writing notes data' });
            }

            res.json({ message: 'Note deleted successfully' });
        });
    });
});

app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);