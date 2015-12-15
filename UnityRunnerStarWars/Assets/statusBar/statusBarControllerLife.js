#pragma strict

private var xwing : GameObject;
private var lastLife : float;
private var maxLife : float;
private var initialX : float;

function Start () {
	xwing = GameObject.Find("X-wing");
	
	maxLife = 100;
	lastLife = maxLife;
	initialX  = transform.position.x;
}

function Update () {
	var life = xwing.GetComponent.<LifeController>().life;
	
	if(life != lastLife){
		lastLife = life;
		
		var scaleX = life/maxLife;
		var posX = (initialX*life)/maxLife;
		
		transform.localScale.x = scaleX;
		transform.position.x = posX;
		
		Debug.Log("life: " + life);
		Debug.Log("posX: " + posX);
		Debug.Log("scaleX: " + scaleX);
	}
	
}