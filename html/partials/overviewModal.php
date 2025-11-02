<!-- Product Overview Modal -->
<div class="modal fade" id="overviewModal" tabindex="-1" aria-labelledby="overviewModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg modal-dialog-centered">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="overviewModalLabel"></h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<!-- Carousel -->
				<div id="overviewCarousel" class="carousel slide mb-4" data-bs-ride="carousel">
					<div class="carousel-inner" id="overview-carousel-inner"></div>
					<button class="carousel-control-prev" type="button" data-bs-target="#overviewCarousel" data-bs-slide="prev">
						<span class="carousel-control-prev-icon"></span>
					</button>
					<button class="carousel-control-next" type="button" data-bs-target="#overviewCarousel" data-bs-slide="next">
						<span class="carousel-control-next-icon"></span>
					</button>
					<!-- Image prevs -->
					<div id="overview-carousel-previews" class="d-flex justify-content-center gap-2 mt-3"></div>
				</div>
				<div class="mb-2"><span class="badge bg-info" id="overview-genre"></span></div>
				<div class="mb-3" id="overview-description"></div>
				<div class="h5 mb-0 text-success" id="overview-price"></div>
			</div>
			<div class="modal-footer justify-content-end">
				<button id="overview-add-to-cart" class="btn btn-success">
					Add to Cart
				</button>
			</div>
		</div>
	</div>
</div>