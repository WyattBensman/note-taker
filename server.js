const express = require('express');
const app = express();
const PORT = 3000;

// Serve static files from the "public" folder
app.use(express.static('public'));

app.get('/', (req, rese) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})


app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);