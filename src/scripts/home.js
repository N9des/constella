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
let scrollV = 0;
let shown1 = false;
let shown2 = false;
window.addEventListener('scroll', function(){

  let scrollValue = (window.innerHeight + window.scrollY) / (document.body.offsetHeight);


  if(scrollValue > scrollV){
    scrollV = scrollValue;
    console.log(scrollValue);
  }

  console.log(scrollV);
  if(scrollValue > 1.6){

    function showContent(){

      if (shown1 == false){
        shown1 = true;
        let tl = gsap.timeline();
        tl.to(".sect--02-article", {duration: 1, y: 0})
        tl.to(".sect--02-article", {duration: 2, opacity: 1},"-=1")
        tl.to(".sect--02-image", {duration: 1.75, opacity: 1}, "-=2");
        tl.to(".sect--02-image", {duration: 1.5, y: 0}, "-=2.5")

      }
    }
    showContent();

  }
  
  if(scrollValue > 2.5){
    
    function showContent2(){
      if (shown2 == false){
        shown2 = true;
        let tl = gsap.timeline();
        tl.to(".sect--03-article", {duration: 1, y: 0})
        tl.to(".sect--03-article", {duration: 2, opacity: 1},"-=1")
        tl.to(".sect--03-image", {duration: 1.75, opacity: 1}, "-=2");
        tl.to(".sect--03-image", {duration: 1.5, y: 0}, "-=2.5")

      }
    }
    showContent2();
  }


})