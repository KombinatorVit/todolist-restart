import {Todolist} from "./components/Todolist";
import {useState} from "react";
import {v1} from "uuid";


export type TasksType = {
    id: string
    title: string
    isDone: boolean
}


export type FilterValueType = 'active' | 'all' | 'completed'

function App() {
    const [tasks, setTasks] = useState<TasksType[]>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ])
    const [filter, setFilter] = useState<FilterValueType>('all')

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }


    let tasksForTodolist = tasks

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.isDone === false)
    }

    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone === true)
    }
    const changeFilter = (value: FilterValueType) => {
        setFilter(value)
    }


    function addTask(value: string) {
        const newTask = {id: v1(), title:value, isDone: false}
        setTasks([newTask, ...tasks])
    }

    return (
        <div className="App">

            <Todolist tasks={tasksForTodolist} title={'What tot Learn'} removeTask={removeTask}
                      changeFilter={changeFilter} addTask={addTask}/>


        </div>
    );
}

export default App;
