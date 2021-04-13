function ibg() {
	$.each($(".ibg"), function (index, val) {
		if ($(this).find("img").length > 0) {
			$(this).css("background-image", 'url("' + $(this).find("img").attr("src") + '")');
		}
	});
}

ibg();

// header scroll=================================================
// header scroll=================================================
$(window).scroll(function () {
	let scrollTop = $(window).scrollTop();
	let topHeight = $(".header__top").outerHeight();
	let centerHeight = $(".header__center").outerHeight();
	if (scrollTop > topHeight) {
		$(".header__scroll").addClass("scroll");
		$(".header__center").css("height", centerHeight);
	} else {
		$(".header__scroll").removeClass("scroll");
	}
});

// slideToggle=================================================
// slideToggle=================================================
$(".categories-header__title").click(function () {
	$(".categories-header__hidden").slideToggle();
});

// sidebar btn=================================================
// sidebar btn=================================================
$(".sidebar__menu--btn").click(function () {
	$(".sidebar__menu--hidden").slideToggle();
});

// header burger toggle=================================================
// cart toggle=================================================
$("#cart-icon").click(function () {
	$(".offcanvas--cart").toggleClass("active");
	$(".overlay").css("display", "block");
});
$(".header-action__burger").click(function () {
	$(".offcanvas--mobile-menu").toggleClass("active");
	$(".overlay").css("display", "block");
});
$(".offcanvas__close").click(function () {
	$(".offcanvas").removeClass("active");
	$(".overlay").css("display", "none");
});
$(".overlay").on("click", function (e) {
	$(".offcanvas").removeClass("active");
	$(".overlay").css("display", "none");
});

// dropDown lang currency=================================================
// dropDown lang currency=================================================
$(".user-set__button").click(function () {
	$(this).next().toggle();
});
$(document).on("click", function (e) {
	if (!$(e.target).closest(".user-set").length) {
		$(".user-set__dropDown").hide();
	}
	e.stopPropagation();
});

// product card list/block=====================================================
// product card list/block=====================================================

const blockTab = document.querySelector(".sort-box__tabs--blocks");
const listTab = document.querySelector(".sort-box__tabs--list");
const productCards = document.querySelectorAll(".product__card");

const addListActive = () => {
	blockTab.classList.remove("active");
	listTab.classList.add("active");

	productCards.forEach((el) => {
		el.className = el.className.replace(/card/g, "card--list");
	});
	listTab.disabled = "disabled";
};

const addBlockActive = () => {
	blockTab.classList.add("active");
	listTab.classList.remove("active");

	productCards.forEach((el) => {
		el.className = el.className.replace(/card--list/g, "card");
	});
	listTab.removeAttribute("disabled");
};

blockTab.addEventListener("click", addBlockActive);
listTab.addEventListener("click", addListActive);
