
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


function templateModule (url) {
    let templateString;
    
    getData(url, function(data){
        templateString = data;
    });
    
    
    
    function toHTML(task) {
        
        let htmlString = templateString;
        htmlString = htmlString.replace('*content*', task.content);
        htmlString = htmlString.replace('*date*', task.date);
        htmlString = htmlString.replace('*time*', task.time);
        htmlString = htmlString.replace(/-id-/g, task.id);
        let tempHTML = document.createElement('div');
        tempHTML.innerHTML = htmlString;
        
        return tempHTML;        
    }
    
    
    return {
        toHTML: toHTML
    }
}


function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}


