#pragma strict

var speed : float;
var rotation : float;
var tiltX : float; 
var tiltY : float; 
var forwardSpeed : float;
var brake : float;
var bounciness : float;

var isBegin : boolean = false;

var colliding = false;

var turnStep : float;

var turnsActivated = true;

var turnCheckDistance : float;

var forwardPositionCheckTurn : float;

var delayBeginMoving : float;

var difficulty : int;

var videoFinal : GameObject;

private var moving = false;

private var time = 0.0;

private var turning : int = 0;

function Start () {

	if (difficulty == 1) {
		forwardSpeed = 10;
		turnCheckDistance = 8;
		forwardPositionCheckTurn = 4;
	} else if (difficulty == 2) {
		forwardSpeed = 15;
		turnCheckDistance = 8;
		forwardPositionCheckTurn = 6;
	} else if (difficulty == 3) {
		forwardSpeed = 20;
		turnCheckDistance = 0;
		forwardPositionCheckTurn = 0;
	}

	if (videoFinal) videoFinal.SetActive(false);
	
	yield WaitForSeconds(delayBeginMoving);


	moving = true;
	
}

function Update () {
	//Debug.Log(moving);
	if (!moving) return;
	if (Input.GetKeyDown(KeyCode.Space)) {
		this.GetComponent.<ShipShoot>().FireLaser();
	}
}

function FixedUpdate () {
	if (!moving) return;
	
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
	if (turning != 0) {					// Gir de 90 graus
		var map = GameObject.Find("Map").GetComponent.<MapGenerator>();
		var forward = map.forward;
		Debug.Log(forward);
		if (Mathf.Abs(Vector3.Angle(forward, transform.forward)) >= 90) { 	// Finished turning
			var newForward = Quaternion.Euler(0,90*turning,0)*forward;
			map.SetForward(newForward);
			this.transform.forward = newForward;
			turning = 0;
		} else {															// Turn
			transform.RotateAround(transform.position, turning*Vector3(0,1,0), turnStep * Time.deltaTime);
			this.transform.localEulerAngles = Vector3(locVel.y * - tiltY, transform.localEulerAngles.y, locVel.x * tiltX);
		}
	} else if (!colliding) { 		// Moviment normal
		
		if (Input.GetKey(KeyCode.LeftArrow) || Input.GetKey(KeyCode.A))  {
			var f = Vector3(-speed,0,0);
			GetComponent.<Rigidbody>().AddRelativeForce(f);
			//locVel.x = 0;
		} else if (Input.GetKey(KeyCode.RightArrow) || Input.GetKey(KeyCode.D)) {
			GetComponent.<Rigidbody>().AddRelativeForce(speed,0,0);
			//locVel.x = 0;
		} else {
			var v = Vector3(-brake*locVel.x, 0, 0);
			rb.AddRelativeForce(v);

			//rigidBody.velocity = Vector3(0,0,shipSpeed);
			//rigidBody.angularVelocity = Vector3(0,0,shipSpeed);
			
		}
		
		if (Input.GetKey(KeyCode.UpArrow) || Input.GetKey(KeyCode.W)) GetComponent.<Rigidbody>().AddForce(0,speed,0);
		//this.transform.position = this.transform.position+(Vector3(0,1,0)*Time.deltaTime*speed);
		else if (Input.GetKey(KeyCode.DownArrow) || Input.GetKey(KeyCode.S)) GetComponent.<Rigidbody>().AddForce(0,-speed,0);
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

		if (turnsActivated && Input.GetKey(KeyCode.Q) && CheckTurn(-1)) {
			transform.localEulerAngles.x = 0;
			transform.localEulerAngles.z = 0;
			turning = -1;
			GetComponent.<AudioSource>().Play();
		} else if (turnsActivated && Input.GetKey(KeyCode.E) && CheckTurn(1)) {
			transform.localEulerAngles.x = 0;
			transform.localEulerAngles.z = 0;
			turning = 1;
			GetComponent.<AudioSource>().Play();
		} else {
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

//	if (videoFinal) CheckEnd();
}

function OnTriggerEnter() {
	//if (videoFinal) {
		//this.GetComponent.<Rigidbody>().velocity = Vector3.zero;
		//moving = false;
		//videoFinal.SetActive(true);
		//yield WaitForSeconds(4);
		//Application.LoadLevel(4);
	//}
}

function CheckEnd() {
	var x = 76;
	var z = -21;
	var pos = transform.position;
	if (pos.x >= x && (pos.z <= -14 && pos.z > -26)) {
	//yield WaitForSeconds(3);
		//videoFinal.SetActive(true);
		//yield WaitForSeconds(5);
		Application.LoadLevel(4);
	}
}


function OnCollisionEnter (collision: Collision) {
	if (collision.contacts[0].otherCollider.tag == "Laser" && !collision.contacts[0].otherCollider.GetComponent.<LaserTurret>().line.enabled) return;

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

	yield WaitForSeconds(0.2);
	colliding = false;
	//rb.transform.rotation = Quaternion.identity;
 	rb.transform.localEulerAngles = Vector3(0,transform.localEulerAngles.y, 0); 

	rb.angularVelocity = Vector3.zero; 
}

function OnCollisionExit(c: Collision) {
}

function CheckTurn(turn : int) {
	var map = GameObject.Find("Map").GetComponent.<MapGenerator>();
	var forward = map.forward;
	var newForward = Quaternion.Euler(0,90*turn,0)*forward;
	if (Physics.Raycast(transform.position+transform.TransformDirection(0,0,forwardPositionCheckTurn), newForward, turnCheckDistance))	return false;
	else return true;
}
