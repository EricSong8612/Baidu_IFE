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

var input = document.getElementById("input");
var queue = document.getElementById("queue");
var nums = [];

function addFromRight(int) {
    var num = document.createElement("div");
    num.innerHTML = int;
    nums.push(num);
    queue.innerHTML = "";
    for (var i=0; i<nums.length; i++) {
        queue.appendChild(nums[i]);
    }
}

function addFromLeft(int) {
    var num = document.createElement("div");
    num.innerHTML = int;
    nums.splice(0, 0, num);
    queue.innerHTML = "";
    for (var i=0; i<nums.length; i++) {
        queue.appendChild(nums[i]);
    }
}

function deleteFromRight() {
    if (nums.length === 0) {
        alert("This queue is empty")
    } else {
        var delnum = nums.pop();
        alert("Delete "+delnum.innerHTML+" from right");
        queue.innerHTML = "";
        for (var i=0; i<nums.length; i++) {
            queue.appendChild(nums[i]);
        }
    }  
}

function deleteFromLeft() {
    if (nums.length === 0) {
        alert("This queue is empty")
    } else {
        alert("Delete "+nums[0].innerHTML+" from left");
        var delnum = nums.splice(0, 1);
        queue.innerHTML = "";
        for (var i=0; i<nums.length; i++) {
            queue.appendChild(nums[i]);
        }
    }
}


addEvent(AfR, "click", function() {
    if (isNaN(input.value)) {
        alert("Please enter an integer");
        } else {
            addFromRight(input.value);
        }
    });
addEvent(AfL, "click", function() {
    if (isNaN(input.value)) {
        alert("Please enter an integer");
        } else {
            addFromLeft(input.value);
        }
});
addEvent(DfR, "click", function(){deleteFromRight()});
addEvent(DfL, "click", function(){deleteFromLeft()});