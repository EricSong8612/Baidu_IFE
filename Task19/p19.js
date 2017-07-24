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

function renderNums(int) {
    var num = document.createElement("div");
    num.style.height = int * 2 + "px";
    num.style.backgroundColor = "rgb(220,"+int+","+int*2+")";
    num.innerHTML = int;
    nums.push(num);
    queue.innerHTML = "";
    for (var i=0; i<nums.length; i++) {
        queue.appendChild(nums[i]);
    }
}

function addFromRight(int) {
    if (nums.length >=60) {
        alert("Exceed the capacity of this queue");
    } else {
        renderNums(int);
    }  
}

function addFromLeft(int) {
    if (nums.length >=60) {
        alert("Exceed the capacity of this queue");
    } else {
        var num = document.createElement("div");
        num.style.height = int * 2 + "px";
        num.style.backgroundColor = "rgb(220,"+int+","+int*2+")";
        num.innerHTML = int;
        nums.splice(0, 0, num);
        queue.innerHTML = "";
        for (var i=0; i<nums.length; i++) {
            queue.appendChild(nums[i]);
        }
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

function ranNums() {
    if (nums.length > 10) {
        alert("It may exceed the capacity of this queue, please delete some numbers first");
    } else {
        for (var i=0; i<50; i++) {
            var int = Math.round(Math.random() * 90 + 10);
            renderNums(int);
        } 
    }
}

function sorting() {
    var ints = [];
    for (var i=0; i<nums.length; i++) {
        var int = Number(nums[i].innerHTML);
        ints.push(int);
    }
    var i = 0, j = 1, swap;
    var len = ints.length;
	var timer = null;
    var timer = setInterval( function() {
        if (i < len) {
            if (j < len) {
                if (ints[i] > ints[j]) {
                    swap = ints[i];
                    ints[i] = ints[j];
                    ints[j] = swap;
                }
                j++;
            } else {
                i++;
                j = i + 1;
            }
        } else {
            clearInterval(timer);
        }
        nums = [];
        for (var m=0; m<len; m++) {
            renderNums(ints[m]);
        }  
    }, 10);
}

function clear() {
    nums = [];
    queue.innerHTML = "";
    input.value = "";
}

addEvent(AfR, "click", function() {
    if (isNaN(input.value) || input.value<10 || input.value>100) {
        alert("Please enter an integer between 10 and 100");
        } else {
            addFromRight(input.value);
        }
    });
addEvent(AfL, "click", function() {
    if (isNaN(input.value) || input.value<10 || input.value>100) {
        alert("Please enter an integer between 10 and 100");
        } else {
            addFromLeft(input.value);
        }
});
addEvent(DfR, "click", function(){deleteFromRight()});
addEvent(DfL, "click", function(){deleteFromLeft()});
addEvent(RanNums, "click", function(){ranNums()});
addEvent(Sorting, "click", function(){sorting()});
addEvent(Clear, "click", function(){clear()});