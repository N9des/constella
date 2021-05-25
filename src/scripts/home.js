"use strict";

var prevScrollpos = window.pageYOffset;
let navBar = document.querySelector(".navbar");
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
      console.log(navBar);
    navBar.style.top = "50px";
  } else {
    navBar.style.top = "-100px";
  }
  prevScrollpos = currentScrollPos;
}