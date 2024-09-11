<?php

if (empty($_POST["prenom"])) {
    die("Le prénom est requis");
}

if (empty($_POST["name"])) {
    die("Le nom est requis");
}

if ( ! filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
    die("Une adresse e-mail valide est requise");
}

if (strlen($_POST["password"]) < 12) {
    die("Le mot de passe doit contenir au moins 12 caractères");
}

if ( ! preg_match("/[a-z]/", $_POST["password"]) || ! preg_match("/[A-Z]/", $_POST["password"])) {
    die("Le mot de passe doit contenir au moins une lettre minuscule et une lettre majuscule");
}

if ( ! preg_match("/[\W]/", $_POST["password"])) {
    die("Le mot de passe doit contenir au moins un caractère spécial");
}

if ( ! preg_match("/[0-9]/", $_POST["password"])) {
    die("Le mot de passe doit contenir au moins un chiffre");
}

if ($_POST["password"] !== $_POST["password_confirmation"]) {
    die("Les mots de passe doivent correspondre");
}


$password_hash = password_hash($_POST["password"], PASSWORD_DEFAULT);

$mysqli = require __DIR__ . "/database.php";

$sql = "INSERT INTO user (prenom, name, email, password_hash)
        VALUES (?, ?, ?, ?)";
        
$stmt = $mysqli->stmt_init();

if ( ! $stmt->prepare($sql)) {
    die("SQL error: " . $mysqli->error);
}

$stmt->bind_param("ssss",
                  $_POST["prenom"],
                  $_POST["name"],
                  $_POST["email"],
                  $password_hash);
                  
if ($stmt->execute()) {

    header("Location: connection/connexion.php");
    exit;
    
} else {
    
    if ($mysqli->errno === 1062) {
        die("email already taken");
    } else {
        die($mysqli->error . " " . $mysqli->errno);
    }
}

