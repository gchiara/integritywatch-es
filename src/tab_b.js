import jquery from 'jquery';
window.jQuery = jquery;
window.$ = jquery;
require( 'datatables.net' )( window, $ )
require( 'datatables.net-dt' )( window, $ )

import underscore, { indexOf } from 'underscore';
window.underscore = underscore;
window._ = underscore;

import '../public/vendor/js/popper.min.js'
import '../public/vendor/js/bootstrap.min.js'
import { csv } from 'd3-request'
import { json } from 'd3-request'

import '../public/vendor/css/bootstrap.min.css'
import '../public/vendor/css/dc.css'
import '/scss/main.scss';

import Vue from 'vue';
import Loader from './components/Loader.vue';
import ChartHeader from './components/ChartHeader.vue';


// Data object - is also used by Vue

var vuedata = {
  page: 'tabB',
  loader: true,
  readMore: false,
  showInfo: true,
  showShare: true,
  showAllCharts: true,
  chartMargin: 40,
  modalShowTable: 'a',
  charts: {
    map: {
      title: 'Mapa',
      info: 'Provincias. Haga clic en la Provincia que le interese para ver el número de Senadores por Provincias elegidos para la XIV Legislatura.'
    },
    groups: {
      title: 'Grupos Parlementarios',
      info: 'Distribución de Senadores según los grupos parlamentarios del Senado. Haga clic en los diferentes grupos para ver el número de Senadores por cada grupo.'
    },
    income: {
      title: 'Rentas Percibidas',
      info: 'Distribución de Senadores según el valor de rentas percibidas. Haga clic en los diferentes rangos y valores para ver el número de Senadores incluidos.'
    },
    properties: {
      title: 'Cantidad the bienes inmuebles',
      info: 'Distribución de Senadores según la cantidad de bienes inmuebles. Haga clic en los diferentes valores de cantidad para ver el número de Senadores incluidos.'
    },
    financial: {
      title: 'Cantidad de acciones y participaciones',
      info: 'Distribución de Senadores según la cantidad de participaciones financieras. Haga clic en los diferentes valores de cantidad para ver el número de Senadores incluidos.'
    },
    debt: {
      title: 'Valor de deudas y obligaciones patrimoniales (saldo pendiente)',
      info: 'Distribución de Senadores según el valor de participaciones financieras. Haga clic en los diferentes rangos y valores para ver el número de Senadores incluidos.'
    },
    vehicles: {
      title: 'Cantidad de vehículos, embarcaciones y aeronaves',
      info: 'Distribución de Senadores según la cantidad de vehículos, embarcaciones y aeronaves. Haga clic en los diferentes valores de cantidad para ver el número de Senadores incluidos.'
    },
    gender: {
      title: 'Género',
      info: 'Porcentaje de mujeres y hombres según la composición del Senado.'
    },
    irpf: {
      title: 'IRPF',
      info: ''
    },
    depositos: {
      title: 'Depositos',
      info: ''
    },
    mainTable: {
      chart: null,
      type: 'table',
      title: 'Tabla',
      info: 'Haga clic en cualquier Diputado o Senador para ver los datos de su última declaración de bienes y rentas de cada parlamentario de la Legislatura XIV.'
    }
  },
  selectedElement: { "P": "", "Sub": ""},
  modalShowTable: '',
  provinces: {
    "Girona": "Cataluña",
    "Valladolid": "Castilla y León",
    "Lleida": "Aragón",
    "Barcelona": "Cataluña",
    "Menorca": "Islas Baleares",
    "Tarragona": "Cataluña",
    "Melilla": "Ceuta y Melilla",
    "Salamanca": "Castilla y León",
    "Soria": "Castilla y León",
    "Badajoz": "Extremadura",
    "Cáceres": "Extremadura",
    "Albacete": "Castilla-La Mancha",
    "Huelva": "Andalucía",
    "Palencia": "Castilla y León",
    "Lugo": "Galicia",
    "Navarra": "Comunidad Foral de Navarra",
    "Cádiz": "Andalucía",
    "Parlamento de Cataluña": "Cataluña",
    "Gipuzkoa": "País Vasco",
    "Córdoba": "Andalucía",
    "Málaga": "Andalucía",
    "La Palma": "",
    "Pontevedra": "Galicia",
    "Parlamento de Canarias": "",	
    "La Rioja": "La Rioja",
    "Cantabria": "Cantabria",
    "Parlamento de La Rioja": "La Rioja",
    "Alicante/Alacant": "Comunidad Valenciana",
    "Ávila": "Castilla y León",
    "Ceuta": "Ceuta y Melilla",
    "Junta General del Principado de Asturias": "Principado de Asturias",
    "Parlamento de las Illes Balears": "Islas Baleares",
    "Parlamento de Andalucía": "Andalucía",
    "Parlamento de Navarra": "Comunidad Foral de Navarra",
    "Asamblea de Madrid": "Comunidad de Madrid",
    "Asamblea de Extremadura": "Extremadura",
    "Corts Valencianes": "Comunidad Valenciana",
    "Cortes de Aragón": "Aragón",
    "Parlamento de Cantabria": "Cantabria",
    "Cuenca": "Castilla-La Mancha",
    "A Coruña": "Galicia",
    "Cortes de Castilla-La Mancha": "Castilla-La Mancha",
    "Asturias": "Principado de Asturias",
    "Toledo": "Castilla-La Mancha",
    "Tenerife": "",
    "León": "Castilla y León",
    "Segovia": "Castilla y León",
    "Parlamento Vasco": "País Vasco",
    "Guadalajara": "Castilla-La Mancha",
    "Valencia/València": "Comunidad Valenciana",
    "Cortes de Castilla y León": "Castilla y León",
    "La Gomera": "",
    "Ourense": "Galicia",
    "Murcia": "Región de Murcia",
    "Jaén": "Andalucía",
    "Sevilla": "Andalucía",
    "Burgos": "Castilla y León",
    "Zamora": "Castilla y León",
    "Madrid": "Comunidad de Madrid",
    "Almería": "Andalucía",
    "Ciudad Real": "Castilla-La Mancha",
    "Castellón/Castelló": "Comunidad Valenciana",
    "Bizkaia": "País Vasco",
    "Araba/Álava": "País Vasco",
    "Granada": "Andalucía",
    "Teruel": "Aragón",
    "Fuerteventura": "",
    "Gran Canaria": "",
    "Zaragoza": "Aragón",
    "Parlamento de Galicia": "Galicia",
    "Mallorca": "Islas Baleares",
    "Lanzarote": "",
    "Asamblea Regional de Murcia": "Región de Murcia",
    "Huesca": "Aragón",
    "El Hierro": "",
    "Eivissa-Formentera": "Islas Baleares"
  },
  colors: {
    generic: ["#3b95d0", "#4081ae", "#406a95", "#395a75" ],
    default1: "#2b90b8",
    default2: "#449188",
    incomeRange: {
      "> 100.000€": "#0d506b",
      "50.001€ - 100.000€": "#1d7598",
      "10.001€ - 50.000€": "#2b90b8",
      "5.001 - 10.000€": "#3aa2cb",
      "1.001 - 5.000€": "#47afd8",
      "1€ - 1.000€": "#55bbe4",
      "Sin rentas": "#ccc",
      "Sin participationes": "#ccc",
      "Sin deudas": "#ccc"
    },
    propertiesRange: {
      "> 20": "#0d506b",
      "10 - 20": "#2b90b8",
      "5 - 10": "#3aa2cb",
      "1 - 5": "#55bbe4",
      "Sin bienes inmuebles": "#ccc",
      "Sin vehículos": "#ccc",
      "Sin participationes": "#ccc"
    },
    gender: {
      "F": "#1d7598",
      "M": "#55bbe4",
      "": "#ccc"
    },
    irpf: {
      ">20000€": "#1d7598",
      "10000€ - 20000€": "#2b90b8",
      "5000€ - 10000€": "#3aa2cb",
      "1000€ - 5000€": "#47afd8",
      "1€ - 1000€": "#55bbe4",
      "0 €": "#ccc"
    },
    deposits: {
      ">50000€": "#1d7598",
      "20000€ - 50000€": "#2b90b8",
      "5000€ - 20000€": "#3aa2cb",
      "1000€ - 5000€": "#47afd8",
      "1€ - 1000€": "#55bbe4",
      "Ningun": "#ccc"
    },
    groups: {
      "GP. ESQUERRA REPUBLICANA-EUSKAL HERRIA BILDU":"#FFDC67",
      "GP. MIXTO":"#797979",
      "GP. POPULAR":"#0BB2FF",
      "GP. SOCIALISTA":"#E2001A",
      "GP. VASCO":"#19AA63",
      "GP. IZQUIERDA CONFEDERAL":"#794877",
      "GP. CIUDADANOS":"#606060",
      "GP. NACIONALISTA EN EL SEANDO JUNTS PER CATALUNYA-COALICIÓN CANARIA / PARTIDO NACIONALISTA CANARIO":"#FF2EEE",
      "":"#bbb",
      "N/A":"#bbb"
    }
  }
}

//Set vue components and Vue app

Vue.component('chart-header', ChartHeader);
Vue.component('loader', Loader);

new Vue({
  el: '#app',
  data: vuedata,
  methods: {
    //Share
    downloadDataset: function () {
      window.open('./data/tab_a/finance.csv');
    },
    share: function (platform) {
      if(platform == 'twitter'){
        var thisPage = window.location.href.split('?')[0];
        var shareText = 'Share text here ' + thisPage;
        var shareURL = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(shareText);
        window.open(shareURL, '_blank');
        return;
      }
      if(platform == 'facebook'){
        var toShareUrl = 'https://integritywatch.lt';
        var shareURL = 'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(toShareUrl);
        window.open(shareURL, '_blank', 'toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=250,top=300,left=300');
        return;
      }
    }
  }
});

//Initialize info popovers
$(function () {
  $('[data-toggle="popover"]').popover()
})

//Charts
var charts = {
  map: {
    chart: dc.geoChoroplethChart("#map_chart"),
    type: 'map',
    divId: 'map_chart'
  },
  groups: {
    chart: dc.rowChart("#groups_chart"),
    type: 'row',
    divId: 'groups_chart'
  },
  income: {
    chart: dc.pieChart("#income_chart"),
    type: 'pie',
    divId: 'income_chart'
  },
  properties: {
    chart: dc.pieChart("#properties_chart"),
    type: 'pie',
    divId: 'properties_chart'
  },
  financial: {
    chart: dc.pieChart("#financial_chart"),
    type: 'pie',
    divId: 'financial_chart'
  },
  debt: {
    chart: dc.pieChart("#debt_chart"),
    type: 'pie',
    divId: 'debt_chart'
  },
  vehicles: {
    chart: dc.pieChart("#vehicles_chart"),
    type: 'pie',
    divId: 'vehicles_chart'
  },
  gender: {
    chart: dc.pieChart("#gender_chart"),
    type: 'pie',
    divId: 'gender_chart'
  },
  irpf: {
    chart: dc.pieChart("#irpf_chart"),
    type: 'pie',
    divId: 'irpf_chart'
  },
  depositos: {
    chart: dc.pieChart("#depositos_chart"),
    type: 'pie',
    divId: 'depositos_chart'
  },
  mainTable: {
    chart: null,
    type: 'table',
    divId: 'dc-data-table'
  }
}

//Functions for responsivness
var recalcWidth = function(divId) {
  return document.getElementById(divId).offsetWidth - vuedata.chartMargin;
};
var recalcWidthWordcloud = function() {
  //Replace element if with wordcloud column id
  var width = document.getElementById("party_chart").offsetWidth - vuedata.chartMargin*2;
  return [width, 550];
};
var recalcCharsLength = function(width) {
  return parseInt(width / 8);
};
var calcPieSize = function(divId) {
  var newWidth = recalcWidth(divId);
  var sizes = {
    'width': newWidth,
    'height': 0,
    'radius': 0,
    'innerRadius': 0,
    'cy': 0,
    'legendY': 0
  }
  if(newWidth < 300) { 
    sizes.height = newWidth + 170;
    sizes.radius = (newWidth)/2;
    sizes.innerRadius = (newWidth)/4;
    sizes.cy = (newWidth)/2;
    sizes.legendY = (newWidth) + 30;
  } else {
    sizes.height = newWidth*0.75 + 170;
    sizes.radius = (newWidth*0.75)/2;
    sizes.innerRadius = (newWidth*0.75)/4;
    sizes.cy = (newWidth*0.75)/2;
    sizes.legendY = (newWidth*0.75) + 30;
  }
  return sizes;
};
var resizeGraphs = function() {
  for (var c in charts) {
    if((c == 'vehicles') && vuedata.showAllCharts == false){
      
    } else {
      var sizes = calcPieSize(charts[c].divId);
      var newWidth = recalcWidth(charts[c].divId);
      var charsLength = recalcCharsLength(newWidth);
      if(charts[c].type == 'row'){
        charts[c].chart.width(newWidth);
        charts[c].chart.label(function (d) {
          var thisKey = d.key;
          if(thisKey.indexOf('###') > -1){
            thisKey = thisKey.split('###')[0];
          }
          if(thisKey.length > charsLength){
            return thisKey.substring(0,charsLength) + '...';
          }
          return thisKey;
        })
        charts[c].chart.redraw();
      } else if(charts[c].type == 'bar') {
        charts[c].chart.width(newWidth);
        charts[c].chart.rescale();
        charts[c].chart.redraw();
      } else if(charts[c].type == 'pie') {
        charts[c].chart
          .width(sizes.width)
          .height(sizes.height)
          .cy(sizes.cy)
          .innerRadius(sizes.innerRadius)
          .radius(sizes.radius)
          .legend(dc.legend().x(0).y(sizes.legendY).gap(10).legendText(function(d) { 
            var thisKey = d.name;
            if(thisKey.length > charsLength){
              return thisKey.substring(0, charsLength) + '...';
            }
            return thisKey;
          }));
        charts[c].chart.redraw();
      } else if(charts[c].type == 'cloud') {
        charts[c].chart.size(recalcWidthWordcloud());
        charts[c].chart.redraw();
      } else if(charts[c].type == 'map') {
        if(window.innerWidth <= 768) {
          var newProjection = d3.geoMercator()
          .center([11,45]) //theorically, 50°7′2.23″N 9°14′51.97″E but this works
          .translate([newWidth + 170, 0])
          .scale(newWidth*3.5);
          charts[c].chart.height(500);
        } else {
          var newProjection = d3.geoMercator()
          .center([11,45]) //theorically, 50°7′2.23″N 9°14′51.97″E but this works
          .scale(newWidth*3)
          .translate([newWidth + 140, -40]);
          //.translate([newWidth - 50, 220])
          //.scale(newWidth*3);
          charts[c].chart.height(800);
        }
        charts[c].chart.width(newWidth);
        charts[c].chart.projection(newProjection);
        charts[c].chart.redraw();
      }
    }
  }
};

//Add commas to thousands
function addcommas(x){
  if(parseInt(x)){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return x;
}
//Custom date order for dataTables
var dmy = d3.timeParse("%d/%m/%Y");
jQuery.extend( jQuery.fn.dataTableExt.oSort, {
  "date-eu-pre": function (date) {
    if(date.indexOf("Cancelled") > -1){
      date = date.split(" ")[0];
    }
      return dmy(date);
  },
  "date-eu-asc": function ( a, b ) {
      return ((a < b) ? -1 : ((a > b) ? 1 : 0));
  },
  "date-eu-desc": function ( a, b ) {
      return ((a < b) ? 1 : ((a > b) ? -1 : 0));
  }
});

/*
function cleanCurrency(valString) {
    //Clean end of string from € .-
    valString = valString.replace("€","").replace(".-","").trim();
    //If the value has slashes in it, split the values and add them
    if(valString.indexOf("/") > -1) {
      console.log(valString);
      var splitVals = valString.split("/");
      var summedVals = 0;
      _.each(splitVals, function(x) {
        summedVals += parseFloat(x);
      });
    }

    //Remove special chars and then if there was a dot or comma before the last 2 digits, add dot for decimals
    var result = valString.replace(/[^0-9]/g, '');
    if (/[',\.]\d{2}$/.test(valString)) {
        result = result.replace(/(\d{2})$/, '.$1');
    }
    if(isNaN(parseFloat(result))) {
      console.log(result);
    }
    return parseFloat(result);
}
function calcIncomeTot(el, type) {
  var tot = 0;
  _.each(el, function (d) {
    var thisAmt = null;
    if(type == 'income') {
      thisAmt = cleanCurrency(d.euros);
    }
    if(type == 'deposits') {
      thisAmt = cleanCurrency(d.saldo);
    }
    if(type == 'debt') {
      thisAmt = cleanCurrency(d.saldo_pendiente);
    }
    if(type == 'financial') {
      thisAmt = cleanCurrency(d.valor);
    }
    if(thisAmt && !isNaN(thisAmt)) {
      tot += thisAmt;
    }
  });
  return tot.toFixed(2);
}
*/

function calcIncomeRange(amt, type) {
  var range = "Sin rentas";
  if(type == 'financial') {
    range = "Sin participationes";
  }
  if(type == 'debt') {
    range = "Sin deudas";
  }
  if(type == 'deposits') {
    range = "Ningun";
    if(amt && amt > 0) {
      if(amt > 50000) {
        range = ">50000€";
      } else if(amt > 20000) {
        range = "20000€ - 50000€";
      } else if(amt > 5000) {
        range = "5000€ - 20000€";
      } else if(amt > 1000) {
        range = "1000€ - 5000€";
      } else if(amt > 0) {
        range = "1€ - 1000€";
      }
    }
    return range;
  }
  if(amt && amt > 0) {
    if(amt > 100000) {
      range = "> 100.000€";
    } else if(amt > 50000) {
      range = "50.001€ - 100.000€";
    } else if(amt > 10000) {
      range = "10.001€ - 50.000€";
    } else if(amt > 5000) {
      range = "5.001 - 10.000€";
    } else if(amt > 1000) {
      range = "1.001 - 5.000€";
    } else if(amt > 0) {
      range = "1€ - 1.000€";
    }
  }
  return range;
}
function calcPropertiesRange(el, type) {
  var range = "Sin bienes inmuebles";
  if(type == "vehicles") {
    range = "Sin vehículos";
  }
  if(type == "financial") {
    range = "Sin participationes";
  }
  if(el && el.length > 0) {
    if(el.length > 20) {
      range = "> 20";
    } else if(el.length > 10) {
      range = "10 - 20";
    } else if(el.length > 5) {
      range = "5 - 10";
    } else if(el.length >= 1) {
      range = "1 - 5";
    }
  }
  return range;
}

//Generate random parameter for dynamic dataset loading (to avoid caching)
var randomPar = '';
var randomCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
for ( var i = 0; i < 5; i++ ) {
  randomPar += randomCharacters.charAt(Math.floor(Math.random() * randomCharacters.length));
}
//Load data and generate charts
json('./data/tab_b/senators.json?' + randomPar, (err, senators) => {
  csv('./data/tab_b/groups.csv?' + randomPar, (err, senatorsGroups) => {
    csv('./data/tab_b/clean_values.csv?' + randomPar, (err, amountsData) => {
      json('./data/tab_b/senators_photos.json?' + randomPar, (err, photosData) => {
        //Loop through data to aply fixes and calculations
        var totIncome = 0;
        var declarations = {};
        var areas = [];
        console.log(senators);
        //Loop through data to apply fixes
        _.each(senators, function (d) {
          console.log(d);
          //Get photo
          d.photoInfo = _.find(photosData, function(a){ return a.name.trim() == d.name.trim()});
          //Get province/area
          if(areas.indexOf(d.details.circunscripcion) == -1) {
            areas.push(d.details.circunscripcion);
          }
          d.province = "";
          if(d.details && d.details.circunscripcion) {
            d.province = vuedata.provinces[d.details.circunscripcion.trim()];
            if(!d.province) {
              console.log(d.province + " - " + d.details.circunscripcion);
            }
          }
          //Find groups data
          d.group = "";
          d.gender = "";
          d.groupData = _.find(senatorsGroups, function(a){ return a.Name == d.name});
          if(d.groupData) {
            d.group = d.groupData.Group;
            d.gender = d.groupData.Gender;
          }
          //Find rentas, depositos and deudas with fixed amounts, then calc totals and ranges
          d.fixedRentas = _.filter(amountsData, function(a){ return a.name == d.name && a.type.trim() == "rentas"});
          d.fixedDepositos = _.filter(amountsData, function(a){ return a.name == d.name && a.type.trim() == "depositos"});
          d.fixedDeudas = _.filter(amountsData, function(a){ return a.name == d.name && a.type.trim() == "deudas"});
          d.incomeTot = 0;
          d.depositsTot = 0;
          d.debtTot = 0;
          _.each(d.fixedRentas, function (a) {
            d.incomeTot += parseFloat(a.value);
          });
          _.each(d.fixedDepositos, function (a) {
            d.depositsTot += parseFloat(a.value);
          });
          _.each(d.fixedDeudas, function (a) {
            d.debtTot += parseFloat(a.value);
          });
          d.incomeRange = calcIncomeRange(d.incomeTot, 'income');
          d.depositsRange = calcIncomeRange(d.depositsTot, 'deposits');
          d.debtRange = calcIncomeRange(d.debtTot, 'debt');
          //Financial: count entries instead of value sum
          d.financialNumRange = calcPropertiesRange(d.otros_bienes, 'financial');
          //Properties
          d.propertiesRange = calcPropertiesRange(d.bienes, 'properties');
          //Otros bienes
          d.otherPropertiesRange = calcPropertiesRange(d.otros_bienes, 'other_properties');
          //Vehicles
          d.vehiclesRange = calcPropertiesRange(d.vehiculos, 'vehicles');
          //Irpf
          var irpfNum = 0;
          d.irpfRange = "0 €";
          if(d.cantidad_pagada_por_irpf) {
            irpfNum = parseFloat(d.cantidad_pagada_por_irpf.replace(".","").replace(",",".").replace(" €","").trim());
            if(irpfNum > 20000) {
              d.irpfRange = ">20000€";
            } else if(irpfNum > 10000) {
              d.irpfRange = "10000€ - 20000€";
            } else if(irpfNum > 5000) {
              d.irpfRange = "5000€ - 10000€";
            } else if(irpfNum > 1000) {
              d.irpfRange = "1000€ - 5000€";
            } else if(irpfNum > 0) {
              d.irpfRange = "1€ - 1000€";
            }
          }
        });

        //Set totals for custom counters
        $('.count-box-income .total-count').html(totIncome);

        //Set dc main vars. The second crossfilter is used to handle the travels stacked bar chart.
        var ndx = crossfilter(senators);
        var searchDimension = ndx.dimension(function (d) {
            var entryString = d.name;
            return entryString.toLowerCase();
        });

        //MAP CHART
        var createMapChart = function() {
          json('./data/spain-comunidad.json', (err, jsonmap) => {
            var mapProvinces = [];
            _.each(jsonmap.objects.ESP_adm1.geometries, function (p) {
              if(mapProvinces.indexOf(p.properties.NAME_1) == -1) {
                mapProvinces.push(p.properties.NAME_1);
              }
            });
            var chart = charts.map.chart;
            var width = recalcWidth(charts.map.divId);
            var mapDimension = ndx.dimension(function (d) {
              return d.province;
              return "ff";
              if(d.province && mapProvinces.indexOf(d.province) > -1) {
                return d.province
              }
              //return "ff";
              //return d.province;
            });
            var group = mapDimension.group().reduceSum(function (d) { return 1; });
            //var prov = topojson.feature(jsonmap, jsonmap.objects["spain-provinces"]).features;
            var area = topojson.feature(jsonmap, jsonmap.objects.ESP_adm1).features;
            var scale = width*3;
            var translate = [width + 140, -40];
            if(window.innerWidth <= 678) {
              scale = width*3.5;
              translate = [width + 170, 0];
            }
            var projection = d3.geoMercator()
              .center([11,45])
              .scale(scale)
              .translate(translate);
            var centered;
            function clicked(d) {
            }
        
            chart
              .width(width)
              .height(function(d){ return window.innerWidth <= 678 ? 500 : 800 })
              .dimension(mapDimension)
              .group(group)
              .projection(projection)
              .colors(d3.scaleQuantize().range(["#E2F2FF", "#C4E4FF", "#9ED2FF", "#81C5FF", "#6BBAFF", "#51AEFF", "#36A2FF", "#1E96FF", "#0089FF", "#0061B5"]))
              .colorDomain([1, 20])
              .colorCalculator(function (d) { return d == 0 ? '#eee' : chart.colors()(d);})
              .overlayGeoJson(area, 'comunidad', function(d) {
                return d.properties.NAME_1;
              })
              .title(function (d) {
                return d.key
              })
              .on('renderlet', function(chart) {});
            chart.render();

          });
        }

        //CHART 2
        var createGroupsChart = function() {
          var chart = charts.groups.chart;
          var dimension = ndx.dimension(function (d) {
            return d.group;
          });
          var group = dimension.group().reduceSum(function (d) {
              return 1;
          });
          var filteredGroup = (function(source_group) {
            return {
              all: function() {
                return source_group.top(100).filter(function(d) {
                  return (d.value != 0);
                });
              }
            };
          })(group);
          var width = recalcWidth(charts.groups.divId);
          var charsLength = recalcCharsLength(width);
          chart
            .width(width)
            .height(420)
            .margins({top: 0, left: 0, right: 10, bottom: 20})
            .group(filteredGroup)
            .dimension(dimension)
            .colorCalculator(function(d, i) {
              return vuedata.colors.default1;
            })
            .label(function (d) {
                if(d.key && d.key.length > charsLength){
                  return d.key.substring(0,charsLength) + '...';
                }
                return d.key;
            })
            .title(function (d) {
                return d.key + ': ' + d.value.toFixed(2);
            })
            .colorCalculator(function(d, i) {
              return vuedata.colors.groups[d.key.trim()];
            })
            .elasticX(true)
            .xAxis().ticks(4);
            //chart.xAxis().tickFormat(numberFormat);
            chart.render();
        }

        //CHART 3
        var createIncomeChart = function() {
          var chart = charts.income.chart;
          var dimension = ndx.dimension(function (d) {
            return d.incomeRange;
          });
          var group = dimension.group().reduceSum(function (d) { 
            return 1; 
          });
          var order = ['Sin rentas','1€ - 1.000€','1.001 - 5.000€','5.001 - 10.000€','10.001€ - 50.000€','50.001€ - 100.000€','> 100.000€'];
          var sizes = calcPieSize(charts.income.divId);
          chart
            .width(sizes.width)
            .height(sizes.height)
            .ordering(function(d) {return order.indexOf(d.key)})
            .cy(sizes.cy)
            .innerRadius(sizes.innerRadius)
            .radius(sizes.radius)
            .cap(10)
            .legend(dc.legend().x(0).y(sizes.legendY).gap(10).legendText(function(d) { 
              var thisKey = d.name;
              if(thisKey.length > 40){
                return thisKey.substring(0,40) + '...';
              }
              return thisKey;
            }))
            .title(function(d){
              var thisKey = d.key;
              return thisKey + ': ' + d.value;
            })
            .dimension(dimension)
            .colorCalculator(function(d, i) {
              return vuedata.colors.incomeRange[d.key];
            })
            .group(group);

          chart.render();
        }

        //CHART 4
        var createPropertiesChart = function() {
          var chart = charts.properties.chart;
          var dimension = ndx.dimension(function (d) {
            return d.propertiesRange;
          });
          var group = dimension.group().reduceSum(function (d) { 
            return 1; 
          });
          var order = ['Sin bienes inmuebles','1 - 5','5 - 10','10 - 20'];
          var sizes = calcPieSize(charts.properties.divId);
          chart
            .width(sizes.width)
            .height(sizes.height)
            .ordering(function(d) {return order.indexOf(d.key)})
            .cy(sizes.cy)
            .innerRadius(sizes.innerRadius)
            .radius(sizes.radius)
            .cap(10)
            .legend(dc.legend().x(0).y(sizes.legendY).gap(10).legendText(function(d) { 
              var thisKey = d.name;
              if(thisKey.length > 40){
                return thisKey.substring(0,40) + '...';
              }
              return thisKey;
            }))
            .title(function(d){
              var thisKey = d.key;
              return thisKey + ': ' + d.value;
            })
            .dimension(dimension)
            .colorCalculator(function(d, i) {
              return vuedata.colors.propertiesRange[d.key];
            })
            .group(group);

          chart.render();
        }

        //CHART 5
        var createFinancialParticipationsChart = function() {
          var chart = charts.financial.chart;
          var dimension = ndx.dimension(function (d) {
            //return d.financialRange;
            return d.financialNumRange;
          });
          var group = dimension.group().reduceSum(function (d) { 
            return 1; 
          });
          var order = ['Sin participationes','1 - 5','5 - 10','10 - 20'];
          //var order = ['Sin participationes','1€ - 1.000€','1.001 - 5.000€','5.001 - 10.000€','10.001€ - 50.000€','50.001€ - 100.000€','> 100.000€'];
          var sizes = calcPieSize(charts.financial.divId);
          chart
            .width(sizes.width)
            .height(sizes.height)
            .ordering(function(d) {return order.indexOf(d.key)})
            .cy(sizes.cy)
            .innerRadius(sizes.innerRadius)
            .radius(sizes.radius)
            .cap(10)
            .legend(dc.legend().x(0).y(sizes.legendY).gap(10).legendText(function(d) { 
              var thisKey = d.name;
              if(thisKey.length > 40){
                return thisKey.substring(0,40) + '...';
              }
              return thisKey;
            }))
            .title(function(d){
              var thisKey = d.key;
              return thisKey + ': ' + d.value;
            })
            .dimension(dimension)
            .colorCalculator(function(d, i) {
              return vuedata.colors.propertiesRange[d.key];
            })
            .group(group);

          chart.render();
        }

        //CHART 6
        var createDebtChart = function() {
          var chart = charts.debt.chart;
          var dimension = ndx.dimension(function (d) {
            return d.debtRange;
          });
          var group = dimension.group().reduceSum(function (d) { 
            return 1; 
          });
          var order = ['Sin deudas','1€ - 1.000€','1.001 - 5.000€','5.001 - 10.000€','10.001€ - 50.000€','50.001€ - 100.000€','> 100.000€'];
          var sizes = calcPieSize(charts.debt.divId);
          chart
            .width(sizes.width)
            .height(sizes.height)
            .ordering(function(d) {return order.indexOf(d.key)})
            .cy(sizes.cy)
            .innerRadius(sizes.innerRadius)
            .radius(sizes.radius)
            .cap(10)
            .legend(dc.legend().x(0).y(sizes.legendY).gap(10).legendText(function(d) { 
              var thisKey = d.name;
              if(thisKey.length > 40){
                return thisKey.substring(0,40) + '...';
              }
              return thisKey;
            }))
            .title(function(d){
              var thisKey = d.key;
              return thisKey + ': ' + d.value;
            })
            .dimension(dimension)
            .colorCalculator(function(d, i) {
              return vuedata.colors.incomeRange[d.key];
            })
            .group(group);

          chart.render();
        }

        //CHART 7
        var createVehiclesChart = function() {
          var chart = charts.vehicles.chart;
          var dimension = ndx.dimension(function (d) {
            return d.vehiclesRange;
          });
          var group = dimension.group().reduceSum(function (d) { 
            return 1; 
          });
          var order = ['Sin vehículos','1 - 5','5 - 10','10 - 20','> 20'];
          var sizes = calcPieSize(charts.vehicles.divId);
          chart
            .width(sizes.width)
            .height(sizes.height)
            .ordering(function(d) {return order.indexOf(d.key)})
            .cy(sizes.cy)
            .innerRadius(sizes.innerRadius)
            .radius(sizes.radius)
            .cap(10)
            .legend(dc.legend().x(0).y(sizes.legendY).gap(10).legendText(function(d) { 
              var thisKey = d.name;
              if(thisKey.length > 40){
                return thisKey.substring(0,40) + '...';
              }
              return thisKey;
            }))
            .title(function(d){
              var thisKey = d.key;
              return thisKey + ': ' + d.value;
            })
            .dimension(dimension)
            .colorCalculator(function(d, i) {
              return vuedata.colors.propertiesRange[d.key];
            })
            .group(group);

          chart.render();
        }

        //CHART 8
        var createGenderChart = function() {
          var chart = charts.gender.chart;
          var dimension = ndx.dimension(function (d) {
            return d.gender;
          });
          var group = dimension.group().reduceSum(function (d) { 
            return 1; 
          });
          var sizes = calcPieSize(charts.gender.divId);
          chart
            .width(sizes.width)
            .height(sizes.height)
            .cy(sizes.cy)
            .innerRadius(sizes.innerRadius)
            .radius(sizes.radius)
            .cap(10)
            .legend(dc.legend().x(0).y(sizes.legendY).gap(10).legendText(function(d) { 
              var thisKey = d.name;
              if(thisKey.length > 40){
                return thisKey.substring(0,40) + '...';
              }
              return thisKey;
            }))
            .title(function(d){
              var thisKey = d.key;
              return thisKey + ': ' + d.value;
            })
            .dimension(dimension)
            .colorCalculator(function(d, i) {
              return vuedata.colors.gender[d.key];
            })
            .group(group);

          chart.render();
        }

        //CHART 9
        var createIRPFChart = function() {
          var chart = charts.irpf.chart;
          var dimension = ndx.dimension(function (d) {
            return d.irpfRange;
          });
          var group = dimension.group().reduceSum(function (d) { 
            return 1; 
          });
          var order = ['0 €','1€ - 1000€','1000€ - 5000€','5000€ - 10000€','10000€ - 20000€', '>20000€'];
          var sizes = calcPieSize(charts.irpf.divId);
          chart
            .width(sizes.width)
            .height(sizes.height)
            .ordering(function(d) {return order.indexOf(d.key)})
            .cy(sizes.cy)
            .innerRadius(sizes.innerRadius)
            .radius(sizes.radius)
            .cap(10)
            .legend(dc.legend().x(0).y(sizes.legendY).gap(10).legendText(function(d) { 
              var thisKey = d.name;
              if(thisKey.length > 40){
                return thisKey.substring(0,40) + '...';
              }
              return thisKey;
            }))
            .title(function(d){
              var thisKey = d.key;
              return thisKey + ': ' + d.value;
            })
            .dimension(dimension)
            .colorCalculator(function(d, i) {
              return vuedata.colors.irpf[d.key];
            })
            .group(group);

          chart.render();
        }

        //CHART 10
        var createDepositosChart = function() {
          var chart = charts.depositos.chart;
          var dimension = ndx.dimension(function (d) {
            return d.depositsRange;
          });
          var group = dimension.group().reduceSum(function (d) { 
            return 1; 
          });
          var order = ['Ningun','1€ - 1000€','1000€ - 5000€','5000€ - 20000€','20000€ - 50000€', '>50000€'];
          var sizes = calcPieSize(charts.depositos.divId);
          chart
            .width(sizes.width)
            .height(sizes.height)
            .ordering(function(d) {return order.indexOf(d.key)})
            .cy(sizes.cy)
            .innerRadius(sizes.innerRadius)
            .radius(sizes.radius)
            .cap(10)
            .legend(dc.legend().x(0).y(sizes.legendY).gap(10).legendText(function(d) { 
              var thisKey = d.name;
              if(thisKey.length > 40){
                return thisKey.substring(0,40) + '...';
              }
              return thisKey;
            }))
            .title(function(d){
              var thisKey = d.key;
              return thisKey + ': ' + d.value;
            })
            .dimension(dimension)
            .colorCalculator(function(d, i) {
              return vuedata.colors.deposits[d.key];
            })
            .group(group);

          chart.render();
        }
        
        //TABLE
        var createTable = function() {
          var count=0;
          charts.mainTable.chart = $("#dc-data-table").dataTable({
            "language": {
              "info": "Mostrando _START_ a _END_ de _TOTAL_ elementos",
              "lengthMenu": "Mostrar _MENU_ elementos",
              "paginate": {
                "first":      "First",
                "last":       "Last",
                "next":       "Siguiente",
                "previous":   "Anterior"
              },
              "infoEmpty": "No entries to show"
            },
            "columnDefs": [
              {
                "searchable": false,
                "orderable": false,
                "targets": 0,   
                data: function ( row, type, val, meta ) {
                  return count;
                }
              },
              {
                "searchable": false,
                "orderable": true,
                "targets": 1,
                "defaultContent":"N/D",
                "data": function(d) {
                  return d.name;
                }
              },
              {
                "searchable": false,
                "orderable": true,
                "targets": 2,
                "defaultContent":"N/D",
                "data": function(d) {
                  return d.group;
                }
              },
              {
                "searchable": false,
                "orderable": true,
                "targets": 3,
                "defaultContent":"N/D",
                "data": function(d) {
                  return d.incomeTot;
                }
              },
              {
                "searchable": false,
                "orderable": true,
                "targets": 4,
                "defaultContent":"N/D",
                "data": function(d) {
                  if(d.bienes) {
                    return d.bienes.length;
                  }
                  return "N/D";
                }
              },
              {
                "searchable": false,
                "orderable": true,
                "targets": 5,
                "defaultContent":"N/D",
                "data": function(d) {
                  return d.depositsTot;
                }
              },
              {
                "searchable": false,
                "orderable": true,
                "targets": 6,
                "defaultContent":"N/D",
                "data": function(d) {
                  if(d.otros_bienes){
                    return d.otros_bienes.length;
                  }
                  return "N/D";
                }
              }
            ],
            "iDisplayLength" : 25,
            "bPaginate": true,
            "bLengthChange": true,
            "bFilter": false,
            "order": [[ 1, "asc" ]],
            "bSort": true,
            "bInfo": true,
            "bAutoWidth": false,
            "bDeferRender": true,
            "aaData": searchDimension.top(Infinity),
            "bDestroy": true,
          });
          var datatable = charts.mainTable.chart;
          datatable.on( 'draw.dt', function () {
            var PageInfo = $('#dc-data-table').DataTable().page.info();
              datatable.DataTable().column(0, { page: 'current' }).nodes().each( function (cell, i) {
                  cell.innerHTML = i + 1 + PageInfo.start;
              });
            });
            datatable.DataTable().draw();

          $('#dc-data-table tbody').on('click', 'tr', function () {
            var data = datatable.DataTable().row( this ).data();
            vuedata.selectedElement = data;
            $('#detailsModal').modal();
          });
        }
        //REFRESH TABLE
        function RefreshTable() {
          dc.events.trigger(function () {
            var alldata = searchDimension.top(Infinity);
            charts.mainTable.chart.fnClearTable();
            charts.mainTable.chart.fnAddData(alldata);
            charts.mainTable.chart.fnDraw();
          });
        }

        //SEARCH INPUT FUNCTIONALITY
        var typingTimer;
        var doneTypingInterval = 1000;
        var $input = $("#search-input");
        $input.on('keyup', function () {
          clearTimeout(typingTimer);
          typingTimer = setTimeout(doneTyping, doneTypingInterval);
        });
        $input.on('keydown', function () {
          clearTimeout(typingTimer);
        });
        function doneTyping () {
          var s = $input.val().toLowerCase();
          searchDimension.filter(function(d) { 
            return d.indexOf(s) !== -1;
          });
          throttle();
          var throttleTimer;
          function throttle() {
            window.clearTimeout(throttleTimer);
            throttleTimer = window.setTimeout(function() {
                dc.redrawAll();
                RefreshTable();
            }, 250);
          }
        }

        //Reset charts
        var resetGraphs = function() {
          for (var c in charts) {
            if(charts[c].type !== 'table' && charts[c].chart.hasFilter()){
              charts[c].chart.filterAll();
            }
          }
          searchDimension.filter(null);
          $('#search-input').val('');
          dc.redrawAll();
          RefreshTable();
        }
        $('.reset-btn').click(function(){
          resetGraphs();
        })
        
        //Render charts
        createMapChart();
        createGroupsChart();
        createIncomeChart();
        createPropertiesChart();
        createFinancialParticipationsChart();
        createDebtChart();
        createVehiclesChart();
        createGenderChart();
        createIRPFChart();
        createDepositosChart();
        createTable();

        $('.dataTables_wrapper').append($('.dataTables_length'));

        //Hide loader
        vuedata.loader = false;

        //Toggle last charts functionality and fix for responsiveness
        vuedata.showAllCharts = false;
        $('#charts-toggle-btn').click(function(){
          if(vuedata.showAllCharts){
            resizeGraphs();
          }
        })

        //COUNTERS
        //Main counter
        var all = ndx.groupAll();
        var counter = dc.dataCount('.dc-data-count')
          .dimension(ndx)
          .group(all);
        counter.render();
        //Update datatables
        counter.on("renderlet.resetall", function(c) {
          RefreshTable();
        });

        
        //Custom counters
        function drawCustomCounters() {
          var dim = ndx.dimension (function(d) {
            return d.name;
          });
          var group = dim.group().reduce(
            function(p,d) {  
              p.nb +=1;
              p.income += d.incomeTot;
              return p;
            },
            function(p,d) {  
              p.nb -=1;
              p.income -= d.incomeTot;
              return p;
            },
            function(p,d) {  
              return {nb: 0, income: 0}; 
            }
          );
          group.order(function(p){ return p.nb });
          var income = 0;
          var counter = dc.dataCount(".count-box-income")
          .dimension(group)
          .group({value: function() {
            income = 0;
            return group.all().filter(function(kv) {
              if (kv.value.nb >0) {
                income += +kv.value.income;
              }
              return kv.value.nb > 0; 
            }).length;
          }})
          .renderlet(function (chart) {
            $(".nbincome").text(income.toFixed(2));
          });
          counter.render();
        }
        drawCustomCounters();
        


        //Window resize function
        window.onresize = function(event) {
          resizeGraphs();
        };
      });
    });
    });
});
