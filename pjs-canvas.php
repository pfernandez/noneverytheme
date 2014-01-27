<?php
/*
Template Name: Processing Canvas
*/

get_header();
?>
    
<article>
        
    <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
      
        <?php the_content(); ?>
                
        <?php /*comments_template();*/ ?>
                
    <?php endwhile; else: ?>
            
        <p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
                
    <?php endif; ?>
    
    <h5 class="signature"><a href="mailto:paul@noneverything.com">paul@noneverything.com</a>
    &nbsp;|&nbsp;
    <a href="https://twitter.com/share" class="twitter-share-button" data-via="paul4nandez">Tweet</a>
    <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
    </h5>
        
</article>

<canvas></canvas>
    
<?php get_footer(); ?>
