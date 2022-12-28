import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist/Todolist";
import {v1} from "uuid";


export type FilterValueType = 'active' | 'all' | 'completed'
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}

function App() {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ])
    // const [filter, setFilter] = useState<FilterValueType>('all')
    let [todolists, setTodolists] = useState<Array<TodolistsType>>(
        [
            {id: v1(), title: 'What to learn', filter: 'all'},
            {id: v1(), title: 'What to buy', filter: 'all'},
        ]
    )


    function addTask(newTitle: string) {
        const task = {id: v1(), title: newTitle, isDone: false}
        setTasks([task, ...tasks])

    }

    function removeTask(taskId: string) {
        setTasks(tasks.filter(t => t.id !== taskId))
    }

    function changeFilter(id:string, value: FilterValueType) {
       setTodolists(  todolists.map(t => t.id === id ? {...t, filter:value}: t))
    }

    function changeTaskStatus(id: string, isDone: boolean) {
        setTasks(tasks.map(t => t.id === id ? {...t, isDone: isDone} : t))
    }


    return (
        <div className='App'>


            {todolists.map(todolist => {
                let taskForTodolists = tasks
                if (todolist.filter === 'active') {
                    taskForTodolists = tasks.filter(t => !t.isDone)
                }

                if (todolist.filter === 'completed') {
                    taskForTodolists = tasks.filter(t => t.isDone)
                }
                return (
                    <Todolist
                        id={todolist.id}
                        key={todolist.id}
                        title={todolist.title}
                        task={taskForTodolists}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeTaskStatus}
                              filter={todolist.filter}
                    />
                )
            })}
        </div>
    )
}

export default App;


