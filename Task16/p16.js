'use strict';

var aqiData = [];

function addAqiData() {
    var city = document.getElementById("aqi-city-input").value.trim();
    var index = document.getElementById("aqi-value-input").value.trim();
    var reg = /^[A-Za-z]*$/;
    if (reg.test(city) && !isNaN(index) && index >= 0 && index <= 1000) {
        aqiData.push([city, index]);
    } else {
        alert("Only characters for 'City', and only interger between 0 and 1000 for 'AQI'");
    }
    console.log(aqiData);
}

function renderAqiList() {
    var table = document.getElementById("aqi-table");
    
    while (table.lastChild) {
        table.removeChild(table.lastChild);
    }
    
    var thead = document.createElement("thead");
    var th1 = document.createElement("th");
    th1.innerHTML = "<b>City</b>";
    th1.style = "width:100px;background-color:#eee;color:#0af;text-align:left";
    var th2 = document.createElement("th");
    th2.innerHTML = "<b>AQI</b>";
    th2.style = "width:50px;background-color:#eee;color:#0af;text-align:left";
    var th3 = document.createElement("th");
    th3.innerHTML = "<b>Edit</b>";
    th3.style = "width:100px;background-color:#eee;color:#0af;text-align:left";
    thead.appendChild(th1);
    thead.appendChild(th2);
    thead.appendChild(th3);
    table.appendChild(thead);
    
    for (var i = 0; i < aqiData.length; i++) {
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        td1.innerHTML = aqiData[i][0];
        var td2 = document.createElement("td");
        td2.innerHTML = aqiData[i][1];
        var td3 = document.createElement("td");
        td3.innerHTML = ("<button id='del-btn'>Delete</button>");
        td3.index = i;
        td3.firstChild.onclick=delBtnHandle;
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        table.appendChild(tr);
    }
}

function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

function delBtnHandle() {
    var delindex = this.parentNode.index;
    aqiData.splice(delindex, 1);
    renderAqiList();
}

function init() {
    document.getElementById("add-btn").onclick=addBtnHandle;
}

init();