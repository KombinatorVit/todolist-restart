import {FilterValueType, TodolistsType} from "../App";
import {v1} from "uuid";


type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string

}
type AddTodolistsActionType = {
    type: 'ADD-TODOLIST'
    title: string

}
type ChangeTodolistsFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValueType

}
type ChangeTodolistsTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string

}

type ActionType =
    RemoveTodolistActionType
    | AddTodolistsActionType
    | ChangeTodolistsFilterActionType
    | ChangeTodolistsTitleActionType
export const todolistsReducer = (state: TodolistsType[], action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.id)
        case 'ADD-TODOLIST':
            return [...state, {id: v1(), title: action.title, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
        default:
            throw new Error('I don\'t understand this type')
    }
}


export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodolistAC = (title: string): AddTodolistsActionType => {
    return {type: 'ADD-TODOLIST', title: title}
}
export const ChangeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistsTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title}
}
export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValueType): ChangeTodolistsFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter}
}