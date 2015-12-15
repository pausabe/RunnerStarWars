using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class menuComportamentMenuPause : MonoBehaviour {

	private Canvas menu;
	//public Button restartText;
	//public Button exitText;

	// Use this for initialization
	void Start () {
		//gameObject.SetActive(false);

		menu = this.GetComponent<Canvas> ();
		//restartText = restartText.GetComponent<Button> ();
		//exitText = exitText.GetComponent<Button> ();
		//menu.enabled = false;

	}
	

	public void ExitPress(){
		//menu.enabled = true;
		//restartText.enabled = false;
		//exitText.enabled = false;
	}

	public void NoPress(){
		//menu.enabled = false;
		//restartText.enabled = true;
		//exitText.enabled = true;
	}

	public void resumeLevel(){
		//gameObject.SetActive(false);
		Time.timeScale = 1;
		menu.enabled = false;
	}

	public void StartLevel(){
		Application.LoadLevel (0);
	}

	public void restartLevel(){
		Application.LoadLevel (1);
	}

	public void ExitGame(){
		Application.Quit ();
	}
}
