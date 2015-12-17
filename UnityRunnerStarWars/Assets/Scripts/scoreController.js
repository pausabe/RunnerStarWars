#pragma strict

static var totalScore : int;
var thisScore : int; //the score in this scene

function Start () {//each time the scene is reloaded
	thisScore = 0;
	
}

function Update () {
	Debug.Log("this: " + thisScore + " total: " + totalScore);
	if(GameObject.Find("X-wing")) thisScore ++;
	else thisScore = 0;
}