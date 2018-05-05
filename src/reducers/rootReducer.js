import { combineReducers } from 'redux'
import taskReducer from './taskReducer'
import timerReducer from './timerReducer'

export default combineReducers({
    tasks: taskReducer,
    timer: timerReducer
})
