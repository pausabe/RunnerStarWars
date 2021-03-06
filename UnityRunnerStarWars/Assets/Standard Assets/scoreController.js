﻿#pragma strict

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
	var maxCount = 16;
	if (DifficultyHolder.difficulty == 2) maxCount = 8;
	else if (DifficultyHolder.difficulty == 3) maxCount = 4;
	if (count == maxCount) {
		if(GameObject.Find("X-wing")) thisScore ++;
		
	
		text.transform.GetChild(0).GetComponent.<Text>().text = totalScore + thisScore + "";
		count = 0;
	} else count++;
}