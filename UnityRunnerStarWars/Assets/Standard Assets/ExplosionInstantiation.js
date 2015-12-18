#pragma strict

var Explosion : GameObject;

function Start () {
	yield WaitForSeconds(6);
	Instantiate(Explosion, Vector3(-70.9, 2,-22), Quaternion.identity);
}

function Update () {

}