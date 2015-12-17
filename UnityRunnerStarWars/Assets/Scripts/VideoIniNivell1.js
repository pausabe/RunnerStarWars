#pragma strict

var movie : MovieTexture;
var nextLevel : int;

function Start () {	
	GetComponent.<RawImage>().texture = movie as MovieTexture;
	movie.Play();
}

function Update() {
	if(!movie.isPlaying) {
		movie.Stop();
		Application.LoadLevel(nextLevel);
	}
}

