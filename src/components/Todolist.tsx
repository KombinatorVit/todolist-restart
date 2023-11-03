import React from "react";
import {FilterValuesType, TaskType} from "../App";
import FilterButtons from "./FilterButtons";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
    changeFilter: (value: FilterValuesType) => void
    
}

export function Todolist(props: TodolistPropsType) {
    
    function removeTask(id: number) {
        props.removeTask(id)
    }
    
    return <div>
        <h3>{props.title}</h3>
        
        <div>
            <input/>
            <button>+</button>
        </div>
        
        <ul>
            
            {props.tasks.map(t => <li key={t.id}><input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                    <button onClick={() => removeTask(t.id)
                    }>✖️
                    </button>
                </li>
            )}
        </ul>
        <FilterButtons changeFilter={props.changeFilter}/>
    </div>
    
}
