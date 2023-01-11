import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '17d54870-a5d6-48a5-87bc-30e6241cf46f',
    },
})


export const todolistAPI = {

    getTodolist() {
        return instance.get<TodolistType[]>('todo-lists')
    },

    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title})
    },

    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put<ResponseType>(
            `todo-lists/${todolistId}`,
            {title},
        )
        return promise
    },

    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    getTask(todolistId: string) {
        return instance.get<ResponseGetTaskType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ items: TaskResponseType }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(
            `todo-lists/${todolistId}/tasks/${taskId}`
        );
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<{items:TaskResponseType}>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }

}


type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}


export type ResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors?: Array<string>
    data: T
}

type TaskResponseType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

type ResponseGetTaskType = {
    items: TaskResponseType[]
    totalCount: number
    error: string | null
}