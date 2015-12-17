#pragma strict

var movie : MovieTexture;
var nextLevel : int;

function Start () {	
	GetComponent(RectTransform).sizeDelta = new Vector2(Screen.width, Screen.height);

	GetComponent.<RawImage>().texture = movie as MovieTexture;
	movie.Play();
}

function Update() {
	if(!movie.isPlaying) {
		movie.Stop();
		Application.LoadLevel(nextLevel);
	}
}

