///////////////////////////////////// owl carousel implementation
$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    margin: 10,
    nav: true,
    loop: true,
    responsiveClass: true,
    navText: [
      '<i class="fa-solid fa-arrow-left-long testimonial-btn-prev  "></i>',
      '<i class="fa-solid fa-arrow-right-long testimonial-btn-next "></i>',
    ],
    dots: false,
    responsive: {
      0: {
        items: 1,
        nav: true,
      },

      992: {
        items: 2,
        nav: true,
      },
    },
  });
});
////////////////////
////////////////////// scroll on window
var topBtn = document.getElementById("arrow-home");

window.addEventListener("scroll", function () {
  console.log("window is scrolling");

  if (document.documentElement.scrollTop > 300) topBtn.style.display = "block";
  else topBtn.style.display = "none";
});
///////////////////////////////
