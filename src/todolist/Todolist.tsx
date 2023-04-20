import React, {ChangeEvent, FC, useState} from "react";
import {FilterValueType, TasksType} from "../App";

type TodolistPropsType = {
    title: string
    tasks: TasksType[]
    removeTask: (id: string, todoId: string) => void
    changeFilter: (value: FilterValueType, todoId: string) => void
    addTask: (title: string, todoId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoId: string) => void
    filter: FilterValueType
    todoId: string
    removeTodolist: (id: string) => void
}

export const Todolist: FC<TodolistPropsType> = ({
                                                    title,
                                                    tasks,
                                                    removeTask,
                                                    changeFilter,
                                                    addTask,
                                                    changeTaskStatus,
                                                    filter, todoId, removeTodolist
                                                }) => {
    const [value, setValue] = useState("");
    const [error, setError] = useState<null | string>(null);

    function onChangeInputHandler(e: ChangeEvent<HTMLInputElement>) {
        setValue(e.currentTarget.value);
    }

    function onAddTaskHandler() {

        if (value.trim() !== "") {
            addTask(value.trim(), todoId);
            setValue("");
        } else {
            setError("Title is Required");
        }


    }

    function onKeyPressHandler(e: React.KeyboardEvent<HTMLInputElement>) {
        setError(null);

        if (e.key === "Enter") {
            addTask(value, todoId);
            setValue("");
        }
    }

    function onAllClickHandler() {
        changeFilter("all", todoId);
    }

    function onActiveClickHandler() {
        changeFilter("active", todoId);
    }

    function onCompletedClickHandler() {
        changeFilter("completed", todoId);
    }

    function onClickRemoveButtonHandler() {
        removeTodolist(todoId);
    }

    return (
        <div>
            <h3>{title}
                <button onClick={onClickRemoveButtonHandler}>x</button>
            </h3>
            <div>
                <input value={value} onChange={onChangeInputHandler} onKeyPress={onKeyPressHandler}
                       className={error ? "error" : ""}/>
                <button onClick={onAddTaskHandler}>+</button>
                {error && <div className={error ? "error-message" : ""}>{error}</div>}
            </div>
            <ul>

                {tasks.map((task) => {
                    function removeTaskHandler() {
                        removeTask(task.id, todoId);
                    }


                    function onChangeCheckedHandler(e: ChangeEvent<HTMLInputElement>) {
                        changeTaskStatus(task.id, e.currentTarget.checked, todoId);
                    }

                    return (

                        <div key={task.id}>
                            <li className={task.isDone ? "is-done" : ""}><input type="checkbox"
                                                                                onChange={onChangeCheckedHandler}
                                                                                checked={task.isDone}
                            />
                                <span>{task.title}</span>

                                <button onClick={removeTaskHandler}>✖️</button>
                            </li>

                        </div>
                    );
                })}
            </ul>
            <div>
                <button onClick={onAllClickHandler} className={filter === "all" ? "active-filter" : ""}>All</button>
                <button onClick={onActiveClickHandler} className={filter === "active" ? "active-filter" : ""}>Active
                </button>
                <button onClick={onCompletedClickHandler}
                        className={filter === "completed" ? "active-filter" : ""}>Completed
                </button>
            </div>
        </div>
    );
};