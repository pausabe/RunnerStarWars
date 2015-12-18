#pragma strict

var Smoke : GameObject;

function Start () {
	var smoke = Smoke.GetComponent.<ParticleSystem>();
    Destroy(gameObject, smoke.duration);
}

function Update () {

}