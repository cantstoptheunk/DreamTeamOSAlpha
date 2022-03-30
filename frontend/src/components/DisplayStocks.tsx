import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { v4 as uuidv4 } from "uuid";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const DisplayStocks = () => {
    const [userStockData, setUserStockData] = useState<any>();
    const [accordians, setAccordians] = useState<any>();
    const [openEmailSnackBar, setOpenEmailSnackBar] = useState<any>();
    const navigate = useNavigate();

    const createAccordians = async (fetchedStockData: any) => {
        const models = fetchedStockData.stockdata;
        const nestedComponents = models.map((model: any) => {
            const ticker = model.ticker;
            const dataSet = model.data;
            const components = dataSet.map((data: any) => {
                const dataType = data.dataType;
                const dataValue = data.dataValue;
                return (
                    <Accordion key={uuidv4()}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>{dataType}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <pre>{JSON.stringify(dataValue, null, 2)}</pre>
                        </AccordionDetails>
                    </Accordion>
                );
            });

            return (
                <Accordion key={uuidv4()}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{ticker}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>{components}</AccordionDetails>
                </Accordion>
            );
        });

        return <div>{nestedComponents}</div>;
    };

    useEffect(() => {
        const fetchUserStockData = async () => {
            try {
                const res = await fetch(`http://localhost:8080/stocks`, {
                    method: "GET",
                });
                const json = await res.json();
                if (!json || json.length === 0) {
                    navigate("/");
                }
                setUserStockData(json);
                const accoridanComponents = await createAccordians(json);
                setAccordians(accoridanComponents);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserStockData();
    }, []);

    const closeSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        setOpenEmailSnackBar(false);

        if (reason === "clickaway") {
            return;
        }

        return true;
    };

    const sendEmailClick = async () => {
        try {
            await fetch(`http://localhost:8080/email`, {
                method: "POST",
            });
            setOpenEmailSnackBar(true)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Button
                onClick={() => {
                    navigate("/");
                }}
            >
                Go Back
            </Button>
            <Button onClick={sendEmailClick}>Send Email</Button>
            {userStockData && accordians}
            <Snackbar autoHideDuration={1500} open={openEmailSnackBar} onClose={closeSnackbar}>
                <Alert onClose={closeSnackbar} severity="success" sx={{ width: "100%" }}>
                    Email Successfully Sent!
                </Alert>
            </Snackbar>
        </div>
    );
};

export default DisplayStocks;
