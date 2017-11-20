// Initiate tasks module
// Has to be global
const tasks = tasksModule('templates/task-template.html', document.getElementById('container'));

(function() {
    "use strict";
    
    const FORM_ID = 'frmNotes';
    
    // Set up DOM variables
    
    const containerHTML = document.getElementById('container');
    const formErrMsgHTML = document.querySelector('#' + FORM_ID + ' .error-msg');
    const formMainHTML = document.getElementById(FORM_ID);
    
    // Form inputs: 
    const contentHTML = document.getElementById('contentInput');
    const dateHTML = document.getElementById('dateInput');
    const timeHTML = document.getElementById('timeInput');

    

    // On form submit: 
    document.getElementById('btnSendForm').addEventListener('click', function (e) {
        // prevents refreshing the page when hitting the button
        e.preventDefault();
        
        if (validateForm(FORM_ID)) {
            // passed the validating: 
            // clear client error massage
            formErrMsgHTML.innerHTML = '';
            
            // Create task with user's data: 
            let tempTaskId = tasks.createTask(contentHTML.value, dateHTML.value, timeHTML.value);
            
            if (tempTaskId < 0) {
                // Date / Time validation did not pass
                formErrMsgHTML.innerHTML = '* Please use valid date and time formats';
            } else {
                
            // Add the new task to the DOM
            let task = tasks.getTaskHTML(tempTaskId);
            containerHTML.appendChild(task);
            
            // Reset the fields of the form
            formMainHTML.reset();
            }
        } else { 
            // Did not pass validation, therefore - mssging to the client.
            formErrMsgHTML.innerHTML = '* Please fill up all the required fields';
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
    
})();


    






