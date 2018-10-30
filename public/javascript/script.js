window.onload = function() {
    var converter = new showdown.Converter();
    var writingArea = document.querySelector("#writingArea");
    var displayArea = document.querySelector("#displayArea");   
    
    // maintain tab behavior inside textarea
    writingArea.addEventListener('keydown', function(e) {
        if((e.keyCode || e.which) === 9) { // tab was pressed
            var start = this.selectionStart,
                end = this.selectionEnd,
                target = e.target,
                value = target.value;

            target.value = value.substring(0, start) + "\t" + value.substring(end);

            // place cursor in correct location, instead of end of line
            this.selectionStart = this.selectionEnd = start + 1;

            e.preventDefault();
        }
    });

    var previouslyDisplayedText, displayText; 

    var convertTextToMarkdown = function(){
        displayText = writingArea.value;
        previouslyDisplayedText = displayText;
        html = converter.makeHtml(displayText);
        displayArea.innerHTML = html;
    };

    setInterval(function(){ 
        if(previouslyDisplayedText != displayText) 
            convertTextToMarkdown(); 
    }, 1000);

    writingArea.addEventListener("input", convertTextToMarkdown);

    var path = document.location.pathname;

    // Ignore sharing if on homepage
    if(path.length > 1){
        sharejs.open(path.substring(1), 'text', function(_, doc) {
            doc.attach_textarea(writingArea);
            convertTextToMarkdown();
        });
    }

    convertTextToMarkdown();
};