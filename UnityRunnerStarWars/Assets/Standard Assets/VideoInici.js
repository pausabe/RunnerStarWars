#pragma strict

var movie : MovieTexture;
var nextLevel : int;

function Start () {	
	GetComponent(RectTransform).sizeDelta = new Vector2(Screen.width, Screen.height);
	GetComponent.<RawImage>().texture = movie as MovieTexture;
	movie.Play();
}

function Update() {
	if(!movie.isPlaying || Input.GetKeyDown(KeyCode.Space)) {
		movie.Stop();
		Application.LoadLevel(nextLevel);
	}
}

