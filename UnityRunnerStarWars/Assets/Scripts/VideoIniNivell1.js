#pragma strict

var movie : MovieTexture;
var nextLevel : int;

function Start () {
	GetComponent.<RawImage>().texture = movie;
	movie.Play();
	yield WaitForSeconds(movie.duration);
	Application.LoadLevel(nextLevel);
}

