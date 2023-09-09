import express from 'express';
import fileUpload from 'express-fileupload';
import pdfParse from 'pdf-parse';
import fetch from 'node-fetch';
import OpenAI from 'openai';

const app = express();
const port = 3000;

// Initialize OpenAI API with your API key
const openai = new OpenAI({
    key: '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', // Replace with your actual OpenAI API key
});

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