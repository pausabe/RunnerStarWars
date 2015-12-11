#pragma strict

public var timeVideo : float;

function Start () {
	yield WaitForSeconds(timeVideo);
	gameObject.SetActive(false);
}
