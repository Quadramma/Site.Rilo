	function bindSmothScroll() {
		$('a[href*=#]:not([href=#])').click(function() {
			if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				if (target.length) {
					$('html,body').animate({
						scrollTop: target.offset().top
					}, 200, function() {
					});
					return false;
				}
			}
		});
	}



	var _riloSiteApp = angular.module("RiloSiteApp", [])



	.controller("SiteController", function($scope, $timeout) {
		console.info("[PageController]");

/*
		$('#nav').localScroll({
			speed: 2000,
			lazy: true,
			stop: true
		});
	*/
		$('.intro').parallax("50%", 0.1);
		$('.rilogo').parallax("50%", 0.8);

		$.getJSON("photos.json").always(function(a, b, c) {
			console.info(a);
			$scope.$apply(function() {
				$scope.portraits = a.portraits;
				$scope.productions = a.productions;
				$scope.products = a.products;
			});
		});

		$scope.getClassForDot = function($last) {
			if ($last) {
				bindSmothScroll();
			}
			return "dot";
		};

		$scope.getPhotoClass = function(photo, id) {
			photo.id = id;
			console.info(photo.id);
			return "photo";
		}

		var parallaxVal1 = 0.1;
		var parallaxVal2 = 0.5;
		var parallaxVal3 = 0.3;
		var lastParallaxValSetted = parallaxVal3;

		$scope.setParallax = function(id) {
			//console.info("blabla parallax");
			var selectedParallaxVal = 1;
			if (lastParallaxValSetted == parallaxVal3) {
				selectedParallaxVal = parallaxVal1;
			}
			if (lastParallaxValSetted == parallaxVal1) {
				selectedParallaxVal = parallaxVal2;
			}
			if (lastParallaxValSetted == parallaxVal2) {
				selectedParallaxVal = parallaxVal3;
			}
			//$(id).parallax("50%", selectedParallaxVal);
		};


		var offset = 0;

		$scope.setPicture = function(scope, element, attrs, url, parallax) {
			console.info("setPicture URL: " + url);
			(function() {
				var fixurlforcss = './' + url;

				function setCSS(height) {
					element.css({
						'background-image': 'url(' + fixurlforcss + ')',
					/*	'background-size': 'cover',*/
						'height': height + offset + "px",
						
					});
					var id = "#" + element[0].id;
					if (parallax) scope.setParallax(id);
					//offset += 50;
				}
				var img = new Image();
				img.onload = function() {
					height = img.height;
					setCSS(height);
				};
				img.src = url;
			})();
		};

	})

	.directive('backImg', function() {
		return function(scope, element, attrs) {
			scope.setPicture(scope, element, attrs, attrs.backImg, false)
		};
	})

	.directive('backImgParallax', function() {
		return function(scope, element, attrs) {
			scope.setPicture(scope, element, attrs, attrs.backImgParallax, true)
		};
	});