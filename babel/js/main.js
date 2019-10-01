"use strict";

$(document).ready(function () {
  new fullpage('#fullpage', {
    scrollingspeed: 1300
  });

  //Скрипты на переключение слайдера
  $('.content__picture').on("click", function () {
    $('.slider').css("transform", "translateX(-50%)");
  });
  $('.all-news__button').on("click", function () {
    $('.slider').css("transform", "translateX(0%)");
  });

  //скрытие стрелки 
  $('.content__picture').hover(function () {
    $('.content__arrow').css("height", "0px");
  }, function () {
    $('.content__arrow').css("height", "8px");
  });
  //скрываем меню
  $('.header__button-icon').on("click", function () {
    if ($(".header__content").hasClass("content-hide")) {
      $(".header__content").removeClass("content-hide");
      $(".header__content").animate({
        height: "831px"
      }, 500);
    } else {
      $(".header__content").animate({
        height: "0px"
      }, 300);
      $(".header__content").addClass("content-hide");
    }
  });
  //подсвечиваем навигацию
  checkoffset();
  function checkoffset() {
    setTimeout(checkoffset, 150);
    if ($("#contacts").offset().top > 2407 && $("#contacts").offset().top <= 2907) {
      $(".nav__news").css("fill", "#F3F3F3");
      $(".nav__radio").css("fill", "#F3F3F3");
      $(".nav__home").css("fill", "#FF7B1C");
    } else if ($("#contacts").offset().top > 1500 && $("#contacts").offset().top <= 2238) {
      $(".nav__home").css("fill", "#F3F3F3");
      $(".nav__radio").css("fill", "#F3F3F3");
      $(".nav__news").css("fill", "#FF7B1C");
    } else if ($("#contacts").offset().top > 600 && $("#contacts").offset().top <= 1469) {
      $(".nav__home").css("fill", "#F3F3F3");
      $(".nav__news").css("fill", "#F3F3F3");
      $(".nav__radio").css("fill", "#FF7B1C");
    } else if ($("#contacts").offset().top < 500 && $("#contacts").offset().top >= 0) {
      $(".nav-svg").css("fill", "#F3F3F3");
    }
  }
  //удаляем 3 секшион на мобильных устройствах и возвращаем на пк
  var radioBlock = $('#radio');

  function windowSize() {
    if ($(window).width() <= '995') {
      radioBlock.remove();
    }
  }
  $(window).on('load resize', windowSize);

  //скрываем и открываем плеер на мобильном устройстве
  $('.side-player-mobile__button').on("click", function () {
    $('.side-player-mobile__play').fadeToggle(0);
    $('.side-player-mobile__tracks').fadeToggle(0);
    $('.side-player-mobile__bottom').fadeToggle(0);
    $('.header-mobile__button').toggleClass("flex hide");
  });

  //скрываем и открываем хедер/меню на мобильном устройстве
  $('.header-mobile__button').on("click", function () {
    $('.nav-mobile__home-link').toggleClass("inline-block hide");
    $('.nav-mobile__news-link').toggleClass("inline-block hide");
    $('.nav-mobile__radio-link').toggleClass("inline-block hide");
    $('.social-mobile__link-facebook').toggleClass("inline-block hide");
    $('.social-mobile__instragram-block').toggleClass("inline-block hide");
  });
});