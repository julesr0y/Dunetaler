<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../style/generateur.css">
    <link rel="icon" href="../img/dunetaler_logo.png">
    <title>Dunetaler - Generator</title>
</head>
<body>
    <p id="exit">
        Press <input type="button" id="boutonesc" onclick="window.location.href='start.php';" value="esc"/>
        <br>
        to go back
    </p>
    <div class="container">
        <p>Generate a level</p>
        <form action="generate.php" method="post">
            <label for="width">Width:</label>
            <select name="width" id="width">
                <option value="16">16</option>
                <option value="24">24</option>
                <option value="32">32</option>
            </select>
            <label for="height">Height:</label>
            <select name="height" id="height">
                <option value="8">8</option>
                <option value="16">16</option>
                <option value="24">24</option>
                <option value="32">32</option>
            </select>
            <label for="Complexity">Complexity:</label>
            <select name="complexity" id="complexity">
                <option value="1">EZ</option>
                <option value="2">Stonks</option>
                <option value="3">Not Stonks</option>
            </select>
            <input type="submit" value="Generate" name="Generate">
        </form>
    </div>
</body>
<script>
    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 27) {
            location.href='list_levels.php';
        }
    });
</script>
</html>