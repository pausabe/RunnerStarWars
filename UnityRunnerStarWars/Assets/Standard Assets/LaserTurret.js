﻿#pragma strict

var turret1 : Transform;
var turret2 : Transform;
var turret3 : Transform;
var turret4 : Transform;

var line : LineRenderer;

var timeOn : float;

var timeOff : float;

var delayStart : float;

var intermitent = false;

private var time : float;

private var particleEffect : ParticleSystem;

function Start () {
	var y = Mathf.Abs(turret1.position.y - turret3.position.y);
	
	var pos1 = Vector3(turret1.position.x, y/2+turret3.position.y, turret1.position.z);
	var pos2 = Vector3(turret2.position.x, y/2+turret3.position.y, turret2.position.z);
	
	line.SetPosition(0, pos1);
	line.SetPosition(1, pos2);
	line.SetWidth(y,y);
	
	particleEffect = transform.GetChild(2).GetComponent.<ParticleSystem>();// GetComponent.<ParticleSystem>();
	particleEffect.transform.position.y = y/2+turret3.position.y;
	//particleEffect.shape.	
	
	if (delayStart != 0) Delay();
	else time = Time.realtimeSinceStartup;
}

function Update () {
	if (intermitent) Show();
	else {
		line.enabled = true;
		particleEffect.enableEmission = true;
	}
}

function Delay() {
	line.enabled = false;
	particleEffect.enableEmission = false;
	yield WaitForSeconds(delayStart);
	line.enabled = true;
	particleEffect.enableEmission = true;
	time = Time.realtimeSinceStartup;
}

function Show() {
	if (line.enabled){
		if (Time.realtimeSinceStartup - time >= timeOn) {
			line.enabled = false;
			particleEffect.Clear();
			particleEffect.enableEmission = false;
			time = Time.realtimeSinceStartup;
		} 
	} else {
		if (Time.realtimeSinceStartup - time >= timeOff) {
			line.enabled = true;
			particleEffect.enableEmission = true;
			time = Time.realtimeSinceStartup;
		}
	}
}