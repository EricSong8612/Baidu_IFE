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
var newele = document.getElementById("newele");
var nodes = [];
var sel;

function reset() {
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

(function select() {
    HTMLCollection.prototype.toArray=function(){
        return [].slice.call(this);
    };
    var divs = root.getElementsByTagName('div').toArray()
    divs.splice(0, 0, root);
    for (var i=0; i<divs.length; i++) {
        divs[i].onclick = function(e) {
            e.stopPropagation();
            if (sel) {
                if (sel == this) {
                    this.style.backgroundColor = "#fff";
                    sel = null;
                } else {
                    sel.style.backgroundColor = "#fff";
                    this.style.backgroundColor = "#99ddff";
                    sel = this;
                }
            } else {
                this.style.backgroundColor = "#99ddff";
                sel = this;
            } 
        }
    }
})();

function delEle() {
    if (sel) {
        sel.parentNode.removeChild(sel);
    } else {
        alert("Please select an element");
    } 
}

function addEle() {
    if (sel) {
        if (newele.value) {
            var newdiv = document.createElement("div");
            var pindex = Number(sel.className.slice(-1));
            var cindex = pindex+1;
            newdiv.className = "flex-item level"+cindex;
            newdiv.textContent = newele.value;
            sel.appendChild(newdiv);
        } else {
            alert("Please enter the new element's name");
        } 
    } else {
        alert("Please select an element");
    } 
}

addEvent(bfs, "click", function() {
    reset();
    input.value = "";
    BFS(root);
    changebc();
});
addEvent(dfs, "click", function() {
    reset();
    input.value = "";
    DFS(root);
    changebc();
});
addEvent(bfsw, "click", function() {
    reset();
    BFS(root);
    changebc();
});
addEvent(dfsw, "click", function() {
    reset();
    DFS(root);
    changebc();
});

addEvent(del, "click", function() {
    reset();
    delEle();
});
addEvent(add, "click", function() {
    reset();
    addEle();
});