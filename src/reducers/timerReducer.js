import types from '../constants/actionTypes';
import initialState from './initialState';

const timerReducer = (state = initialState.timer, action) => {
    switch(action.type){
        case types.START_TIMER:
            return {
                ...state,
                timerStarted: true,
            }
        case types.PAUSE_TIMER:
            return{
                ...state,
                hasPaused: true,
            }
        default:
            return state;
    }
}

export default timerReducer;