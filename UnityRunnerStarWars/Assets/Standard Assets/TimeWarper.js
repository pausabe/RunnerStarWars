#pragma strict

var timeWarping : float;

var timeScale : float;

function Start () {

}

function Update () {

}

function OnTriggerEnter(collider : Collider) {
	if (collider.tag == "Player") {
		var plane = GameObject.Find("Main Camera").transform.GetChild(0).gameObject;
		plane.SetActive(true);
		Time.timeScale = timeScale;
		this.transform.localScale = Vector3(0.0000001,0.00000001,0.00000001);
		yield WaitForSeconds(timeWarping);
		Time.timeScale = 1;
		plane.SetActive(false);

		Destroy(gameObject);
	}
}