#pragma strict
private var LASER_TURRET  = 0;
private var SHOOTING_TURRET = 1;
private var TIE_FIGHTER = 0;
private var DEATH_STAR_WALL = 3;

var ship : GameObject;
var cam : GameObject;

var x : float;

var prefabs : GameObject[];
private var laserTurrets = [[0.0, 0.5, 120]];
private var shootingTurrets = [[-1.8, 0.5,320, -1],[0.0, 0,100, 1]]; // [x,y,z]
private var tieFighters = [[0.0, 100]]; // [x,z] in which the tie fighter will appear
private var deathStarWalls = [[-0.2, 0.5, 200, 1.5, 1, 1]]; // [x,y,z,scaleX,scaleY,scaleZ] of the wall

//var turns : GameObject;

public var girs : Transform[];
// = [[1.8,56,1],[15.0,56,1],[14,32,-1.0],[24,35,1.0],[19,24,-1.0],[35,29,-1.0],[31,50,1.0], [47,54,1.0], [46,36,-1.0], [72,42,-1.0],[70,56,1.0],[82,54,1.0],[81,21,1.0],[62,22,1.0],[62,31,-1.0]]; //[x,z,direction(-1:left,1:right] 

var forward : Vector3 = Vector3(0,0,1);

var turnDuration : float;
private var turning = 0;
private var time : float;

function Start () {

//	Instantiate(laserTurretsPrefab, Vector3(0.27,0.1,24), Quaternion.identity);
//	Instantiate(laserTurretsPrefab, Vector3(0.27,0.15,24), Quaternion.identity);
//	Instantiate(laserTurretsPrefab, Vector3(0.27,0.05,24), Quaternion.identity);
/*
	// Create all the objects in the level
	for (var i = 0; i < laserTurrets.length; i++) {
		Instantiate(prefabs[LASER_TURRET], Vector3(laserTurrets[i][0], laserTurrets[i][1], laserTurrets[i][2]), Quaternion.identity);
	}
	for (i = 0; i < shootingTurrets.length; i++) {
		if (shootingTurrets[i][3] == -1) {
			var rot = Quaternion.identity;
			rot.eulerAngles.z = -90;
		} else if (shootingTurrets[i][3] == 1) {
			rot = Quaternion.identity;
			rot.eulerAngles.z = 90;
		} else rot = Quaternion.identity;
		//Quaternion.identity;
		Instantiate(prefabs[SHOOTING_TURRET], Vector3(shootingTurrets[i][0], shootingTurrets[i][1], shootingTurrets[i][2]), rot);
	}
	for (i = 0; i < deathStarWalls.length; i++) {
		var wall = Instantiate(prefabs[DEATH_STAR_WALL], Vector3(deathStarWalls[i][0], deathStarWalls[i][1], deathStarWalls[i][2]), Quaternion.identity);
		wall.transform.localScale = Vector3(deathStarWalls[i][3],deathStarWalls[i][4],deathStarWalls[i][5]);
	}
*/	
	time = Time.realtimeSinceStartup;
	/*girs = new Transform[turns.transform.childCount];
	for (var i = 0; i < turns.transform.childCount; i++) {
		girs[i] = turns.transform.GetChild(i);
	}*/
}

function Update () {
	for (var i = 0; i < tieFighters.length; i++) {
		if (!(tieFighters[i][0] == -1000 && tieFighters[i][1] == -1000)) {
			if (tieFighters[i][1] <= ship.transform.position.z && ((tieFighters[i][0]-ship.transform.position.x <= x) && (tieFighters[i][0]-ship.transform.position.x >= -x))) {
				Instantiate(prefabs[TIE_FIGHTER], Vector3(tieFighters[i][0], ship.transform.position.y, tieFighters[i][1]), this.transform.rotation);
				tieFighters[i][0] = -1000;
				tieFighters[i][1] = -1000;
			}
		}
	}
	
	for (i = 0; i < girs.length; i++) {
		if (!(girs[i].position.x == -1000 && girs[i].position.z == -1000)) {
			if (((girs[i].position.z-ship.transform.position.z <= x) && (girs[i].position.z-ship.transform.position.z >= -x)) && ((girs[i].position.x-ship.transform.position.x <= x) && (girs[i].position.x-ship.transform.position.x >= -x))) {
				ship.GetComponent.<Rigidbody>().velocity = Vector3.zero;
				
				if (turning != 0) {
					var aux = ship.transform.eulerAngles.y;
					ship.transform.forward = forward;
					ship.transform.eulerAngles.y += 90*turning;
					forward = ship.transform.forward;
					ship.transform.eulerAngles.y = aux;
				}
				turning = girs[i].position.y;
				
				time = Time.realtimeSinceStartup;
				girs[i].position.x = -1000;
				girs[i].position.z = -1000;
			}
		}
	}
	
	if (turning != 0) {
		turnShip();
	}
}

function turnShip() {
	ship.transform.RotateAround(ship.transform.position, turning*Vector3(0,1,0), 180 * Time.deltaTime);
	cam.transform.RotateAround(ship.transform.position, turning*Vector3(0,1,0), 180 * Time.deltaTime);
	
	if (Mathf.Abs(Vector3.Angle(forward, ship.transform.forward)) >= 90) {
		ship.transform.forward = forward;
		ship.transform.eulerAngles.y += 90*turning;
		forward = ship.transform.forward;
	
		forward = ship.transform.forward;
		turning = 0;
	}
	
}