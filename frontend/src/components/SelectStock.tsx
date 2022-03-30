import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import VALID_TICKERS from "./util/Constants";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabelCustom from "./util/FormControlLabelCustom";
import SnackbarError from "./util/SnackbarError";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

const MAX_LIMIT = 2;

const SelectStock = () => {
    const [userStockPicks, setUserStockPicks] = useState<string[]>([]);
    const [userDataSelection, setDataSelection] = useState(new Set());
    const [openInvalidTickerSnackbar, setOpenInvalidTickerSnackbar] = useState(false);
    const [openInvalidDataSelection, setOpenInvalidDataSelection] = useState(false);
    const [openMaxLimitSnackbar, setOpenMaxLimitSnackbar] = useState(false);
    const [openInvalidSubmission, setOpenInvalidSubmission] = useState(false);
    const [inputText, setInputText] = useState("");
    const [isDailyChecked, setIsDailyChecked] = useState(false);
    const [isWeeklyChecked, setIsWeeklyChecked] = useState(false);
    const [isIncomeStatementChecked, setIsIncomeStatementChecked] = useState(false);
    const [isEarningsChecked, setIsEarningsChecked] = useState(false);
    const navigate = useNavigate();

    const resetUserStockPicks = () => {
        setUserStockPicks([]);
    };

    const addStockToList = () => {
        const ticker = inputText.toUpperCase();
        if (userStockPicks.length >= MAX_LIMIT) {
            setOpenMaxLimitSnackbar(true);
            return;
        }
        if (!VALID_TICKERS.has(ticker) || userStockPicks.includes(ticker)) {
            setOpenInvalidTickerSnackbar(true);
            return;
        }

        setUserStockPicks([...userStockPicks, ticker]);
        setInputText("");
    };

    const inputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
    };

    const closeSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        setOpenMaxLimitSnackbar(false);
        setOpenInvalidSubmission(false);
        setOpenInvalidTickerSnackbar(false);
        setOpenInvalidDataSelection(false);

        if (reason === "clickaway") {
            return;
        }

        return true;
    };

    const sumbitStocks = async () => {
        if (userDataSelection.size === 0 || userStockPicks.length === 0) {
            setOpenInvalidSubmission(true);
            return;
        }

        try {
            const body = {
                tickers: userStockPicks,
                dataSelection: Array.from(userDataSelection),
            };
            await fetch(`http://localhost:8080/stocks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });
            navigate(`/display`);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteStocks = () => {
        try {
            fetch(`http://localhost:8080/stocks`, {
                method: "DELETE",
            });
        } catch (error) {
            console.error(error);
        }
    };

    const flipDataSelection = (stateName: string, stateVar: boolean, setStateFunction: Function) => {
        // If true then it will be false so remove from set, otherwise add to set
        if (stateVar) {
            userDataSelection.delete(stateName);
        } else {
            userDataSelection.size >= 2 ? setOpenInvalidDataSelection(true) : userDataSelection.add(stateName);
        }

        setDataSelection(userDataSelection);
        setStateFunction(!stateVar);
    };

    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <h1>Please select up to {MAX_LIMIT} potential valid stock tickers</h1>
                    <br />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Ticker Symbol" variant="outlined" value={inputText} onChange={inputTextChange} />
                    <Button style={{ height: "100%" }} variant="contained" onClick={addStockToList}>
                        Add
                    </Button>
                </Grid>
                <Grid item>
                    <h1>{`${userStockPicks}`}</h1>
                </Grid>
            </Grid>
            <Grid container>
                <FormGroup>
                    <FormControlLabelCustom
                        onChange={flipDataSelection}
                        stateVar={isDailyChecked}
                        stateName="daily"
                        disabled={!isDailyChecked && userDataSelection.size >= 2}
                        setStateFunction={setIsDailyChecked}
                        label="Daily"
                    />
                    <FormControlLabelCustom
                        onChange={flipDataSelection}
                        stateVar={isWeeklyChecked}
                        disabled={!isWeeklyChecked && userDataSelection.size >= 2}
                        stateName="weekly"
                        setStateFunction={setIsWeeklyChecked}
                        label="Weekly"
                    />
                    <FormControlLabelCustom
                        onChange={flipDataSelection}
                        stateVar={isIncomeStatementChecked}
                        disabled={!isIncomeStatementChecked && userDataSelection.size >= 2}
                        stateName="income"
                        setStateFunction={setIsIncomeStatementChecked}
                        label="Income Statement"
                    />
                    <FormControlLabelCustom
                        onChange={flipDataSelection}
                        stateVar={isEarningsChecked}
                        disabled={!isEarningsChecked && userDataSelection.size >= 2}
                        stateName="earnings"
                        setStateFunction={setIsEarningsChecked}
                        label="Earnings"
                    />
                </FormGroup>
            </Grid>
            <Grid container>
                <Grid item>
                    <Button variant="outlined" onClick={sumbitStocks}>
                        Sumbit
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="outlined" onClick={resetUserStockPicks}>
                        Clear List
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="outlined" onClick={deleteStocks}>
                        Clear Database
                    </Button>
                </Grid>
            </Grid>
            <SnackbarError
                open={openInvalidDataSelection}
                close={closeSnackbar}
                message={"You can only pick a maximum of two data selections"}
            />
            <SnackbarError
                open={openInvalidTickerSnackbar}
                close={closeSnackbar}
                message={"Please enter a valid stock ticker"}
            />
            <SnackbarError
                open={openMaxLimitSnackbar}
                close={closeSnackbar}
                message={`Max Limit of ${MAX_LIMIT} Tickers Reached`}
            />
            <SnackbarError
                open={openInvalidSubmission}
                close={closeSnackbar}
                message={"Please have one ticker and one data selection chosen"}
            />
        </div>
    );
};

export default SelectStock;
