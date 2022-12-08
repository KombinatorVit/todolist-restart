import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {


    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
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


    function removeTask(id: string, todolistId: string) {


        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== id)})
    }

    function addTask(title: string, todolistId:string ) {


        setTasks({...tasks,[todolistId]:[{id: v1(), title: title, isDone: true}, ...tasks[todolistId]] })


    }

    function changeStatus(taskId: string, isDone: boolean) {
        // let task = tasks.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        // }
        //
        // setTasks([...tasks]);
    }


    function changeFilter(value: FilterValuesType, todolistId: string) {


        setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter: value} : el))
    }


    return (
        <div className="App">
            {
                todolists.map(todo => {
                    let tasksForTodolist = tasks[todo.id];

                    if (todo.filter === "active") {
                        tasksForTodolist = tasks[todo.id].filter(t => !t.isDone);
                    }
                    if (todo.filter === "completed") {
                        tasksForTodolist = tasks[todo.id].filter(t => t.isDone);
                    }


                    return <Todolist title={todo.title}
                                     key={todo.id}
                                     id={todo.id}
                                     tasks={tasksForTodolist}
                                     removeTask={removeTask}
                                     changeFilter={changeFilter}
                                     addTask={addTask}
                                     changeTaskStatus={changeStatus}
                                     filter={todo.filter}
                    />
                })
            }
        </div>
    );
}

export default App;
