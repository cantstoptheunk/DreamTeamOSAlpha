import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import ReactDOM from "react-dom";
import SelectStock from "./components/SelectStock";
import DisplayStocks from "./components/DisplayStocks";

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<SelectStock />} />
            <Route path="/home" element={<SelectStock />} />
            <Route path="/display" element={<DisplayStocks />} />
        </Routes>
    </BrowserRouter>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
