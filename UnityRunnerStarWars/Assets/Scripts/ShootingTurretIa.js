#pragma strict

var ship : GameObject;
var shootingDistance : float;

var guns : GameObject;

var angleVariation : float;

function Start () {

}

function Update () {
	//guns.transform.LookAt(ship.transform.position);
	var z = ship.transform.position.z - guns.transform.position.z; 
	var y = ship.transform.position.y - guns.transform.position.y;
	var angle = Mathf.Atan(y/z);
	Debug.Log(angle*Mathf.Rad2Deg);
	guns.transform.eulerAngles.x = -angle*Mathf.Rad2Deg - angleVariation;
	this.transform.LookAt(ship.transform.position);
	//guns.transform.LookAt(ship.transform.position);
	if (Vector3.Distance(this.transform.position, ship.transform.position) < shootingDistance) {
					this.GetComponent.<ShipShoot>().FireLaser();

	}
}