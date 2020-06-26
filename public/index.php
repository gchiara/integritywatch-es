<html lang="en">
<head>
    <?php include 'gtag.php' ?>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>IW ES</title>
    <!-- Add twitter and og meta here -->
    <link rel='shortcut icon' type='image/x-icon' href='/favicon.ico' />
    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Quicksand:500" rel="stylesheet">
    <link rel="stylesheet" href="static/tab_a.css">
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
                  <h1>Integrity Warch España</h1>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu rutrum libero. Duis id maximus sem. Morbi ullamcorper ipsum sed turpis iaculis, non aliquam libero lacinia. Etiam sagittis volutpat lectus vitae molestie. Proin lacinia dui quis feugiat sagittis. Quisque maximus odio at dapibus interdum. Integer eu nisl ex. Nullam lobortis condimentum sapien. Phasellus scelerisque magna elit, in feugiat mi maximus ut. <a href="./about.php">Read more</a>.</p>
                  <i class="material-icons close-btn" @click="showInfo = false">close</i>
                </div>
              </div>
            </div>
          </div>
          <!-- CHARTS FIRST ROW -->
          <div class="col-md-6 chart-col">
            <div class="boxed-container chart-container tab_a_1">
              <chart-header :title="charts.map.title" :info="charts.map.info" ></chart-header>
            </div>
          </div>
          <div class="col-md-6 chart-col">
            <div class="boxed-container chart-container tab_a_2">
              <chart-header :title="charts.groups.title" :info="charts.groups.info" ></chart-header>
              <div class="chart-inner" id="groups_chart"></div>
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
            <button class="toggle-btn" id="charts-toggle-btn" @click="showAllCharts = !showAllCharts">Otro gráphicos</button>
          </div>
          <!-- CHARTS THIRD ROW - TOGGLABLE -->
          <div class="col-md-3 chart-col" v-show="showAllCharts">
            <div class="boxed-container chart-container tab_a_7">
              <chart-header :title="charts.vehicles.title" :info="charts.vehicles.info" ></chart-header>
              <div class="chart-inner" id="vehicles_chart"></div>
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
                      <th class="header">Nombre y appelidos</th>
                      <th class="header">Partido</th>
                      <th class="header">Rentas percibidas</th>
                      <th class="header">Bienes inmuebles</th>
                      <th class="header">Valor de los depositos</th>
                      <th class="header">Otro bienes de tipo financiero</th>
                      <th class="header">Fecha de declaración</th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- DETAILS MODAL -->
      <div class="modal" id="detailsModal">
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
                  <div class="col-md-12">
                    <div class="details-line" v-if="selectedElement.declaration"><span class="details-line-title">Circonscripción:</span> {{ selectedElement.declaration.electoral_disctrict }}</div>
                    <div class="details-line"><span class="details-line-title">Biografía:</span> <a :href="selectedElement.congress_page" target="_blank">{{ selectedElement.congress_page }}</a></div>
                    <div class="details-line" v-if="selectedElement.declaration && selectedElement.declaration['cantidad pagada por irpf']"><span class="details-line-title">Cantidad pagada IPRF:</span> {{ selectedElement.declaration["cantidad pagada por irpf"][0].taxes_value }}</div>
                  </div>
                  <div class="col-md-12">
                    <!-- Divider -->
                    <div class="modal-divider"></div>
                    <div class="details-tables-buttons">
                      <button @click="modalShowTable = 'a'">RENTAS PERCIBIDAS</button>
                      <button @click="modalShowTable = 'b'">BIENES PATRIMONIALES</button>
                      <button @click="modalShowTable = 'c'">DEPOSITOS</button>
                      <button @click="modalShowTable = 'd'">OTRO BIENES O DERECHO</button>
                      <button @click="modalShowTable = 'e'">VEHÍCULOS, EMBARCACIONES Y AERONAVES</button>
                      <button @click="modalShowTable = 'f'">DEUDAS Y OBLIGACIONES PATRIMONIALES</button>
                      <button @click="modalShowTable = 'g'">OBSERVACIONES</button>
                    </div>
                    <!-- Sub-Table 1 -->
                    <div v-show="modalShowTable == 'a'">
                      <div class="modal-table-title">RENTAS PERCIBIDAS</div>
                      <table class="modal-table" v-if="selectedElement.declaration && selectedElement.declaration.rentas && selectedElement.declaration.rentas.length > 0">
                        <thead><tr><th>PROCENDIA</th><th>CONCEPTO</th><th>SALDO</th></tr></thead>
                        <tbody>
                          <tr v-for="el in selectedElement.declaration.rentas">
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
                      <table class="modal-table" v-if="selectedElement.declaration && selectedElement.declaration['bienes patrimoniales'] && selectedElement.declaration['bienes patrimoniales'].length > 0">
                        <thead><tr><th>TIPO DE BIENES</th><th>CLASE Y CARACTERISTICAS</th><th>SITUACION</th><th>FECHA DE ADQUISICION</th><th>DERECHO Y TITULO</th></tr></thead>
                        <tbody>
                          <tr v-for="el in selectedElement.declaration['bienes patrimoniales']">
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
                      <div class="modal-table-title">DEPOSITOS</div>
                      <table class="modal-table" v-if="selectedElement.declaration && selectedElement.declaration.depositos && selectedElement.declaration.depositos.length > 0">
                        <thead><tr><th>DESCRIPCION</th><th>SALDO</th></tr></thead>
                        <tbody>
                          <tr v-for="el in selectedElement.declaration.depositos">
                            <td>{{ el.deposits_description }}</td>
                            <td>{{ el.deposits_value_clean }}</td>
                          </tr>
                        </tbody>
                      </table>
                      <div class="modal-table-else" v-else>/</div>
                    </div>
                    <!-- Sub-Table 4 -->
                    <div v-show="modalShowTable == 'd'">
                      <div class="modal-table-title">OTRO BIENES O DERECHO</div>
                      <table class="modal-table" v-if="selectedElement.declaration && selectedElement.declaration['otros bienes o derechos'] && selectedElement.declaration['otros bienes o derechos'].length > 0">
                        <thead><tr><th>CLASE</th><th>DESCRIPCION</th><th>VALOR</th></tr></thead>
                        <tbody>
                          <tr v-for="el in selectedElement.declaration['otros bienes o derechos']">
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
                      <table class="modal-table" v-if="selectedElement.declaration && selectedElement.declaration['vehículos'] && selectedElement.declaration['vehículos'].length > 0">
                        <thead><tr><th>DESCRIPCION</th><th>FECHA DE ADQUISICION</th></tr></thead>
                        <tbody>
                          <tr v-for="el in selectedElement.declaration['vehículos']">
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
                      <table class="modal-table" v-if="selectedElement.declaration && selectedElement.declaration.deudas && selectedElement.declaration.deudas.length > 0">
                        <thead><tr><th>PRESTAMOS</th><th>FECHA DE CONCESION</th><th>IMPORTE CONCIDO</th><th>SALDO PENDIENTE</th></tr></thead>
                        <tbody>
                          <tr v-for="el in selectedElement.declaration.deudas">
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
                      <div class="modal-section-container" v-if="selectedElement.declaration && selectedElement.declaration.comments.length > 0">
                        <div v-for="el in selectedElement.declaration.comments">{{el}}</div>
                      </div>
                      <div class="modal-section-container" v-else>/</div>
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
            <div class="dc-data-count count-box count-box-income">
              <div class="filter-count nbincome">0</div>desde <strong class="total-count">0</strong> ingreso
            </div>
            <div class="footer-input">
              <input type="text" id="search-input" placeholder="BUSCAR">
              <i class="material-icons">search</i>
            </div>
          </div>
        </div>
        <!-- Reset filters -->
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
    <script src="static/tab_a.js"></script>

 
</body>
</html>