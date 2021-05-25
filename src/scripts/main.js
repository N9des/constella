"use strict";
var prevScrollpos = window.pageYOffset;
let navBar = document.querySelector(".navbar");
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
      console.log(navBar);
    navBar.style.top = "0";
  } else {
    navBar.style.top = "-30px";
  }
  prevScrollpos = currentScrollPos;
}