"use strict";

import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

Draggable.create(".svg", {type:"x,y", bounds:".container", inertia:true});


// Hover 


var map = document.querySelector(".map");
var paths = document.querySelectorAll(".map__image a");
var links = document.querySelectorAll(".map__list li");
var id = "AAAA"; 

var activeArea = function (id) {
    document.querySelectorAll(".star--active").forEach(function (item){
        item.classList.remove('star--active');
    })

    if (id !== "0"){
    document.querySelector('#list-' + id).classList.add('star--active');
    }
}

paths.forEach(function (path){
    path.addEventListener('mouseenter', function (){
        var id = this.id.replace('const-', '');
        activeArea(id);
    })
})

map.addEventListener('mouseover', function(){
    let id = "0"
    activeArea(id);
})



// Json

let myRequest = new Request("./assets/list.json",);

fetch(myRequest)
    .then(function(resp){
        return resp.json();
    })
    .then(function(data){
        console.log(data.constellations[1].nomlatin);

        let filtered = data.constellations.filter(function (el) {
            return el.num == id;
          });
        console.log(filtered[0].nomlatin);            
    })