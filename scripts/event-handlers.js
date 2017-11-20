const ID_ATTR_NAME = 'data-task-id';
function getTask(element) {
    let taskId = element.getAttribute(ID_ATTR_NAME);
    return {
        task: document.querySelector('div['+ID_ATTR_NAME+'="'+taskId+'"]'),
        content: document.querySelector('div['+ID_ATTR_NAME+'="'+taskId+'"] .content'),
        taskId: taskId
    };
}

function deleteHandler(e) {
    let task = getTask(e);
    
    // Delete task from data
    tasks.deleteTask(task.taskId);
    
    // Handle fade out effect: 
    task = task.task;
    task.style.opacity = 0;
    task.style.width = 0;
    task.style.padding = 0;
    task.style.margin = 0;
    
    // Delete element after fade out effect done
    setTimeout(function(){
        task.parentNode.removeChild(task);
    }, 2000);
    
}
    
function editHandler(e) {
    let task = getTask(e);
    
    // Make editing available
    task.task.setAttribute('data-mode','writing');
    task.content.removeAttribute('readonly');
}

function saveHandler(e) {
    let task = getTask(e);
    
    // Disable editing mode
    task.task.setAttribute('data-mode','reading');
    task.content.setAttribute('readonly', '');
    
    // Update task in data
    tasks.updateTask(task.taskId, task.content.value);
}
