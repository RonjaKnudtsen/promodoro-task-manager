import types from '../constants/actionTypes';

export function CreateTask(task){
    return {
        type: types.CREATE_TASK,
        task,
    }
}
export function FinishTask(taskId){
    return {
        type: types.FINISH_TASK,
        taskId,
    }
}
export function UpdateActivePromodoro(taskId, update){
    return{
        type: types.UPDATE_ACTIVE_PROMODORO,
        taskId,
        update
    }
}

export function CreatePromodoro(taskId, promodoro){
    return{
        type: types.CREATE_PROMODORO,
        taskId,
        promodoro
    }
}
