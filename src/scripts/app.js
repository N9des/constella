"use strict";

import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

Draggable.create("#stars", {type:"x,y", bounds:".container", inertia:true});


let constWindow = document.querySelector(".star");
let closeButton = document.querySelector("#trigger");
let mainTitle = document.querySelector(".title--medium");
let filter = document.querySelectorAll("[data-filter]");

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
    let constMeaning =      rawData[6];
    let constStars =        rawData[7];
    let constComment =      rawData[8];
    let constInfo =         rawData[9];
    let constNum =          rawData[10];
    let constIsBoreal=      rawData[11];
    let constIsAustrale=    rawData[12];
    let constIsZodiac=      rawData[13];

    mainTitle.innerHTML= constName;

}

function initFilterActions(){
    let constList = data.constellations;
    filter.forEach(element => element.addEventListener('click', toggleFiltering));

    
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
