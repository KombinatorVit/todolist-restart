import React from "react";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    task: Array<TaskType>
}

export function Todolist({title, task}: TodolistPropsType) {
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
                        return (<li key={t.id}><input type="checkbox" checked={t.isDone}/> <span>{t.title}</span></li>

                        )
                    })
                }
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}