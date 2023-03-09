import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";


type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm = (props: AddItemFormPropsType) => {
    let [title, setTitle] = useState('');
    let [error, setError] = useState<string | null>(null);

    function onAddTaskHandler() {
        if (title.trim() !== '') {
            props.addItem(title);
            setTitle('');
        } else {
            setError('Title is required!')
        }

    }


    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value);
    }

    function onKeyPressHandler(e: KeyboardEvent<HTMLInputElement>) {
        setError(null)
        if (e.key === 'Enter') {
            onAddTaskHandler();
        }
    }


    return (
        <div>
            <TextField variant={'outlined'}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       label={'title'}
                       error={!!error}
                       helperText={error}
            />
            <IconButton  color={'primary'} size="small" onClick={onAddTaskHandler}><AddBox/></IconButton>
            {/*//style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}*/}
        </div>


    )
}

export default AddItemForm;