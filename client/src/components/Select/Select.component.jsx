import React from "react";
import SelectModelProps from "./Select.model";
// @ts-ignore
import Sugar from "../../JsonFiles/Coffee.json"

const OptionComponent = props => {

    const optionValue = Sugar.sugar.map((pattern) => {
        return (
            <option key={pattern.id}>{pattern.value}</option>
        )
    });

    return (
        optionValue
    );
}


export const SelectComponent = props => {
    const { value , onChange } = props 
    return(
        <select value={value} onChange={onChange} >
            <OptionComponent />
        </select>
    );
};


SelectComponent.propTypes = SelectModelProps