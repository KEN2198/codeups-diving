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
// トップへ戻るボタン
$(window).on("scroll", function () {
	let scrollHeight = $(document).height();
	let scrollPosition = $(window).height() + $(window).scrollTop();
	let footHeight = $("footer").innerHeight();
	if (scrollHeight - scrollPosition <= footHeight) {
		$(".js-page-top").css({
			position: "absolute",
			bottom: footHeight + 19,
		});
	} else {
		$(".js-page-top").css({
			position: "fixed",
			bottom: "19px",
		});
		9;
	}
});

let topBtn = $("#page-top");
topBtn.hide();
$(window).scroll(function () {
	if ($(this).scrollTop() > 200) {
		topBtn.fadeIn();
	} else {
		topBtn.fadeOut();
	}
});
topBtn.click(function () {
	$("body,html").animate(
		{
			scrollTop: 0,
		},
		500,
		"swing"
	);
	return false;
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
		var image = $(this).find("img");
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
	let scrollPos;

	$(".js-photo").click(function () {
		scrollPos = $(window).scrollTop();
		$(".js-overlay").html($(this).prop("outerHTML"));
		$(".js-overlay").fadeIn(200);
		$(".js-header, .js-page-top").hide();
		$("html").addClass("is-fixed");
		return false;
	});

	$(".js-overlay").click(function () {
		$(".js-overlay").fadeOut(200, function () {
			$(".js-header, .js-page-top").fadeIn();
			$("html").removeClass("is-fixed");
			$(window).scrollTop(scrollPos);
		});
		return false;
	});

	$(function () {
		$(".tab__item:first-of-type").css("display", "inline-block");
		$(".tab__item").on("click", function () {
			$(".is-active").removeClass("is-active");
			$(this).addClass("is-active");
			const index = $(this).index();
			$(".information-card").hide().eq(index).fadeIn(300);
		});
	});
	$(".tab__item").on("click", function () {
		$(".information-card").removeClass("js-open");
		$($(this).children("a").attr("href")).addClass("js-open");
		return false;
	});

	$(document).ready(function () {
		// URLからクエリパラメータを取得
		var url = new URL(window.location.href);
		var tabParam = url.searchParams.get("id");

		// クエリパラメータから取得したタブをアクティブにする
		$(".tab__item").removeClass("is-active");
		// ページ読み込み時に最初のタブ "tab1" をアクティブにする
		if (!tabParam) {
			$("#tab1").addClass("is-active");
			$("#panel1").show(); // 対応するコンテンツを表示
		} else {
			$(".information-card").hide();
			$("#" + tabParam).addClass("is-active");
			$("#" + tabParam.replace("tab", "panel")).show(); // 対応するコンテンツを表示
		}
	});
	jQuery(function ($) {
		$(".accordion__menu").on("click", function () {
			$(this).toggleClass("js-open");
			$(this).children(".accordion__answer").slideToggle();
			return false;
		});
	});
});
