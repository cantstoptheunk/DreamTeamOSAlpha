import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

type FormControlLabelType = {
    defaultChecked?: boolean;
    onChange: any;
    stateVar: boolean;
    stateName: string;
    setStateFunction: Function;
    label: string;
    disabled: boolean;
};

const FormControlLabelCustom = (props: FormControlLabelType) => {
    return (
        <FormControlLabel
            control={
                <Checkbox
                    disabled={props.disabled}
                    defaultChecked={props.defaultChecked}
                    onChange={() => props.onChange(props.stateName, props.stateVar, props.setStateFunction)}
                />
            }
            label={props.label}
        />
    );
};

export default FormControlLabelCustom;
