import {FilterValueType, TasksType} from "../App";
import {useState} from "react";

type TodoPropsType = {
    title: string
    tasks: TasksType[]
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValueType) => void
    addTask: (value: string) => void
}


export function Todolist(props: TodoPropsType): JSX.Element {
    const [value, setValue] = useState('')

    function onInputHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(e.currentTarget.value)
    }

    function onClickHandler() {
        if (value) props.addTask(value)
        setValue('')

    }

    function onKeyPressHandler(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            if (value) props.addTask(value)
            setValue('')
        }
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={value} onChange={onInputHandler} onKeyPress={onKeyPressHandler}/>
                <button onClick={onClickHandler}>+</button>
            </div>
            <ul>
                {props.tasks.map(t => {
                    function removeTaskHandler() {
                        props.removeTask(t.id)
                    }

                    return <li key={t.id}><input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                        <button onClick={removeTaskHandler}>✖️</button>
                    </li>
                })}

            </ul>
            <div>
                <button onClick={() => props.changeFilter('all')}>All</button>
                <button onClick={() => props.changeFilter('active')}>Active</button>
                <button onClick={() => props.changeFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}