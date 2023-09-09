const express = require('express');
const fileUpload = require('express-fileupload');
const pdfParse = require('pdf-parse');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3030;

// Initialize OpenAI API with your API key

app.use('/', express.static('public'));
app.use(fileUpload());
app.use(express.json());

app.post('/extract-text', (req, res) => {
    if (!req.files || !req.files.pdfFile) {
        res.status(400).send('No PDF file uploaded.');
        return;
    }
    pdfParse(req.files.pdfFile.data).then(async (result) => {
        res.send(result.text);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
