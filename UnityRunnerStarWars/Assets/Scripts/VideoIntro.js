#pragma strict

var movie : MovieTexture;
var nextLevel : int;
var videoDuration : float;

function Start () {	
	GetComponent.<RawImage>().texture = movie as MovieTexture;
		
	Debug.Log(videoDuration);
	
	movie.Play();
	
	yield WaitForSeconds(videoDuration);
	Application.LoadLevel(nextLevel);
}

