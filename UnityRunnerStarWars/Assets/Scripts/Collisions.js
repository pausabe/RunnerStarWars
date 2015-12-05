#pragma strict

var Bounciness : float;

function Start () {

}

function Update () {

}

 function OnCollisionEnter (collision: Collision) {
    var contact = collision.contacts[0];
	var rb = this.GetComponent.<Rigidbody>();
	var mirror = Vector3.Reflect(rb.velocity, contact.normal);
	rb.velocity.x = Bounciness*mirror.normalized.x;rb.velocity.y = Bounciness*mirror.normalized.y;
	
	
}

function OnTriggerEnter() {
	//collision.
	var rb = GetComponent.<Rigidbody>();
	rb.velocity = (-0.2*rb.velocity);
}

