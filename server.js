const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();

const PORT = 3000;

//Takes a word as input
//Splits into individual characters and then is shuffled
//Then a scrambled word is produced
function scramble(word) {
    return word.split('').sort(() => Math.random() - 0.5).join('');
}

//Security
app.use(cors());

// Setting up for the static files
// Specifies the directory from which to serve static files
app.use(express.static(path.join(__dirname, 'build')));


app.get('/word', (req, res) => {
    //Reads the content of the english-words.csv file
    fs.readFile('english-words.csv', 'utf8', (err, data) => {
        //Error handling
        if (err) {
            res.status(500).send('Error reading the file');
            return;
        }

        const words = data.trim().split('\n').map(line => line.split(',')[0].trim());
        const word = words[Math.floor(Math.random() * words.length)];
        //Sends a json response to the client
        res.json({
            scrambled: scramble(word),
            original: word
        });
    });
});

// Route handler that makes sure it handles all routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});