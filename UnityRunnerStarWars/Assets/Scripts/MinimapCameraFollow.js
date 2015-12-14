#pragma strict

var ship : GameObject; 

function Start () {

}

function Update () {
	if (ship){// || !ship.GetComponent.<LifeController>().isAlive()) {
		//this.transform.position = ship.transform.position;
		this.transform.eulerAngles.y = ship.transform.eulerAngles.y;
		this.transform.position.x = ship.transform.position.x;
		this.transform.position.z = ship.transform.position.z;
	}
}