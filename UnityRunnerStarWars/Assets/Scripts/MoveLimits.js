#pragma strict

var maxX : float;
var minX : float;
var maxY : float;
var minY : float;

function Start () {

}

function Update () {
	var rb = GetComponent.<Rigidbody>();
	if (minX != 0 && this.transform.position.x <= minX) {
		rb.velocity.x = 0;
		transform.position.x = minX+0.01;
	}
	if (minY != 0 && this.transform.position.y <= minY) {
		rb.velocity.y = 0;
		transform.position.y = minY+0.01;
	}
	if (maxX != 0 && this.transform.position.x >= maxX) {
		rb.velocity.x = 0;
		transform.position.x = maxX-0.01;
	}
	if (maxY != 0 && this.transform.position.y >= maxY) {
		rb.velocity.y = 0;
		transform.position.y = maxY-0.01;
	}

}