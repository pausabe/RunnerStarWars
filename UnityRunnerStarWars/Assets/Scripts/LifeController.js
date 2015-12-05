#pragma strict

var life : int;

var Explosion : GameObject;

function Start () {

}

function Update () {

}

function Hit(damage: int) {
	life -= damage;
	if (life <= 0) {
		Explode();
	}
}

 function OnCollisionEnter (collision: Collision) {
	//Hit(20);
 }

function Explode() {
	var explosion = Instantiate(Explosion, transform.position, Quaternion.identity);
	explosion.transform.parent = transform;
	var Smoke = explosion.transform.GetChild(1).gameObject;
	var smoke = Smoke.GetComponent.<ParticleSystem>();
    Destroy(gameObject, smoke.duration);
	
}

function isAlive() {
	return life > 0;
}