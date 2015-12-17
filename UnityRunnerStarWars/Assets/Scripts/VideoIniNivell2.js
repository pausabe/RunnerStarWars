#pragma strict

var movie1 : MovieTexture;
var movie2 : MovieTexture;
var nextLevel : int;
var first : boolean = true;
var playingMov1 : boolean = true;

function Start () {	
	GetComponent(RectTransform).sizeDelta = new Vector2(Screen.width, Screen.height);
	GetComponent.<RawImage>().texture = movie1 as MovieTexture;
	
	movie1.Play();
}

function Update() {
	if(Input.GetKeyDown(KeyCode.Space)){
		if(playingMov1){
			movie1.Stop();
		}
		else{
			movie2.Stop();
		}
		
		Application.LoadLevel(nextLevel);
	}
	else {
		if(!movie1.isPlaying) {
			movie1.Stop();
			
			if(first){
				first = false;
				GetComponent.<RawImage>().texture = movie2 as MovieTexture;
				movie2.Play();
				playingMov1=false;
			}
			
			if(!first && !movie2.isPlaying){
				movie2.Stop();
				Application.LoadLevel(nextLevel);
			}
		}
	}
}

