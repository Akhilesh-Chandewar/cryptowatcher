const express = require("express");
const cors = require("cors");
const {scrapper , getSingleCoin } = require("./scrapper functionality/scrapper");
const path = require("path");

const PORT = 8888;

const app = express();

app.use(cors());

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

app.get("/api/getdata", async (req, res, next) => {
    try {
        const data = await scrapper();
        res.status(200).json({
            success: true,
            data: data
        });
    } catch (error) {
        next(error); 
    }
});

app.get('/api/getsinglecoin/:name', async (req, res, next) => {
    const coinName = req.params.name;
    try{
        const data = await getSingleCoin(coinName);
        res.status(200).json({
            success: true,
            data: data
        });
    } catch (error) {
        next(error); 
    }
})

app.get("/api/download", async (req, res, next) => {
    try {
        const filePath = path.join(__dirname, 'data', 'marketCapData.json');
        res.download(filePath);
    } catch (error) {
        next(error);
    }
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
