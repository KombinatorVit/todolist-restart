import React, {useEffect, useState} from 'react'
import {todolistApi} from "../api/todolists-api";

export default {
    title: 'API'
}


export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.createTodolist('NewTodolist').then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '81c9b405-3b74-4967-ad24-0563b6ce68e2'
    useEffect(() => {
        todolistApi.deleteTodolist(todolistId).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}


export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '81c9b405-3b74-4967-ad24-0563b6ce68e2'
        todolistApi.updateTodolist(todolistId, 'SOME NEW TITLE').then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.getTodolist()
            .then((res) => {
                setState(res.data)
            })


    }, [])
    return <div>{JSON.stringify(state)}</div>
}


export const GetTask = () => {
    const[state, setState] = useState<any>(null)

    useEffect(()=>{
        const todolistId = 'fcf7cd77-164d-47eb-b47b-3a72eda17e29'

        todolistApi.getTasks(todolistId).then((res)=>{
            setState(res.data.items)
        })
    },[])
    return <div>{JSON.stringify(state)}</div>

}


export const CreateTask = () => {
    const[state, setState] = useState<any>(null)

    useEffect(()=>{
        const todolistId = '21863b1d-b644-4060-8fca-47d4ca4944b2'

        todolistApi.createTask(todolistId, 'NEWTASK').then((res)=>{
            setState(res.data.data.item)
        })
    },[])
    return <div>{JSON.stringify(state)}</div>

}

export const DeleteTask = () => {
    const[state, setState] = useState<any>(null)

    useEffect(()=>{
        const todolistId = 'fcf7cd77-164d-47eb-b47b-3a72eda17e29'
        const taskId = '330e226d-1f4f-42f0-9485-0842f5cef2ff'

        todolistApi.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    },[])
    return <div>{JSON.stringify(state)}</div>

}

export const UpdateTask = () => {
    const[state, setState] = useState<any>(null)

    useEffect(()=>{
        const todolistId = '21863b1d-b644-4060-8fca-47d4ca4944b2'
        const taskId = 'f978a2ec-ddfb-4774-a983-5a90c6586730'

        todolistApi.updateTask(todolistId, taskId, {
            status: 0,
            deadline: '',
            priority: 0,
            startDate: '',
            title: 'trtr',
            description: 'task '
        })
            .then((res) => {
                console.log(res);
                setState(res.data.data.item)
            })

    },[])
    return <div>{JSON.stringify(state)}</div>

}