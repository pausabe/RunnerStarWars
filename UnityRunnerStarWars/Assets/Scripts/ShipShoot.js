#pragma strict

//var line: LineRenderer;
var ShotSpeed : float; 
var line : GameObject;

var allGunsShoot = false;

public var guns : GameObject[];

var gunCount : int = 0;

var aimsAtShip = false;

private var ship : GameObject;

function Start () {
	ship = GameObject.Find("X-wing");
}

function FireLaser() {
		if (allGunsShoot) {
			for (var i = 0; i < guns.length; i++) {
				FireGun(guns[i]);
			}
		} else {
			FireGun(guns[gunCount]);
			gunCount++;
			if (gunCount == guns.Length) gunCount = 0;
		}

}

function FireGun(gun : GameObject) {
	//line.enabled = true;

	var shot = Instantiate(line, gun.transform.position, Quaternion.identity);

	var lineRenderer = shot.GetComponent.<LineRenderer>();
	var forward = gun.transform.forward;

	if (aimsAtShip) forward = ship.transform.position - gun.transform.position;
	var ray = new Ray(gun.transform.position, forward);
	//lineRenderer.SetPosition(0, ray.origin);
	//lineRenderer.SetPosition(1, ray.GetPoint(100));
  //           Vector3 newRotation = new Vector3(target.transform.eulerAngles.x, target.transform.eulerAngles.y, target.transform.eulerAngles.z);
//         this.transform.eulerAngles = newRotation;

    lineRenderer.transform.eulerAngles = gun.transform.eulerAngles;
    
    var rb = shot.GetComponent.<Rigidbody>();
    rb.velocity = ShotSpeed*forward;
}