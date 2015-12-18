#pragma strict

static var totalScore : int;
var thisScore : int; //the score in this scene

private var text : Canvas;
private var count : int = 0;

function Start () {//each time the scene is reloaded
	thisScore = 0;
	
	text = GetComponent.<Canvas>();
	
	count = 0;
	text.transform.GetChild(0).GetComponent.<Text>().text = totalScore + "";

}

function Update () {
	Debug.Log("this: " + thisScore + " total: " + totalScore);
	if(Time.timeScale == 0) return;
	if (count == 10) {
		if(GameObject.Find("X-wing")) thisScore ++;
		
	
		text.transform.GetChild(0).GetComponent.<Text>().text = totalScore + thisScore + "";
		count = 0;
	} else count++;
}