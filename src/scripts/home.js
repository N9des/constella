"use strict";

import { gsap } from "gsap";

var prevScrollpos = window.pageYOffset;
let navBar = document.querySelector(".navbar");
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    navBar.style.top = "50px";
  } else {
    navBar.style.top = "-100px";
  }
  prevScrollpos = currentScrollPos;
}


let sect02Art = document.getElementById("sect02-article");
let sect02Img = document.querySelector(".const-img");
let sect03Art = document.getElementById("sect03-article");
let sect03Img = document.querySelector(".box-info-img");

window.addEventListener('scroll', function(){

  let scrollValue = (window.innerHeight + window.scrollY) / (document.body.offsetHeight);

  console.log(scrollValue);

  if(scrollValue > 1.70){
    sect02Art.style.opacity = '1';
    sect02Art.style.transform = 'none';
    sect02Img.style.opacity = '1';
    sect02Img.style.transform = 'none';
  }

  if(scrollValue > 2.5){
    sect03Art.style.opacity = '1';
    sect03Art.style.transform = 'none';
    sect03Img.style.opacity = '1';
    sect03Img.style.transform = 'none';
  }


})

