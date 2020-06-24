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
  travelFilter: 'all',
  charts: {
    map: {
      title: 'Map',
      info: ''
    },
    groups: {
      title: 'Grupos Parlementarios',
      info: ''
    },
    income: {
      title: 'Rentas Percibidas',
      info: ''
    },
    properties: {
      title: 'Nombre de bienes inmuebles',
      info: ''
    },
    financial: {
      title: 'Valor de las participaciones financieras',
      info: ''
    },
    debt: {
      title: 'Valor de las duedas y obligaciones patrimoniales',
      info: ''
    },
    vehicles: {
      title: 'Nombre de vehículos, embarcaciones Y aeronaves',
      info: ''
    },
    mainTable: {
      chart: null,
      type: 'table',
      title: 'Table',
      info: ''
    }
  },
  selectedElement: { "P": "", "Sub": ""},
  modalShowTable: '',
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
      var amt = parseFloat(thisAmt.replace(".","").replace(",",".").replace(" €","").trim());
      tot += amt;
    }
  });
  console.log(tot);
  return tot;
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
    //Loop through data to aply fixes and calculations
    var totIncome = 0;
    var declarations = {};
    //Loop through data to apply fixes
    _.each(declarationsTable, function (d) {
      //Check if name exists in diputados, if name doesn't exists, add it 
      //Check if type esists, if it doesn't, create type array
      //Push entry to type array (only push non keys): loop through keys and if value not null, add key and value to entry
      var cleanName = d.full_name.trim();
      var cleanCategory = d.category_declaration.trim();
      if(!declarations[cleanName]) {
        declarations[cleanName]  = {};
      }
      if(d.electoral_disctrict !== null && d.electoral_disctrict !== "") {
        declarations[cleanName]['electoral_disctrict'] = d.electoral_disctrict;
      }
      if(!declarations[cleanName][cleanCategory]) {
        declarations[cleanName][cleanCategory] = [];
      }
      var newEntry = {};
      for (var key in d) {
        if(key !== "full_name" && key !== "category_declaration" && key !== "electoral_disctrict" && d[key] !== null && d[key] !== "") {
          newEntry[key] = d[key].trim();
        }
      }
      declarations[cleanName][cleanCategory].push(newEntry);
    });
    //Loop through list, get declaration and do calculations for charts
    _.each(diputados, function (d) {
      d.declaration = {};
      if(declarations[d.full_name]) {
        d.declaration = declarations[d.full_name];
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
      if(d.declaration.depositos) {
        d.declaration.depositsTot = calcIncomeTot(d.declaration.depositos, 'deposits');
      }
    });
    console.log(diputados);

    //Set totals for custom counters
    $('.count-box-income .total-count').html(totIncome);

    //Set dc main vars. The second crossfilter is used to handle the travels stacked bar chart.
    var ndx = crossfilter(diputados);
    var searchDimension = ndx.dimension(function (d) {
        var entryString = d['Partija'] + ' ' + d['Dāvinātājs'];
        return entryString.toLowerCase();
    });

    //CHART 2
    var createGroupsChart = function() {
      var chart = charts.groups.chart;
      var dimension = ndx.dimension(function (d) {
        return d.political_group;
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
      var sizes = calcPieSize(charts.income.divId);
      chart
        .width(sizes.width)
        .height(sizes.height)
        .cy(sizes.cy)
        .innerRadius(sizes.innerRadius)
        .radius(sizes.radius)
        .cap(5)
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
      var sizes = calcPieSize(charts.properties.divId);
      chart
        .width(sizes.width)
        .height(sizes.height)
        .cy(sizes.cy)
        .innerRadius(sizes.innerRadius)
        .radius(sizes.radius)
        .cap(5)
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
      var sizes = calcPieSize(charts.financial.divId);
      chart
        .width(sizes.width)
        .height(sizes.height)
        .cy(sizes.cy)
        .innerRadius(sizes.innerRadius)
        .radius(sizes.radius)
        .cap(5)
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
      var sizes = calcPieSize(charts.debt.divId);
      chart
        .width(sizes.width)
        .height(sizes.height)
        .cy(sizes.cy)
        .innerRadius(sizes.innerRadius)
        .radius(sizes.radius)
        .cap(5)
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
      var sizes = calcPieSize(charts.vehicles.divId);
      chart
        .width(sizes.width)
        .height(sizes.height)
        .cy(sizes.cy)
        .innerRadius(sizes.innerRadius)
        .radius(sizes.radius)
        .cap(5)
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
    
    //TABLE
    var createTable = function() {
      var count=0;
      charts.mainTable.chart = $("#dc-data-table").dataTable({
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
            "defaultContent":"N/A",
            "data": function(d) {
              return d.full_name;
            }
          },
          {
            "searchable": false,
            "orderable": true,
            "targets": 2,
            "defaultContent":"N/A",
            "data": function(d) {
              return d.political_group;
            }
          },
          {
            "searchable": false,
            "orderable": true,
            "targets": 3,
            "defaultContent":"N/A",
            "data": function(d) {
              return d.declaration.incomeTot;
            }
          },
          {
            "searchable": false,
            "orderable": true,
            "targets": 4,
            "defaultContent":"N/A",
            "data": function(d) {
              if(d.declaration["bienes patrimoniales"]) {
                return d.declaration["bienes patrimoniales"].length;
              }
              return "N/A";
            }
          },
          {
            "searchable": false,
            "orderable": true,
            "targets": 5,
            "defaultContent":"N/A",
            "data": function(d) {
              return d.declaration.depositsTot;
            }
          },
          {
            "searchable": false,
            "orderable": true,
            "targets": 6,
            "defaultContent":"N/A",
            "data": function(d) {
              if(d.declaration["otros bienes o derechos"]){
                return d.declaration["otros bienes o derechos"].length;
              }
              return "N/A";
            }
          },
          {
            "searchable": false,
            "orderable": true,
            "targets": 7,
            "defaultContent":"N/A",
            "data": function(d) {
              return "";
            }
          }
        ],
        "iDisplayLength" : 25,
        "bPaginate": true,
        "bLengthChange": true,
        "bFilter": false,
        "order": [[ 1, "desc" ]],
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
    createGroupsChart();
    createIncomeChart();
    createPropertiesChart();
    createFinancialParticipationsChart();
    createDebtChart();
    createVehiclesChart();
    createTable();

    $('.dataTables_wrapper').append($('.dataTables_length'));

    //Hide loader
    vuedata.loader = false;

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
        $(".nbincome").text(income);
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
