#pragma strict

var speed : float;
var rotation : float;
var tiltX : float; 
var tiltY : float; 
var forwardSpeed : float;
var brake : float;
var bounciness : float;

var colliding = false;

var time = 0.0;

function Start () {
	//rigidBody = this.GetComponent.<Rigidbody>();
	//rigidBody.velocity = Vector3(0,0,shipSpeed);
}

function Update () {
	if (Input.GetKeyDown(KeyCode.Space)) {
		this.GetComponent.<ShipShoot>().FireLaser();
	}
}

function FixedUpdate () {

/*	if (Input.GetKey(KeyCode.UpArrow)) transform.Translate(Vector3(0,1,0)*Time.deltaTime*speed);
	if (Input.GetKey(KeyCode.DownArrow)) transform.Translate(Vector3(0,-1,0)*Time.deltaTime*speed);
	if (Input.GetKey(KeyCode.LeftArrow)) transform.Translate(Vector3(-1,0,0)*Time.deltaTime*speed);
	if (Input.GetKey(KeyCode.RightArrow)) transform.Translate(Vector3(1,0,0)*Time.deltaTime*speed);
*/
	var rb = GetComponent.<Rigidbody>();
    rb.velocity.z = forwardSpeed;

	if (!colliding) {
		if (Input.GetKey(KeyCode.UpArrow)) GetComponent.<Rigidbody>().AddForce(0,speed,0);
		//this.transform.position = this.transform.position+(Vector3(0,1,0)*Time.deltaTime*speed);
		else if (Input.GetKey(KeyCode.DownArrow)) GetComponent.<Rigidbody>().AddForce(0,-speed,0);
		else {
			var v = Vector3(0,-brake*rb.velocity.y, 0);
			rb.AddRelativeForce(v);
		}
		if (Input.GetKey(KeyCode.LeftArrow)) GetComponent.<Rigidbody>().AddForce(-speed,0,0);
		else if (Input.GetKey(KeyCode.RightArrow)) GetComponent.<Rigidbody>().AddForce(speed,0,0);
		else {
			v = Vector3(-brake*rb.velocity.x,0, 0);
			rb.AddRelativeForce(v);

			//rigidBody.velocity = Vector3(0,0,shipSpeed);
			//rigidBody.angularVelocity = Vector3(0,0,shipSpeed);
			
		}
		
		if (Input.GetKey(KeyCode.Q)) GetComponent.<Rigidbody>().AddRelativeTorque(0,0,rotation);
		else if (Input.GetKey(KeyCode.E)) GetComponent.<Rigidbody>().AddRelativeTorque(0,0,-rotation);
		else {
			//var v = Vector3(-2*rb.angularVelocity.x,-2*rb.velocity.y, 0);
			//rb.AddTorque(-2*rb.angularVelocity);
			//rb.angularVelocity = Vector3.zero;
			
			//rb.AddRelativeTorque(0, 0, GetComponent.<Rigidbody>().velocity.x * - tilt);
			rb.transform.rotation = Quaternion.Euler(GetComponent.<Rigidbody>().velocity.y * - tiltY, 0, GetComponent.<Rigidbody>().velocity.x * - tiltX);//*rb.rotation;
		}
	} else {
		var v1 = Vector3(-brake*rb.velocity.x,-brake*rb.velocity.y, 0);
		rb.AddForce(v1);
     	rb.rotation = Quaternion.Euler(0,0, Mathf.Sin((time-Time.realtimeSinceStartup)*15) * 15); 
	}

}

function OnCollisionEnter (collision: Collision) {
    var contact = collision.contacts[0];
	var rb = this.GetComponent.<Rigidbody>();
	var velocity = Vector3(rb.velocity.x, rb.velocity.y, 0);
	var mirror = Vector3.Reflect(velocity, contact.normal);
//	rb.velocity.x = bounciness*Vector3.Normalize(mirror).x;rb.velocity.y = bounciness*Vector3.Normalize(mirror).y;
	//rb.AddExplosionForce(bounciness, contact.point,0.1, 0.0, UnityEngine.ForceMode.Impulse);
	//rb.AddForceAtPosition(Vector3(bounciness*Vector3.Normalize(mirror).x,bounciness*Vector3.Normalize(mirror).y,0.0),contact.point,UnityEngine.ForceMode.Impulse);
	rb.AddForce(Vector3(bounciness*Vector3.Normalize(mirror).x,bounciness*Vector3.Normalize(mirror).y,0.0), UnityEngine.ForceMode.Impulse);
	rb.angularVelocity = Vector3.zero; 
//Debug.Log(rb.velocity);
	
	colliding = true;
	time = Time.realtimeSinceStartup;
	yield WaitForSeconds(0.8);
	colliding = false;
	rb.transform.rotation = Quaternion.identity;
   	rb.angularVelocity = Vector3.zero; 

	
}

function OnCollisionExit(c: Collision) {

}