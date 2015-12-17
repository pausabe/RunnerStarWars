#pragma strict

var movie1 : MovieTexture;
var movie2 : MovieTexture;
var nextLevel : int;
var first : boolean = true;

function Start () {	
	GetComponent.<RawImage>().texture = movie1 as MovieTexture;
	
	movie1.Play();
}

function Update() {
	if(!movie1.isPlaying) {
		movie1.Stop();
		
		if(first){
			first = false;
			GetComponent.<RawImage>().texture = movie2 as MovieTexture;
			movie2.Play();
		}
		
		if(!first && !movie2.isPlaying){
			movie2.Stop();
			Application.LoadLevel(nextLevel);
		}
	}
}

