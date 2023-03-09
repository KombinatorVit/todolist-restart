import {FilterValueType, TasksType} from "../App";
import {ChangeEvent} from "react";
import classes from '../App.module.scss'
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

type TodoPropsType = {
    todolistId: string
    title: string
    tasks: TasksType[]
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValueType) => void
    addTask: (todolistId: string, value: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filter: FilterValueType
    removeTodolist: (id: string) => void
    changeTaskTitle: (taskId: string, newValue: string, todoListId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void

}


export function Todolist(props: TodoPropsType): JSX.Element {

    function addTaskHandler(title: string) {
        props.addTask(props.todolistId, title)
    }

    function removeTodolistHandler() {
        props.removeTodolist(props.todolistId)
    }

    function changeTodolistTitle(newTitle: string) {
        props.changeTodolistTitle(props.todolistId, newTitle);

    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolistHandler}><Delete/></IconButton>
            </h3>
            <AddItemForm addItem={addTaskHandler}/>
            <div>
                {props.tasks.map(t => {
                    function removeTaskHandler() {
                        props.removeTask(props.todolistId, t.id)
                    }

                    function onChangeStatusHandler(e: ChangeEvent<HTMLInputElement>) {
                        props.changeTaskStatus(props.todolistId, t.id, e.currentTarget.checked)
                    }

                    function onChangeTitleHandler(title: string) {
                        props.changeTaskTitle(t.id, title, props.todolistId)
                    }

                    return <div key={t.id} className={t.isDone ? classes['is-done'] : ''}><Checkbox color={'primary'}
                                                                                                    checked={t.isDone}
                                                                                                    onChange={onChangeStatusHandler}/>
                        <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                        <IconButton onClick={removeTaskHandler}><Delete/></IconButton>
                    </div>
                })}

            </div>
            <div>
                <Button onClick={() => props.changeFilter(props.todolistId, 'all')}
                        color={'inherit'} variant={props.filter === 'all' ? 'outlined' : 'text'}
                >All
                </Button>
                <Button onClick={() => props.changeFilter(props.todolistId, 'active')} color={'primary'}
                        variant={props.filter === 'active' ? 'outlined' : 'text'}
                >Active
                </Button>
                <Button onClick={() => props.changeFilter(props.todolistId, 'completed')}
                        variant={props.filter === 'completed' ? 'outlined' : 'text'}
                        color={'secondary'}>Completed
                </Button>
            </div>
        </div>
    )
}