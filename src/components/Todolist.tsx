import {FilterValueType, TasksType} from "../App";
import {ChangeEvent, useState} from "react";
import classes from '../App.module.scss'

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
}


export function Todolist(props: TodoPropsType): JSX.Element {
    const [value, setValue] = useState('')
    const [error, setError] = useState<string | null>(null)

    function onInputHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(e.currentTarget.value)
    }

    function onClickHandler() {
        if (value.trim() !== '') {
            props.addTask(props.todolistId, value.trim())
        } else {
            setError('Title is required')
        }

        setValue('')

    }

    function onKeyPressHandler(e: React.KeyboardEvent<HTMLInputElement>) {
        setError(null)
        if (e.key === "Enter") {
            if (value) props.addTask(props.todolistId, value)
            setValue('')
        }
    }

    return (
        <div>
            <h3>{props.title}
                <button onClick={() => props.removeTodolist(props.todolistId)}>X</button>
            </h3>
            <div>
                <input value={value} onChange={onInputHandler} onKeyPress={onKeyPressHandler}
                       className={error ? classes.error : ''}/>
                <button onClick={onClickHandler}>+</button>
                {error && <div className={classes['error-message']}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map(t => {
                    function removeTaskHandler() {
                        props.removeTask(props.todolistId, t.id)
                    }

                    function onChangeStatusHandler(e: ChangeEvent<HTMLInputElement>) {
                        props.changeTaskStatus(props.todolistId, t.id, e.currentTarget.checked)
                    }

                    return <li key={t.id} className={t.isDone ? classes['is-done'] : ''}><input type="checkbox"
                                                                                                checked={t.isDone}
                                                                                                onChange={onChangeStatusHandler}/>
                        <span>{t.title}</span>
                        <button onClick={removeTaskHandler}>✖️</button>
                    </li>
                })}

            </ul>
            <div>
                <button onClick={() => props.changeFilter(props.todolistId, 'all')}
                        className={props.filter === 'all' ? classes['active-filter'] : ''}>All
                </button>
                <button onClick={() => props.changeFilter(props.todolistId, 'active')}
                        className={props.filter === 'active' ? classes['active-filter'] : ''}>Active
                </button>
                <button onClick={() => props.changeFilter(props.todolistId, 'completed')}
                        className={props.filter === 'completed' ? classes['active-filter'] : ''}>Completed
                </button>
            </div>
        </div>
    )
}