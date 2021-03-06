'use strict';

//事件绑定函数，兼容浏览器差异
function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, false);
    }
    else if (element.attachEvent) {
        element.attachEvent("on" + event, listener);
    }
    else {
        element["on" + event] = listener;
    }
}

let spaceships = document.getElementById("spaceships");
let shipicons = document.getElementsByClassName("fa fa-space-shuttle");
let consoleLog = document.getElementById("consoleLog");
let shipcount = 0;

let consoleLogOut = (text) => {
    let p = document.createElement("p");
    p.innerHTML = text;
    consoleLog.appendChild(p);
    consoleLog.scrollTop = consoleLog.scrollHeight;
}

let launch = () => {
    if (shipcount < 4) {
        for (let shipindex=1; shipindex<5; shipindex++) {
            if ($("#track" + shipindex)[0].className == "free") {
                let li = document.createElement("li");
                let span = document.createElement("span");
                span.innerHTML = "Spaceship" + shipindex;
                li.appendChild(span);
                consoleLogOut("Spaceship" + shipindex + " is launched");
                let startbtn = document.createElement("button");
                startbtn.className = "startbtn";
                startbtn.innerHTML = "Start / Resume";
                li.appendChild(startbtn);
                let stopbtn = document.createElement("button");
                stopbtn.className = "stopbtn";
                stopbtn.innerHTML = "Stop";
                li.appendChild(stopbtn);
                let destroybtn = document.createElement("button");
                destroybtn.className = "destroybtn";
                destroybtn.innerHTML = "Destroy";
                li.appendChild(destroybtn);
                let div = document.createElement("div");
                div.innerHTML = "Fuel";
                let fuel = document.createElement("div");
                fuel.className = "fuel";
                fuel.id = "ship" + shipindex + "fuel";
                fuel.style.width = "100px";
                div.appendChild(fuel);
                li.appendChild(div);
                spaceships.append(li);
                let ship = document.createElement("i");
                ship.className = "fa fa-space-shuttle";
                ship.id = "ship" + shipindex;
                $("#track" + shipindex).append(ship);
                $("#track" + shipindex)[0].className = "busy"
                shipcount++;
                break;
            }
        }
    } else {
        alert("No track available for the new spaceship")
    }
}

spaceships.onclick = (ev) => {
    var ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    if (target.nodeName.toLocaleLowerCase() == "button"){
        switch(target.className){
            case "startbtn":
                start(target.parentElement.firstElementChild.innerHTML);
                break;
            case "stopbtn":
                stop(target.parentElement.firstElementChild.innerHTML);
                break;
            case "destroybtn":
                destroy(target.parentElement.firstElementChild.innerHTML);
                break;
        }
    }
}

let start = (ship) => {
    let startId = ship.slice(5);
    if ($("#"+startId)[0].className.includes("running")) {
        consoleLogOut(ship + " is flying now");
    } else {
        consoleLogOut(ship + " is starting the engine");
        setTimeout(function(){
            $("#"+startId)[0].style.animationPlayState = "running";
            $("#"+startId)[0].classList.add("animation"+startId);
            $("#"+startId)[0].classList.add("running");
            consoleLogOut(ship + " is flying now");
            fuel($("#"+startId+"fuel")[0]);
        }, 1000);
    } 
}

let stop = (ship) => {
    let stopId = ship.slice(5);
    if ($("#"+stopId)[0].className.includes("running")) {
        consoleLogOut(ship + " is shutitng down the engine");
        setTimeout(function(){
            $("#"+stopId)[0].style.animationPlayState = "paused";
            $("#"+stopId)[0].classList.remove("running");
            consoleLogOut(ship + " is stopped flying now");
            refuel($("#"+stopId+"fuel")[0]);
        }, 1000);
    } else {
        consoleLogOut(ship + " is still now");
    }
}

let destroy = (ship) => {
    for (let i=0; i<spaceships.children.length; i++) {
        if (spaceships.children[i].firstElementChild.innerHTML == ship) {
            spaceships.removeChild(spaceships.children[i]);
        }
    }
    let destroyId = ship.slice(5);
    for (let s=0; s<shipicons.length; s++) {
        if (shipicons[s].id == destroyId) {
            shipicons[s].parentElement.className = "free";
            shipicons[s].parentElement.removeChild(shipicons[s]);
            shipcount--;
        }
    }
    consoleLogOut(ship + " is destroyed");
}

let fuel = (shipfuel) => {
    let runningFuel = setInterval(function(){
        if ($("#"+shipfuel.id.slice(0,5))[0].className.includes("running")) {
            let restFule = Number(shipfuel.style.width.slice(0, -2));
            fuelHint(restFule, shipfuel);
            if (restFule == 0) {
                consoleLogOut("Space"+shipfuel.id.slice(0,5) + " ran out of fuel");
                stop("Space"+shipfuel.id.slice(0,5));
                clearInterval(runningFuel);
            } else {
                shipfuel.style.width = (restFule-1)+"px";
            }
        } else {
            clearInterval(runningFuel);
        }
    }, 50)
}

let refuel = (shipfuel) => {
    let reFueling = setInterval(function(){
        if (!$("#"+shipfuel.id.slice(0,5))[0].className.includes("running")) {
            let restFule = Number(shipfuel.style.width.slice(0, -2));
            fuelHint(restFule, shipfuel);
            if (restFule == 100) {
                consoleLogOut("Space"+shipfuel.id.slice(0,5) + "'s fuel is full");
                clearInterval(reFueling);
            } else {
                shipfuel.style.width = (restFule+1)+"px";
            }
        } else {
            clearInterval(reFueling);
        }
    }, 150)
}

let fuelHint = (restFule, shipfuel) => {
    if (restFule > 75) {
        shipfuel.style.backgroundColor = "#0a1";
    } else {
        if (restFule > 25) {
            shipfuel.style.backgroundColor = "#fa0";
        } else {
            shipfuel.style.backgroundColor = "#f00";
        }
    }
}

addEvent(launchbtn, "click", function(){launch()});
addEvent(clear, "click", function(){
    consoleLog.innerHTML = "";
});