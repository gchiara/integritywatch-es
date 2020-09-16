<?php

if (!empty($_POST)) {

  $to      = 'girardelli.chiara@gmail.com';
  $subject = 'Message from IW ES contact page';
  $name = $_POST["name"];
  $email_from = $_POST["email"];
  $message = $_POST["message"];
  $headers = 'From: noreply@integritywatch.es' . "\r\n" .
      'Reply-To: '.$email_from. "\r\n" .
      'X-Mailer: PHP/' . phpversion();
  $email_body = "Message from: $name.\n".
                "Message:\n $message";

  mail($to, $subject, $message, $headers);

  echo 'mailed';

}

?>