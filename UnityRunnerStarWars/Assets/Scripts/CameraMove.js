#pragma strict

var ship : GameObject; 

var positionOffset : Vector3;// = Vector3(0,0.1,-2);

var camHeight : float;
var camDist : float;

function Start () {
}


function Update () {
     var v = Vector3.Cross(ship.transform.up, Vector3.up) * camDist;
     var lookDir = v;
     v.y += camHeight;
    // this.transform.position = ship.transform.position + v;

	//this.transform.position = ship.transform.position + positionOffset;
	//this.transform.rotation = Quaternion.LookRotation(Vector3(0,0,1), ship.transform.up);
	this.transform.position = ship.transform.position;
	this.transform.Translate(positionOffset);
	
}