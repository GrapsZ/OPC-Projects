<?php
/*
Template Name : Page d'accueil
*/
?>
<?php get_header(); ?>

<?php while(have_posts()): the_post(); ?>
	<div class="hero-unit">
		<h1><?php the_title(); ?></h1>
		<?php the_content(); ?>
	</div>
<?php endwhile; ?>

<div class="page-header">
	<h1>Dernière actualité</h1>
</div>

<div class="row">
	<?php
	$query = new WP_query(array('post_type'=>'post','posts_per_page'=>1));
	while($query->have_posts()): $query->the_post(); global $post;
	?>
	<div class="span4">
		<h2><?php the_title(); ?></h2>
		<?php the_content(); ?>
	</div>
<?php endwhile; ?>
</div>

<?php get_footer(); ?>