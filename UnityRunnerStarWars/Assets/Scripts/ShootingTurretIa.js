#pragma strict

private var ship : GameObject;
var shootingDistance : float;

var guns : GameObject;

var angleVariationInFloor : float;
var angleVariationInWall : float;

var waitingToShoot : float;
 
var aimZ : float;

private var time : float;
private var up : Vector3;

function Start () {
	ship = GameObject.Find("X-wing");
	time = Time.realtimeSinceStartup;
	
	if (this.transform.rotation.eulerAngles.z == 0) { 
		up = Vector3(0,1,0);
	} else if (this.transform.rotation.eulerAngles.z == 270) {
		up = Vector3(1,0,0);
//		this.transform.rotation.eulerAngles.z = 0;
	} else { 
		up = Vector3(-1,0,0);
	}
}

function Update () {
	//guns.transform.LookAt(ship.transform.position);
	var shotSpeed = this.GetComponent.<ShipShoot>().ShotSpeed;
	var shipSpeed = ship.GetComponent.<Move>().forwardSpeed;
	
	var point = ship.transform.position + Vector3(0,0,aimZ);

	if (up == Vector3(0,1,0)) {
		var z = Mathf.Abs(point.z - guns.transform.position.z); 
		var y = Mathf.Abs(point.y - guns.transform.position.y);
		var angle = Mathf.Atan(y/z);

		guns.transform.eulerAngles.x = - angle*Mathf.Rad2Deg - angleVariationInFloor;
		//guns.transform.localEulerAngles.x = Mathf.Asin(shipSpeed/shotSpeed) + 90;
	} else {
		var x = Mathf.Abs(point.x - guns.transform.position.x); 
		z = Mathf.Abs(point.z - guns.transform.position.z);
		angle = Mathf.Atan(z/x);

		guns.transform.localEulerAngles.x = angle*Mathf.Rad2Deg - angleVariationInWall;
		//guns.transform.localEulerAngles.x = Mathf.Asin(shipSpeed/shotSpeed);
	}	
		
	//var eulerAngles = this.transform.rotation.eulerAngles.z;
	if (up == Vector3(0,1,0)) { 
		point.y = this.transform.position.y;
	} else { 
		point.x = this.transform.position.x;
	}
	//Debug.Log(point);}
	this.transform.LookAt(point, up);
	//this.transform.rotation.eulerAngles.z = eulerAngles;
	//guns.transform.LookAt(ship.transform.position);
	if (Vector3.Distance(this.transform.position, ship.transform.position) < shootingDistance) {
		if (Time.realtimeSinceStartup - time >= waitingToShoot) {
			this.GetComponent.<ShipShoot>().FireLaser();
			time = Time.realtimeSinceStartup;
		} 
	}
}