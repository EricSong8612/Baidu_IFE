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

var tinput = document.getElementById("tinput");
var sinput = document.getElementById("sinput");
var queue = document.getElementById("queue");
var nums = [];

function addtext(text) {
    var subtext = text.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/);
    for (var i=0; i<subtext.length; i++) {
        if (subtext[i] != "") {
            var num = document.createElement("div");
            num.innerHTML = subtext[i];
            nums.push(num);
        }
    }
    queue.innerHTML = "";
    for (var j=0; j<nums.length; j++) {
        queue.appendChild(nums[j]);
    }
}

function searching(substring) {
    for (var i=0; i<nums.length; i++) {
        var replace = nums[i].innerHTML.replace(new RegExp(substring, "g"), "<span class=selected>"+substring+"</span>");
        nums[i].innerHTML = replace;
    }
    queue.innerHTML = "";
    for (var j=0; j<nums.length; j++) {
        queue.appendChild(nums[j]);
    }
}

function tclear() {
    nums = [];
    queue.innerHTML = "";
    tinput.value = "";
}

function sclear() {
    sinput.value = "";
}

addEvent(Add, "click", function() {addtext(tinput.value)});
addEvent(tClear, "click", function(){tclear()});
addEvent(Search, "click", function(){searching(sinput.value)});
addEvent(sClear, "click", function(){sclear()});