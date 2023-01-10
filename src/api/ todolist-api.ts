import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '17d54870-a5d6-48a5-87bc-30e6241cf46f',
    },
};

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        const promise = axios.put(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
            {title},
            settings
        )
        return promise
    },
    getTodolist(){
        return axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
    },
    deleteTodolist(todolistId: string){
        return axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
    },
    createTodolist(title:string){
        return axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists',{title}, settings)
    }
}
