import React, {ChangeEvent, FC} from "react";
import {FilterValueType, TasksType} from "../App";
import AddItemForm from "../AddItemForm";
import EditableSpan from "../EditableSpan";

type TodolistPropsType = {
    title: string
    tasks: TasksType[]
    removeTask: (id: string, todoId: string) => void
    changeFilter: (value: FilterValueType, todoId: string) => void
    addTask: (title: string, todoId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoId: string) => void
    changeTaskTitle: (id: string, title: string, todoId: string) => void
    filter: FilterValueType
    todoId: string
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, title: string) => void
}

export const Todolist: FC<TodolistPropsType> = ({
                                                    title,
                                                    tasks,
                                                    removeTask,
                                                    changeFilter,
                                                    addTask,
                                                    changeTaskStatus,
                                                    filter, todoId, removeTodolist, changeTaskTitle, changeTodolistTitle
                                                }) => {


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

    function addTaskHandler(title: string) {
        addTask(title, todoId);
    }

    function onChangeTodolistHandler(title: string) {
        changeTodolistTitle(todoId, title);
    }

    return (
        <div>
            <h3>
                <EditableSpan title={title} onChange={onChangeTodolistHandler}/>
                <button onClick={onClickRemoveButtonHandler}>x</button>
            </h3>
            <div>
                <AddItemForm addItem={addTaskHandler}/>
            </div>
            <ul>

                {tasks.map((task) => {
                    function removeTaskHandler() {
                        removeTask(task.id, todoId);
                    }


                    function onChangeCheckedHandler(e: ChangeEvent<HTMLInputElement>) {
                        changeTaskStatus(task.id, e.currentTarget.checked, todoId);
                    }

                    function onChangeTaskHandler(title: string) {
                        changeTaskTitle(task.id, title, todoId);
                    }

                    return (

                        <div key={task.id}>
                            <li className={task.isDone ? "is-done" : ""}><input type="checkbox"
                                                                                onChange={onChangeCheckedHandler}
                                                                                checked={task.isDone}
                            />
                                <EditableSpan title={task.title} onChange={onChangeTaskHandler}/>
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