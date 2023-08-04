<html lang="en">
<head>
    <?php include 'gtag.php' ?>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>IW ES</title>
    <!-- Add twitter and og meta here -->
    <meta property="og:url" content="https://www.integritywatch.es" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Integrity Watch Spain" />
    <meta property="og:description" content="Esta plataforma permite visualizar todos los datos declarados por Diputados y Senadores de la Legislatura XIV en sus declaraciones de bienes y rentas en una única base de datos interactiva." />
    <meta property="og:image" content="https://www.integritywatch.es/images/thumbnail.png" />
    <link rel='shortcut icon' type='image/x-icon' href='/favicon.ico' />
    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Quicksand:500" rel="stylesheet">
    <link rel="stylesheet" href="static/tab_a2.css?v=1">
    <script>
      if (typeof Object.assign !== 'function') {
        // Must be writable: true, enumerable: false, configurable: true
        Object.defineProperty(Object, "assign", {
          value: function assign(target, varArgs) { // .length of function is 2
            'use strict';
            if (target === null || target === undefined) {
              throw new TypeError('Cannot convert undefined or null to object');
            }

            var to = Object(target);

            for (var index = 1; index < arguments.length; index++) {
              var nextSource = arguments[index];

              if (nextSource !== null && nextSource !== undefined) { 
                for (var nextKey in nextSource) {
                  // Avoid bugs when hasOwnProperty is shadowed
                  if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                    to[nextKey] = nextSource[nextKey];
                  }
                }
              }
            }
            return to;
          },
          writable: true,
          configurable: true
        });
      }
    </script>
</head>
<body>
    <div id="app" class="tabA">   
      <?php include 'header.php' ?>
      <div class="container-fluid dashboard-container-outer">
        <div class="row dashboard-container">
          <!-- ROW FOR INFO AND SHARE -->
          <div class="col-md-12">
            <div class="row">
              <!-- INFO -->
              <div class="col-md-8 chart-col" v-if="showInfo">
                <div class="boxed-container description-container">
                  <h1>INTEGRITY WATCH SPAIN – CONGRESO DE LOS DIPUTADOS - INTERESTS DECLARATIONS</h1>
                  <p>Esta plataforma contiene una base de datos interactiva de uso fácil que ofrece una visión general de las declaraciones de interesses de los Diputados. Al hacer click en los gráficos y la tabla final, los usuarios pueden clasificar, ordenar y filtrar a los parlamentarios del Congreso de los Diputados. 
                    <a href="./about.php">Más información</a>.
                  </p>
                  <i class="material-icons close-btn" @click="showInfo = false">close</i>
                </div>
              </div>
            </div>
          </div>
          <!-- CHARTS FIRST ROW -->
          <div class="col-md-6 chart-col">
            <div class="boxed-container chart-container tab_a_1">
              <chart-header :title="charts.map.title" :info="charts.map.info" ></chart-header>
              <div class="map-buttons">
                <button id="tenerife">Santa Cruz de Tenerife</button>
                <button id="laspalmas">Las Palmas</button>
                <button id="ceuta">Ceuta</button>
                <button id="melilla">Melilla</button>
              </div>
              <div class="chart-inner" id="map_chart"></div>
            </div>
          </div>
          <div class="col-md-3 chart-col">
            <div class="boxed-container chart-container tab_a_2">
              <chart-header :title="charts.groups.title" :info="charts.groups.info" ></chart-header>
              <div class="chart-inner" id="groups_chart"></div>
            </div>
          </div>
          <div class="col-md-3 chart-col">
            <div class="boxed-container chart-container tab_a_8">
              <chart-header :title="charts.gender.title" :info="charts.gender.info" ></chart-header>
              <div class="chart-inner" id="gender_chart"></div>
            </div>
          </div>
          <!-- CHARTS SECOND ROW -->
          <div class="col-md-4 chart-col">
            <div class="boxed-container chart-container tab_a_3">
              <chart-header :title="charts.activities.title" :info="charts.activities.info" ></chart-header>
              <div class="chart-inner" id="activities_chart"></div>
            </div>
          </div>
          <div class="col-md-4 chart-col">
            <div class="boxed-container chart-container tab_a_3">
              <chart-header :title="charts.activitiesPast.title" :info="charts.activitiesPast.info" ></chart-header>
              <div class="chart-inner" id="activitiespast_chart"></div>
            </div>
          </div>
          <div class="col-md-4 chart-col">
            <div class="boxed-container chart-container tab_a_3">
              <chart-header :title="charts.foundations.title" :info="charts.foundations.info" ></chart-header>
              <div class="chart-inner" id="foundations_chart"></div>
            </div>
          </div>
          <!-- CHARTS THIRD ROW -->
          <div class="col-md-4 chart-col">
            <div class="boxed-container chart-container tab_a_3">
              <chart-header :title="charts.donations.title" :info="charts.donations.info" ></chart-header>
              <div class="chart-inner" id="donations_chart"></div>
            </div>
          </div>
          <div class="col-md-4 chart-col">
            <div class="boxed-container chart-container tab_a_3">
              <chart-header :title="charts.observations.title" :info="charts.observations.info" ></chart-header>
              <div class="chart-inner" id="observations_chart"></div>
            </div>
          </div>
          <!-- TABLE -->
          <div class="col-12 chart-col">
            <div class="boxed-container chart-container chart-container-table">
              <chart-header :title="charts.mainTable.title" :info="charts.mainTable.info" ></chart-header>
              <div class="chart-inner chart-table">
                <table class="table table-hover dc-data-table" id="dc-data-table">
                  <thead>
                    <tr class="header">
                      <th class="header">Nr</th> 
                      <th class="header">Apellidos y Nombre</th>
                      <th class="header">Grupo parlamentario</th>
                      <th class="header">Circunscripcion</th>
                      <th class="header">Current activities</th>
                      <th class="header">Past activities</th>
                      <th class="header">Foundations</th>
                      <th class="header">Donations</th>
                      <th class="header">Observations</th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </div>

          <div class="last-update">Last updated on: 23/10/2020</div>

        </div>
      </div>
      <!-- DETAILS MODAL -->
      <div class="modal" id="detailsModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
              <div class="modal-title">
                <div>{{ selectedElement.NOMBRE }}</div>
                <div>{{ selectedElement.GRUPOPARLAMENTARIO }}</div>
              </div>
              <button type="button" class="close" data-dismiss="modal"><i class="material-icons">close</i></button>
            </div>
            <!-- Modal body -->
            <div class="modal-body">
              <div class="container">
                <div class="row">
                  <div class="col-md-8">
                    <div class="details-line" v-if="selectedElement.CIRCUNSCRIPCION"><span class="details-line-title">Circunscripcion:</span> {{ selectedElement.CIRCUNSCRIPCION }}</div>
                    <div class="details-line" v-if="selectedElement.BIOGRAFIA"><span class="details-line-title">Biografia:</span> {{ selectedElement.BIOGRAFIA }}</div>
                    <div class="details-line" v-if="selectedElement.observations"><span class="details-line-title">Observaciones:</span> {{ selectedElement.observations.join(' - ') }}</div>
                  </div>
                  <div class="col-md-4">
                    <img v-if="selectedElement.photoInfo && selectedElement.photoInfo.photoUrl" :src="selectedElement.photoInfo.photoUrl" class="photo">
                    <span v-else>No photo available</span>
                  </div>
                  <div class="col-md-12">
                    <!-- Divider -->
                    <div class="modal-divider"></div>
                    <!-- Sub-Table 1 -->
                    <div v-if="selectedElement.activities && selectedElement.activities.length > 0">
                      <div class="modal-table-title">ACTIVIDADES</div>
                      <table class="modal-table">
                        <thead><tr><th>DESCRIPCION</th><th>SECTOR</th><th>EMPLEADOR</th><th>PERIODO</th></tr></thead>
                        <tbody>
                          <tr v-for="el in selectedElement.activities">
                            <td>{{ el.DESCRIPCION }}</td>
                            <td>{{ el.SECTOR }}</td>
                            <td>{{ el.EMPLEADOR }}</td>
                            <td>{{ el.PERIODO }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!-- Sub-Table 2 -->
                    <div v-if="selectedElement.foundations && selectedElement.foundations.length > 0">
                      <div class="modal-table-title">FUNDACIONES</div>
                      <table class="modal-table">
                        <thead><tr><th>DESCRIPCION</th><th>DESTINATARIO</th></tr></thead>
                        <tbody>
                          <tr v-for="el in selectedElement.foundations">
                            <td>{{ el.DESCRIPCION }}</td>
                            <td>{{ el.DESTINATARIO }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!-- Sub-Table 2 -->
                    <div v-if="selectedElement.donations && selectedElement.donations.length > 0">
                      <div class="modal-table-title">DONACIONES</div>
                      <table class="modal-table">
                        <thead><tr><th>DESCRIPCION</th><th>BENEFACTOR</th></tr></thead>
                        <tbody>
                          <tr v-for="el in selectedElement.donations">
                            <td>{{ el.DESCRIPCION }}</td>
                            <td>{{ el.BENEFACTOR }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Bottom bar -->
      <div class="container-fluid footer-bar">
        <div class="row">
          <div class="footer-col col-12 col-sm-12 footer-counts">
            <div class="dc-data-count count-box count-box-main">
              <div class="filter-count">0</div>desde <strong class="total-count">0</strong> Diputados
            </div>
            <div class="footer-input">
              <input type="text" id="search-input" placeholder="BUSCAR">
              <i class="material-icons">search</i>
            </div>
          </div>
        </div>
        <button class="reset-btn"><i class="material-icons">settings_backup_restore</i><span class="reset-btn-text">Reset</span></button>
        <div class="footer-buttons-right">
          <button @click="downloadDataset"><i class="material-icons">cloud_download</i></button>
          <button class="btn-twitter" @click="share('twitter')"><img src="./images/twitter.png" /></button>
          <button class="btn-fb" @click="share('facebook')"><img src="./images/facebook.png" /></button>
        </div>
      </div>
      <!-- Loader -->
      <loader v-if="loader" :text="'Loading ...'" />
    </div>

    <script type="text/javascript" src="vendor/js/d3.v5.min.js"></script>
    <script type="text/javascript" src="vendor/js/d3.layout.cloud.js"></script>
    <script type="text/javascript" src="vendor/js/crossfilter.min.js"></script>
    <script type="text/javascript" src="vendor/js/dc.js"></script>
    <script type="text/javascript" src="vendor/js/dc.cloud.js"></script>
    <script type="text/javascript" src="vendor/js/topojson.v1.min.js"></script>
    <script src="static/tab_a2.js?v=1"></script>

 
</body>
</html>