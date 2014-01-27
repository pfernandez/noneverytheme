(function($){
$(document).ready(function() {

    var path = 'http://noneverything.com/wp-content/themes/noneverything/projects/pjs-test';
    
    var container = $('.pjs-container'); 

    $.getScript(path + '/processing-1.3.6.min.js', function() {
	
        // Display the selected sketch.
        var p = null;
        function newSketch(pdeFile) {
            if(p) {
                p.exit();
                delete p;
            }
            var fileRequest = new window.XMLHttpRequest();
            fileRequest.open('GET', pdeFile, false);
            fileRequest.send(null);
            var canvas = $('canvas')[0];
            p = new Processing(canvas, fileRequest.responseText);
        }
    
        $('.contentsButton').click(function() {
            newSketch(this.name);
        });
    
        $(newSketch(path + '/test1.pde'));
    });
    
    // Hide/show menu and contact divs when canvas is clicked.
    $('#header').append('<h3 class="show-more">About this sketch</h3>'); 
    var article = $('article'); 
    $('.show-more').click(function () {
        if (article.css('right') == '0px' )
            article.animate({right: '-='+article.outerWidth()}, 300);
        else
            article.animate({ right: '+=' + article.outerWidth() }, 300);
    });
    
});
})(jQuery);
