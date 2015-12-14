#pragma strict

var Force : int;

var timeProtectionOn : float;

var protectionOn = false;

private var time : float;

private var SphereProtection : GameObject;

function Start () {
	SphereProtection = transform.GetChild(9).gameObject;
	SphereProtection.GetComponent.<Renderer>().enabled = false;
	protectionOn = false;
}

function Update () {
	if (Force == 100 && Input.GetKey(KeyCode.F)) {
		SphereProtection.GetComponent.<Renderer>().enabled = true;
		time = Time.realtimeSinceStartup;
		protectionOn = true;
		Force = 0;
	}
	if (protectionOn) { 
		if(Time.realtimeSinceStartup - time >= timeProtectionOn) {
			SphereProtection.GetComponent.<Renderer>().enabled = false;
			protectionOn = false;
		} else {
			SphereProtection.transform.localEulerAngles += (Vector3(0.0f, 15.0f, 0.0f));// * Time.realtimeSinceStartup);
		}
	}
}

function OnTriggerEnter(collider : Collider) {
	if (collider.gameObject.tag == "ForceVortex") {
		Force += 10;
		Destroy(collider.gameObject);
	}
}