<?php

session_start();

function makeGameArray($num) {
    $gameArray = array();
    $tempArray = array();

    for ($i = 0; $i < $num; $i++) {
        for ($k = 0; $k < $num; $k++) {
            array_push($tempArray, null);
        }
        array_push($gameArray, $tempArray);
        $tempArray = array();
    }
    return $gameArray;
}

$playerMarks = ['X', 'O'];

if (empty($_SESSION['gameBoard'])) {
    $_SESSION['gameBoard'] = makeGameArray(3);
    $_SESSION['currentPlayer'] = 0;
}
if (!empty($_GET)) {
    $_SESSION['gameBoard'][$_GET['row']][$_GET['col']] = $playerMarks[$_SESSION['currentPlayer']];
    $_SESSION['currentPlayer'] = 1 - $_SESSION['currentPlayer'];
}

?>

<h1>PHP Tic Tac Toe</h1>
<style>
   <?php include './style.css';?>
</style>

<?php

makeGameBoard(count($_SESSION['gameBoard']));

function makeGameBoard($num) {
    //Make rows based on count of $gameArray;
    for ($r = 0; $r < $num; $r++) {
        for($col = 0; $col < $num; $col++) {
            ?>
                <div class='cell'><a href="<?="?row=$r&col=$col";?>">
                        <?=$_SESSION['gameBoard'][$r][$col];?>
                    </a></div>
            <?php
        }
    }
}

?>

