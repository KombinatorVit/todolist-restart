import {Todolist} from "./components/Todolist";
import {useState} from "react";
import {v1} from "uuid";
import './App.module.scss'
import AddItemForm from "./components/AddItemForm";
import AppBarComponent from "./components/AppBar";
import {Container, Grid, Paper} from "@mui/material";


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


    function addTodolist(title: string) {
        const newTodolistId = v1()
        const newTodolist: TodolistsType = {id: newTodolistId, title, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({
            ...tasks,
            [newTodolistId]: []
        })
    }

    function addTask(todolistId: string, title: string) {

        const newTask = {id: v1(), title, isDone: false}
        console.log(tasks)

        setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})
        console.log(tasks)
    }


    function changeTaskStatus(todolistId: string, id: string, isDone: boolean) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === id ? {...el, isDone} : el)})
    }


    function removeTodolist(id: string) {
        setTodolists(todolists.filter(t => t.id !== id))

        delete tasks[id]
        setTasks({...tasks})
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === id ? {...el, title: newTitle} : el)})

    }


    function changeTodolistTitle(todolistId: string, newTitle: string) {
        setTodolists(todolists.map(td => td.id === todolistId ? {...td, title: newTitle} : td))
    }

    return (
        <div>
            <AppBarComponent/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>

                </Grid>
                <Grid container spacing={3}> {todolists.map((el) => {

                    let tasksForTodolist = tasks[el.id]

                    if (el.filter === 'active') {
                        tasksForTodolist = tasks[el.id].filter(t => !t.isDone)
                    }

                    if (el.filter === 'completed') {
                        tasksForTodolist = tasks[el.id].filter(t => t.isDone)
                    }
                    return (<Grid item>
                            <Paper style={{padding: '10px'}}>
                                <Todolist key={el.id} todolistId={el.id} tasks={tasksForTodolist} title={el.title}
                                          removeTask={removeTask}
                                          changeFilter={changeFilter} addTask={addTask}
                                          changeTaskStatus={changeTaskStatus}
                                          filter={el.filter} removeTodolist={removeTodolist}
                                          changeTaskTitle={changeTaskTitle} changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    )
                })
                }</Grid>
            </Container>

        </div>
    );
}

export default App;
