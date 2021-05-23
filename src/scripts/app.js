"use strict";

import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

Draggable.create(".svg", {type:"x,y", bounds:".container", inertia:true});


let constWindow = document.querySelector(".star");
let closeButton = document.querySelector("#trigger");
let mainTitle = document.querySelector(".title--medium");
let zodiaqueFilter = document.querySelector('#zodiaque-filter');
let borealFilter = document.querySelector('#boreal-filter');
let australFilter = document.querySelector('#austral-filter');

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

    function resetFilters(){
        for (let i = 0; i < constList.length; i++){
            let selectedConst = constList[i];
            let selectedConstElement = document.querySelector("[data-name='"+selectedConst.num+"']")

            console.log(selectedConstElement);
            if (selectedConstElement !== null && selectedConstElement.classList.contains("not-selected")){
            selectedConstElement.classList.remove("not-selected");
            }
        }
    }
    
    function toggleZodiacSigns(){
        resetFilters();
        borealFilter.checked = false;
        australFilter.checked = false;
        if (zodiaqueFilter.checked == true){
            for (let i = 0; i < constList.length; i++)
            {
                let selectedConst = constList[i];
                let selectedConstElement = document.querySelector("[data-name='"+selectedConst.num+"']")
                if(!selectedConstElement){
                    continue;
                }
                
                if (selectedConst.zodiaque === false) 
                {
                    selectedConstElement.classList.add("not-selected");
                }
            }
        }else{
            resetFilters();  
        }

    }
    
    zodiaqueFilter.addEventListener('click', toggleZodiacSigns);

    function toggleBorealSigns (){
        resetFilters();
        zodiaqueFilter.checked = false;
        australFilter.checked = false;
        if (borealFilter.checked == true){
            for (let i = 0; i < constList.length; i++){
                let selectedConst = constList[i];
                let selectedConstElement = document.querySelector("[data-name='"+selectedConst.num+"']")
                if(!selectedConstElement){
                    continue;
                }
                if (selectedConst.boreal === false){
                    selectedConstElement.classList.add("not-selected");
                }
            }
        }else{
            resetFilters();
        }
    }
    australFilter.addEventListener('click', toggleAustralSigns);

    function toggleAustralSigns (){
        resetFilters();
        zodiaqueFilter.checked = false;
        borealFilter.checked = false;
        if (australFilter.checked == true){
            for (let i = 0; i < constList.length; i++){
                let selectedConst = constList[i];
                let selectedConstElement = document.querySelector("[data-name='"+selectedConst.num+"']")
                if(!selectedConstElement){
                    continue;
                }
                if (selectedConst.australe === false){
                    selectedConstElement.classList.add("not-selected");
                }
            }
        }else{
            resetFilters();
        }
    }
    borealFilter.addEventListener('click', toggleBorealSigns);

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

