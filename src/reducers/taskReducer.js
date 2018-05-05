import types from '../constants/actionTypes';
import initialState from './initialState';

const taskReducer = (state = initialState.tasks, action) => {
    const {tasks, allTasks} = state;
    switch(action.type){
        case types.CREATE_TASK:
            allTasks.push(action.task.key);
            return {
                allTasks,
                tasks: {
                        ...tasks, 
                        [action.task.key]: {
                            ...action.task, 
                            promodoros: []
                        }
                    }
            }
        case types.FINISH_TASK:
            tasks[action.taskId].finished = true;
            return {
                tasks,
                allTasks
            }
        case types.CREATE_PROMODORO:
            tasks[action.taskId].promodoros.push({...action.promodoro, startTime: Date.now()});
            return{
                allTasks,
                tasks
            }
        case types.UPDATE_ACTIVE_PROMODORO:
            const taskPromodoros = tasks[action.taskId].promodoros.map(x => {
                if(x.activeTask === true){
                    x = {...x, ...action.update}
                }
                return x;
            });
            tasks[action.taskId].promodoros = taskPromodoros;
            return{
                allTasks,
                tasks,
            }
        default:
            return state;
    }
}

export default taskReducer;