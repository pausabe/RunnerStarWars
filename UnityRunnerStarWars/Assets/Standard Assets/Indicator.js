#pragma strict

var Ship : GameObject;

var Fighter : GameObject;

function Start () {
	Debug.Log("asdf");

}

function Update () {
	if (!Ship) Destroy(gameObject);
	var fighterpos = Fighter.transform.position;
	if (fighterpos.z - Ship.transform.position.z > 0) {
		fighterpos.z = fighterpos.z - Ship.transform.position.z;
		fighterpos.z = Ship.transform.position.z - fighterpos.z;
	}
	var ray = new Ray(Ship.transform.position, fighterpos - Ship.transform.position);
	
	var distance = Vector3.Distance(Fighter.transform.position, Ship.transform.position);
	
	var aux = Mathf.Clamp((50-distance)/50,0.0,50);
	
	var mida = Mathf.Lerp(0.03,0,distance/30);
	
	var line = GetComponent.<LineRenderer>();
	var point1 = ray.GetPoint(0.2);
	var point2 = ray.GetPoint(0.2+mida);
	var vector = point2-point1;
	if (vector.y > 0) {
		vector = Quaternion.Euler(90, 0, 0) * vector;
		point1 += vector*8;
	}
	else {
		vector = Quaternion.Euler(-90, 0, 0) * vector;

		point1 += vector*0.8;
	}
	
	point1.z = Ship.transform.position.z - 0.2;
	//vector.z = 0;
	//var v = Vector3.RotateTowards(point2-point1,Vector3(0,0,-1));
	line.SetWidth(mida,0);	
	line.SetPosition(0, point1);
	line.SetPosition(1, point1+vector);
	
	this.transform.position = point1;
	this.transform.LookAt(Fighter.transform.position);
}