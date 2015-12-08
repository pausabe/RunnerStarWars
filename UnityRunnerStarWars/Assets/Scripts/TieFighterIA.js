#pragma strict

var state : int = 0;
var speed : float;
private var ship : GameObject;
var shootingDistance : float;

var waitingToShoot : float;
var waitingToFlyBack : float;
var waitingToFollow : float;

private var time : float = 0;

function Start () {
	ship = GameObject.Find("X-wing");
	this.transform.eulerAngles = ship.transform.eulerAngles;
	this.transform.position = ship.transform.position;
	this.transform.Translate(0,0,-10);
}

function SetLocalZVelocity(speed : float) {
	var rb = this.GetComponent.<Rigidbody>();
	var locVel = transform.InverseTransformDirection(rb.velocity);
   	locVel.z = speed;
   	rb.velocity = transform.TransformDirection(locVel);
}

function Update() {
	var rigidBody = this.GetComponent.<Rigidbody>();
	if (ship == null || !(ship.GetComponent.<LifeController>().isAlive())) {
		state = -1;
		SetLocalZVelocity(speed);
	}
	if (state == 0) { 			// Is behind ship, not shooting lasers
		SetLocalZVelocity(speed);
		if (Vector3.Distance(this.transform.position, ship.transform.position) < shootingDistance) {
			state = 1;
			time = Time.realtimeSinceStartup;
		}
	} else if (state == 1) {	// Is behind ship, shooting lasers
		SetLocalZVelocity(speed);
		if (Time.realtimeSinceStartup - time >= waitingToShoot) {
			this.GetComponent.<ShipShoot>().FireLaser();
			time = Time.realtimeSinceStartup;
		} 
		if (!isBehindShip()) {
			state = 2;
			time = Time.realtimeSinceStartup;
		}
	} else if (state == 2) { 	// Is past the ship, not shooting lasers
		SetLocalZVelocity(speed);
		if (Time.realtimeSinceStartup - time >= waitingToFlyBack) {
			state = 3;
		} 
	} else if (state == 3) { 	// Rotating 
		//var deltaRotation : Quaternion = Quaternion.Euler(Vector3(-180,0,0) * Time.deltaTime);
		var axis = Vector3.Cross(Vector3.up, this.transform.forward);
		
		this.transform.RotateAround(ship.transform.position, -axis, 20 * Time.deltaTime);
		//rigidBody.MoveRotation(rigidBody.rotation * deltaRotation);
		//GetComponent.<Rigidbody>().AddRelativeForce(0,0,0.1);
		if (isBehindShip()) {
			state = 5;
			time = Time.realtimeSinceStartup;
		}
	} else if (state == 4) { 	// Flying back
		SetLocalZVelocity(0);

		if (ship.transform.position.z > this.transform.position.z) {
			state = 5;
			time = Time.realtimeSinceStartup;
		}
	} else if (state == 5) { 	// Restarting
		this.transform.eulerAngles = ship.transform.eulerAngles;
		this.transform.forward = GameObject.Find("Map").GetComponent.<MapGenerator>().forward;
		this.transform.position = ship.transform.position;
		this.transform.Translate(0,0.3,-10);
		if (Time.realtimeSinceStartup - time >= waitingToFollow) {
			state = 0;
		}
	}
}

function isBehindShip() {
	var forward = GameObject.Find("Map").GetComponent.<MapGenerator>().forward;
	if (forward == Vector3(0,0,1)) {
		return ship.transform.position.z > this.transform.position.z;
	} else if (forward == Vector3(0,0,-1)) return ship.transform.position.z < this.transform.position.z;
	else if (forward == Vector3(1,0,0)) return ship.transform.position.x > this.transform.position.x;	
	else return ship.transform.position.x < this.transform.position.x;	
}