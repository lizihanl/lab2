const express = require('express');

const app = express();
app.use(express.json()); // read JSON BODY
app.use(express.urlencoded({ extended: true }));

// const cors = require('cors');
// app.use(cors());
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
<html lang="en" dir="ltr">
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<head>
    <link rel="stylesheet" href="index.css">
  </head>

<form id="chatbot-form">
    <label>Enter a message:</label>
    <input type="text" id="chatbot-input">
    <button type="submit">Submit</button>
</form>
<div id="chatbot-response"></div>

<div id="chat-history"></div>
</html>
  `);
});

app.post('/chatbot', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const message = req.body.message;
    const number = message.match(/\d+/);
    if (number) {
        fetch(`http://numbersapi.com/${number}?type=trivia`).then(response => response.text()).then(data => {
            res.json({
                text: data
            });
        }).catch(error => {
            res.json({
                text: "Sorry, I couldn't find any information about that number."
            });
        });
    } else {
        res.json({
            text: "I'm sorry, I didn't understand your question. Please provide a number for me to give you information about."
        });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port 3000`);
});

