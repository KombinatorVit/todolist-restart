import {Todolist} from "./components/Todolist";
import {useState} from "react";
import {v1} from "uuid";
import './App.module.scss'
import classes from "./App.module.scss";


export type TasksStateType = {
    [key: string]: TasksType[]
}
export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}


export type FilterValueType = 'active' | 'all' | 'completed'

function App() {


    // const [tasks, setTasks] = useState<TasksType[]>([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false}
    // ])


    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
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


    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== taskId)})

    }


    const changeFilter = (todolistId: string, value: FilterValueType) => {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter: value} : el))
    }


    function addTask(todolistId: string, value: string) {

        const newTask = {id: v1(), title: value, isDone: false}

        setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})

    }


    function changeTaskStatus(todolistId: string, id: string, isDone: boolean) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === id ? {...el, isDone} : el)})
    }


    function removeTodolist(id: string) {
        setTodolists(todolists.filter(t => t.id !== id))

        delete tasks[id]
        setTasks({...tasks})
    }

    return (
        <div className={classes.App}>
            {todolists.map((el) => {

                let tasksForTodolist = tasks[el.id]

                if (el.filter === 'active') {
                    tasksForTodolist = tasks[el.id].filter(t => !t.isDone)
                }

                if (el.filter === 'completed') {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone)
                }
                return (
                    <Todolist key={el.id} todolistId={el.id} tasks={tasksForTodolist} title={el.title}
                              removeTask={removeTask}
                              changeFilter={changeFilter} addTask={addTask} changeTaskStatus={changeTaskStatus}
                              filter={el.filter} removeTodolist={removeTodolist}
                    />
                )
            })
            }


        </div>
    );
}

export default App;
