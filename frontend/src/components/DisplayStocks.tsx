import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { v4 as uuidv4 } from "uuid";

const DisplayStocks = () => {
    const [userStockData, setUserStockData] = useState<any>();
    const [accordians, setAccordians] = useState<any>()

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

    const fetchUserStockData = async () => {
        try {
            const res = await fetch(`http://localhost:8080/stocks`, {
                method: "GET"
            });
            const json = await res.json();
            if (!json || json.length == 0) {
                navigate("/");
            }
            setUserStockData(json);
            const accoridanComponents = await createAccordians(json)
            setAccordians(accoridanComponents)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUserStockData();
    }, []);

    const navigate = useNavigate();

    const sendEmailClick = () => {
        
    }

    return (
        <div>
            <Button onClick={() => {navigate("/");}}>
                Go Back
            </Button>
            <Button onClick={sendEmailClick}>Send Email</Button>
            {userStockData && accordians}
        </div>
    );
};

export default DisplayStocks;
