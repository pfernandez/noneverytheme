(function($){

    // Get the path to the current directory.
    var jsDirectory = SiteData.siteUrl + '/js';

    $(document).ready(function(){


        /**
         * Trigger actions when the browser window is resized.
         */
        $(window).resize(function() {
            slideMenu();
        });


        /**
         * Enable a resonsive drop-down menu for narrow width screen sizes.
         */
        function slideMenu() {

            // Return menu to normal expanded state.
            $(".right .contents").remove();
            $(".post-button").off("click.list");
            $(".right dl").show();

            // Convert to a drop-down menu if in single column mode.
            if( $(window).width() < 960 ) {        
        
                // Hide the contents list.
                var sidebar = $(".right");
                sidebar.height("auto");
                var list = sidebar.find("dl");
                list.hide();
        
                // Add the "Contents" element.
                contentsButton = document.createElement("h2");
                $(contentsButton).addClass("contents").text("Contents");
                sidebar.prepend(contentsButton);        
        
                $(".post-button, .contents").on("click.list", function() {
                    list.slideToggle();
                });
            }
        }
        slideMenu();


        /**
         * Display post and change url when an item is clicked.
         */
        $(".post-button a").click(function(e) {
        
            e.preventDefault();
            
            var id = $(this).data("postid");
            displayPost(id);
            
            window.history.pushState(null, id, "?p=" + id);
        });




        /**
         * Load post corresponding to address bar.
         */
        var webkitFirstLoad = true;
        window.onpopstate = function(event) {
            if (!webkitFirstLoad)
                loadPost();
            webkitFirstLoad = false;
        }

        
        /**
         * Load first post on initial page load.
         */
         function loadPost() {
            var id = location.search.split("?p=")[1];
            if(!id) id = 1;
            displayPost(id);
         }
         
         window.onload = function() {
            loadPost();
         }
         
         
        /**
         * Display contents of a file as a post.
         * Link tag must have attribute title="path/to/filename".
         *
         * string id = Link tag id attribute
         */
        function displayPost(id) {
            
            $('.post-button .active').removeClass('active');
            $('[data-postid=' + id + ']').addClass("active"); 
        
            $.post(
                SiteData.adminAjaxUrl,
                {
                    action: 'display_post_with_js',
                    requested_post: id
                },
                function(res){
                
                    $("#post").fadeOut(100, 0.0, function() {
                        $this = $(this);
                        $this.html(res.post_content);
                        $this.fadeIn(100);
                    });
                },
                'json'
            );
        }
        
    });

})(jQuery);
