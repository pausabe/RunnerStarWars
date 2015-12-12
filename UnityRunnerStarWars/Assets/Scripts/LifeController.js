#pragma strict

var life : int;

var Explosion : GameObject;
var shotExplosion : GameObject;

function Start () {
	//    var tag = this.tag;
    
    //yield WaitForSeconds(2);
    //if (tag == "Player") Application.LoadLevel(1);
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
	Hit(10);
	if (this.GetComponent.<LifeController>().isAlive()){
		var explosion = Instantiate(shotExplosion, collision.contacts[0].point, transform.rotation);
		explosion.transform.parent = transform;
	}
}

function OnCollisionStay (collision: Collision) {
		

	//Debug.Log(Mathf.Abs(Vector3.Angle(collision.contacts[0].normal, -transform.forward)));
	if (collision.collider.gameObject.tag != "shot" && Mathf.Abs(Vector3.Angle(collision.contacts[0].normal, -transform.forward)) < 50) {
		life = -1;
		Explode();
		
		
	}
}
function Explode() {
	var rb = this.GetComponent.<Rigidbody>();
	
	var explosion = Instantiate(Explosion, transform.position, Quaternion.identity);
	//explosion.transform.parent = transform;
	var Smoke = explosion.transform.GetChild(1).gameObject;
	var smoke = Smoke.GetComponent.<ParticleSystem>();
	
	
	Destroy(gameObject);

}

function isAlive() {
	return life > 0;
}