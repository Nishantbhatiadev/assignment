import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    Credential: true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

const romanMap = {
    1: ['I', 'II', 'III'],
    2: ['IV', 'V', 'VI'],
    3: ['VII', 'VIII', 'IX'],
    4: ['X', 'XI', 'XII'],
    5: ['XIII', 'XIV', 'XV'],
    6: ['XVI', 'XVII', 'XVIII'],
    7: ['XIX', 'XX', 'XXI'],
    8: ['XXII', 'XXIII', 'XXIV'],
    9: ['XXV', 'XXVI', 'XXVII'],
}

app.get('/api/alphabets', (req, res) => {
    res.json(['A', 'B', 'C']);
  });
  
  app.get('/api/numbers/:alphabet', (req, res) => {
    const { alphabet } = req.params;
    res.json(data[alphabet]?.numbers || []);
  });
  
  app.get('/api/romans/:number', (req, res) => {
    const { number } = req.params;
    res.json(romanMap[number] || []);
  });
  

export { app }