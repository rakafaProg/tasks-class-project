function tasksModule(url, htmlFather) {
    "use strict";
    
    // Initiate template module
    const tasksTemplate = templateModule(url, loadData);
    
    let tasksArray = [];
    let index = 0;
    
    
    function loadData() {
        // Get data from local storage, and add it to DOM
        let tasksJSON = window.localStorage.getItem('tasks');
        if (tasksJSON) {
            tasksArray = JSON.parse(tasksJSON);
            index = tasksArray.length;

            for (let i = 0; i < tasksArray.length; i++) 
                if(tasksArray[i]) 
                    htmlFather.appendChild(getTaskHTML(i));
        } 
    }
    
    function validateDate (date){
        return 1;
    }
    
    function validateTime (time){
        return 1;
    }
    
    
    // Task constractor
    function Task (content, date, time) {
        this.content = content;
        this.date = date;
        this.time = time;
        this.id = index;
    }
    
    function saveToStorage() {
        window.localStorage.setItem('tasks', JSON.stringify(tasksArray));
    }

    
    function createTask (content, date, time) {
        // Validating data before adding task
        if (!validateDate(date))
            return -1;
        if (!validateTime(time))
            return -1;
        
        // Add new task to array, and storage
        tasksArray[index] = new Task(content, date, time);
        saveToStorage();
        
        index ++;
        return index -1;
    }
    
    function getTaskHTML (taskIndex) {
        return tasksTemplate.toHTML(tasksArray[taskIndex]);
    }
    
    function updateTask (taskIndex, content) {
        // Update task in array, and update storage
        tasksArray[taskIndex].content = content;
        saveToStorage();
    }
    
    function deleteTask (taskIndex) {
        // Delete task from array and storage
        tasksArray[taskIndex] = null;
        saveToStorage();
    }
    
    return {
        // Return CRUD functions
        createTask: createTask,
        getTaskHTML: getTaskHTML,
        updateTask: updateTask,
        deleteTask: deleteTask
    }
}