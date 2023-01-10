import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '17d54870-a5d6-48a5-87bc-30e6241cf46f',
    },
})


export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put(
            `todo-lists/${todolistId}`,
            {title},
        )
        return promise
    },
    getTodolist() {
        return instance.get('todo-lists')
    },
    deleteTodolist(todolistId: string) {
        return instance.delete(`todo-lists/${todolistId}`)
    },
    createTodolist(title: string) {
        return instance.post('todo-lists', {title})
    }
}
