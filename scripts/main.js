(function () {
    "use strict";
    
    const FORM_ID = 'frmNotes';
    
    // set up DOM variables
    const formErrMsgHTML = document.querySelector('#' + FORM_ID + ' .error-msg');


    // set up events:
    document.getElementById('btnSendForm').addEventListener('click', function (e) {
        // prevents refreshing the page when hitting the button
        e.preventDefault();
        
        if (validateForm(FORM_ID)) {
            // clear client error massage
            formErrMsgHTML.innerHTML = '';
            
            
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

}());
