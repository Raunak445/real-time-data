import { maxStockRatesLength } from "../constants/constant";
import { CustomStockType } from "../controllers/stock.type"

export const getUpdatedStockRates = (stockDetails: CustomStockType[], currentRate: number) => {
    let updatedRates: number[] = stockDetails[0]?.rates || [];
    updatedRates.unshift(currentRate);
    updatedRates = updatedRates.slice(0, maxStockRatesLength);

    return updatedRates;
}