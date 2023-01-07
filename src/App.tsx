import React, {useCallback} from 'react';


import './App.css';
import {TodoList} from "./Todolist/Todolist";
import AddItemForm from "./AddItemForm";
import MenuIcon from '@mui/icons-material/Menu';

import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC, RemoveTodolistAC,
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAc, removeTaskAC} from "./state/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

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


    const tasks = useSelector<AppRootStateType, TaskStateType>((state) => state.tasks)
    const todolists = useSelector<AppRootStateType, TodolistsType[]>((state) => state.todolists)

    const dispatch = useDispatch()


    const addTodolist = useCallback((title: string) => {

        const action = AddTodolistAC(title)
        dispatch(action)
    }, [dispatch])

    function changeFilter(todolistID: string, value: FilterValueType) {


        dispatch(ChangeTodolistFilterAC(todolistID, value))


    }

    const removeTask = useCallback((id: string, todolistId: string) => {


        dispatch(removeTaskAC(id, todolistId))

    }, [])

    const addTask = useCallback((title: string, todolistId: string) => {

        dispatch(addTaskAC(title, todolistId))

    }, [])

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAc(id, newTitle, todolistId))
    }, [])

    const changeTaskStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(id, isDone, todolistId))
    }, [])

    const removeTodolist = useCallback((id: string) => {
        dispatch(RemoveTodolistAC(id));
    }, [])


    const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {


        dispatch(ChangeTodolistTitleAC(todolistId, newTitle))


    }, [])

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


                        return (

                            <Grid item key={t.id}>
                                <Paper style={{padding: '10px'}}>
                                    <TodoList id={t.id}
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