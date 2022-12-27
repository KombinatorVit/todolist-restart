import React from "react";
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
}


export function Todolist({title, task,removeTask, changeFilter}: TodolistPropsType) {



    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    task.map(t => {


                        function onClickRemoveTaskHandler(){
                            removeTask(t.id)
                        }
                        return (<li key={t.id}><input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                        <button onClick={onClickRemoveTaskHandler}> ✖️</button>
                        </li>

                        )
                    })
                }
            </ul>
            <div>
                <button onClick={()=> changeFilter('all')}>All</button>
                <button onClick={()=> changeFilter('active')}>Active</button>
                <button onClick={()=> changeFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}