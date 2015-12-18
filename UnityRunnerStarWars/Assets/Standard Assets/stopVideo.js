#pragma strict

public var timeVideo : float;

function Start () {
	yield WaitForSeconds(timeVideo);
	//GetComponent<RawImage>().color.a = 0;
}
