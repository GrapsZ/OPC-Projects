<?php
/**
 * The template for displaying the 404 content
 */
?>
<header class="entry-header text-center" <?php czr_fn_echo('element_attributes') ?>>
  <h1 class="entry-title big-text-10 m-t-05"><?php _e( '404', 'strasbourg') ?></h1>
  <h2><?php _e('Ooops, page introuvable', 'strasbourg') ?></h2>
</header>
<hr class='featurette-divider'>
<article id="post-0" class="post error404 no-results not-found row text-center">
  <div class="tc-content col-12">
    <div class="entry-content">
      <p><?php _e( 'Désolé, mais la page demandée est introuvable. Vous pourriez essayer une recherche ci-dessous.' , 'strasbourg' ) ?></p>
      <?php get_search_form() ?>
    </div>
  </div>
</article>