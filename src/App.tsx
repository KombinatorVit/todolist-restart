import React, {useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import {TodoList} from "./Todolist/Todolist";
import AddItemForm from "./AddItemForm";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValueType = 'all' | 'active' | 'completed';

type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType

}

type TaskStateType = {
    [key: string]: Array<TasksType>
}

function App() {




    let todolistID1 = v1();
    let todolistID2 = v1();


    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]);

    let [tasks, setTasks] = useState<TaskStateType>({
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
        let newTodolistId = v1();
        let newTodolist: TodolistsType = {id: newTodolistId, title, filter: 'all'};
        setTodolists([newTodolist, ...todolists]);
        setTasks({
            ...tasks,
            [newTodolistId]: []
        });
    }

    function changeFilter(value: FilterValueType, todolistID: string) {


        setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter: value} : el));


    }

    function removeTask(id: string, todolistId: string) {


        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== id)});
    }

    function addTask(title: string, todolistId: string) {

        let task = {id: v1(), title: title, isDone: true};

        let todolistTasks = tasks[todolistId];
        tasks[todolistId] = [task, ...todolistTasks];

        setTasks({...tasks});

    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {

        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === id ? {...el, title: newTitle} : el )})
    }

    function changeTaskStatus(id: string, isDone: boolean, todolistId: string) {


        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === id ? {...el, isDone} : el)});
    }


    function removeTodolist(id: string) {
        setTodolists(todolists.filter(t => t.id !== id));
        delete tasks[id];

        setTasks({...tasks});
    }


    let changeTodolistTitle = (todolistId: string, newTitle: string) => {


        setTodolists(todolists.map(td => td.id=== todolistId ?{...td, title:newTitle} : td  ))


    };

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolists.map(t => {

                let taskForTodolist = tasks[t.id];

                if (t.filter === 'active') {
                    taskForTodolist = tasks[t.id].filter(t => !t.isDone);
                }
                if (t.filter === 'completed') {
                    taskForTodolist = tasks[t.id].filter(t => t.isDone);
                }

                return (
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
                );
            })}
        </div>

    );
}

export default App;