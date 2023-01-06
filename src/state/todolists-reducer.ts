import {FilterValueType, TodolistsType} from "../App";
import {v1} from "uuid";


export type RemoveTodolistActionType = ReturnType<typeof RemoveTodolistAC>
export type AddTodolistsActionType = ReturnType<typeof AddTodolistAC>


type ActionType =
    RemoveTodolistActionType
    | AddTodolistsActionType
    | ReturnType<typeof ChangeTodolistFilterAC>
    | ReturnType<typeof ChangeTodolistTitleAC>

const initialState: TodolistsType[] = []

export const todolistsReducer = (state: Array<TodolistsType> = initialState, action: ActionType): Array<TodolistsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.id)
        case 'ADD-TODOLIST':
            return [
                ...state, {
                    id: action.todolistId, title: action.title, filter: 'all'
                }
            ]


        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
        default:
            return state
    }
}


export const RemoveTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST' as const, id: todolistId}
}
export const AddTodolistAC = (title: string) => {
    return {type: 'ADD-TODOLIST' as const, title, todolistId: v1()}
}
export const ChangeTodolistTitleAC = (todolistId: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE' as const, id: todolistId, title}
}
export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValueType) => {
    return {type: 'CHANGE-TODOLIST-FILTER' as const, id: todolistId, filter}
}