import {TaskStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistsActionType, RemoveTodolistActionType} from "./todolists-reducer";


type ActionType =
    ReturnType<typeof removeTaskAC> |
    ReturnType<typeof addTaskAC> |
    ReturnType<typeof changeTaskStatusAC> |
    ReturnType<typeof changeTaskTitleAc> |
    AddTodolistsActionType | RemoveTodolistActionType


const initialState: TaskStateType = {}
export const tasksReducer = (state: TaskStateType = initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.id)}
        case 'ADD-TASK':
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.id ? {
                    ...el,
                    isDone: action.isDone
                } : el)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.id ? {
                    ...el,
                    title: action.title
                } : el)
            }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
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

export function changeTaskTitleAc(id: string, title: string, todolistId: string) {
    return {
        type: 'CHANGE-TASK-TITLE' as const,
        id,
        title,
        todolistId
    }
}

