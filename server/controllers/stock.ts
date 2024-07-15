const Stock = require("../models/stock.ts");
const { defaultStocks } = require("../constants/constant.ts");
const { getUpdatedStockRates } = require("../utilities/stockHelper.ts");

// Type definitions
import { Response, Request } from "express"
import { ResponseStockType, CustomStockType } from "./stock.type"

exports.fetchAllStocks = async (req: Request, res: Response) => {
    try {
        const allStocks = await Stock
        .find()
        .sort({ _id: -1 }); // Fetch All in ASC order

        res.status(200).json(allStocks);
    } catch (error) {
        res.status(404).json({
            message: `Fetch All Stocks Error: ${error}`
        })
    }
}

exports.fetchStockByCode = async (req: Request, res: Response) => {
    const { code } = req.params;
    try {
        const stockByCode = await Stock
        .find({ code });

        res.status(200).json(stockByCode);
    } catch (error) {
        res.status(404).json({
            message: `Could not find Stock ${code}: ${error}`
        })
    }
}

const updateStockByCode = async (stockDetail: ResponseStockType) => {
    const { code, name, rate, volume, cap } = stockDetail;
    try {
        // Get previous data for stock "code"
		const stockDetails: CustomStockType[] = await Stock
        .find({ code });
		
		const updatedStock: CustomStockType = {
            code,
            name,
            rates: getUpdatedStockRates(stockDetails, rate),
            volume,
            cap
        };

        await Stock.findOneAndUpdate({ code }, updatedStock, { new: true, upsert: true });  
    } catch (error) {
        throw new Error(`Could not update Stock ${code}: ${error}`);
    }
}

exports.updateStocks = async () => {
    try {
        // Fetch latest stock data from API
        const liveStocksResponse = await fetch(new Request(`${process.env.LIVE_COIN_WATCH_API_URL}/coins/map`), {
            method: "POST",
            headers: new Headers({
                "content-type": "application/json",
                "x-api-key": `${process.env.LIVE_COIN_WATCH_API_KEY}`,
            }),
            body: JSON.stringify({
                codes: defaultStocks,
                currency: "USD",
                sort: "rank",
                order: "ascending",
                offset: 0,
                limit: 0,
                meta: true,
            }),
        });
        const liveStocksData: ResponseStockType[] = await liveStocksResponse.json() as unknown as ResponseStockType[];

        // Update this in DB
        liveStocksData.forEach((stock: ResponseStockType) => updateStockByCode(stock));
        console.log(`Updated Stocks Successfully: ${liveStocksData}`);
    } catch (error) {
        console.log(`Update Stocks Controller Error: ${error}`);
    }
}