import express from 'express'
import cors from "cors"
import dotenv from 'dotenv'
import SequelizeConnection from './db/SequelizeConnection';
import bodyParser from 'body-parser'
import StockDataRouter from './controller/StockDataController';
import { fetchEarningsData, fetchPriceData } from './alphavantage/AlphavantageApi'
import { DAILY, DAILY_URL } from './utils/constants';

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "PATCH", "DELETE"],
}))

const ENV_VARS = dotenv.config().parsed as any
const PORT = ENV_VARS.EXPRESS_PORT || 8080;

app.get('/', (req, res) => {
    res.status(200).send("Service is Healthy!")
})
app.use('/stocks', StockDataRouter)

const initializeService = async () => {
    try {
        await SequelizeConnection.sync({ force: false })
        app.listen(PORT, () => console.log(`Running on port ${PORT}`))
    }
    catch (error) {
        console.error(error)
    }

}
initializeService(); 