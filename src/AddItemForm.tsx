import React, {ChangeEvent, FC, useState} from "react";
import {Button} from "@mui/material";


type AddItemPropsType = {
    addItem: (title: string) => void
}

const AddItemForm: FC<AddItemPropsType> = ({addItem}) => {
    const [value, setValue] = useState("");
    const [error, setError] = useState<null | string>(null);

    function onAddTaskHandler() {

        if (value.trim() !== "") {
            addItem(value.trim());
            setValue("");
        } else {
            setError("Title is Required");
        }
    }


    function onChangeInputHandler(e: ChangeEvent<HTMLInputElement>) {
        setValue(e.currentTarget.value);
    }

    function onKeyPressHandler(e: React.KeyboardEvent<HTMLInputElement>) {
        setError(null);

        if (e.key === "Enter") {
            addItem(value);
            setValue("");
        }
    }

    return (
        <div>
            <input value={value} onChange={onChangeInputHandler} onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}/>
            <Button color={"primary"} variant={"contained"} size={"small"} onClick={onAddTaskHandler}>+</Button>
            {error && <div className={error ? "error-message" : ""}>{error}</div>}
        </div>
    );
};

export default AddItemForm;