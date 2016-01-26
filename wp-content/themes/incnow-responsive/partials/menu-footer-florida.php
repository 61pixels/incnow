
	      <?php // lets output the first 2 columns 581 staging
			$your_menu_id = '581';
			$menuitems = wp_get_nav_menu_items( $your_menu_id );
			?>

			<?php $counter = 1; ?>
			<?php $root = wp_list_filter( $menuitems, array('menu_item_parent' => '0') ); ?>
			<?php foreach ( $root as $root_menu_item ): ?>
			<?php $counter++; ?>
			<div class="block three columns">
				<h4><?php echo $root_menu_item->title; ?></h4>
				<ul>
				<?php $second_tier_items = wp_list_filter( $menuitems, array('menu_item_parent' => $root_menu_item->ID) ); ?>
					<?php foreach ( $second_tier_items as $second_tier_item ) : ?>							
						<li><a href="<?php echo $second_tier_item->url; ?>"><?php echo $second_tier_item->title; ?></a></li>								
					<?php endforeach; ?>
				</ul>
			</div>	
			<?php endforeach; ?>

			<?php // lets output the shared menu for Resources 548 local... 580 staging...
			$your_menu_id = '580';
			$menuitems = wp_get_nav_menu_items( $your_menu_id );
			?>

			<?php $counter = 1; ?>
			<?php $root = wp_list_filter( $menuitems, array('menu_item_parent' => '0') ); ?>
			<?php foreach ( $root as $root_menu_item ): ?>
			<?php $counter++; ?>
			<div class="block two columns">
				<h4><?php echo $root_menu_item->title; ?></h4>
				<ul>
				<?php $second_tier_items = wp_list_filter( $menuitems, array('menu_item_parent' => $root_menu_item->ID) ); ?>
					<?php foreach ( $second_tier_items as $second_tier_item ) : ?>							
						<li><a href="<?php echo $second_tier_item->url; ?>"><?php echo $second_tier_item->title; ?></a></li>								
					<?php endforeach; ?>
				</ul>
			</div>	
			<?php endforeach; ?>