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
var input = document.getElementById("input");
var nodes = [];

function clean() {
    var divs = document.getElementsByTagName("div");
    for (var i=0; i<divs.length; i++) {
        if (divs[i].className.match(" match")) {
            divs[i].className = divs[i].className.replace(" match", "")
        }
        divs[i].style.backgroundColor = "#fff";
    }
}

function changebc() {
    var i = 0;
    if (nodes[i].firstChild.nodeValue.replace(/(^\s*)|(\s*$)/g, "") == input.value) {
        nodes[i].style.backgroundColor = "#fc0";
        nodes[i].className = nodes[i].className + " match";
    } else {
        nodes[i].style.backgroundColor = "#fc0";
    }
    var timer = setInterval(function(){
        i++;
        if (i < nodes.length) {
            if (nodes[i].firstChild.nodeValue.replace(/(^\s*)|(\s*$)/g, "") == input.value) {
                if (nodes[i-1].className.search("match")<0) {
                    nodes[i-1].style.backgroundColor = "#fff";
                }
                nodes[i].style.backgroundColor = "#fc0";
                nodes[i].className = nodes[i].className + " match";
            } else {
                if (nodes[i-1].className.search("match")<0) {
                    nodes[i-1].style.backgroundColor = "#fff";
                }
                nodes[i].style.backgroundColor = "#fc0";
            }
        } else {
            if (nodes[i-1].className.search("match")<0) {
                    nodes[i-1].style.backgroundColor = "#fff";
                }
            clearInterval(timer);
            nodes = [];
            input.value = "";
        }  
    }, 500);
}

function BFS(node) {
    nodes.push(node);
    for (var div of nodes) {
        var nextLevelNode = div.firstElementChild;
        while (nextLevelNode) {
            nodes.push(nextLevelNode);
            nextLevelNode = nextLevelNode.nextElementSibling;
        }
    }
}

function DFS(node) {
    if (node) {
        nodes.push(node);
        for (var i=0; i<node.children.length; i++) {
            DFS(node.children[i]);
        }
    } else {
        nodes.push(node);
    }
}

addEvent(bfs, "click", function() {
    clean();
    input.value = "";
    BFS(root);
    changebc();
});
addEvent(dfs, "click", function() {
    clean();
    input.value = "";
    DFS(root);
    changebc();
});
addEvent(bfsw, "click", function() {
    clean();
    BFS(root);
    changebc();
});
addEvent(dfsw, "click", function() {
    clean();
    DFS(root);
    changebc();
});