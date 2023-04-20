import React, {ChangeEvent, FC, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (title: string) => void
}
const EditableSpan: FC<EditableSpanPropsType> = ({title,onChange}) => {
    const [editMode, setEditMode] = useState(false);
    const [value, setValue] = useState(title);

    function activeEditMode() {
        setEditMode(true);
        setValue(title);
    }

    function activeViewMode() {
        setEditMode(false);
        onChange(value)
    }

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        setValue(e.currentTarget.value);
    }

    return (
        <>
            {editMode ?
                <input type="text" value={value} onBlur={activeViewMode} onChange={onChangeHandler} autoFocus/>

                : <span onDoubleClick={activeEditMode}>{title}</span>
            }
        </>
    );
};

export default EditableSpan;