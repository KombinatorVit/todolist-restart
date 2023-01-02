import {TaskStateType} from "../App";
import {v1} from "uuid";



type ActionType =
    ReturnType<typeof removeTaskAC> |
    ReturnType<typeof addTaskAC>
export const tasksReducer = (state: TaskStateType, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(el=> el.id !== action.id)}
        case 'ADD-TASK' as const:
            return {...state, [action.todolistId]: [{id: v1(), title:action.title, isDone: false}, ...state[action.todolistId]]}
        default:
            throw new Error('I don\'t understand this type')
    }
}


export function removeTaskAC(id: string, todolistId: string){
    return {
        type: 'REMOVE-TASK' as const,
        id,
        todolistId
}
}

export function addTaskAC(title:string, todolistId: string){
    return{
        type: 'ADD-TASK' as const,
        title,
        todolistId
    }
}

