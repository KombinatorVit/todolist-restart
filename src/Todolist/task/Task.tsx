import React, {ChangeEvent, FC, useCallback} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import EditableSpan from "../../editableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {TasksType} from "../../App";

type TaskPropsType = {
    task: TasksType
    id: string
    removeTask: (id: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newValue: string, todoListId: string) => void

}

export const Task: FC<TaskPropsType> = React.memo(({task, id, removeTask, changeTaskStatus, changeTaskTitle}) => {

        function removeTaskHandler() {
            removeTask(task.id, id);
        }

        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            changeTaskStatus(task.id, newIsDoneValue, id);
        };

        const onChangeTitleHandler = useCallback((newValue: string) => {
            changeTaskTitle(task.id, newValue, id,);
        }, [task.id, id]);

        return (
            <div className={task.isDone ? 'is-done' : ''}>
                <Checkbox color={'primary'}
                          checked={task.isDone}
                          onChange={onChangeStatusHandler}
                />
                <EditableSpan
                    title={task.title}
                    onChange={onChangeTitleHandler}
                />
                <IconButton
                    onClick={removeTaskHandler}>
                    <Delete/>
                </IconButton>
            </div>


        );
    }
)

