import {TaskStateType} from "../App";

export type RemoveTaskACType = {
    type: 'REMOVE-TASK'
    id: string
    todolistId: string
}

type ActionType = RemoveTaskACType
export const tasksReducer = (state: TaskStateType, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(el=> el.id !== action.id)}

        default:
            throw new Error('I don\'t understand this type')
    }
}


export function removeTaskAC(id: string, todolistId: string): RemoveTaskACType{
    return {
        type: 'REMOVE-TASK',
        id,
        todolistId
}
}

