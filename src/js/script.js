jQuery(function ($) {
	// この中であればWordpressでも「$」が使用可能になる
	//ナビバートグル
	$(".js-hamburger").on("click", function () {
		if ($(".js-hamburger").hasClass("is-open")) {
			$(".js-drawer-menu").fadeOut();
			$(this).removeClass("is-open");
		} else {
			$(".js-drawer-menu").fadeIn();
			$(this).addClass("is-open");
		}
	});
	// var swiper = new Swiper(".swiper", {
	// 	loop: true,
	// 	speed: 1000, // 少しゆっくり(デフォルトは300)
	// 	autoplay: {
	// 		// 自動再生
	// 		delay: 1500, // 1.5秒後に次のスライド
	// 	},
	// });
	// var swiper = new Swiper(".mySwiper", {
	// 	loop: true,
	// 	speed: 1000, // 少しゆっくり(デフォルトは300)
	// 	autoplay: {
	// 		// 自動再生
	// 		delay: 3500, // 1.5秒後に次のスライド
	// 		reverseDirection: true,
	// 	},
	// 	navigation: {
	// 		nextEl: ".swiper-button-next", //必須
	// 		prevEl: ".swiper-button-prev", //必須
	// 		clickable: true,
	// 	},
	// });
	const swiper = new Swiper(".js-campaign-swiper", {
		loop: true,
		spaceBetween: 24,
		slidesPerView: 1.3,
		breakpoints: {
			768: {
				slidesPerView: 3.5,
				spaceBetween: 40,
				navigation: {
					nextEl: ".swiper-button-next", //必須
					prevEl: ".swiper-button-prev", //必須
					clickable: true,
				},
			},
		},
	});

	jQuery(window).on("scroll", function () {
		if (jQuery(".mv").height() < jQuery(this).scrollTop()) {
			jQuery(".header").addClass("change-color");
		} else {
			jQuery(".header").removeClass("change-color");
		}
	});
	var box = $(".colorbox"),
		speed = 700;

	//.colorboxの付いた全ての要素に対して下記の処理を行う
	box.each(function () {
		$(this).append('<div class="color"></div>');
		var color = $(this).find($(".color")),
			image = $(this).find("img");
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
	$(function () {
		// #で始まるアンカーをクリックした場合に処理
		$('a[href^="#"]').click(function () {
			// 移動先を50px上にずらす
			var adjust = 100;
			// スクロールの速度
			var speed = 400; // ミリ秒
			// アンカーの値取得
			var href = $(this).attr("href");
			// 移動先を取得
			var target = $(href == "#" || href == "" ? "html" : href);
			// 移動先を調整
			var position = target.offset().top - adjust;
			// スムーススクロール
			$("body,html").animate({ scrollTop: position }, speed, "swing");
			return false;
		});
	});
});
