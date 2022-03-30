import axios from "axios";
import dotenv from 'dotenv'
import { ALPHAVANTAGE_URL, EARNINGS_ANNUAL, INCOME_STATEMENT_ANNUAL } from "../utils/constants";
const ENV_VARS = dotenv.config().parsed as any


export const fetchPriceData = async (ticker: string, timeline: string, timelineUrl: string) => {
    try {
        const res = await axios.get(`${ALPHAVANTAGE_URL}?function=${timelineUrl}&symbol=${ticker}&apikey=${ENV_VARS.ALPHA_API_KEY}`)
        const stockData = Object.entries(res.data[timeline])
        const mappedStockData = stockData.map((entry) => {
            return {
                date: entry[0],
                prices: entry[1],
            }
        })
        return mappedStockData
    }
    catch (error) {
        console.error(error)
    }
}

export const fetchIncomeStatementData = async (ticker: string) => {
    const res = await axios.get(`${ALPHAVANTAGE_URL}?function=INCOME_STATEMENT&symbol=${ticker}&apikey=${ENV_VARS.ALPHA_API_KEY}`)
    return res.data[INCOME_STATEMENT_ANNUAL]
}

export const fetchEarningsData = async (ticker: string) => {
    const res = await axios.get(`${ALPHAVANTAGE_URL}?function=EARNINGS&symbol=${ticker}&apikey=${ENV_VARS.ALPHA_API_KEY}`)
    return res.data[EARNINGS_ANNUAL]
}

