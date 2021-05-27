"use strict";

import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

Draggable.create("#stars", {type:"x,y", bounds:".container", inertia:true});


/* LOADER */

const loader = document.querySelector('.loader');

window.addEventListener('load', () => {

    setTimeout(function() {
        loader.classList.add('vis-hidden');
        loader.addEventListener('transitionend', function(){
            loader.style.display = 'none';
        })
    }, 3000);
     
})


/* CARTE */

let closeButton = document.querySelector("#trigger");

let constWindow = document.querySelector(".star");
let mainTitle = document.querySelector(".title--small");
let nomlatin = document.querySelector(".consttitles__latinname");
let ascension = document.getElementById("ascension");
let declinaison = document.getElementById("declinaison");
let taille = document.getElementById("taille");
let ordre = document.getElementById("ordre");
let info = document.getElementById("info");

let filter = document.querySelectorAll("[data-filter]");
let filterWrap = document.querySelectorAll(".const-filters__el");
let filterTrigger = document.querySelector(".filter-trigger");


let data; // <-- On va stocker les infos du json ici
/* STEP 1: Créer une fonction qu'on va appeler APRES avoir charger le JSON */

function initHoverInteractions () {
    var paths = document.querySelectorAll("[data-name]");
    paths.forEach(function (path){
        path.addEventListener('click', function (){
            var id = this.dataset.name;
            constWindow.classList.add('star--active');
            activeArea(id);
        })
    })
    closeButton.addEventListener('click', function(){
        constWindow.classList.remove('star--active');
    })
}
/* STEP 2: Cette fonction doit être appeler QUE si le JSON est déjà chargé, donc après que */
/* initHoverInteractions soit elle-même appellée */
var activeArea = function (id) {

    if (id == undefined){
        constWindow.classList.remove('star--active');
    }

    /* Et ici tu peux commencer à filter ton JSON */
/*     var chosenConst = datasConstellations.filter(function(elm){
        return elm.num.indexOf(id)>=0
    }); */

    let chosenConst = data.constellations.find(constellation => constellation.num == id);
    let rawData = Object.values(chosenConst);


    let constName =         rawData[0];
    let constLatinName =    rawData[1];
    let constAscension =    rawData[2];
    let constSize =         rawData[3];
    let constClass =        rawData[4];
    let constDeclin =       rawData[5];
    let constStars =        rawData[6];
    let constComment =      rawData[7];
    let constInfo =         rawData[8];
    let constNum =          rawData[9];
    let constIsBoreal=      rawData[10];
    let constIsAustrale=    rawData[11];
    let constIsZodiac=      rawData[12];

    mainTitle.innerHTML= constName;
    ascension.innerHTML= constAscension;
    declinaison.innerHTML= constDeclin;
    taille.innerHTML= constSize;
    ordre.innerHTML= constClass;
    info.innerHTML= constInfo;
    nomlatin.innerHTML = constLatinName;


// Compteurs popup

let size = taille.innerHTML.replace(" deg2", "");
let classement = ordre.innerHTML.replace("ème", "");
let highlights = [size, classement];

for (let i = 0; i < highlights.length; i++){

    function animateValue(selectedHighlight, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          
          if (i == 0){
            taille.innerHTML = Math.floor(progress * (end - start) + start)+" deg²";
          }else{
              if (selectedHighlight == 1){
                ordre.innerHTML = "1er";

              }else{
                  ordre.innerHTML = Math.floor(progress * (end - start) + start)+"ème";
              }
          }
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };
        window.requestAnimationFrame(step);
      }
      
      let selectedHighlight = highlights[i];
      animateValue(selectedHighlight, 100, selectedHighlight, 450);
    }

}


function initFilterActions(){
    let constList = data.constellations;

    // Montrer/cacher les filtres  
    filterTrigger.addEventListener('click', showFilters);
    function showFilters(){
        filterWrap.forEach(element => element.classList.toggle("const-filters__el--active"));

        let tl = gsap.timeline();
        tl.to("#round1", {x: 170, duration: 0.5})
          .to("#round1", {x: 50, duration: 0.2})
          .to("#round1", {x: 0, duration: 0.3})
          .to("#round2", {x:-180, duration: 0.6}, "-=1")
          .to("#round2", {x:0, duration: 0.4})
          .to("#round3", {x: 60, duration: 0.3}, "-=2")
          .to("#round3", {x: -45, duration: 0.4})
          .to("#round3", {x: 0, duration: 0.2});
    }

    filter.forEach(element => element.addEventListener('click', toggleFiltering));

    // Filtres constelations 

    function toggleFiltering(){
        
        for (let i = 0; i < constList.length; i++){
                let selectedConst = constList[i];
                let selectedConstElement = document.querySelector("[data-name='"+selectedConst.num+"']");
                selectedConstElement.classList.add("not-selected");             
        }

        if(filter[0].checked){
            for (let i = 0; i < constList.length; i++){
                let selectedConst = constList[i];
                let selectedConstElement = document.querySelector("[data-name='"+selectedConst.num+"']")
                
                if (selectedConst.zodiaque === true){
                    selectedConstElement.classList.remove("not-selected");
                }
            }
        }
        if (filter[1].checked){
            for (let i = 0; i < constList.length; i++){
                let selectedConst = constList[i];
                let selectedConstElement = document.querySelector("[data-name='"+selectedConst.num+"']")
                
                if (selectedConst.boreal === true){
                    selectedConstElement.classList.remove("not-selected");
                }
            }
        }
        if (filter[2].checked){
            for (let i = 0; i < constList.length; i++){
                let selectedConst = constList[i];
                let selectedConstElement = document.querySelector("[data-name='"+selectedConst.num+"']")

                if (selectedConst.australe === true){
                    selectedConstElement.classList.remove("not-selected");
                }
            }
        }

        if(filter[0].checked == false && filter[1].checked == false && filter[2].checked == false ){
            for (let i = 0; i < constList.length; i++){
                let selectedConst = constList[i];
                let selectedConstElement = document.querySelector("[data-name='"+selectedConst.num+"']");
                selectedConstElement.classList.remove("not-selected");             
            }
        }
    }
}
 

/* STEP 3: Charger le fichier JSON */
let myRequest = new Request("./assets/list.json",);
fetch(myRequest)
    .then(function(resp){
        return resp.json();
    })
    .then(function(jsonData){
        data = jsonData; // <-- On sauve les infos du json dans notre variable Data
        // Maintenant que le JSON est chargé, on peut démarrer à écouter les interactions
        initHoverInteractions();
        initFilterActions();
    });


    function stars() {
        const count = 500;
        const stars = document.getElementById('stars');
        var i = 0;
        while(i < count) {
          const star = document.createElement('i');
          const x = Math.floor(Math.random() * stars.clientWidth)
          const y = Math.floor(Math.random() * stars.clientHeight)
          const size = Math.random() * 5;
          star.style.left = x+'px';
          star.style.top = y+'px';
          star.style.height = 1+size+'px';
          star.style.width = 1+size+'px';
          const duration = Math.random() * 2;
          star.style.animationDuration = 7+duration+'s';
          stars.appendChild(star);
          i++
        }
      }
      stars();


