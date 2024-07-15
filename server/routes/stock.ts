const express = require("express");
const router = express.Router();

const {
    fetchAllStocks,
    fetchStockByCode
} = require("../controllers/stock.ts");

router.get("/fetchAll", fetchAllStocks);
router.get("/fetchByCode/:code", fetchStockByCode);

module.exports = router;