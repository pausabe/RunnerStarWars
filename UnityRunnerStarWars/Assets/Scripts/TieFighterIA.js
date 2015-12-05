#pragma strict

var state : int = 0;
var speed : float;
var ship : GameObject;
var shootingDistance : float;

var waitingToShoot : float;
var waitingToFlyBack : float;
var waitingToFollow : float;

private var time : float = 0;

function Start () {
	this.transform.position = ship.transform.position + Vector3(0,0,-10);
}

function Update() {
	var rigidBody = this.GetComponent.<Rigidbody>();
	if (state == 0) { 			// Is behind ship, not shooting lasers
		rigidBody.velocity.z = speed;
		if (Vector3.Distance(this.transform.position, ship.transform.position) < shootingDistance) {
			state = 1;
			time = Time.realtimeSinceStartup;
		}
	} else if (state == 1) {	// Is behind ship, shooting lasers
		rigidBody.velocity.z = speed;
		if (Time.realtimeSinceStartup - time >= waitingToShoot) {
			this.GetComponent.<ShipShoot>().FireLaser();
			time = Time.realtimeSinceStartup;
		} 
		if (ship.transform.position.z <= this.transform.position.z) {
			state = 2;
			time = Time.realtimeSinceStartup;
		}
	} else if (state == 2) { 	// Is past the ship, not shooting lasers
		rigidBody.velocity.z = speed;
		if (Time.realtimeSinceStartup - time >= waitingToFlyBack) {
			state = 3;
		} 
	} else if (state == 3) { 	// Rotating 
		//var deltaRotation : Quaternion = Quaternion.Euler(Vector3(-180,0,0) * Time.deltaTime);
		this.transform.RotateAround (ship.transform.position, Vector3(-1,0,0), 20 * Time.deltaTime);
		//rigidBody.MoveRotation(rigidBody.rotation * deltaRotation);
		//GetComponent.<Rigidbody>().AddRelativeForce(0,0,0.1);
		if (ship.transform.position.z > this.transform.position.z) {
			state = 5;
			time = Time.realtimeSinceStartup;
		}
	} else if (state == 4) { 	// Flying back
		if (ship.transform.position.z > this.transform.position.z) {
			state = 5;
			time = Time.realtimeSinceStartup;
		}
	} else if (state == 5) { 	// Restarting
		rigidBody.velocity.z = 0;
		if (Time.realtimeSinceStartup - time >= waitingToFollow) {
			this.transform.position = ship.transform.position + Vector3(0,0,-10);
			state = 0;
		}
	}
}