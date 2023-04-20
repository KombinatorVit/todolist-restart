import React, {useState} from "react";
import "./App.css";
import {Todolist} from "./todolist/Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksStateType = {
    [id: string]: TasksType[]
}

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}

export type FilterValueType = "all" | "active" | "completed"

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"},
    ]);

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: "Rest API", isDone: true},
            {id: v1(), title: "GraphQL", isDone: false},
        ]
    });


    function removeTask(id: string, todoId: string) {

        setTasks({...tasks, [todoId]: tasks[todoId].filter(t => t.id !== id)});

    }


    function changeFilter(filterValue: FilterValueType, todoId: string) {
        setTodolists(todolists.map(t => t.id === todoId ? {...t, filter: filterValue} : t));
    }

    function addTask(title: string, todoId: string) {
        const newTask = {id: v1(), title, isDone: false};


        setTasks({...tasks, [todoId]: [newTask, ...tasks[todoId]]});
    }

    function changeTaskStatus(id: string, isDone: boolean, todoId: string) {
        setTasks({...tasks, [todoId]: tasks[todoId].map(el => el.id === id ? {...el, isDone} : el)});
    }

    function changeTaskTitle(id: string, title: string, todoId: string) {
        setTasks({...tasks, [todoId]: tasks[todoId].map(el => el.id === id ? {...el, title} : el)});
    }

    function removeTodolist(id: string) {
        setTodolists(todolists.filter(el => el.id !== id));
        delete tasks[id];
        setTasks({...tasks});

    }

    function addTodolist(title: string) {
        let newTodolistId = v1();
        let newTodolist: TodolistsType = {id: newTodolistId, title, filter: "all"};

        setTodolists([newTodolist, ...todolists]);
        setTasks({...tasks, [newTodolistId]: []});

    }

    function changeTodolistTitle(id: string, newTitle: string,) {
        setTodolists(todolists.map(t => t.id === id ? {...t, title: newTitle} : t));
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>


            {
                todolists.map(todo => {
                    let filteredTasks = tasks[todo.id];
                    if (todo.filter === "active") {
                        filteredTasks = tasks[todo.id].filter(task => task.isDone);
                    }
                    if (todo.filter === "completed") {
                        filteredTasks = tasks[todo.id].filter(t => !t.isDone);
                    }

                    return (
                        <Todolist key={todo.id} todoId={todo.id} title={todo.title} tasks={filteredTasks}
                                  removeTask={removeTask} changeFilter={changeFilter}
                                  addTask={addTask} changeTaskStatus={changeTaskStatus} filter={todo.filter}
                                  removeTodolist={removeTodolist} changeTaskTitle={changeTaskTitle}
                                  changeTodolistTitle={changeTodolistTitle}

                        />

                    );

                })

            }


        </div>
    );
}

export default App;
