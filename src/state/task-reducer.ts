import {TaskStateType} from "../App";
import {v1} from "uuid";


type ActionType =
    ReturnType<typeof removeTaskAC> |
    ReturnType<typeof addTaskAC> |
    ReturnType<typeof changeTaskStatusAC>
export const tasksReducer = (state: TaskStateType, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.id)}
        case 'ADD-TASK':
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        case 'CHANGE-TASK-STATUS':
            return {...state, [action.todolistId]: state[action.todolistId].map(el => el.id === action.id ? {...el, isDone: action.isDone}: el)}
        default:
            throw new Error('I don\'t understand this type')
    }
}


export function removeTaskAC(id: string, todolistId: string) {
    return {
        type: 'REMOVE-TASK' as const,
        id,
        todolistId
    }
}

export function addTaskAC(title: string, todolistId: string) {
    return {
        type: 'ADD-TASK' as const,
        title,
        todolistId
    }
}


export function changeTaskStatusAC(id: string, status: boolean, todolistId: string) {
    return {
        type: 'CHANGE-TASK-STATUS' as const,
        id,
        isDone: status,
        todolistId

    }
}
