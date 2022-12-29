import React, {useState} from "react";
import {FilterValueType} from "../App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (id: string, value: FilterValueType) => void
    addTask: (newTitle: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    filter: FilterValueType
    removeTodolist: (todolistIs: string) => void
}


export function Todolist({
                             todolistId,
                             title,
                             tasks,
                             removeTask,
                             changeFilter,
                             addTask,
                             changeTaskStatus,
                             filter,
                             removeTodolist
                         }: TodolistPropsType) {
    const [value, setValue] = useState('')
    const [error, setError] = useState<string | null>(null)

    function addTaskHandler() {
        if (value.trim() !== '') {
            addTask(todolistId, value.trim())
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
            addTask(todolistId, value.trim())
            setValue('')
        }
    }

    function onClickAllHandler() {
        changeFilter(todolistId, 'all')
    }

    function onClickCompletedHandler() {
        changeFilter(todolistId, 'completed')
    }

    function onClickActiveHandler() {
        changeFilter(todolistId, 'active')
    }


    function removeTodolistHandler() {
        removeTodolist(todolistId)
    }

    return (
        <div>
            <h3>{title}
                <button onClick={removeTodolistHandler}> x</button>
            </h3>

            <div>
                <input value={value} onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? 'error' : ''}/>
                <button onClick={addTaskHandler}>+</button>
                {error && <div className={'error-message'}> {error}</div>}
            </div>
            <ul>
                {
                    tasks.map(t => {


                        function onClickRemoveTaskHandler() {
                            removeTask(t.id, todolistId)
                        }

                        function changeStatusHandler(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
                            changeTaskStatus(t.id, e.currentTarget.checked, todolistId)
                        }

                        return (<li key={t.id} className={t.isDone ? 'is-done' : ''}><input type="checkbox"
                                                                                            checked={t.isDone}
                                                                                            onClick={changeStatusHandler}/>
                                <span>{t.title}</span>
                                <button onClick={onClickRemoveTaskHandler}> ✖️</button>
                            </li>

                        )
                    })
                }
            </ul>
            <div>
                <button onClick={onClickAllHandler} className={filter === 'all' ? 'active-filter' : ''}>All</button>
                <button onClick={onClickActiveHandler} className={filter === 'active' ? 'active-filter' : ''}>Active
                </button>
                <button onClick={onClickCompletedHandler}
                        className={filter === 'completed' ? 'active-filter' : ''}>Completed
                </button>
            </div>
        </div>
    )
}