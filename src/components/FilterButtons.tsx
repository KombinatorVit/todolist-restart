import React from 'react';
import {FilterValuesType} from "../App";
import Button from "./Button";

type FilterButtonsPropsType = {
    changeFilter: (value: FilterValuesType) => void
}
const FilterButtons = (props: FilterButtonsPropsType) => {
    return (
        <div>
            <Button onClick={() => props.changeFilter('all')} name={'All'}/>
            <Button onClick={() => props.changeFilter('active')} name={'Active'}/>
            <Button onClick={() => props.changeFilter('completed')} name={'Completed'}/>
        </div>
    );
};

export default FilterButtons;