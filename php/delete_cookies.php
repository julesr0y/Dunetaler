<?php
setcookie("id",$_SESSION['player']['id'],time() - (365*24*3600),'/', '',false,true);
setcookie("username",$_SESSION['player']['username'],time() - (365*24*3600),'/', '',false,true);
setcookie("email",$_SESSION['player']['email'],time() - (365*24*3600),'/', '',false,true);
?>