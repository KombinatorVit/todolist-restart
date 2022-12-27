import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist/Todolist";
import {v1} from "uuid";


export type FilterValueType = 'active' | 'all' | 'completed'

function App() {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ])
    const [filter, setFilter] = useState<FilterValueType>('active')

    function removeTask(taskId: string) {
        setTasks(tasks.filter(t => t.id !== taskId))
    }

    function changeFilter(value: FilterValueType) {
        setFilter(value)
    }

    let taskForTodolists = tasks
    if (filter === 'active') {
        taskForTodolists = tasks.filter(t => !t.isDone)
    }

    if (filter === 'completed') {
        taskForTodolists = tasks.filter(t => t.isDone)
    }
    return (
        <div className='App'>
            <Todolist title="What to learn" task={taskForTodolists}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    )
}

export default App;


