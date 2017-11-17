function tasksModule(url, htmlFather) {
    const tasksTemplate = templateModule(url);
    
    let tasksArray = [];
    let index = 0;
    
    
    function loadData() {
       tasksJSON = window.localStorage.getItem('tasks');
        if (tasksJSON) {
            tasksArray = JSON.parse(tasksJSON);
            index = tasksArray.length;

            for (let i = 0; i < tasksArray.length; i++) {
                if(tasksArray[i]) {
                    htmlFather.appendChild(getTaskHTML(i));
                }
            }
        } 
    }
    
    
    
    function Task (content, date, time) {
        this.content = content;
        this.date = date;
        this.time = time;
        this.id = index;
    }

    function createTask (content, date, time) {
        tasksArray[index] = new Task(content, date, time);
        index ++;
        window.localStorage.setItem('tasks', JSON.stringify(tasksArray));
        return index -1;
    }
    
    function getTaskHTML (taskIndex) {
        return tasksTemplate.toHTML(tasksArray[taskIndex]);
    }
    
    function updateTask (taskIndex, content) {
        tasksArray[taskIndex].content = content;
        
        window.localStorage.setItem('tasks', JSON.stringify(tasksArray));
        
        return tasksTemplate.toHTML(tasksArray[taskIndex]);
    }
    
    function deleteTask (taskIndex) {
        tasksArray[taskIndex] = null;
        window.localStorage.setItem('tasks', JSON.stringify(tasksArray));
    }
    
    return {
        createTask: createTask,
        getTaskHTML: getTaskHTML,
        updateTask: updateTask,
        deleteTask: deleteTask,
        allTasks: tasksArray,
        loadData: loadData
    }
}