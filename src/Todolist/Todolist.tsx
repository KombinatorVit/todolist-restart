import React, {useState} from "react";
import {FilterValueType} from "../App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    task: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValueType) => void
    addTask: (newTitle: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    filter: FilterValueType
}


export function Todolist({title, task, removeTask, changeFilter, addTask, changeTaskStatus, filter}: TodolistPropsType) {
    const [value, setValue] = useState('')
    const [error, setError] = useState<string | null>(null)

    function addTaskHandler() {
        if (value.trim() !== '') {
            addTask(value.trim())
            setValue('')
        } else {
            setError('Title is require')
        }

    }

    function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(e.currentTarget.value)
    }

    function onKeyPressHandler(e: React.KeyboardEvent<HTMLInputElement>) {
        setError(null)

        if (e.key === 'Enter') {
            addTask(value.trim())
            setValue('')
        }
    }

    function onClickAllHandler() {
        changeFilter('all')
    }

    function onClickCompletedHandler() {
        changeFilter('completed')
    }

    function onClickActiveHandler() {
        changeFilter('active')
    }


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={value} onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? 'error' : ''}/>
                <button onClick={addTaskHandler}>+</button>
                {error && <div className={'error-message'}> {error}</div>}
            </div>
            <ul>
                {
                    task.map(t => {


                        function onClickRemoveTaskHandler() {
                            removeTask(t.id)
                        }

                        function changeStatusHandler(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
                            changeTaskStatus(t.id, e.currentTarget.checked)
                        }

                        return (<li key={t.id}><input type="checkbox"   checked={t.isDone} onClick={changeStatusHandler} className={t.isDone ? 'is-done' : ''}/>
                                <span>{t.title}</span>
                                <button onClick={onClickRemoveTaskHandler}> ✖️</button>
                            </li>

                        )
                    })
                }
            </ul>
            <div>
                <button onClick={onClickAllHandler} className={filter === 'all' ? 'active-filter' : ''}>All</button>
                <button onClick={onClickActiveHandler} className={filter === 'active' ? 'active-filter' : ''}>Active</button>
                <button onClick={onClickCompletedHandler} className={filter === 'completed' ? 'active-filter' : ''}>Completed</button>
            </div>
        </div>
    )
}