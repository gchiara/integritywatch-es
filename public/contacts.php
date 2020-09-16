<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>About</title>
    <link rel='shortcut icon' type='image/x-icon' href='/favicon.ico' />
    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Quicksand:500" rel="stylesheet">
    <link rel="stylesheet" href="static/about.css">
</head>
<body>
    <?php include 'header.php' ?>

    <div id="app">    
      <div class="container">
        <div class="panel-group" id="accordion">

          <!-- CONTACTS -->
          <div class="panel panel-default panel-static">
            <div class="panel-heading">
              <h2 class="panel-title">
                <a href="#">CONTÁCTENOS</a>
              </h2>
            </div>
            <div id="contact" class="panel-collapse">
              <div class="panel-body">
                <div class="row">
                <div class="col-md-6">
                    <div class="form-container">
                      <form id="contactForm" action="form.php">
                        <div class="form-group">
                          <label for="formInput1">Nome *</label>
                          <input type="text" class="form-control" name="name" id="formInput1" placeholder="" required>
                        </div>
                        <div class="form-group">
                          <label for="formInput2">Email address *</label>
                          <input type="email" class="form-control" name="email" id="formInput2" placeholder="" required>
                        </div>
                        <div class="form-group">
                          <label for="formInput3">Message *</label>
                          <textarea class="form-control" id="formInput3" name="message" rows="6" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary mb-2 form-submit-btn">Send</button>
                      </form>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <p><strong>Integrity Watch Spain team:</strong></p>
                    <p>Seniors Project Advisors: Prof. Dr. Manuel Villoria / Prof. Dra. Silvina Bacigalupo (pro bono).<br />
                    Integrity Watch Spain Project Manager: David Martínez García<br />
                    Integrity Watch Spain Researcher: Constanza Cervetti Vieites</p>
                    <p>
                    <strong>Transparency International Spain</strong></p>
                    <p><a href="mailto:integrity.watch@transparencia.org.es">integrity.watch@transparencia.org.es</a><br />
                    +34-91-700 4106<br />
                    Contacto de comunicación y prensa: <a href="mailto:comunicacion@transparencia.org.es">comunicacion@transparencia.org.es</a><br />
                    <a href="http://www.transparencia.org.es" target="_blank">www.transparencia.org.es</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <script src="static/about.js"></script>
</body>
</html>