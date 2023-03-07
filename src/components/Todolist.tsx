import {FilterValueType, TasksType} from "../App";

type TodoPropsType = {
    title: string
    tasks: TasksType[]
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValueType) => void
}


export function Todolist(props: TodoPropsType): JSX.Element {


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(t => {
                    return <li key={t.id}><input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                        <button onClick={() => props.removeTask(t.id)}>✖️</button>
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