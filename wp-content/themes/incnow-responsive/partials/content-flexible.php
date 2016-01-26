	<?php  
		/*
		*  Loop through a Flexible Content field and display it's content with different views for different layouts
		*/
		 
		while( has_sub_field( 'content_layouts' ) ): ?>
		 
			<?php if( get_row_layout() == 'section' ): // layout: Section ?>
		 	<div class="row collapse">
		 		<div class="twelve columns">
					<div class="section folded-information">
						<h2 class="title">
							<span class="icon">
								<img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/icon-<?php echo get_sub_field( 'section_icon' ); ?>.png" />
							</span>						
							<?php the_sub_field( 'section_title' ); ?>
						</h2>
						
						<?php if( get_sub_field( 'section_intro' ) ) : // Check for the content intro?>
						<div class="intro">	
							<?php the_sub_field( 'section_intro' ); ?>
						</div>
						<?php endif; ?>
						
						<?php if( get_sub_field( 'section_content' ) ) : // Check for the Accordion ?>
						<dl class="accordion">
							<?php while(has_sub_field('section_content')): ?>
							
							<dt><a class="heading"><?php the_sub_field( 'content_heading' ); ?></a></dt>
							
							<?php if( get_sub_field( 'content_body' ) ) { ?>
								<dd><?php the_sub_field( 'content_body' ); ?></dd>
							<?php } ?>
							
							<?php if( get_sub_field( 'content_table' ) ) { ?>
							<dd>
								<table class="bare">
								<tbody>
								<?php while( has_sub_field('content_table') ): ?>
									<tr>
										<td><?php the_sub_field( 'table_label' ); ?></td>
										<td><?php the_sub_field( 'table_value' ); ?></td>
									</tr>
								<?php endwhile; ?>
								</tbody>
								</table>					
							<?php } ?>
							</dd>
							<?php endwhile; ?>
						</dl>
						<?php endif; ?>
					</div>
				</div>
			</div>
		 
			<?php endif; ?>

			<?php if( get_row_layout() == 'content' ): // layout: Open ?>
		 	<div class="row collapse">
				<div class="section content twelve columns ">
					<?php if( get_sub_field( 'content_title' ) ) : // Check for the content intro?>
					<h2 class="title">
						<?php the_sub_field( 'content_title' ); ?>
					</h2>
					<?php endif; ?>
					<div class="page content twelve columns">				
					<?php if( get_sub_field( 'content_editor' ) ) : // Check for the Accordion ?>
						<?php the_sub_field( 'content_editor' ); ?>
					<?php endif; ?>
					</div>
				</div>
		 	</div>
			<?php endif; ?>

			<?php if( get_row_layout() == 'standard_content' ): // layout: Standard WYSIWYG ?>
		 	<div class="row">
				<div class="section content twelve columns">					
					<div class="page content">				
					<?php if( get_sub_field( 'full_editor' ) ) :  ?>
						<?php the_sub_field( 'full_editor' ); ?>
					<?php endif; ?>		
					</div>	
				</div>
		 	</div>
			<?php endif; ?>
		 
		<?php endwhile; ?>