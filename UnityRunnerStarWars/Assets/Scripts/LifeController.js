#pragma strict

var life : int;

var Explosion : GameObject;
var shotExplosion : GameObject;

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
	if (this.GetComponent.<LifeController>().isAlive()){
		var explosion = Instantiate(shotExplosion, collision.contacts[0].point, transform.rotation);
		explosion.transform.parent = transform;
	}
	Hit(10);
 }
 

function Explode() {
	var rb = this.GetComponent.<Rigidbody>();
	//rb.AddRelativeTorque(0.5,0.2,0.3);
	
	var explosion = Instantiate(Explosion, transform.position, Quaternion.identity);
	explosion.transform.parent = transform;
	var Smoke = explosion.transform.GetChild(1).gameObject;
	var smoke = Smoke.GetComponent.<ParticleSystem>();
    Destroy(gameObject, smoke.duration);
	
}

function isAlive() {
	return life > 0;
}