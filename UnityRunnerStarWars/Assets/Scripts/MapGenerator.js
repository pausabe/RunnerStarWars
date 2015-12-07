#pragma strict
private var LASER_TURRET  = 0;
private var SHOOTING_TURRET = 1;
private var TIE_FIGHTER = 2;

var ship : GameObject;

var x : float;

var prefabs : GameObject[];
private var laserTurrets = [[0.0, 0.5, 12]];
private var shootingTurrets = [[-1.8, 0.5,32],[0.0, 0,10]]; // [x,y,z]
private var tieFighters = [[0.0, 115]]; // [x,z] in which the tie fighter will appear

function Start () {

//	Instantiate(laserTurretsPrefab, Vector3(0.27,0.1,24), Quaternion.identity);
//	Instantiate(laserTurretsPrefab, Vector3(0.27,0.15,24), Quaternion.identity);
//	Instantiate(laserTurretsPrefab, Vector3(0.27,0.05,24), Quaternion.identity);

	// Create all the objects in the level
	for (var i = 0; i < laserTurrets.length; i++) {
		Instantiate(prefabs[LASER_TURRET], Vector3(laserTurrets[i][0], laserTurrets[i][1],laserTurrets[i][2]), Quaternion.identity);
	}
	for (i = 0; i < shootingTurrets.length; i++) {
		if (shootingTurrets[i][0] == -x) {
			var rot = Quaternion.identity;
			rot.eulerAngles.z = -90;
		} else if (shootingTurrets[i][0] == x) {
			rot = Quaternion.identity;
			rot.eulerAngles.z = 90;
		} else rot = Quaternion.identity;
		//Quaternion.identity;
		Instantiate(prefabs[SHOOTING_TURRET], Vector3(shootingTurrets[i][0], shootingTurrets[i][1], shootingTurrets[i][2]), rot);
	}
}

function Update () {
	for (var i = 0; i < tieFighters.length; i++) {
		if (!(tieFighters[i][0] == -1000 && tieFighters[i][1] == -1000)) {
			if (tieFighters[i][1] <= ship.transform.position.z && ((tieFighters[i][0]-ship.transform.position.x <= x) && (tieFighters[i][0]-ship.transform.position.x >= -x))) {
				Instantiate(prefabs[TIE_FIGHTER], Vector3(tieFighters[i][0], ship.transform.position.y, tieFighters[i][1]), Quaternion.identity);
				tieFighters[i][0] = -1000;tieFighters[i][1] = -1000;
			}
		}
	}
}