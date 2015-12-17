#pragma strict

var Force : int;
private var simpleForce : int;

var timeProtectionOn : float;

var protectionOn = false;

var AbsorveForce : AudioClip;

private var time : float;

private var SphereProtection : GameObject;

function Start () {
	simpleForce=1;
	SphereProtection = transform.GetChild(9).gameObject;
	SphereProtection.GetComponent.<Renderer>().enabled = false;
	protectionOn = false;
}

function Update () {
	if (Force >= 100){
		GameObject.Find("maxPower").GetComponent(Image).color.a = 1;
		if(Input.GetKey(KeyCode.F)) {
			SphereProtection.GetComponent.<Renderer>().enabled = true;
			time = Time.realtimeSinceStartup;
			protectionOn = true;
			Force = 0;
		}
	}
	if (protectionOn) { 
		if(Time.realtimeSinceStartup - time >= timeProtectionOn) {
			SphereProtection.GetComponent.<Renderer>().enabled = false;
			protectionOn = false;
			
			GameObject.Find("E1").GetComponent(Image).color.a = 0;
			GameObject.Find("E2").GetComponent(Image).color.a = 0;
			GameObject.Find("E3").GetComponent(Image).color.a = 0;
			GameObject.Find("E4").GetComponent(Image).color.a = 0;
			GameObject.Find("E5").GetComponent(Image).color.a = 0;
			GameObject.Find("maxPower").GetComponent(Image).color.a = 0;
			simpleForce = 1;
			
		} else {
			SphereProtection.transform.localEulerAngles += (Vector3(0.0f, 15.0f, 0.0f));// * Time.realtimeSinceStartup);
		}
	}
}

function OnTriggerEnter(collider : Collider) {
	
	
	

	if (collider.gameObject.tag == "ForceVortex") {
		if(simpleForce % 2 == 0 && simpleForce<=10) {
			GameObject.Find("E" + (simpleForce/2)).GetComponent(Image).color.a = 1;
		}
		simpleForce++;
		Force += 10;
		Destroy(collider.gameObject);
		AudioSource.PlayClipAtPoint(AbsorveForce, transform.position, 0.4);
	}
}