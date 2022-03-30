import { fetchEarningsData, fetchIncomeStatementData, fetchPriceData } from '../alphavantage/AlphavantageApi'
import { DAILY, DAILY_URL, WEEKLY, WEEKLY_URL } from '../utils/constants'

export type StockDataModelRequestType = {
    stocktickers: string[]
    dataselection: string[]
}

type StockDataModel = {
    dataType: string
    dataValue: any | any[]
}

export type StockDataModelResponseType = {
    ticker: string
    data: StockDataModel[]
}

export const processStockDataModelRequest = async (req: StockDataModelRequestType) => {
    const tickers = req.stocktickers
    const dataType = req.dataselection

    const stockDataModelsResponse: StockDataModelResponseType[] | any[] = await Promise.all(tickers.map(async (ticker) => {
        const models = await Promise.all(dataType.map(async (type) => {
            const data = await grabDataByType(ticker, type)
            return data
        }))

        const stockDataModelResponse = {
            ticker: ticker,
            data: models
        }
        return stockDataModelResponse
    }))
    return stockDataModelsResponse
}

const grabDataByType = async (ticker: string, dataType: string) => {
    if (dataType === 'daily') {
        const data = await fetchPriceData(ticker, DAILY, DAILY_URL)
        const model = createDataModel('daily', data)
        return model
    }
    else if (dataType === 'weekly') {
        const data = await fetchPriceData(ticker, WEEKLY, WEEKLY_URL)
        const model = createDataModel('weekly', data)
        return model
    }
    else if (dataType === 'income') {
        const data = await fetchIncomeStatementData(ticker)
        const model = createDataModel('income', data)
        return model
    }
    else if (dataType === 'earnings') {
        const data = await fetchEarningsData(ticker)
        const model = createDataModel('earnings', data)
        return model
    }
    else {
        console.error('Data Type is Invalid')
        const model = await createDataModel('Invalid Data', [])
        return model
    }
}

const createDataModel = (type: string, value: any) => {
    const model: StockDataModel = {
        dataType: type,
        dataValue: value
    }
    return model
}