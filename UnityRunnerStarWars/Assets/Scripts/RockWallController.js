#pragma strict

function Start () {

}

function Update () {

}

function OnCollisionEnter(collision : Collision) {
	if (collision.contacts[0].otherCollider.gameObject.tag == "shot") {
		//this.rigidbody.
	}
}