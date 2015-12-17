#pragma strict

var Explosion : GameObject;

function Start () {
	yield WaitForSeconds(6);
	Instantiate(Explosion, Vector3(-70.9, 2,-23), Quaternion.identity);
}

function Update () {

}