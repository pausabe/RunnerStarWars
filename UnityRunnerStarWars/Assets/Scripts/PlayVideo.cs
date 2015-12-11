using UnityEngine;
using System.Collections;
using UnityEngine.UI;


public class PlayVideo : MonoBehaviour {
	public MovieTexture movie;
	//public AudioSource audio;

	// Use this for initialization
	void Start () {
		GetComponent<RawImage>().texture = movie as MovieTexture;
		//audio = GetComponent<AudioSource> ();
		movie.Play();

	}
	
	// Update is called once per frame
	void Update () {
		/*if (Input.GetKeyDown(KeyCode.Space) && movie.isPlaying) {
			movie.Pause ();
		}
		else if(Input.GetKeyDown(KeyCode.Space) && !movie.isPlaying){
			movie.Play ();
		}*/
	}
}
