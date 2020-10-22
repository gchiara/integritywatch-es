import jquery from 'jquery';
window.jQuery = jquery;
window.$ = jquery;
require( 'datatables.net' )( window, $ )
require( 'datatables.net-dt' )( window, $ )

import underscore from 'underscore';
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
  page: 'tabA',
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
      info: 'Provincias. Haga clic en la Provincia que le interese para ver el número de Diputados por Provincias elegidos para la XIV Legislatura.'
    },
    groups: {
      title: 'Grupos Parlementarios',
      info: 'Distribución de Diputados según los grupos parlamentarios del Congreso. Haga clic en los diferentes grupos para ver el número de Diputados por cada grupo.'
    },
    income: {
      title: 'Rentas Percibidas',
      info: 'Distribución de Diputados según el valor de rentas percibidas. Haga clic en los diferentes rangos y valores para ver el número de Diputados incluidos.'
    },
    properties: {
      title: 'Cantidad the bienes inmuebles',
      info: 'Distribución de Diputados según la cantidad de bienes inmuebles. Haga clic en los diferentes valores de cantidad para ver el número de Diputados incluidos.'
    },
    financial: {
      title: 'Valor de las acciones y participaciones',
      info: 'Distribución de Diputados según el valor de participaciones financieras. Haga clic en los diferentes rangos y valores para ver el número de Diputados incluidos.'
    },
    debt: {
      title: 'Valor de deudas y obligaciones patrimoniales',
      info: 'Distribución de Diputados según el valor de deudas y obligaciones patrimoniales. Haga clic en los diferentes rangos y valores para ver el número de Diputados incluidos.'
    },
    vehicles: {
      title: 'Cantidad de vehículos, embarcaciones y aeronaves',
      info: 'Distribución de Diputados según la cantidad de vehículos, embarcaciones y aeronaves. Haga clic en los diferentes valores de cantidad para ver el número de Diputados incluidos.'
    },
    gender: {
      title: 'Género',
      info: 'Porcentaje de mujeres y hombres según la composición del Congreso de los Diputados.'
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
    "A CORUÑA": "A Coruña",
    "A CORUÑA/CONGRESO": "A Coruña",
    "a coruña": "A Coruña",
    "A CORUÑA": "A Coruña",
    "ÁLAVA": "Araba/Álava",
    "Álava": "Araba/Álava",
    "ÁLAVA": "Araba/Álava",
    "ÁLAVA-ARABA": "Araba/Álava",
    "ALBACETE": "Albacete",
    "ALBACETE / CONGRESO": "Albacete",
    "ALICANTE": "Alacant/Alicante",
    "ALMERIA": "Almería",
    "ALMERÍA": "Almería",
    "ASTURIAS": "Asturias",
    "AUSTURIES": "Asturias",
    "ÁVILA": "Ávila",
    "Ávila": "Ávila",
    "BADAJOZ": "Badajoz",
    "BARCELONA": "Barcelona",
    "Bizkaia": "Bizkaia/Vizcaya",
    "bizkaia": "Bizkaia/Vizcaya",
    "BIZKAIA": "Bizkaia/Vizcaya",
    "bonos": "Bonos",
    "BURGOS": "Burgos",
    "Burgos": "Burgos",
    "CÁCERES": "Cáceres",
    "CADIZ": "Cádiz",
    "CÁDIZ": "Cádiz",
    "CÁDlZ": "Cádiz",
    "CANTABRIA": "Cantabria",
    "CASTELLÓ": "Castelló/Castellón",
    "CASTELLON": "Castelló/Castellón",
    "castellón": "Castelló/Castellón",
    "CEUTA": "Ceuta",
    "CIUDAD REAL": "Ciudad Real",
    "CORDOBA": "Córdoba",
    "CÓRDOBA": "Córdoba",
    "CÓRDOBA": "Córdoba",
    "CORDOBNCONGRESOSA": "Córdoba",
    "CORUÑA": "La Coruña",
    "CUENCA": "Cuenca",
    "ELCHE (ALICANTE)": "Alicante",
    "GIPUZKOA": "Gipuzkoa/Guipúzcoa",
    "Gipuzkoa": "Gipuzkoa/Guipúzcoa",
    "Gipuzkoa": "Gipuzkoa/Guipúzcoa",
    "GIRONA": "Girona",
    "GRANADA": "Granada",
    "GUADALAJARA": "Guadalajara",
    "HUELVA": "Huelva",
    "HUESCA": "Huesca",
    "ILLES BALEARS": "Illes Balears",
    "ISLAS BALEARES": "Illes Balears",
    "JAEN": "Jaén",
    "JAÉN": "Jaén",
    "LA CORUÑA": "La Coruña",
    "LA RIOJA": "La Rioja",
    "LAS PALMAS": "Las Palmas",
    "LEON": "León",
    "LEÓN": "León",
    "LLEIDA": "Lleida",
    "LUGO": "Lugo",
    "MADRID": "Madrid",
    "MALAGA": "Málaga",
    "MÁLAGA": "Málaga",
    "MÁLAGA": "Málaga",
    "MELILLA": "Melilla",
    "MURCIA": "Murcia",
    "NAVARRA": "Navarra",
    "OURENSE": "Ourense",
    "Ourense": "Ourense",
    "PALENCIA": "Palencia",
    "PONTEVEDRA": "Pontevedra",
    "pontevedra": "Pontevedra",
    "PROVINCIA DE CADIZ": "Cádiz",
    "SALAMANCA": "Salamanca",
    "Salamanca": "Salamanca",
    "SANTA CRUZ DE TENERIFE": "Santa Cruz de Tenerife",
    "Santa Cruz de Tenerife": "Santa Cruz de Tenerife",
    "santa cruz de tenerife": "Santa Cruz de Tenerife",
    "SANTANDER": "Santander",
    "SEGOVIA": "Segovia",
    "SEVILLA": "Sevilla",
    "Soria": "Soria",
    "SORIA": "Soria",
    "T arragona": "Tarragona",
    "TARRAGONA": "Tarragona",
    "TERUEL": "Teruel",
    "TINAJEROS (ALBACETE)": "Albacete",
    "TOLEDO": "Toledo",
    "VALENCIA": "València/Valencia",
    "VALLADOLID": "Valladolid",
    "VIZCAYA": "Bizkaia/Vizcaya",
    "ZAMORA": "Zamora",
    "ZARAGOZA": "Zaragoza",
    "Zaragoza": "Zaragoza"
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
      "Sin vehículos": "#ccc"
    },
    gender: {
      "F": "#1d7598",
      "M": "#55bbe4"
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
    groups2: {
      "GS":"#E9202C",
      "GVOX":"#63BE21",
      "GV  EAJ-PNV":"#ddd",
      "GEH Bildu":"#96F350",
      "GP":"#0BB2FF",
      "GPlu":"#0DDF81",
      "GCs":"#008000",
      "GCUP-EC-GC":"#672F6C",
      "GR":"#FFB232",
      "GMx":"#A2A9B1"
    },
    groups: {
      "GP. Socialista":"#E9202C",
      "GP. VOX":"#63BE21",
      "GP. Vasco (EAJ-PNV)":"#ddd",
      "GP. Euskal Herria Bildu":"#96F350",
      "GP. Popular en el congreso":"#0BB2FF",
      "GP. Plural":"#0DDF81",
      "GP. Ciudadanos":"#008000",
      "GP. Confederal De Unidas Podemos-En Comú Podem-Galicia En Común":"#672F6C",
      "GP. Republicano":"#FFB232",
      "GP. Mixto":"#A2A9B1"
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

function calcIncomeTot(el, type) {
  var tot = 0;
  _.each(el, function (d) {
    var thisAmt = d.income_value_clean;
    if(type == 'financial') {
      thisAmt = d.other_financial_clean;
    }
    if(type == 'debt') {
      thisAmt = d.debt_amount_remain;
    }
    if(type == 'deposits') {
      thisAmt = d.deposits_value_clean;
    }
    if(thisAmt) {
      //var amt = parseFloat(thisAmt.replace(".","").replace(",",".").replace(" €","").trim());
      var amt = parseFloat(thisAmt.replace(",","").replace(" €","").trim());
      tot += amt;
    }
  });
  return tot.toFixed(2);
}
function calcIncomeRange(amt, type) {
  var range = "Sin rentas";
  if(type == 'financial') {
    range = "Sin participationes";
  }
  if(type == 'debt') {
    range = "Sin deudas";
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
csv('./data/tab_a/d_declarations.csv?' + randomPar, (err, declarationsTable) => {
  csv('./data/tab_a/diputados_list.csv?' + randomPar, (err, diputados) => {
    json('./data/tab_a/deputees_photos.json?' + randomPar, (err, photosData) => {
      //Loop through data to aply fixes and calculations
      var totIncome = 0;
      var declarations = {};
      //Loop through data to apply fixes
      _.each(declarationsTable, function (d) {
        //Check if name exists in diputados, if name doesn't exists, add it 
        //Check if type esists, if it doesn't, create type array
        //Push entry to type array (only push non keys): loop through keys and if value not null, add key and value to entry
        var cleanName = d.unique_id.trim();
        var cleanCategory = d.category_declaration.trim();
        if(!declarations[cleanName]) {
          declarations[cleanName]  = {};
        }
        if(d.electoral_disctrict !== null && d.electoral_disctrict !== "") {
          declarations[cleanName]['electoral_disctrict'] = d.electoral_disctrict;
        }
        if(d.taxes_value !== null && d.taxes_value !== "") {
          declarations[cleanName]['taxes_value'] = d.taxes_value;
        }
        if(!declarations[cleanName][cleanCategory]) {
          declarations[cleanName][cleanCategory] = [];
        }
        if(!declarations[cleanName]['comments']) {
          declarations[cleanName]['comments']  = [];
        }
        var newEntry = {};
        for (var key in d) {
          if(key !== "unique_id" && key !== "full_name" && key !== "category_declaration" && key !== "electoral_disctrict" && key !== "comments" && d[key] !== null && d[key] !== "") {
            newEntry[key] = d[key].trim();
          }
        }
        declarations[cleanName][cleanCategory].push(newEntry);
        //Sort comments
        if(d.comments && d.comments !== "") {
          declarations[cleanName]['comments'].push(d.comments);
        }
        
      });
      //Loop through list, get declaration and do calculations for charts
      _.each(diputados, function (d) {
        d.declaration = {};
        if(declarations[d.unique_id]) {
          d.declaration = declarations[d.unique_id];
        }
        //Get photo
        d.photoInfo = _.find(photosData, function(a){ return a.name.trim() == d.full_name.trim()});
        //Get province
        d.province = "";
        if(d.declaration && d.declaration.electoral_disctrict) {
          d.province = vuedata.provinces[d.declaration.electoral_disctrict.trim()];
          if(!d.province) {
            console.log(d.province + " - " + d.declaration.electoral_disctrict);
          }
        }
        //IRPF range
        d.irpfRange = "0 €";
        if(d.declaration.taxes_value) {
          var irpfNum = parseFloat(d.declaration.taxes_value.replace(",","").replace(" €","").trim());
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
        //Income Tot and Range
        d.declaration.incomeTot = 0;
        if(d.declaration.rentas) {
          d.declaration.incomeTot = calcIncomeTot(d.declaration.rentas, 'income');
        }
        d.declaration.incomeRange = calcIncomeRange(d.declaration.incomeTot, 'income');
        //Properties
        d.declaration.propertiesRange = calcPropertiesRange(d.declaration["bienes patrimoniales"], 'properties');
        //Financial participations Tot and Range
        d.declaration.financialTot = 0;
        if(d.declaration["otros bienes o derechos"]) {
          d.declaration.financialTot = calcIncomeTot(d.declaration["otros bienes o derechos"], 'financial');
        }
        d.declaration.financialRange = calcIncomeRange(d.declaration.financialTot, 'financial');
        //Debt Tot and Range
        d.declaration.debtTot = 0;
        if(d.declaration.deudas) {
          d.declaration.debtTot = calcIncomeTot(d.declaration.deudas, 'debt');
        }
        d.declaration.debtRange = calcIncomeRange(d.declaration.debtTot, 'debt');
        //Vehicles
        d.declaration.vehiclesRange = calcPropertiesRange(d.declaration["vehículos"], 'vehicles');
        //Deposits Tot
        d.declaration.depositsTot = 0;
        d.depositsRange = "Ningun";
        if(d.declaration.depositos) {
          d.declaration.depositsTot = calcIncomeTot(d.declaration.depositos, 'deposits');
          if(d.declaration.depositsTot > 50000) {
            d.depositsRange = ">50000€";
          } else if(d.declaration.depositsTot > 20000) {
            d.depositsRange = "20000€ - 50000€";
          } else if(d.declaration.depositsTot > 5000) {
            d.depositsRange = "5000€ - 20000€";
          } else if(d.declaration.depositsTot > 1000) {
            d.depositsRange = "1000€ - 5000€";
          } else if(d.declaration.depositsTot > 0) {
            d.depositsRange = "1€ - 1000€";
          }
        }
      });

      //Set totals for custom counters
      $('.count-box-income .total-count').html(totIncome);

      //Set dc main vars. The second crossfilter is used to handle the travels stacked bar chart.
      var ndx = crossfilter(diputados);
      var searchDimension = ndx.dimension(function (d) {
          var entryString = d.full_name + ' ' + d.unique_id + ' ' + d.political_group + ' ' + d.political_group_IW + ' province:'+d.province;
          return entryString.toLowerCase();
      });

      //MAP CHART
      var createMapChart = function() {
        json('./data/spain-provinces.geo.json', (err, jsonmap) => {
          //jsonmap.features
          var mapProvinces = [];
          _.each(jsonmap.features, function (p) {
            if(mapProvinces.indexOf(p.properties.name) == -1) {
              mapProvinces.push(p.properties.name);
            }
          });
          var chart = charts.map.chart;
          var width = recalcWidth(charts.map.divId);
          var mapDimension = ndx.dimension(function (d) {
            return d.province;
          });
          var group = mapDimension.group().reduceSum(function (d) { return 1; });
          //var prov = topojson.feature(jsonmap, jsonmap.objects["spain-provinces"]).features;
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
            //.overlayGeoJson(prov, "province", function (d) { console.log(d); return d.properties.name; })
            //objects - spain-provinces
            .overlayGeoJson(jsonmap.features, 'province', function(d) {
              //console.log(d.properties.name);
              return d.properties.name;
            })
            .title(function (d) {
              return d.key
              //return  _.find(dpt, function (m) {return m.properties.code==d.key}).properties.nom + ': ' + d.value + ' parlementaires';
            })
            .on('renderlet', function(chart) {});
          chart.render();

        });
      }

      //CHART 2
      var createGroupsChart = function() {
        var chart = charts.groups.chart;
        var dimension = ndx.dimension(function (d) {
          //return d.political_group;
          return d.political_group_IW;
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
          return d.declaration.incomeRange;
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
          return d.declaration.propertiesRange;
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
          return d.declaration.financialRange;
        });
        var group = dimension.group().reduceSum(function (d) { 
          return 1; 
        });
        var order = ['Sin participationes','1€ - 1.000€','1.001 - 5.000€','5.001 - 10.000€','10.001€ - 50.000€','50.001€ - 100.000€','> 100.000€'];
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
            return vuedata.colors.incomeRange[d.key];
          })
          .group(group);

        chart.render();
      }

      //CHART 6
      var createDebtChart = function() {
        var chart = charts.debt.chart;
        var dimension = ndx.dimension(function (d) {
          return d.declaration.debtRange;
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
          return d.declaration.vehiclesRange;
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
                return d.last_name.trim() + " " + d.first_name.trim();
                return d.full_name;
              }
            },
            {
              "searchable": false,
              "orderable": true,
              "targets": 2,
              "defaultContent":"N/D",
              "data": function(d) {
                return d.political_group;
              }
            },
            {
              "searchable": false,
              "orderable": true,
              "targets": 3,
              "defaultContent":"N/D",
              "data": function(d) {
                return d.declaration.incomeTot;
              }
            },
            {
              "searchable": false,
              "orderable": true,
              "targets": 4,
              "defaultContent":"N/D",
              "data": function(d) {
                if(d.declaration["bienes patrimoniales"]) {
                  return d.declaration["bienes patrimoniales"].length;
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
                return d.declaration.depositsTot;
              }
            },
            {
              "searchable": false,
              "orderable": true,
              "targets": 6,
              "defaultContent":"N/D",
              "data": function(d) {
                if(d.declaration["otros bienes o derechos"]){
                  return d.declaration["otros bienes o derechos"].length;
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

      //Canaries button
      $('#canaries').click(function () {
        $(this).addClass('active');
        var p1 = 'province:las palmas';
        var p2 = 'province:santa cruz de tenerife';
        searchDimension.filter(function (d) { 
          if(d.indexOf(p1) > -1 || d.indexOf(p2) > -1){
            return true;
          } else {
            return false;
          }
        });
        dc.redrawAll();
        RefreshTable();
        $('#map_chart svg .layer0 .departement').each(function(i) {
          $(this).removeClass('selected');
          $(this).addClass('deselected');
        });
      });

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
        $('#canaries').removeClass('active');
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
          return d.full_name;
        });
        var group = dim.group().reduce(
          function(p,d) {  
            p.nb +=1;
            p.income += d.declaration.incomeTot;
            return p;
          },
          function(p,d) {  
            p.nb -=1;
            p.income -= d.declaration.incomeTot;
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
    })
  })
})
