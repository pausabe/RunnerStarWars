#pragma strict

var laserTurretsPrefab : GameObject;

function Start () {
	Instantiate(laserTurretsPrefab, Vector3(0.27,0.1,24), Quaternion.identity);
	Instantiate(laserTurretsPrefab, Vector3(0.27,0.15,24), Quaternion.identity);
	Instantiate(laserTurretsPrefab, Vector3(0.27,0.05,24), Quaternion.identity);
}

function Update () {

}