<?php get_header(); ?>
	
<div class="set-width">

    <?php get_sidebar(); ?>
    
    <div class="left">
        <div id="post">
        
            <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
            
                <?php the_content(); ?>
                
                <?php /*comments_template();*/ ?>
                
            <?php endwhile; else: ?>
            
                <p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
                
            <?php endif; ?>
        
        </div>
    </div>
    
    <hr class="clearfloat" />

</div><!-- .set-width -->
	
<?php get_footer(); ?>