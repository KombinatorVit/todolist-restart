import React from 'react';


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
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAc, removeTaskAC, tasksReducer} from "./state/task-reducer";
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

function AppWithRedux() {


    const tasks = useSelector<AppRootStateType, TaskStateType>((state) => state.tasks)
    const todolists = useSelector<AppRootStateType, TodolistsType[]>((state) => state.todolists)

    const dispatch = useDispatch()


    function addTodolist(title: string) {

        const action = AddTodolistAC(title)
        dispatch(action)
    }

    function changeFilter(todolistID: string, value: FilterValueType) {


        dispatch(ChangeTodolistFilterAC(todolistID, value))


    }

    function removeTask(id: string, todolistId: string) {


        // setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== id)});
        dispatch(removeTaskAC(id, todolistId))

    }

    function addTask(title: string, todolistId: string) {

        dispatch(addTaskAC(title, todolistId))

    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {

        dispatch(changeTaskTitleAc(id, newTitle, todolistId))
    }

    function changeTaskStatus(id: string, isDone: boolean, todolistId: string) {


        dispatch(changeTaskStatusAC(id, isDone, todolistId))
    }


    function removeTodolist(id: string) {
        dispatch(RemoveTodolistAC(id));
    }


    let changeTodolistTitle = (todolistId: string, newTitle: string) => {


        dispatch(ChangeTodolistTitleAC(todolistId, newTitle))


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

export default AppWithRedux;