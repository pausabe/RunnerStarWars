#pragma strict

var Explosion : GameObject;

function Start () {

}

function Update () {

}

 function OnCollisionEnter (collision: Collision) {
    var contact = collision.contacts[0];
    var rot = Quaternion.FromToRotation(Vector3(0,0,1), contact.normal);

	var collider = contact.otherCollider.gameObject;
	if (collider.GetComponent.<LifeController>() != null) {
		collider.GetComponent.<LifeController>().Hit(10);
	
		if (collider.GetComponent.<LifeController>().isAlive()) {	
			var explosion = Instantiate(Explosion, transform.position, rot);
			explosion.transform.parent = collider.transform;
		}
	} else {
		explosion = Instantiate(Explosion, transform.position, rot);
		explosion.transform.parent = collider.transform;
	}
	Destroy(gameObject);
 }

function OnCollisionEnter(collider : Collider) {
	
}