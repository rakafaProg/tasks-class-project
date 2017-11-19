//(function () {
    "use strict";
    
    
    
    const FORM_ID = 'frmNotes';
    
    // set up DOM variables
    
    const containerHTML = document.getElementById('container');
    const formErrMsgHTML = document.querySelector('#' + FORM_ID + ' .error-msg');
    
    // form inputs: 
    const contentHTML = document.getElementById('contentInput');
    const dateHTML = document.getElementById('dateInput');
    const timeHTML = document.getElementById('timeInput');


    const tasks = tasksModule('templates/task-template.html', containerHTML);

    // set up events:
    document.getElementById('btnSendForm').addEventListener('click', function (e) {
        // prevents refreshing the page when hitting the button
        e.preventDefault();
        
        if (validateForm(FORM_ID)) {
            // clear client error massage
            formErrMsgHTML.innerHTML = '';
            
            let tempTask = tasks.createTask(contentHTML.value, dateHTML.value, timeHTML.value);
            let task = tasks.getTaskHTML(tempTask);
            containerHTML.appendChild(task);
            
            document.getElementById(FORM_ID).reset();
            
        } else { // not all the required field are filled, therefore - mssging to the client.
            formErrMsgHTML.innerHTML = '*Please fill up all the required fields';
        }
        
        

    });

    function validateForm(formId) {
        // get required fileds from the form
        const requiredFields = document.querySelectorAll('#' + formId + ' [required]');
        let isValid = true;

        for (let i = 0; i < requiredFields.length; i++) {
            if(!requiredFields[i].value){
                requiredFields[i].className += ' required';
                isValid = false;
            } else {
                requiredFields[i].className = requiredFields[i].className.replace(/required/g, '');
                
            }
        }

        return isValid;
    }
    
    
    
    
    
    

//}());

function deleteHandler(e) {
    console.log('deleteHandler');
    let taskId = e.getAttribute('data-task-id');
    console.log('taskId:' + taskId);
    tasks.deleteTask(taskId);
    let task = document.querySelector('div[data-task-id="'+taskId+'"]');
    console.log(task);
    
    task.style.opacity = 0;
    task.style.width = 0;
    task.style.padding = 0;
    task.style.margin = 0;
    setTimeout(function(){
        task.parentNode.removeChild(task);
    }, 2000);
    
    
    
}
    
function editHandler(e) {
    console.log('editHandler');
    let taskId = e.getAttribute('data-task-id');
    let task = document.querySelector('div[data-task-id="'+taskId+'"] .content');
    document.querySelector('div[data-task-id="'+taskId+'"]').setAttribute('data-mode','writing');
    task.removeAttribute('readonly');
    console.log(task);
}

function saveHandler(e) {
    console.log('saveHandler');
    let taskId = e.getAttribute('data-task-id');
    document.querySelector('div[data-task-id="'+taskId+'"]').setAttribute('data-mode','reading');
    let task = document.querySelector('div[data-task-id="'+taskId+'"] .content');
    tasks.updateTask(taskId, task.value);
    task.setAttribute('readonly', '');
}


