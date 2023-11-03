import React from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";

export  type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export function App() {
    
    let tasks1: TaskType[] = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'RestApi', isDone: false},
        {id: 5, title: 'GraphQL', isDone: true},
    
    ]
    const [tasks, setTasks] = React.useState(tasks1)
    const [filter, setFilter] = React.useState<FilterValuesType>('all')
    
    function removeTask(id: number) {
        setTasks(tasks.filter(t => t.id !== id)
        )
    }
    
    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }
    
    let tasksForTodolist = tasks;
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }
    return (
        <div className="App">
            
            
            <Todolist title={'Want to learn'}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        
        </div>
    );
}

