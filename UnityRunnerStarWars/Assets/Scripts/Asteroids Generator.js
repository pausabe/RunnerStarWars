﻿#pragma strict

var AsteroidsPrefab : GameObject[];
var ObstaclesPrefab : GameObject[];

var ForceVortexLine : GameObject;

var ForceVortexLineNumber : int;

var AsteroidsNumber : int;

var ObstaclesNumber : int;

var ship : GameObject;

function Start () {
	for (var i = 0; i < AsteroidsNumber; i++) {
		var asteroid = Random.Range(0,AsteroidsPrefab.Length);
		
		var position = ship.transform.position + Vector3(Random.Range(-10,10), Random.Range(-10,10), Random.Range(100,2000));
		
		var scale = Random.Range(0, 1.8);
		
		var ast = Instantiate(AsteroidsPrefab[asteroid], position, Quaternion.identity);
		
		ast.transform.localScale += Vector3(scale,scale,scale);
		var force = Vector3(Random.Range(-500,500), Random.Range(-500,500), Random.Range(-300,200));
		ast.GetComponent.<Rigidbody>().AddForce(force);
		var torque = Vector3(Random.Range(-100,100), Random.Range(-100,100), Random.Range(-30,30));
		ast.GetComponent.<Rigidbody>().AddTorque(torque);

	}
	
	var obstacles = [[1, 300],[0,500],[1,600],[0,800],[1,870],[2,1000],[0,1200],[2, 1300],[1,1450], [2, 1550],[0,1700],[1,1770],[2,1840]]; // [obstacle,z]
			
	for (i = 0; i < obstacles.Length; i++) {
		//asteroid = Random.Range(0,ObstaclesPrefab.Length);
		
		position = Vector3(0,0, obstacles[i][1]);
		
		ast = Instantiate(ObstaclesPrefab[obstacles[i][0]], position, Quaternion.identity);
		
		force = Vector3(Random.Range(-2,2), Random.Range(-2,2), Random.Range(-3000,-2000));
		//	ast.GetComponent.<Rigidbody>().AddForce(force);
		//torque = Vector3(Random.Range(-2,2), Random.Range(-2,2), Random.Range(-3,3));
		//ast.GetComponent.<Rigidbody>().AddTorque(torque);

	}
	for (i = 0; i < ForceVortexLineNumber; i++) {
		position = ship.transform.position + Vector3(Random.Range(-6.5,6.5), Random.Range(-6.5,6.5), Random.Range(100,2000));
		
		//var scale = Random.Range(0, 1.8);
		
		Instantiate(ForceVortexLine, position, Quaternion.identity);
	}
}

function Update () {
/*
	var generate = Random.Range(0,1000);
	if (generate < AsteroidsGenerationRate) {
		
	}
*/	
}