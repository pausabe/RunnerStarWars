#pragma strict

var movie : MovieTexture;

function Start () {
	GetComponent.<RawImage>().texture = movie;
	movie.Play();
	yield WaitForSeconds(38);
	Application.LoadLevel(1);
}

function Update () {

}