#pragma strict

var DeathMenu : Canvas;

var PauseMenu : Canvas;

function Start () {
	DeathMenu.enabled = false;
	PauseMenu.enabled = false;
}

function Update () {
	if (Input.GetKeyDown(KeyCode.Escape)) {
		if (PauseMenu.enabled) {
			Time.timeScale = 1;
			PauseMenu.enabled = false;
		} else {
			Time.timeScale = 0;
			PauseMenu.enabled = true;
		}
	}
	
	if (!GameObject.Find("X-wing")) {
		DeathMenu.enabled = true;
	}
}