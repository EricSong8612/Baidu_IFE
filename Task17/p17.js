'use strict';

/* 数据格式演示
var aqiSourceData = {
    "北京": {
        "2016-01-01": 10,
        "2016-01-02": 10,
        "2016-01-03": 10,
        "2016-01-04": 10
        }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = (m < 10) ? "0" + m : m;
    var d = dat.getDate();
    d = (d < 10) ? "0" + d : d;
    return y + "-" + m + "-" + d;
}

function randomBuildData(seed) {
    var aqiData = {}; // { datStr: aqiData }
    var dat = new Date("2017-01-01");
    var datStr = "";
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        aqiData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return aqiData;
}

var aqiSourceData = {
    "New York": randomBuildData(500),
    "San Diego": randomBuildData(450),
    "Los Angeles": randomBuildData(550)  
};

var color = ["#80bfff", "#66b3ff", "#3399ff", "#0066cc", "#004080", "#1ac6ff",              "#0086b3", "#8080ff", "#1a1aff", "#1aa3ff", "#80e5ff", "#6666ff",              "#0000cc", "#000099", "#ccccff", "#3366cc", "#7094db", "#24478f"]

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: 0,
    nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
    var chart = document.getElementsByClassName("aqi-chart-wrap");
    chart[0].innerHTML = "";
    chart[0].style = "width:1000px; margin:20px auto; padding:0 20px; border: 2px solid #aaa; border-radius:15px";

    var seldata = chartData[pageState.nowGraTime];
    var cities = Object.getOwnPropertyNames(seldata);
    var selcity = cities[pageState.nowSelectCity];
    var citydiv = document.createElement("div");
    citydiv.style = "position:relative; width:1005px; height:600px; margin-top: 20px";
    var bardiv = document.createElement("div");
    bardiv.style = "position:absolute; bottom:0; width:1005px; background-color:#fff";
    
    for (var bars in seldata[selcity]) {
        var singlebar = document.createElement("div");
        singlebar.style = "display:inline-block; vertical-align:bottom; margin-left:5px";
        singlebar.style.backgroundColor = color[Math.floor(Math.random()*18)];
        singlebar.style.height = seldata[selcity][bars]+"px";
        switch (pageState.nowGraTime) {
            case "day":
                singlebar.style.width = "6px"; 
                singlebar.title = bars + "\nAQI: " + seldata[selcity][bars];
                break;
            case "week":
                singlebar.style.width = "40px"; 
                singlebar.style.marginLeft = "30px"; 
                singlebar.title = "2017 " + bars + "\nAverage AQI: " + seldata[selcity][bars];
                break;
            case "month":
                singlebar.style.width = "200px"; 
                singlebar.style.marginLeft = "40px"; 
                singlebar.title = bars + "\nAverage AQI: " + seldata[selcity][bars];
        }
        bardiv.appendChild(singlebar);
    }

    citydiv.appendChild(bardiv);
    chart[0].appendChild(citydiv);     
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    pageState.nowGraTime = this.value;
    renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    pageState.nowSelectCity = this.selectedIndex;
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var scales = document.getElementsByName('gra-time');
    for (var i = 0; i < scales.length; i++) {
        scales[i].onclick = graTimeChange;
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var citysel = document.getElementById("city-select");
    var cities = Object.getOwnPropertyNames(aqiSourceData);
    for (var i=0; i<cities.length; i++) {
        var op = document.createElement("option");
        op.innerHTML = cities[i];
        citysel.appendChild(op);
    }
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    citysel.onchange = citySelectChange;
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    var weekdata = {}, monthdata = {};
    for (var cities in aqiSourceData) {
        var dates = Object.getOwnPropertyNames(aqiSourceData[cities]);
        function getMonth(date) {
            return date.slice(0, 7);
        };
        function getDay(date) {
            var ndate = new Date(date);
            return ndate.getDay()+1;
        };
        var mresult = {};
        var wresult = {};
        var weekCount = 1;
        wresult["week "+weekCount] = {
                    'weekSum': 0,
                    'wDayCount': 1
                };
        for(var i=0; i<dates.length-1; i++){
            var currMonth = getMonth(dates[i]);
            var currDay = getDay(dates[i]);
            var nextDay = getDay(dates[i+1]);
            if(currMonth in mresult){
                mresult[currMonth]['monthSum']+=aqiSourceData[cities][dates[i]];
                mresult[currMonth]['mDayCount']++;
            } else {
                mresult[currMonth] = {
                    'monthSum': aqiSourceData[cities][dates[i]],
                    'mDayCount': 1
                }
            }
            if(currDay < nextDay){
                wresult["week "+weekCount]['weekSum']=aqiSourceData[cities][dates[i]] + aqiSourceData[cities][dates[i+1]];
                wresult["week "+weekCount]['wDayCount']++;
            } else {
                weekCount++;
                wresult["week "+weekCount] = {
                    'weekSum': aqiSourceData[cities][dates[i+1]],
                    'wDayCount': 1
                }
            }
        }
        
        for(var month in mresult){
            mresult[month] = (mresult[month]['monthSum']/mresult[month]['mDayCount']).toFixed(2);
        }
        for(var week in wresult){
            wresult[week] = (wresult[week]['weekSum']/wresult[week]['wDayCount']).toFixed(2);
        }
        
        monthdata[cities] = mresult;
        weekdata[cities] = wresult;
    }
    
    chartData.day = aqiSourceData;
    chartData.week = weekdata;
    chartData.month = monthdata;
    renderChart();
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm()
    initCitySelector();
    initAqiChartData();
}

init();