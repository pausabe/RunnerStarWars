﻿#pragma strict

var speed : float;
var rotation : float;
var tiltX : float; 
var tiltY : float; 
var forwardSpeed : float;
var brake : float;
var bounciness : float;

var colliding = false;

var time = 0.0;


private var Direction : int = 1; // 0: left, 1: forward, 2: right, 3: back

function Start () {

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
	var locVel = transform.InverseTransformDirection(rb.velocity);
   	locVel.z = forwardSpeed;
   	rb.velocity = transform.TransformDirection(locVel);

    //rb.velocity.z = forwardSpeed;//this.transform.forward;
    //Debug.Log(this.transform.forward);
/*
	if (Input.GetKey(KeyCode.UpArrow)) GetComponent.<Rigidbody>().AddForce(0,speed,0);
	//this.transform.position = this.transform.position+(Vector3(0,1,0)*Time.deltaTime*speed);
	else if (Input.GetKey(KeyCode.DownArrow)) GetComponent.<Rigidbody>().AddForce(0,-speed,0);
	else {
		var v = Vector3(0,-brake*rb.velocity.y, 0);
		rb.AddForce(v);
	}
	*/
	if (Input.GetKey(KeyCode.LeftArrow))  {
		var f = Vector3(-speed,0,0);
		
		GetComponent.<Rigidbody>().AddRelativeForce(f);
	} else if (Input.GetKey(KeyCode.RightArrow)) {
		GetComponent.<Rigidbody>().AddRelativeForce(speed,0,0);
	} else {
		var v = Vector3(-brake*locVel.x, 0, 0);
		rb.AddRelativeForce(v);

		//rigidBody.velocity = Vector3(0,0,shipSpeed);
		//rigidBody.angularVelocity = Vector3(0,0,shipSpeed);
		
	}
	
	if (Input.GetKey(KeyCode.UpArrow)) GetComponent.<Rigidbody>().AddForce(0,speed,0);
	//this.transform.position = this.transform.position+(Vector3(0,1,0)*Time.deltaTime*speed);
	else if (Input.GetKey(KeyCode.DownArrow)) GetComponent.<Rigidbody>().AddForce(0,-speed,0);
	else {
		v = Vector3(0,-brake*rb.velocity.y, 0);
		rb.AddRelativeForce(v);
	}
		/*
		if (Input.GetKey(KeyCode.LeftArrow)) GetComponent.<Rigidbody>().AddForce(-speed,0,0);
		else if (Input.GetKey(KeyCode.RightArrow)) GetComponent.<Rigidbody>().AddForce(speed,0,0);
		else {
			v = Vector3(-brake*rb.velocity.x,0, 0);
			rb.AddRelativeForce(v);

			//rigidBody.velocity = Vector3(0,0,shipSpeed);
			//rigidBody.angularVelocity = Vector3(0,0,shipSpeed);
			
		}*/

	if (!colliding) {
		
		if (Input.GetKey(KeyCode.Q)) GetComponent.<Rigidbody>().AddRelativeTorque(0,0,rotation);
		else if (Input.GetKey(KeyCode.E)) GetComponent.<Rigidbody>().AddRelativeTorque(0,0,-rotation);
		else {
			//var v = Vector3(-2*rb.angularVelocity.x,-2*rb.velocity.y, 0);
			//rb.AddTorque(-2*rb.angularVelocity);
			//rb.angularVelocity = Vector3.zero;
			
			//rb.AddRelativeTorque(0, 0, GetComponent.<Rigidbody>().velocity.x * - tilt);
			//var v3Velocity = transform.InverseTransformDirection(rb.velocity);
//			this.transform.localRotation = Quaternion.Euler(v3Velocity.y * - tiltY, 0,v3Velocity.x * - tiltX);
			this.transform.localEulerAngles = Vector3(locVel.y * - tiltY, transform.localEulerAngles.y, locVel.x * - tiltX);
			//rb.transform.rotation = Quaternion.Euler(GetComponent.<Rigidbody>().velocity.y * - tiltY, transform.localEulerAngles.y, GetComponent.<Rigidbody>().velocity.x * - tiltX);//*rb.rotation;
			
			//var rot = Quaternion.Euler(0, transform.localEulerAngles.y, 0);


			// Find the axis we want to tilt around.
			// It should be perpendicular to the velocity and to the up direction.
			//var tiltAxis = Vector3.Cross(Vector3(0,1,0), locVel);


			// Now rotate the existing rotation by tiltAmount around tiltAxis.
			// (Calculation of tiltAmount is not covered here.)
			//transform.rotation = Quaternion.AngleAxis(tiltX, tiltAxis) * rot;


			
			/*if (this.transform.forward.z == 1) {
				//var z = Input.GetAxis("Horizontal") * 2.0f; // might be negative, just test it
				//var euler = transform.localEulerAngles;
				//euler.z = Mathf.Lerp(euler.z, z, 2.0f * Time.deltaTime);
				//transform.localEulerAngles = euler;
			//rb.transform.localRotation = Quaternion.Euler(GetComponent.<Rigidbody>().velocity.y * - tiltY, 0,GetComponent.<Rigidbody>().velocity.x * - tiltX);

				//this.transform.localRotation.localEulerAngles = Vector3(GetComponent.<Rigidbody>().velocity.y * - tiltY, 0, GetComponent.<Rigidbody>().velocity.x * - tiltX);
			 	rb.transform.localRotation = Quaternion.Euler(GetComponent.<Rigidbody>().velocity.y * - tiltY, 0, GetComponent.<Rigidbody>().velocity.x * - tiltX);//*rb.rotation;
			}
			else if (this.transform.forward == Vector3(0,0,-1)) rb.transform.rotation = Quaternion.Euler(GetComponent.<Rigidbody>().velocity.y * tiltY, 0, GetComponent.<Rigidbody>().velocity.x * tiltX);//*rb.rotation;
	*/	}
	} else {
		//var v1 = Vector3(-brake*locVel.x,-brake*locVel.y, 0);
		//rb.AddRelativeForce(v1);
     	rb.transform.localEulerAngles = Vector3(0,transform.localEulerAngles.y, Mathf.Sin((time-Time.realtimeSinceStartup)*15) * 15); 
	}

}

function OnCollisionEnter (collision: Collision) {

    var contact = collision.contacts[0];
	var rb = this.GetComponent.<Rigidbody>();
	var locVel = transform.InverseTransformDirection(rb.velocity);

	var velocity = Vector3(locVel.x, locVel.y, 0);
	var mirror = Vector3.Reflect(velocity, contact.normal);
	
	if (!(contact.otherCollider.gameObject.tag == "shot"))
		rb.AddRelativeForce(Vector3(bounciness*Vector3.Normalize(contact.normal).x,bounciness*Vector3.Normalize(contact.normal).y,0.0), UnityEngine.ForceMode.Impulse);
	rb.angularVelocity = Vector3.zero; 

	colliding = true;
	time = Time.realtimeSinceStartup;

	yield WaitForSeconds(0.8);
	colliding = false;
	//rb.transform.rotation = Quaternion.identity;
 	rb.transform.localEulerAngles = Vector3(0,transform.localEulerAngles.y, 0); 

	rb.angularVelocity = Vector3.zero; 

	
}

function OnCollisionExit(c: Collision) {
}

