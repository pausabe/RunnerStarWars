#pragma strict

var Force : int;

function Start () {

}

function Update () {

}

function OnTriggerEnter(collider : Collider) {
	if (collider.gameObject.tag == "ForceVortex") {
		Force += 10;
		Destroy(collider.gameObject);
	}
}