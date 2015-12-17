#pragma strict

var movie1 : MovieTexture;
var movie2 : MovieTexture;
var nextLevel : int;
var first : boolean = true;

function Start () {	
	GetComponent.<RawImage>().texture = movie1 as MovieTexture;
	GetComponent.<RawImage>().texture = movie2 as MovieTexture;
	movie1.Play();
}

function Update() {
	if(!movie1.isPlaying) {
		Debug.Log("hi broh");
		
		movie1.Stop();
		
		if(first){
			first = false;
			Debug.Log("yeeah!");
			movie2.Play();
		}
		
		if(!first && !movie2.isPlaying){
			Debug.Log("jujuju!");
			movie2.Stop();
			Application.LoadLevel(nextLevel);
		}
	}
}

