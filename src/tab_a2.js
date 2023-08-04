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
      title: 'Grupos Parlamentarios',
      info: 'Distribución de Diputados según los grupos parlamentarios del Congreso. Haga clic en los diferentes grupos para ver el número de Diputados por cada grupo.'
    },
    gender: {
      title: 'Género',
      info: 'Porcentaje de mujeres y hombres según la composición del Congreso de los Diputados.'
    },
    activities: {
      title: 'Actividades actuales',
      info: 'Lorem ipsum'
    },
    activitiesPast: {
      title: 'Actividades pasadas',
      info: 'Lorem ipsum'
    },
    foundations: {
      title: 'Fundaciones y otras asociaciones',
      info: 'Lorem ipsum'
    },
    donations: {
      title: 'Donaciones, obseuios y otros beneficios no remunerados',
      info: 'Lorem ipsum'
    },
    observations: {
      title: 'Otros intereses a declarar / Observaciones',
      info: 'Lorem ipsum'
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
    "Araba/Álava": "Araba/Álava",
    "ÁLAVA-ARABA": "Araba/Álava",
    "ALBACETE": "Albacete",
    "ALBACETE / CONGRESO": "Albacete",
    "ALICANTE": "Alacant/Alicante",
    "Alicante/Alacant": "Alacant/Alicante",
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
    "Castellón/Castelló": "Castelló/Castellón",
    "CEUTA": "Ceuta",
    "CIUDAD REAL": "Ciudad Real",
    "CORDOBA": "Córdoba",
    "CÓRDOBA": "Córdoba",
    "CÓRDOBA": "Córdoba",
    "CORDOBNCONGRESOSA": "Córdoba",
    "CORUÑA": "A Coruña",
    "Coruña (A)": "A Coruña",
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
    "ILLES BALEARS": "Islas Baleares",
    "ISLAS BALEARES": "Islas Baleares",
    "Balears (Illes)": "Islas Baleares",
    "JAEN": "Jaén",
    "JAÉN": "Jaén",
    "Jaén": "Jaén",
    "LA CORUÑA": "A Coruña",
    "LA RIOJA": "La Rioja",
    "Rioja (La)": "La Rioja",
    "LAS PALMAS": "Las Palmas",
    "Palmas (Las)": "Las Palmas",
    "LEON": "León",
    "LEÓN": "León",
    "LLEIDA": "Lleida",
    "LUGO": "Lugo",
    "MADRID": "Madrid",
    "Madrid": "Madrid",
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
    "S/C Tenerife": "Santa Cruz de Tenerife",
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
    "Valencia/València": "València/Valencia",
    "VALLADOLID": "Valladolid",
    "VIZCAYA": "Bizkaia/Vizcaya",
    "ZAMORA": "Zamora",
    "ZARAGOZA": "Zaragoza",
    "Zaragoza": "Zaragoza"
  },
  colors: {
    generic: ["#3b95d0", "#4081ae", "#406a95", "#395a75" ],
    default1: "#3b95d0",
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
      "Sin bienes inmuebles": "#ccc"
    },
    vehiclesRange: {
      "5+": "#0d506b",
      "4": "#1d7598",
      "3": "#2b90b8",
      "2": "#3aa2cb",
      "1": "#55bbe4",
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
      "Sin depósitos": "#ccc"
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
      window.open('./data/tab_a/d_declarations.csv');
    },
    share: function (platform) {
      if(platform == 'twitter'){
        var thisPage = window.location.href.split('?')[0];
        var shareText = 'Te invitamos a conocer la nueva plataforma donde podrás encontrar todos los datos declarados por los Diputados y Senadores de la Legislatura XIV en una única base de datos interactiva gracias a #IntegrityWatchEspaña ' + thisPage;
        var shareURL = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(shareText);
        window.open(shareURL, '_blank');
        return;
      }
      if(platform == 'facebook'){
        var toShareUrl = 'https://integritywatch.es';
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
  gender: {
    chart: dc.pieChart("#gender_chart"),
    type: 'pie',
    divId: 'gender_chart'
  },
  activities: {
    chart: dc.pieChart("#activities_chart"),
    type: 'pie',
    divId: 'activities_chart'
  },
  activitiesPast: {
    chart: dc.pieChart("#activitiespast_chart"),
    type: 'pie',
    divId: 'activitiespast_chart'
  },
  foundations: {
    chart: dc.pieChart("#foundations_chart"),
    type: 'pie',
    divId: 'foundations_chart'
  },
  donations: {
    chart: dc.pieChart("#donations_chart"),
    type: 'pie',
    divId: 'donations_chart'
  },
  observations: {
    chart: dc.pieChart("#observations_chart"),
    type: 'pie',
    divId: 'observations_chart'
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
    if((c == 'vehicles' || c == 'irpf' || c == 'depositos') && vuedata.showAllCharts == false){
      
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

//Get range
function getNumRange(num) {
  var range = 0;
  if(num == 0) {
    range = '0';
  } else if(num <= 2) {
    range = '1 - 2';
  } else if(num <= 5) {
    range = '3 - 5';
  } else if(num > 5) {
    range = '> 5';
  } 
  return range;
}

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
jQuery.extend( jQuery.fn.dataTableExt.oSort, {
  "alphabet-accent-pre": function (name) {
    if(name[0] == "Á"){
      name = "A" + name.substring(1);
    }
      return name;
  },
  "alphabet-accent-asc": function ( a, b ) {
      return ((a < b) ? -1 : ((a > b) ? 1 : 0));
  },
  "alphabet-accent-desc": function ( a, b ) {
      return ((a < b) ? 1 : ((a > b) ? -1 : 0));
  }
});

//Generate random parameter for dynamic dataset loading (to avoid caching)
var randomPar = '';
var randomCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
for ( var i = 0; i < 5; i++ ) {
  randomPar += randomCharacters.charAt(Math.floor(Math.random() * randomCharacters.length));
}
//Load data and generate charts
json('./data/tab_a2/docacteco.json?' + randomPar, (err, declarations) => {
  json('./data/tab_a2/DiputadosActivos.json?' + randomPar, (err, diputados) => {
    json('./data/tab_a/deputees_photos.json?' + randomPar, (err, photosData) => {
      var missingProvinces = [];
      var noActivitiesString1 = 'Durante el plazo señalado, además de lo anteriormente declarado, no he desarrollado otras actividades que puedan considerarse relevantes y que hayan podido condicionar el desarrollo de mi función política o parlamentaria, o que se encuentren dentro del ámbito de aplicación del Código de Conducta de las Cortes Generales';
      var noActivitiesString2 = 'Ninguna de las actividades desarrollada por mí durante los cinco años anteriores a la obtención del mandato parlamentario podrá condicionar mi actividad política en tanto en cuanto esta se desarrollará siempre al servicio del interés superior de España y de los españoles con lealtad a la Constitución y al resto del ordenamiento jurídico vigente tal y como juré en la sesión constitutiva del Congreso de los Diputados. En cuanto a las actividades que me hayan proporcionado ingresos económicos me remito a lo consignado en mis respectivas declaraciones de actividades y bienes formalizadas en el momento de acreditarme ante la Cámara de conformidad con lo establecido en la Constitución y en el Reglamento y que son de información pública a través de los procedimientos de difusión dependientes del Congreso de los Diputados';
      var noFoundationsString = 'Además de las anteriormente declaradas, durante el periodo señalado no he realizado otras colaboraciones o aportaciones económicas, ni de cualquier otro tipo, a fundaciones y otras asociaciones que puedan considerarse relevantes en relación con el desarrollo de mi actividad política o parlamentaria o que se encuentren dentro del ámbito de aplicación del Código de Conducta de las Cortes Generales.';
      var noDonationsString = 'Adicionalmente y durante el plazo señalado, además de lo anteriormente declarado, he recibido regalos u obsequios normales dentro de los usos familiares y sociales, que no han condicionado mi actividad política y no constituyen un conflicto de interés conforme al Código de Conducta de las Cortes Generales.';
      //Temporary lists to manually assign gender until we get that data
      var maleNames = ["Anguita Pérez, Omar", "Asens Llodrà, Jaume", "Cerdán León, Santos", "Diouf Dioh, Luc Andre", "Echenique Robba, Pablo", "Fagúndez Campo, Antidio", "González Coello de Portugal, Víctor", "González Muñoz, Ángel Luis", "Gómez-Reino Varela, Antonio", "Matute García de Jalón, Oskar", "Mazón Ramos, José María", "Pisarello Prados, Gerardo", "Rufián Romero, Gabriel", "Serrano Martínez, Juan Francisco", "Sánchez García, José María", "Zaragoza Alonso, José"];
      var femaleNames = ["Álvarez Fanjul, Beatriz", "Berja Vega, Laura", "Cantera de Castro, Zaida", "Crespín Rubio, Rafaela", "Faneca López, María Luisa", "Fernández Benéitez, Andrea", "Fernández Casero, Ana Belén", "Fernández Pérez, María", "Garrido Gutiérrez, Pilar", "Muñoz Dalda, Lucía", "Nasarre Oliva, Begoña", "Nogueras i Camero, Míriam", "Rosique i Saltor, Marta", "Toscano de Balbín, Carla", "Velasco Morillo, Elvira", "Vidal Sáez, Aina"];
      //Loop through list, get declaration and do calculations for charts
      _.each(diputados, function (d) {
        d.nameInverted = d.NOMBRE.split(', ')[1] + ' ' + d.NOMBRE.split(', ')[0];
        //Get gender
        d.gender = 'N/A';
        if(d.BIOGRAFIA) {
          if(d.BIOGRAFIA.includes('Casado') || d.BIOGRAFIA.includes('Graduado') || d.BIOGRAFIA.includes('Licenciado')) {
            d.gender = 'M';
          } else if(d.BIOGRAFIA.includes('Casada') || d.BIOGRAFIA.includes('Graduada') || d.BIOGRAFIA.includes('Licenciada')) {
            d.gender = 'F';
          }
        }
        if(d.gender == 'N/A') {
          if(maleNames.indexOf(d.NOMBRE) > -1) { d.gender = 'M'; }
          if(femaleNames.indexOf(d.NOMBRE) > -1) { d.gender = 'F'; }
        }
        d.declarations = _.filter(declarations, function(a){ 
          return a.NOMBRE.trim() == d.NOMBRE.replace(', ',',').trim()
        });
        if(!d.declarations) {
          console.log("No declarations: " + d.NOMBRE);
          d.declarations = [];
        }
        d.donationsTot = 0;
        d.foundationsTot = 0;
        d.activitiesCurrentTot = 0;
        d.activitiesPastTot = 0;
        d.activitiesFlag = false;
        d.activities = [];
        d.foundations = [];
        d.donations = [];
        d.observations = [];
        _.each(d.declarations, function (dec) {
          if(dec.TIPO == 'ACTIVIDAD') {
            d.activities.push(dec);
            if(dec.DESCRIPCION && dec.DESCRIPCION.includes(noActivitiesString1)) {

            } else if(dec.DESCRIPCION && dec.DESCRIPCION.includes(noActivitiesString2)) {
              d.activitiesFlag = true;
            } else if(dec.PERIODO) {
              if(dec.PERIODO.includes('actualidad') || dec.PERIODO.includes('Actualidad')) {
                d.activitiesCurrentTot ++;
              } else {
                d.activitiesPastTot ++;
              }
            } else {
              //console.log(dec);
            }
          }
          if(dec.TIPO == 'FUNDACIONES') {
            d.foundations.push(dec);
            if(dec.DESCRIPCION && dec.DESCRIPCION.includes(noFoundationsString)) {

            } else {
              d.foundationsTot ++;
            }
          }
          if(dec.TIPO == 'DONACION') {
            d.donations.push(dec);
            if(dec.DESCRIPCION && dec.DESCRIPCION.includes(noDonationsString)) {

            } else {
              d.donationsTot ++;
            }
          }
          if(dec.TIPO == 'OBSERVACIONES') {
            d.observations.push(dec.OBSERVACIONES);
          }
        });
        //Get photo
        d.photoInfo = _.find(photosData, function(a){ 
          var nameAcleaned = a.name.replaceAll('  ',' ').replaceAll(' ','').trim().toLowerCase().replaceAll(' ','');
          var nameDcleaned = d.nameInverted.trim().toLowerCase().replaceAll(' ','')
          return nameAcleaned  == nameDcleaned
        });
        //Get province
        d.province = d.CIRCUNSCRIPCION;
        if(d.province == "AUSTURIES") { d.province = "ASTURIAS"; }
        if(vuedata.provinces[d.province]) {
          d.province = vuedata.provinces[d.province];
        } else {
          if(missingProvinces.indexOf(d.province) == -1) { missingProvinces.push(d.province) }
        }
        /*
        d.province = vuedata.provinces[d.province.trim()];
        if(!d.province) {
          console.log(d.province + " - " + d.CIRCUNSCRIPCION);
        }
        */
        
      });
      console.log(missingProvinces);

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
            .colorCalculator(function (d) { 
              if(d == 0 || !d) { return '#eee' }
              return chart.colors()(d);
            })
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
          return d.GRUPOPARLAMENTARIO;
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
            if(vuedata.colors.groups[d.key.trim()] ) {

              return vuedata.colors.groups[d.key.trim()];
            }
            return vuedata.colors.default1;
          })
          .elasticX(true)
          .xAxis().ticks(4);
          //chart.xAxis().tickFormat(numberFormat);
          chart.render();
      }

      //CHART 3
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
            if(vuedata.colors.gender[d.key]) {
              return vuedata.colors.gender[d.key];
            }
            return '#ccc';
          })
          .group(group);

        chart.render();
      }

      //CHART 4
      var createActivitiesChart = function() {
        var chart = charts.activities.chart;
        var dimension = ndx.dimension(function (d) {
          return getNumRange(d.activitiesCurrentTot);
        });
        var group = dimension.group().reduceSum(function (d) { 
          return 1; 
        });
        var sizes = calcPieSize(charts.activities.divId);
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
            return vuedata.colors.generic[i];
          })
          .group(group);

        chart.render();
      }

      //CHART 5
      var createActivitiesPastChart = function() {
        var chart = charts.activitiesPast.chart;
        var dimension = ndx.dimension(function (d) {
          return getNumRange(d.activitiesPastTot);
        });
        var group = dimension.group().reduceSum(function (d) { 
          return 1; 
        });
        var sizes = calcPieSize(charts.activitiesPast.divId);
        var order = ['0','1 - 2', '3 - 5', '> 5'];
        chart
          .width(sizes.width)
          .height(sizes.height)
          .cy(sizes.cy)
          .ordering(function(d) {return order.indexOf(d.key)})
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
            return vuedata.colors.generic[i];
          })
          .group(group);

        chart.render();
      }

      //CHART 6
      var createFoundationsChart = function() {
        var chart = charts.foundations.chart;
        var dimension = ndx.dimension(function (d) {
          return getNumRange(d.foundationsTot);
        });
        var group = dimension.group().reduceSum(function (d) { 
          return 1; 
        });
        var sizes = calcPieSize(charts.foundations.divId);
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
            return vuedata.colors.generic[i];
          })
          .group(group);

        chart.render();
      }

      //CHART 7
      var createDonationsChart = function() {
        var chart = charts.donations.chart;
        var dimension = ndx.dimension(function (d) {
          return getNumRange(d.donationsTot);
        });
        var group = dimension.group().reduceSum(function (d) { 
          return 1; 
        });
        var order = ['0','1 - 2','3 - 5','> 5'];
        var sizes = calcPieSize(charts.donations.divId);
        chart
          .width(sizes.width)
          .height(sizes.height)
          .cy(sizes.cy)
          .innerRadius(sizes.innerRadius)
          .ordering(function(d) {return order.indexOf(d.key)})
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
            return vuedata.colors.generic[i];
          })
          .group(group);

        chart.render();
      }

      //CHART 8
      var createObservationsChart = function() {
        var chart = charts.observations.chart;
        var dimension = ndx.dimension(function (d) {
          if(d.observations && d.observations.length > 0) {
            return 'Si';
          }
          return 'No';
        });
        var group = dimension.group().reduceSum(function (d) { 
          return 1; 
        });
        var sizes = calcPieSize(charts.observations.divId);
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
            if(d.key == 'Si') {
              return vuedata.colors.default1;
            }
            return '#ccc';
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
              "type": "alphabet-accent",
              "data": function(d) {
                return d.NOMBRE;
              }
            },
            {
              "searchable": false,
              "orderable": true,
              "targets": 2,
              "defaultContent":"N/D",
              "data": function(d) {
                return d.GRUPOPARLAMENTARIO;
              }
            },
            {
              "searchable": false,
              "orderable": true,
              "targets": 3,
              "defaultContent":"N/D",
              "data": function(d) {
                return d.CIRCUNSCRIPCION;
              }
            },
            {
              "searchable": false,
              "orderable": true,
              "targets": 4,
              "defaultContent":"N/D",
              "data": function(d) {
                return d.activitiesCurrentTot;
              }
            },
            {
              "searchable": false,
              "orderable": true,
              "targets": 5,
              "defaultContent":"N/D",
              "data": function(d) {
                return d.activitiesPastTot;
              }
            },
            {
              "searchable": false,
              "orderable": true,
              "targets": 6,
              "defaultContent":"N/D",
              "data": function(d) {
                return d.foundationsTot;
              }
            },
            {
              "searchable": false,
              "orderable": true,
              "targets": 7,
              "defaultContent":"N/D",
              "data": function(d) {
                return d.donationsTot;
              }
            },
            {
              "searchable": false,
              "orderable": true,
              "targets": 8,
              "defaultContent":"N/D",
              "class": "col-small-text",
              "data": function(d) {
                if(d.activitiesFlag) {
                  return "<b>No activities declared red flag.</b> " + d.observations.join(' - ');
                }
                return d.observations.join(' - ');
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
        $('.map-buttons button').removeClass('active');
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

      //Tenerife button
      $('#tenerife').click(function () {
        $('.map-buttons button').removeClass('active');
        $(this).addClass('active');
        searchDimension.filter(function (d) { 
          if(d.indexOf('province:santa cruz de tenerife') > -1) { return true; }
          return false;
        });
        dc.redrawAll();
        RefreshTable();
        $('#map_chart svg .layer0 .departement').each(function(i) {
          $(this).removeClass('selected');
          $(this).addClass('deselected');
        });
      });

      //Laspalmas button
      $('#laspalmas').click(function () {
        $('.map-buttons button').removeClass('active');
        $(this).addClass('active');
        searchDimension.filter(function (d) { 
          if(d.indexOf('province:las palmas') > -1) { return true; }
          return false;
        });
        dc.redrawAll();
        RefreshTable();
        $('#map_chart svg .layer0 .departement').each(function(i) {
          $(this).removeClass('selected');
          $(this).addClass('deselected');
        });
      });

      //Ceuta button
      $('#ceuta').click(function () {
        $('.map-buttons button').removeClass('active');
        $(this).addClass('active');
        searchDimension.filter(function (d) { 
          if(d.indexOf('province:ceuta') > -1) { return true; }
          return false;
        });
        dc.redrawAll();
        RefreshTable();
        $('#map_chart svg .layer0 .departement').each(function(i) {
          $(this).removeClass('selected');
          $(this).addClass('deselected');
        });
      });

      //Melilla button
      $('#melilla').click(function () {
        $('.map-buttons button').removeClass('active');
        $(this).addClass('active');
        searchDimension.filter(function (d) { 
          if(d.indexOf('province:melilla') > -1) { return true; }
          return false;
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
      createGenderChart();
      createActivitiesChart();
      createActivitiesPastChart();
      createFoundationsChart();
      createDonationsChart();
      createObservationsChart();
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
      
      //Show disclaimer modal
      //$('#disclaimerModal').modal();

      //Window resize function
      window.onresize = function(event) {
        resizeGraphs();
      };
    })
  })
})
