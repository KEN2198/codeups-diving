// ローディングアニメーション
const keyName = "visited";
const keyValue = true;

const openingAnimation = () => {
	const openingTL = gsap.timeline();
	openingTL
		.fromTo(".js-loading-title", { clipPath: "inset(100% 0 0 0)", scale: 1.1, autoAlpha: 0 }, { clipPath: "inset(0% 0 0 0)", scale: 1, autoAlpha: 1, duration: 2, ease: "power4.out", delay: 1 })
		.fromTo(".js-loading-img", { y: "100%" }, { y: "0%", duration: 2, ease: "power4.out", stagger: 0.1 }, "-=0.5")
		.to(".js-loading-title", { autoAlpha: 0, duration: 0.8 }, "<")
		.fromTo(".js-loading-title", { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 1, ease: "power4.in", color: "#fff" }, "-=.5")
		.fromTo(".js-loading", { autoAlpha: 1 }, { autoAlpha: 0, duration: 1, ease: "power4.in" }, "+=2");
};

window.addEventListener("DOMContentLoaded", () => {
	if (!sessionStorage.getItem(keyName)) {
		// 初回訪問時の処理
		sessionStorage.setItem(keyName, keyValue);
		openingAnimation();
	} else {
		// 2回目以降の訪問時の処理
		document.querySelector(".js-loading").style.display = "none";
	}
});

jQuery(function ($) {
	// ナビバートグル
	$(".js-hamburger").on("click", function () {
		if ($(".js-hamburger").hasClass("is-open")) {
			$(".js-drawer-menu").fadeOut();
			$(this).removeClass("is-open");
			$("body").removeClass("no-scroll"); // スクロールを有効にする
		} else {
			$(".js-drawer-menu").fadeIn();
			$(this).addClass("is-open");
			$("body").addClass("no-scroll"); // スクロールを無効にする
		}
	});
	const slider1 = new Swiper(".mv__swiper", {
		loop: true,
		effect: "fade",
		speed: 3000,
		allowTouchMove: false,
		autoplay: {
			delay: 3000,
		},
	});

	const swiper = new Swiper(".js-campaign-swiper", {
		loop: true,
		slidesPerView: "auto",
		spaceBetween: 24,
		freeModeSticky: true,
		speed: 2000,
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		breakpoints: {
			768: {
				spaceBetween: 40,
			},
		},
		navigation: {
			nextEl: ".swiper-button-next", //必須
			prevEl: ".swiper-button-prev", //必須
		},
	});

	jQuery(window).on("scroll", function () {
		if (jQuery(".mv").height() < jQuery(this).scrollTop()) {
			jQuery(".header").addClass("change-color");
		} else {
			jQuery(".header").removeClass("change-color");
		}
	});
	var box = $(".js-slide-animation"),
		speed = 700;

	//.slide-animationの付いた全ての要素に対して下記の処理を行う
	box.each(function () {
		$(this).append('<div class="slide-animation__bg"></div>');
		var color = $(this).find($(".slide-animation__bg"));
		var image = $(this).find(".slide-animation__img");
		var counter = 0;

		image.css("opacity", "0");
		color.css("width", "0%");
		//inviewを使って背景色が画面に現れたら処理をする
		color.on("inview", function () {
			if (counter == 0) {
				$(this)
					.delay(200)
					.animate({ width: "100%" }, speed, function () {
						image.css("opacity", "1");
						$(this).css({ left: "0", right: "auto" });
						$(this).animate({ width: "0%" }, speed);
					});
				counter = 1;
			}
		});
	});
});
