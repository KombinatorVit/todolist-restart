import React, {useReducer} from 'react';


import './App.css';
import {v1} from 'uuid';
import {TodoList} from "./Todolist/Todolist";
import AddItemForm from "./AddItemForm";
import MenuIcon from '@mui/icons-material/Menu';

import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC, RemoveTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAc, removeTaskAC, tasksReducer} from "./state/task-reducer";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValueType = 'all' | 'active' | 'completed';

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType

}

export type TaskStateType = {
    [key: string]: Array<TasksType>
}

function App() {


    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, dispatchToTodolistReducer] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]);

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    });

    function addTodolist(title: string) {

        const action = AddTodolistAC(title)
        dispatchToTasks(action)

        dispatchToTodolistReducer(action)
    }

    function changeFilter(todolistID: string, value: FilterValueType) {


        dispatchToTodolistReducer(ChangeTodolistFilterAC(todolistID, value))


    }

    function removeTask(id: string, todolistId: string) {


        // setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== id)});
        dispatchToTasks(removeTaskAC(id, todolistId))

    }

    function addTask(title: string, todolistId: string) {

        dispatchToTasks(addTaskAC(title, todolistId))

    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {

        dispatchToTasks(changeTaskTitleAc(id, newTitle, todolistId))
    }

    function changeTaskStatus(id: string, isDone: boolean, todolistId: string) {


        dispatchToTasks(changeTaskStatusAC(id, isDone, todolistId))
    }


    function removeTodolist(id: string) {
        dispatchToTodolistReducer(RemoveTodolistAC(id));
        dispatchToTasks(RemoveTodolistAC(id))
    }


    let changeTodolistTitle = (todolistId: string, newTitle: string) => {


        // setTodolists(todolists.map(td => td.id === todolistId ? {...td, title: newTitle} : td))
        dispatchToTodolistReducer(ChangeTodolistTitleAC(todolistId, newTitle))


    };

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Todolists
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>

                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(t => {

                        let taskForTodolist = tasks[t.id];

                        if (t.filter === 'active') {
                            taskForTodolist = tasks[t.id].filter(t => !t.isDone);
                        }
                        if (t.filter === 'completed') {
                            taskForTodolist = tasks[t.id].filter(t => t.isDone);
                        }

                        return (

                            <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <TodoList
                                        key={t.id}
                                        id={t.id}
                                        title={t.title}
                                        tasks={taskForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        filter={t.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}

                                    />
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </div>

    );
}

export default App;