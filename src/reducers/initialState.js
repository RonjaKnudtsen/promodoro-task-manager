// This will be our initial state
export default {
    //this is the current timer for the open window. 
    timer: {
        timerStarted: null, //this will have a timestamp when started, and null when not
        paused: false,
        taskFinished: false,
    },
    //list of all tasks
    tasks: {
        allTasks: ['task1'], //array to keep the id
        tasks: {
            task1: {
                key: 'task1',
                name: 'Task 1',
                breakInterval: 10,
                finished: false,
                promodoros: [
                    {minutesLeft: 0, secondsLeft: 0, break: false, activeTask: false, startTime: 1525365941243},
                    {minutesLeft: 10, secondsLeft: 0, break: true, activeTask: true,  startTime: 1525521036018},
                ],
            
            }
            //label, list of promodoros and breaks with their timestamp
        }, //tasks saved as objects in object
    }

    //Suggetion, would probably change. ^
}