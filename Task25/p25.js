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

var root = document.getElementsByClassName("tag")[0];
var input = document.getElementById("input");
var nodes = [];
HTMLCollection.prototype.toArray=function(){
    return [].slice.call(this);
};
var spans = document.getElementsByTagName("span").toArray();

function reset() {
    var spans = document.getElementsByTagName("span");
    for (var i=0; i<spans.length; i++) {
        spans[i].style.color = "#336699";
    }
}

function search() {
    var match = false;
    nodes = spans;
    if (input.value == "") {
        alert("Please enter the name of the element you wanna find");
    } else {
        for (var i=0; i<nodes.length; i++) {
            if (nodes[i].textContent.replace(/(^\s*)|(\s*$)/g, "") == input.value) {
                match = true;
                nodes[i].style.color = "#f00";
                var nparent = nodes[i].parentElement; 
                while (nparent != root) {
                    nparent.style.display = "block";
                    while (nparent.nextElementSibling) {
                        nparent.nextElementSibling.style.display = "block";
                        nparent = nparent.nextElementSibling;
                    }
                    nparent = nparent.parentElement;
                } 
            }
        }
        nodes = [];
        if (!match) {
            alert("Sorry, no such element");
        }
        input.value = "";
    }
}

function rendertags() {
    for (var i=0; i<spans.length; i++) {
        spans[i].onmouseover = function() {
            this.style.color = "#6699cc";
            this.children[2].style.opacity = "1";
            this.children[3].style.opacity = "1";
        }
        spans[i].onmouseout = function() {
            this.style.color = "#336699";
            this.children[2].style.opacity = "0";
            this.children[3].style.opacity = "0";
        }
        spans[i].children[1].onclick = function(e) {
            e.stopPropagation();
            reset();
            var children = this.parentElement.parentElement.children;
            for (var c=1; c<children.length; c++) {
                if (children[c].style.display == "block") {
                    children[c].style.display = "none";
                } else {
                    children[c].style.display = "block";
                }
            }
            var icon = this.parentElement.getElementsByTagName("i").toArray();
            if (icon[0].className == "fa fa-chevron-circle-right") {
                icon[0].className = "fa fa-chevron-circle-down";
            } else if (icon[0].className == "fa fa-chevron-circle-down") {
                icon[0].className = "fa fa-chevron-circle-right";
            } 
        }
    }
}
rendertags();

function delEle(node) {
    if (confirm("Are you sure to remove this element?")) {
        var target = node.parentElement.parentElement;
        target.parentElement.removeChild(target); 
    }
}

function addEle(node) {
    var target = node.parentElement.parentElement;
    for (var c=1; c<target.children.length; c++) {
        target.children[c].style.display = "block";
    }
    var newele = prompt("Please enter the name for the new element");
    if (newele != null) {
        var newdiv = document.createElement("div");
        var cindex = Number(target.className.slice(-1)) + 1;
        newdiv.className = "tag level"+cindex;
        newdiv.style.display = "block";
        var newspan = document.createElement("span");
        var newicon = document.createElement("i");
        newicon.className = "fa fa-chevron-circle-right";
        newspan.appendChild(newicon);
        var newtext = document.createElement("t");
        newtext.textContent = newele;
        newspan.appendChild(newtext);
        var newadd = document.createElement("i");
        newadd.className = "fa fa-plus-circle";
        newspan.appendChild(newadd);
        var newdel = document.createElement("i");
        newdel.className = "fa fa-times-circle";
        newdel.style.marginLeft = "5px";
        newspan.appendChild(newdel);
        newdiv.appendChild(newspan);
        target.appendChild(newdiv);
        spans = document.getElementsByTagName("span").toArray();
        rendertags();
    }
}

root.onclick = function (ev) {
    var ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    if(target.nodeName.toLocaleLowerCase() == 'i'){
        switch(target.className){
            case 'fa fa-plus-circle' :
                addEle(target);
                break;
            case 'fa fa-times-circle' :
                delEle(target);
                break;
        }
    }
}

addEvent(searchbtn, "click", function() {
    reset();
    search();
});