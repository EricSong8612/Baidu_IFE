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

var tag = document.getElementById("tag");
var like = document.getElementById("like");
var tqueue = document.getElementById("tqueue");
var lqueue = document.getElementById("lqueue");
var tid = 0;

function check(element, htmlcollection) {
    var result = true;
    for (var i in htmlcollection) {
        if (htmlcollection[i] == element.innerHTML) {
            result = false;
        }
    }
    return result;
}

function render(queue, elements) {
    var child = queue.children;
    var childhtml = [];
    for (var i=0; i<child.length; i++) {
        childhtml.push(child[i].innerHTML);
    }
    if (check(elements, childhtml)) {
        if (child.length > 9) {
            queue.removeChild(child[0]);
            queue.appendChild(elements);
        } else {
            queue.appendChild(elements);
        }
    } 
}

function addtags(text) {
    var reg = /[^0-9a-zA-Z\u4e00-\u9fa5]/;
    var ent = /,|\s|\r|\n/;
    if (reg.test(text.charAt(0))) {
        alert("Letter, characters and numbers only");
        tag.value="";
    } else {
        if (ent.test(text.charAt(text.length-1))) {
            text = text.slice(0,text.length-1);
            var t = document.createElement("div");
            t.innerHTML = "#"+text;
            t.id = "tag"+tid;
            t.onmouseover = function() {
                this.style.backgroundColor = "#00f";
                this.innerHTML = "Delete: #" + text;
            }
            t.onmouseout = function() {
                this.style.backgroundColor = "#0099ff";
                this.innerHTML = "#"+text;
            }
            t.onclick = function() {
                var del = document.getElementById(this.id);
                del.parentNode.removeChild(del);
            }
            tid++;
            render(tqueue, t);
            tag.value="";
        }
    }  
}

function addlikes(text) {
    var subtext = text.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/);
    for (var i=0; i<subtext.length; i++) {
        if (subtext[i] != "") {
            var l = document.createElement("div");
            l.index = i;
            l.id = "like"+i;
            l.innerHTML = subtext[i];
            l.onmouseover = function() {
                this.style.backgroundColor = "#00f";
                this.innerHTML = "Delete: " + subtext[this.index];
            }
            l.onmouseout = function() {
                this.style.backgroundColor = "#0099ff";
                this.innerHTML = subtext[this.index];
            }
            l.onclick = function() {
                var del = document.getElementById(this.id);
                del.parentNode.removeChild(del);
            }
            render(lqueue, l);
        }
    }
}

addEvent(tag, "keyup", function() {addtags(tag.value)});
addEvent(Add, "click", function() {addlikes(like.value)});