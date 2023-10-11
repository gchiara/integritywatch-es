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
    <link rel="stylesheet" href="static/tab_a.css?v=3">
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
              <div class="col-md-9 chart-col" v-if="showInfo">
                <div class="boxed-container description-container">
                  <h1>INTEGRITY WATCH SPAIN – CONGRESO DE LOS DIPUTADOS - DECLARACIONES DE BIENES Y RENTAS</h1>
                  <p>Esta plataforma contiene una base de datos interactiva de uso fácil que ofrece la información contenida en las declaraciones de bienes y rentas de los Diputados y Diputadas de la Legislatura XIV, actualizada a fecha de 31 de marzo de 2023. Todas las personas que consulten la plataforma pueden clasificar, ordenar y filtrar a las/os parlamentarios del Congreso de los Diputados a través de los gráficos y la tabla general.</p>
                  <p>Todos los datos reflejados en la plataforma fueron extraídos de los sitios web del Congreso de los Diputados y Senado, y fuentes oficiales. Respecto a las declaraciones de bienes y rentas del Congreso de Diputados, cabe aclarar que el equipo de investigación de Integrity Watch España trasladó de manera manual toda la información contenida en estas declaraciones (al encontrarse en formato de documento portátil (PDF) escaneado) por lo que puede contener algún error fruto de la transcripción manual y del volcado de los datos.</p>
                  <p>Para más información haga click <a href="./about.php">aquí</a>.</p>
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
          <div class="col-md-3 chart-col">
            <div class="boxed-container chart-container tab_a_3">
              <chart-header :title="charts.income.title" :info="charts.income.info" ></chart-header>
              <div class="chart-inner" id="income_chart"></div>
            </div>
          </div>
          <div class="col-md-3 chart-col">
            <div class="boxed-container chart-container tab_a_4">
              <chart-header :title="charts.properties.title" :info="charts.properties.info" ></chart-header>
              <div class="chart-inner" id="properties_chart"></div>
            </div>
          </div>
          <div class="col-md-3 chart-col">
            <div class="boxed-container chart-container tab_a_5">
              <chart-header :title="charts.financial.title" :info="charts.financial.info" ></chart-header>
              <div class="chart-inner" id="financial_chart"></div>
            </div>
          </div>
          <div class="col-md-3 chart-col">
            <div class="boxed-container chart-container tab_a_6">
              <chart-header :title="charts.debt.title" :info="charts.debt.info" ></chart-header>
              <div class="chart-inner" id="debt_chart"></div>
            </div>
          </div>
          <!-- TOGGLE BUTTONS FOR 3RD ROW -->
          <div class="col-md-12 toggle-btn-container">
            <button class="toggle-btn" id="charts-toggle-btn" @click="showAllCharts = !showAllCharts">Otros gráficos</button>
          </div>
          <!-- CHARTS THIRD ROW - TOGGLABLE -->
          <div class="col-md-3 chart-col" v-show="showAllCharts">
            <div class="boxed-container chart-container tab_a_7">
              <chart-header :title="charts.vehicles.title" :info="charts.vehicles.info" ></chart-header>
              <div class="chart-inner" id="vehicles_chart"></div>
            </div>
          </div>
          <div class="col-md-3 chart-col" v-show="showAllCharts">
            <div class="boxed-container chart-container tab_a_9">
              <chart-header :title="charts.irpf.title" :info="charts.irpf.info" ></chart-header>
              <div class="chart-inner" id="irpf_chart"></div>
            </div>
          </div>
          <div class="col-md-3 chart-col" v-show="showAllCharts">
            <div class="boxed-container chart-container tab_a_10">
              <chart-header :title="charts.depositos.title" :info="charts.depositos.info" ></chart-header>
              <div class="chart-inner" id="depositos_chart"></div>
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
                      <th class="header">Rentas percibidas (€)</th>
                      <th class="header">Bienes inmuebles</th>
                      <th class="header">Valor de los depósitos (€)</th>
                      <th class="header">Otros bienes de tipo financiero</th>
                      <th class="header">¿Actualizada?</th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </div>

          <div class="last-update">Última actualización: 31/03/2023</div>

        </div>
      </div>
      <!-- DETAILS MODAL -->
      <div class="modal" id="detailsModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
              <div class="modal-title">
                <div>{{ selectedElement.full_name }}</div>
                <div>{{ selectedElement.political_group }}</div>
              </div>
              <button type="button" class="close" data-dismiss="modal"><i class="material-icons">close</i></button>
            </div>
            <!-- Modal body -->
            <div class="modal-body">
              <div class="container">
                <div class="row">
                  <div class="col-md-8">
                    <div class="details-line" v-if="selectedElDecDataToDisplay"><span class="details-line-title">Circunscripción:</span> {{ selectedElDecDataToDisplay.electoral_district }}</div>
                    <div class="details-line" v-if="selectedElement.congress_page && selectedElement.congress_page !== '#N/A'"><a :href="selectedElement.congress_page" target="_blank"><span class="details-line-title">Biografía</span></a></div>
                    <div class="details-line" v-if="selectedElDecDataToDisplay && selectedElDecDataToDisplay['cantidad pagada por irpf']"><span class="details-line-title">Cantidad pagada IPRF:</span> {{ selectedElDecDataToDisplay["cantidad pagada por irpf"][0].taxes_value }}</div>
                  </div>
                  <div class="col-md-4">
                    <img v-if="selectedElement.photoInfo && selectedElement.photoInfo.photoUrl" :src="selectedElement.photoInfo.photoUrl" class="photo">
                  </div>
                  <div class="col-md-12" v-if="selectedElement.declaration">
                    <!-- Divider -->
                    <div class="modal-divider"></div>
                    <div class="details-tables-buttons-update" v-if="selectedElement.declaration && selectedElement.declarationUpdated">
                      <button @click="toggleUpdatedDeclarationData(true)" :class="{active: modalShowUpdatedData}">ACTUALIZACIÓN</button>
                      <button @click="toggleUpdatedDeclarationData(false)" :class="{active: !modalShowUpdatedData}">DECLARATION</button>
                    </div>
                    <div class="details-tables-buttons">
                      <button @click="modalShowTable = 'a'">RENTAS PERCIBIDAS</button>
                      <button @click="modalShowTable = 'b'">BIENES PATRIMONIALES</button>
                      <button @click="modalShowTable = 'c'">DEPÓSITOS</button>
                      <button @click="modalShowTable = 'd'">OTROS BIENES O DERECHOS</button>
                      <button @click="modalShowTable = 'e'">VEHÍCULOS, EMBARCACIONES Y AERONAVES</button>
                      <button @click="modalShowTable = 'f'">DEUDAS Y OBLIGACIONES PATRIMONIALES</button>
                      <button @click="modalShowTable = 'g'">OBSERVACIONES</button>
                    </div>
                    <!-- Sub-Table 1 -->
                    <div v-show="modalShowTable == 'a'">
                      <div class="modal-table-title">RENTAS PERCIBIDAS</div>
                      <table class="modal-table" v-if="selectedElDecDataToDisplay && selectedElDecDataToDisplay.rentas && selectedElDecDataToDisplay.rentas.length > 0">
                        <thead><tr><th>PROCEDENCIA</th><th>CONCEPTO</th><th>SALDO (€)</th></tr></thead>
                        <tbody>
                          <tr v-for="el in selectedElDecDataToDisplay.rentas">
                            <td>{{ el.income_category }}</td>
                            <td>{{ el.income_description}}</td>
                            <td>{{ el.income_value_clean }}</td>
                          </tr>
                        </tbody>
                      </table>
                      <div class="modal-table-else" v-else>/</div>
                    </div>
                    <!-- Sub-Table 2 -->
                    <div v-show="modalShowTable == 'b'">
                      <div class="modal-table-title">BIENES PATRIMONIALES</div>
                      <table class="modal-table" v-if="selectedElDecDataToDisplay && selectedElDecDataToDisplay['bienes patrimoniales'] && selectedElDecDataToDisplay['bienes patrimoniales'].length > 0">
                        <thead><tr><th>TIPO DE BIENES</th><th>CLASE Y CARACTERISTICAS</th><th>SITUACION</th><th>FECHA DE ADQUISICION</th><th>DERECHO Y TITULO</th></tr></thead>
                        <tbody>
                          <tr v-for="el in selectedElDecDataToDisplay['bienes patrimoniales']">
                            <td>{{ el.property_category }}</td>
                            <td>{{ el.property_description }}</td>
                            <td>{{ el.property_location }}</td>
                            <td>{{ el.property_date }}</td>
                            <td>{{ el.property_legal }}</td>
                          </tr>
                        </tbody>
                      </table>
                      <div class="modal-table-else" v-else>/</div>
                    </div>
                    <!-- Sub-Table 3 -->
                    <div v-show="modalShowTable == 'c'">
                      <div class="modal-table-title">DEPÓSITOS</div>
                      <table class="modal-table" v-if="selectedElDecDataToDisplay && selectedElDecDataToDisplay.depositos && selectedElDecDataToDisplay.depositos.length > 0">
                        <thead><tr><th>DESCRIPCION</th><th>SALDO (€)</th></tr></thead>
                        <tbody>
                          <tr v-for="el in selectedElDecDataToDisplay.depositos">
                            <td>{{ el.deposits_description }}</td>
                            <td>{{ el.deposits_value_clean }}</td>
                          </tr>
                        </tbody>
                      </table>
                      <div class="modal-table-else" v-else>/</div>
                    </div>
                    <!-- Sub-Table 4 -->
                    <div v-show="modalShowTable == 'd'">
                      <div class="modal-table-title">OTRO BIENES O DERECHOS</div>
                      <table class="modal-table" v-if="selectedElDecDataToDisplay && selectedElDecDataToDisplay['otros bienes o derechos'] && selectedElDecDataToDisplay['otros bienes o derechos'].length > 0">
                        <thead><tr><th>CLASE</th><th>DESCRIPCION</th><th>VALOR (€)</th></tr></thead>
                        <tbody>
                          <tr v-for="el in selectedElDecDataToDisplay['otros bienes o derechos']">
                            <td>{{ el.other_financial_category }}</td>
                            <td>{{ el.other_financial_description }}</td>
                            <td>{{ el.other_financial_clean }}</td>
                          </tr>
                        </tbody>
                      </table>
                      <div class="modal-table-else" v-else>/</div>
                    </div>
                    <!-- Sub-Table 5 -->
                    <div v-show="modalShowTable == 'e'">
                      <div class="modal-table-title">VEHÍCULOS, EMBARCACIONES Y AERONAVES</div>
                      <table class="modal-table" v-if="selectedElDecDataToDisplay && selectedElDecDataToDisplay['vehículos'] && selectedElDecDataToDisplay['vehículos'].length > 0">
                        <thead><tr><th>DESCRIPCION</th><th>FECHA DE ADQUISICION</th></tr></thead>
                        <tbody>
                          <tr v-for="el in selectedElDecDataToDisplay['vehículos']">
                            <td>{{ el.vehicles_description }}</td>
                            <td>{{ el.vehicles_date }}</td>
                          </tr>
                        </tbody>
                      </table>
                      <div class="modal-table-else" v-else>/</div>
                    </div>
                    <!-- Sub-Table 6 -->
                    <div v-show="modalShowTable == 'f'">
                      <div class="modal-table-title">DEUDAS Y OBLIGACIONES PATRIMONIALES</div>
                      <table class="modal-table" v-if="selectedElDecDataToDisplay && selectedElDecDataToDisplay.deudas && selectedElDecDataToDisplay.deudas.length > 0">
                        <thead><tr><th>PRESTAMOS</th><th>FECHA DE CONCESION</th><th>IMPORTE CONCEDIDO (€)</th><th>SALDO PENDIENTE (€)</th></tr></thead>
                        <tbody>
                          <tr v-for="el in selectedElDecDataToDisplay.deudas">
                            <td>{{ el.debt_institution }}</td>
                            <td>{{ el.debt_date }}</td>
                            <td>{{ el.debt_amount }}</td>
                            <td>{{ el.debt_amount_remain }}</td>
                          </tr>
                        </tbody>
                      </table>
                      <div class="modal-table-else" v-else>/</div>
                    </div>
                    <!-- Sub-Table 7 -->
                    <div v-show="modalShowTable == 'g'">
                      <div class="modal-table-title">OBSERVACIONES</div>
                      <div class="modal-section-container" v-if="selectedElDecDataToDisplay && selectedElDecDataToDisplay.comments && selectedElDecDataToDisplay.comments.length > 0">
                        <div v-for="el in selectedElDecDataToDisplay.comments">{{el}}</div>
                      </div>
                      <div class="modal-section-container" v-else>/</div>
                    </div>
                  </div>
                  <div class="modal-footnote">*La falta de información en alguna ventana se debe a que el parlamentario no declaró datos respecto de determinado ítem</div>
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
            <div class="count-box count-box-income">
              <div class="filter-count nbincome">0</div>desde <strong class="total-count-income">0</strong> ingreso
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
    <script src="static/tab_a.js?v=3"></script>

 
</body>
</html>