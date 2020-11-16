<?php
// example use from browser
// http://localhost/companydirectory/libs/php/insertDepartment.php?name=New%20Department&locationID=1
// remove next two lines for production
ini_set('display_errors', 'On');
error_reporting(E_ALL);
$executionStartTime = microtime(true);
include ("config.php");
header('Content-Type: application/json; charset=UTF-8');
$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);
if (mysqli_connect_errno()) {
  $output['status']['code'] = "300";
  $output['status']['name'] = "failure";
  $output['status']['description'] = "database unavailable";
  $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
  $output['data'] = [];
  mysqli_close($conn);
  echo json_encode($output);
  exit;
}

$lid = $_POST['lid'];

$query = "SELECT * FROM department WHERE locationID = '$lid'";
$result = $conn->query($query);
$linked = false;
if (mysqli_fetch_assoc($result)) {
  $linked = true;
}

if (!$linked) {
  $query = "DELETE FROM location WHERE id = '$lid'";
  $result = $conn->query($query);
  if (!$result) {
    $output['status']['code'] = "400";
    $output['status']['name'] = "executed";
    $output['status']['description'] = "query failed";
    $output['data'] = [$result];
    mysqli_close($conn);
    echo json_encode($output);
    exit;
	}
	
  $output['status']['code'] = "200";
  $output['status']['name'] = "ok";
  $output['status']['description'] = "Success";
  $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
  $output['data'] = [$result];
  mysqli_close($conn);
  echo json_encode($output);
}
else {
  $output['status']['code'] = "200";
  $output['status']['name'] = "ok";
  $output['status']['description'] = "linked with department!";
  $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
  mysqli_close($conn);
  echo json_encode($output);
}
?>
