#pragma strict

var AsteroidsPrefab : GameObject[];

var AsteroidsNumber : int;

var AsteroidsGenerationRate : int;

var ship : GameObject;

function Start () {
	for (var i = 0; i < AsteroidsNumber; i++) {
		var asteroid = Random.Range(0,2);
		
		var position = ship.transform.position + Vector3(Random.Range(-10,10), Random.Range(-10,10), Random.Range(0,2000));
		
		var scale = Random.Range(0, 1.8);
		
		var ast = Instantiate(AsteroidsPrefab[asteroid], position, Quaternion.identity);
		
		ast.transform.localScale += Vector3(scale,scale,scale);
		var force = Vector3(Random.Range(-2,2), Random.Range(-2,2), Random.Range(-3000,2000));
		ast.GetComponent.<Rigidbody>().AddForce(force);
		var torque = Vector3(Random.Range(-2,2), Random.Range(-2,2), Random.Range(-3,3));
		ast.GetComponent.<Rigidbody>().AddTorque(torque);

	}
}

function Update () {
/*
	var generate = Random.Range(0,1000);
	if (generate < AsteroidsGenerationRate) {
		
	}
*/	
}