// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

// Import libraries for AI models
const { GoogleGenerativeAI } = require('@google/generative-ai');
const OpenAI = require('openai'); // Correct import for OpenAI

const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Allows cross-origin requests from your frontend
app.use(bodyParser.json()); // Parses JSON bodies of incoming requests

// Initialize AI clients with keys from .env file
const genAI = new GoogleGenerativeAI(process.env.AIzaSyCyUWKHOj0UZohe0f03UYqwYKmdTHyEK3o);
const openai = new OpenAI({ apiKey: process.env.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 });

// Function to generate a prompt based on form data
function createPrompt(formData) {
    return `Buatkan modul ajar yang lengkap dan profesional dengan detail berikut:

Mata Pelajaran: ${formData.mataPelajaran}
Fase Kurikulum: ${formData.faseKurikulum}
Kelas: ${formData.kelas}
Semester: ${formData.semester}
Jumlah Sesi Pembelajaran: ${formData.jumlahSesi}
Materi/Topik Pembelajaran: ${formData.materiTopik}
Alokasi Waktu per Sesi: ${formData.alokasiWaktu}
Tujuan Pembelajaran: ${formData.tujuanPembelajaran}

Pastikan output mencakup poin-poin berikut secara terstruktur:
1. Informasi Umum (identitas modul)
2. Capaian Pembelajaran dan Tujuan Pembelajaran
3. Pemahaman Bermakna dan Pertanyaan Pemantik
4. Kegiatan Pembelajaran (pendahuluan, inti, penutup) untuk setiap sesi
5. Asesmen (diagnostik, formatif, sumatif)
6. Pengayaan dan Remedial
7. Refleksi Guru dan Peserta Didik
8. Lampiran (LKPD, media pembelajaran, dll)

Formatkan output menggunakan markdown yang rapi, dengan heading (#, ##, ###) dan daftar (list) untuk memudahkan pembacaan.`;
}

// Function to call Gemini API
async function generateWithGemini(prompt) {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return text;
    } catch (error) {
        console.error('Gemini API Error:', error.message);
        return null; // Return null on failure
    }
}

// Function to call ChatGPT API
async function generateWithChatGPT(prompt) {
    try {
        const chatCompletion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo', // You can use 'gpt-4o' for better quality if you have access
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
        });
        return chatCompletion.choices[0].message.content;
    } catch (error) {
        console.error('ChatGPT API Error:', error.message);
        return null; // Return null on failure
    }
}

// API Endpoint for generating the module
app.post('/generate-modul', async (req, res) => {
    const formData = req.body;
    const prompt = createPrompt(formData);

    if (!prompt) {
        return res.status(400).json({ error: 'Invalid form data' });
    }

    try {
        // Run both models in parallel
        const [geminiResult, chatgptResult] = await Promise.all([
            generateWithGemini(prompt),
            generateWithChatGPT(prompt)
        ]);
        
        let bestResult = '';
        
        // Choose the best result based on length and quality (a simple heuristic)
        if (geminiResult && chatgptResult) {
            // A simple check: choose the longer response, as it's likely more complete
            if (geminiResult.length >= chatgptResult.length) {
                bestResult = geminiResult;
            } else {
                bestResult = chatgptResult;
            }
            console.log('Both models responded. Chose the best one.');
        } else if (geminiResult) {
            bestResult = geminiResult;
            console.log('Only Gemini responded.');
        } else if (chatgptResult) {
            bestResult = chatgptResult;
            console.log('Only ChatGPT responded.');
        } else {
            throw new Error('Both AI models failed to generate content.');
        }

        // You can add more complex logic here to check for structure, headings, etc.
        if (!bestResult) {
            throw new Error('No AI model could generate a valid module.');
        }
        
        res.status(200).json({
            message: 'Module generated successfully!',
            bestResult: bestResult,
            metadata: formData // Send back the original form data if needed
        });

    } catch (error) {
        console.error('Generation process failed:', error);
        res.status(500).json({ error: error.message || 'Failed to generate module from AI. Please check your API keys or network connection.' });
    }
});

// Serve the frontend HTML file (optional, but convenient for local development)
app.use(express.static(__dirname)); // This serves files from the current directory
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log(`Backend server is running at http://localhost:${port}`);
});
