#pragma strict

var state : int = 0;
var speed : float;
private var ship : GameObject;
var shootingDistance : float;

var waitingToShoot : float;
var waitingToFlyBack : float;
var waitingToFollow : float;

var indicator : GameObject;

private var time : float = 0;

function Start () {
	ship = GameObject.Find("X-wing");
	this.transform.eulerAngles = ship.transform.eulerAngles;
	this.transform.position = ship.transform.position;
	this.transform.Translate(0,0,-10);
}

function SetLocalZVelocity(speed : float) {
	var rb = this.GetComponent.<Rigidbody>();
	/*var locVel = transform.InverseTransformDirection(rb.velocity);
   	locVel.z = speed;
   	rb.velocity = transform.TransformDirection(locVel);*/
   	rb.velocity.z = speed;
}

function Update() {
	var rigidBody = this.GetComponent.<Rigidbody>();
	if (!ship || !(ship.GetComponent.<LifeController>().isAlive())) {
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
		
		var f = (ship.transform.position - this.transform.position);//*0.1;
		
		if (ship.transform.position.z > this.transform.position.z + 5 ){//&& GetComponent.<AudioSource>()) {
			GetComponent.<AudioSource>().Play();
		}
		//rigidBody.AddForce(f.x,f.y,0.0);
		if (ship.transform.position.z > this.transform.position.z + 2) {
			rigidBody.velocity.x = f.x;
			rigidBody.velocity.y = f.y;
			this.transform.LookAt(ship.transform.position);
		}
		if (ship.transform.position.z < this.transform.position.z) {
			state = 2;
			time = Time.realtimeSinceStartup;
		}
	} else if (state == 2) { 	// Is past the ship, not shooting lasers
		SetLocalZVelocity(speed);
		rigidBody.velocity.x = 0;
		rigidBody.velocity.y = 0;

		this.transform.forward = Vector3.RotateTowards(this.transform.forward, Vector3(0,0,1), Time.deltaTime, 0.0);
		
		if (Time.realtimeSinceStartup - time >= waitingToFlyBack) {
			state = 3;
		} 
	} else if (state == 3) { 	// Rotating 
		//var deltaRotation : Quaternion = Quaternion.Euler(Vector3(-180,0,0) * Time.deltaTime);
		var axis = Vector3.Cross(Vector3.up, this.transform.forward);
				//SetLocalZVelocity(0);
		var locVel = transform.InverseTransformDirection(rigidBody.velocity);
   		locVel.z = speed;
   		rigidBody.velocity = transform.TransformDirection(locVel);

		this.transform.RotateAround(ship.transform.position, -axis, 20 * Time.deltaTime);
		//rigidBody.MoveRotation(rigidBody.rotation * deltaRotation);
		//GetComponent.<Rigidbody>().AddRelativeForce(0,0,0.1);
		if (ship.transform.position.y > this.transform.position.y && ship.transform.position.z > this.transform.position.z) {
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
		//this.transform.eulerAngles = ship.transform.eulerAngles;
		this.transform.forward = Vector3(0,0,1);
		this.transform.position = ship.transform.position;
		this.transform.Translate(0,0.3,-10);
		if (Time.realtimeSinceStartup - time >= waitingToFollow) {
			state = 0;
		}
	}
}

function OnBecameVisible() {
	indicator.SetActive(false);
}
function OnBecameInvisible() {
	indicator.SetActive(true);
}
/*
function isBehindShip() {
	var forward = GameObject.Find("Map").GetComponent.<MapGenerator>().forward;
	if (forward == Vector3(0,0,1)) {
		return ship.transform.position.z > this.transform.position.z;
	} else if (forward == Vector3(0,0,-1)) return ship.transform.position.z < this.transform.position.z;
	else if (forward == Vector3(1,0,0)) return ship.transform.position.x > this.transform.position.x;	
	else return ship.transform.position.x < this.transform.position.x;	
}*/