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


export type TasksType = {
    [key: string]: TaskType[]
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })


    function addTask(todolistId: string, newTitle: string) {

        const task = {id: v1(), title: newTitle, isDone: false}

        setTasks({...tasks, [todolistId]: [task, ...tasks[todolistId]]})


    }

    function removeTask(taskId: string, todolistId: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }

    function changeFilter(todolistId: string, value: FilterValueType) {
        setTodolists(todolists.map(t => t.id === todolistId ? {...t, filter: value} : t))
    }

    function changeTaskStatus(id: string, isDone: boolean, todolistId: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === id ? {...t, isDone: isDone} : t)})
    }

    function removeTodolist(todolistId:string){
        setTodolists(todolists.filter(t=> t.id !== todolistID1))

        delete tasks[todolistId]
        setTasks({...tasks})


    }

    return (
        <div className='App'>


            {todolists.map(todolist => {
                let taskForTodolists = tasks[todolist.id]
                if (todolist.filter === 'active') {
                    taskForTodolists = tasks[todolist.id].filter(t => !t.isDone)
                }

                if (todolist.filter === 'completed') {
                    taskForTodolists = tasks[todolist.id].filter(t => t.isDone)
                }
                return (
                    <Todolist
                        todolistId={todolist.id}
                        key={todolist.id}
                        title={todolist.title}
                        tasks={taskForTodolists}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={todolist.filter}
                        removeTodolist={removeTodolist}
                    />
                )
            })}
        </div>
    )
}

export default App;


