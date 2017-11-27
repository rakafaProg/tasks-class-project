
function templateModule(url, onReady) {
    "use strict";
    
    let templateString;
    
    // Get the HTML template.
    getData(url, function(data){
        templateString = data;
        onReady();
    });
    
    // get data
    function getData(url, callback) {

      function dataLoaded() {
             callback(this.responseText);
      };

      var req = new XMLHttpRequest();
      req.addEventListener('load', dataLoaded);
      req.open("GET", url);
      req.send();
    }

    // Use Template to create HTML element with data
    function toHTML(task) {
        
        let htmlString = templateString;
        htmlString = htmlString.replace('*content*', task.content);
        htmlString = htmlString.replace('*date*', task.date);
        htmlString = htmlString.replace('*time*', task.time);
        htmlString = htmlString.replace(/-id-/g, task.id);
        
        let tempHTML = document.createElement('div');
        tempHTML.innerHTML = htmlString;
        tempHTML.className = 'template-holder';
        
        // Handle fade in effect
        setTimeout(function(){tempHTML.style.opacity = '100';},50);
        
        
        return tempHTML;        
    }
    
    
    return {
        toHTML: toHTML
    }
}



