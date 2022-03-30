import StockData from '../db/models/StockData'
import { Router } from 'express';
import { processStockDataModelRequest, StockDataModelRequestType } from '../stockdata/StockDataHandler';
/**
 * CRUD CONTROLLERS
 */

const StockDataRouter = Router();

const createOne = async (req: any, res: any, next: any) => {
    console.log("createOne: [POST] /stocks/");
    try {
        const stockDataModel: StockDataModelRequestType = {
            stocktickers: req.body.tickers,
            dataselection: req.body.dataSelection,
        }

        try {
            const STOCKDATA_DB_MODEL = await StockData.create(stockDataModel);
            console.log("OK createOne USER: ", STOCKDATA_DB_MODEL);

            const stockDataModelResponse = await processStockDataModelRequest(stockDataModel)
            const response = {
                model: STOCKDATA_DB_MODEL,
                stockdata: stockDataModelResponse
            }
            return res.status(201).json(response);
        } catch (error) {
            console.error('ERROR in createOne ', error);
            return res.status(500).json(error);
        }
    } catch (error) {
        return res.status(400).json("Bad Request");
    }
};

const getAll = async (req: any, res: any, next: any) => {
    console.log("getAll: [GET] /stocks/");
    try {
        const STOCKDATA_DB_MODEL: any = await StockData.findAll({ raw: true });
        const dbModel = STOCKDATA_DB_MODEL[0]
        const stockDataModel: StockDataModelRequestType = {
            stocktickers: dbModel.stocktickers,
            dataselection: dbModel.dataselection
        }
        const stockDataModelResponse = await processStockDataModelRequest(stockDataModel)
        const response = {
            model: STOCKDATA_DB_MODEL,
            stockdata: stockDataModelResponse
        }
        return res.status(201).send(response);
    }
    catch (error) {
        console.error('ERROR in getAll ', error);
        return res.status(500).json(error);
    }
};

const deleteAll = async (req: any, res: any, next: any) => {
    console.log("getOne: [DELETE] /stocks/");
    try {
        const stockEntries = await StockData.findAll();
        stockEntries.forEach((stock) => {
            stock.destroy()
        })
        return res.status(204).json();
    } catch (error) {
        console.error('ERROR in getAll ', error);
        return res.status(500).json(error);
    }
};


StockDataRouter
    .get('/', getAll)
    .post('/', createOne)
    .delete('/', deleteAll)

export default StockDataRouter
