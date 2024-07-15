// Package dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// Type/Module Imports
import { Request, Response } from 'express';
const { updateStocks } = require("./controllers/stock.ts");
const stockRoutes = require('./routes/stock.ts')

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/stocks', stockRoutes);

// Connect to mongoDB atlas
let updateStockInterval: NodeJS.Timeout | undefined;
try {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected Successfully")
        // Update stocksdata every 10 sec
        updateStockInterval = setInterval(() => {
            updateStocks();
        }, 10000);
    });
} catch (error) {
    console.error("Mongo Connection Error: ", error);
    clearInterval(updateStockInterval);
}

app.get('/', (req: Request, res: Response) => {
    res.send("Real Time Data Application")
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});