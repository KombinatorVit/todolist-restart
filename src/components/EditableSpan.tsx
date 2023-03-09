import React, {ChangeEvent, FC, useState} from 'react';
import {TextField} from "@mui/material";


type EditableSpanPropsType = {
    title: string
    onChange: (newTitle: string) => void
}

const EditableSpan: FC<EditableSpanPropsType> = (props) => {
    const [editMode, setEditMode] = useState(false)
    const [value, setValue] = useState(props.title)

    function activeEditMode() {
        setEditMode(true)
        setValue(props.title)
    }

    function activeViewMode() {
        setEditMode(false)
        props.onChange(value)

    }

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        setValue(e.currentTarget.value)
    }

    return (
        <>
            {editMode
                ? <TextField variant={'outlined'} value={value} autoFocus onBlur={activeViewMode}
                             onChange={onChangeHandler}/>
                : <span onDoubleClick={activeEditMode}>{props.title}</span>}
        </>

    );
};

export default EditableSpan;