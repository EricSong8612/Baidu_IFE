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

var root = document.getElementsByClassName("root")[0];
var nodes = [];

function changebc() {
    var i = 0;
    nodes[i].style.backgroundColor = "#00f";
    var timer = setInterval(function(){
        i++;
        if (i < nodes.length) {
            nodes[i-1].style.backgroundColor = "#fff";
            nodes[i].style.backgroundColor = "#00f";
        } else {
            nodes[i-1].style.backgroundColor = "#fff";
            clearInterval(timer);
            nodes = [];
        }  
    }, 500);
}

function preo(node) {
    if (node !== null) {
        nodes.push(node);
        preo(node.firstElementChild);
        preo(node.lastElementChild);
    } 
}

function ino(node) {
    if (node !== null) {
        ino(node.firstElementChild);
        nodes.push(node);
        ino(node.lastElementChild);
    } 
}

function posto(node) {
    if (node !== null) {
        posto(node.firstElementChild);
        posto(node.lastElementChild);
        nodes.push(node);
    } 
}

addEvent(preorder, "click", function() {
    preo(root);
    changebc();
});
addEvent(inorder, "click", function() {
    ino(root);
    changebc();
});
addEvent(postorder, "click", function() {
    posto(root);
    changebc();
});