  
$(document).ready(function() {
var $burger = $('.burger-show');
var $menu   = $('#burger-menu_list');
var $link   = $('a[data-target^="anchor"]');

$burger.click(function() {
if ($menu.hasClass('active')) {
$menu.slideUp('normal').removeClass('active');
} else {
$menu.slideDown('normal').addClass('active');
}
});

$link.click(function() {
if ($menu.hasClass('active')) {
$menu.slideUp('normal').removeClass('active');
}
});

/*-----Скролл--------*/
$('.button_scroll_top').click(function() {
$('body').animate({ 'scrollTop': 0 }, 800);
$('html').animate({ 'scrollTop': 0 }, 800);
});

// Carousel

$('.owl-carousel').owlCarousel({
animateOut: 'fadeOut',
animateIn: 'fadeIn',
items: 1,
navText: false,
mouseDrag: false,
loop: false,
nav: true,
});

// header
function header_height_scroll() {
    var height_scroll;
    if (window.innerWidth >1440){
      height_scroll = 80;}
    else{ 
      if(window.innerWidth >=1300){
        height_scroll = 70;
      } else{
          if (window.innerWidth >=1025) {
            height_scroll = 65;
          }
          else{
            if (window.innerWidth >=768) {
              height_scroll = 50;
          } height_scroll = 50;
        }
      }
    } 
    return height_scroll;
  };

function toggleHeaderHeightClass() {
var distanceY = window.pageYOffset || document.documentElement.scrollTop;

$('header').toggleClass('scroll', distanceY > 200);
};

$link.bind('click.smoothscroll', function() {
var target = $(this).attr('href');
var blockTopOffset = $(target).offset().top;

var headerHeight = blockTopOffset > 200 ? header_height_scroll() : $('header').outerHeight(true);

$('body, html').animate({ scrollTop: blockTopOffset - headerHeight}, 800);

return false;
});

$(window).on("resize", header_height_scroll);

header_height_scroll();

$(window).on("scroll", toggleHeaderHeightClass);

toggleHeaderHeightClass();

// Modal window

  // Open
$('.form_activ').click(function(){
    $('.modal_window').fadeIn();
});
  // Close
$('.exit_modal').click(function(){
    $('.modal_window').fadeOut();
});

$('.header_menu a').click(function(){
  $('.header_menu a').removeClass('menu__link-active');
  $(this).addClass('menu__link-active');
});


function activation_link() {
  var distanceY = window.pageYOffset || document.documentElement.scrollTop,
  pageY_main = $("#main").outerHeight()-header_height_scroll(),
  pageY_portfolio = $("#portfolio").outerHeight()+pageY_main,
  pageY_advantages = $("#advantages").outerHeight()+pageY_portfolio,
  pageY_reviews = $("#reviews").outerHeight()/2+pageY_advantages;
  if (distanceY < pageY_main) {
    $('.header_menu a').removeClass('menu__link-active');
    $('.header_menu a[href="#main"]').addClass('menu__link-active');
  } else {
      $('.header_menu a').removeClass('menu__link-active');
      if (distanceY >= pageY_main && distanceY < pageY_portfolio) {
        $('.header_menu a[href="#portfolio"]').addClass('menu__link-active');
      } else{
          $('.header_menu a').removeClass('menu__link-active');
          if (distanceY >= pageY_portfolio && distanceY < pageY_advantages) {
            $('.header_menu a[href="#advantages"]').addClass('menu__link-active');
          } else{
              $('.header_menu a').removeClass('menu__link-active');
              if (distanceY >= pageY_advantages && distanceY < pageY_reviews) {
                $('.header_menu a[href="#reviews"]').addClass('menu__link-active');
              } else{
                  $('.header_menu a').removeClass('menu__link-active');
                 if (distanceY >= pageY_reviews) {
                    $('.header_menu a[href="#footer"]').addClass('menu__link-active');
                  }
              }
            }
        }
    }
};
$(window).on("scroll", activation_link);
activation_link();


});