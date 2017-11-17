function tasksModule(url) {
    const tasksTemplate = templateModule(url);
    
    let tasksArray = [];
    let index = 0;
    
    function Task (content, date, time) {
        this.content = content;
        this.date = date;
        this.time = time;
        this.id = index;
    }

    function createTask (content, date, time) {
        tasksArray[index] = new Task(content, date, time);
        index ++;
        
        return index -1;
    }
    
    function getTaskHTML (taskIndex, deleteHanler, editHandler) {
        return tasksTemplate.toHTML(tasksArray[taskIndex]);
    }
    
    function updateTask (taskIndex, content) {
        tasksArray[taskIndex].content = content;
        return tasksTemplate.toHTML(tasksArray[taskIndex]);
    }
    
    function deleteTask (taskIndex) {
        tasksArray[taskIndex] = null;
    }
    
    return {
        createTask: createTask,
        getTaskHTML: getTaskHTML,
        updateTask: updateTask,
        deleteTask: deleteTask,
        allTasks: tasksArray
    }
}