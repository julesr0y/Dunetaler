<?php
    session_start();
    require_once 'fonctions.php';
    cookies_exist();
    is_connected();

    //on récupère les scores
    try
    {
        require_once 'connect_bdd.php';
        $req = $conn->prepare("SELECT * FROM scores WHERE id_niveau=21");
        $req->execute();
        $result = $req->fetchAll();
    }
    catch(Exception $e) //en cas d'erreur
    {
        die("Erreur : " . $e->getMessage());
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../style/classement.css">
    <link rel="icon" href="../img/dunetaler_logo.png">
    <title>Dunetaler - Ranking</title>
</head>
<body>
    <div>
        <p id="exit">
            Press <button onclick="history.back()" id="boutonesc">esc</button>
            <br>
            to go back
        </p>
        <p id="top">
            Shortest Time (Challenge Level): <?php echo $result[0][1] ?>
        </p>
        <p id="tete">
            Ranking :
        </p>
        <p id="class">
            <?php if(isset($result[0])){ ?><span class="nb">1st:</span> <span class="name"><?php echo $result[0][3];?> -</span> <span class="score"><?php echo $result[0][1] ?></span><?php } ?>
            <br>
            <?php if(isset($result[1])){ ?><span class="nb">2nd:</span> <span class="name"><?php echo $result[1][3];?> -</span> <span class="score"><?php echo $result[1][1] ?></span><?php } ?>
            <br>
            <?php if(isset($result[2])){ ?><span class="nb">3rd:</span> <span class="name"><?php echo $result[2][3];?> -</span> <span class="score"><?php echo $result[2][1] ?></span><?php } ?>
            <br>
            <?php if(isset($result[3])){ ?><span class="nb">4th:</span> <span class="name"><?php echo $result[3][3];?> -</span> <span class="score"><?php echo $result[3][1] ?></span><?php } ?>
            <br>
            <?php if(isset($result[4])){ ?><span class="nb">5th:</span> <span class="name"><?php echo $result[4][3];?> -</span> <span class="score"><?php echo $result[4][1] ?></span><?php } ?>
            <br>
            <?php if(isset($result[5])){ ?><span class="nb">6th:</span> <span class="name"><?php echo $result[5][3];?> -</span> <span class="score"><?php echo $result[5][1] ?></span><?php } ?>
            <br>
        </p>
    </div>
</body>
<script>
    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 27) {
            history.back();
        }
    });
</script>
</html>