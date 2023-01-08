import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import { IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";


type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log('AddItemForm Called!')
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
        if (error !== null) {
            setError(null)

        }
        if (e.key === 'Enter') {
            onAddTaskHandler();
        }
    }


    return (
        <div>
            <TextField
                variant={'outlined'} value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                label={'Title'}
                helperText={error}
            />
            <IconButton color={'primary'} onClick={onAddTaskHandler}><AddBox/></IconButton>
        </div>


    )
})

export default AddItemForm;