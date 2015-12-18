using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class menuComportament : MonoBehaviour {

	public Canvas quitMenu;
	public Button startText;
	public Button exitText;
	public Text noobText;
	public Text hardText;
	public Text crazyText;

	public GameObject difficultyHolder;

	// Use this for initialization
	void Start () {
		quitMenu = quitMenu.GetComponent<Canvas> ();
		startText = startText.GetComponent<Button> ();
		exitText = exitText.GetComponent<Button> ();
		noobText = noobText.GetComponent<Text> ();
		hardText = hardText.GetComponent<Text> ();
		crazyText = crazyText.GetComponent<Text> ();

		hard (); //default
		quitMenu.enabled = false;

	}

	public void ExitPress(){
		quitMenu.enabled = true;
		startText.enabled = false;
		exitText.enabled = false;
	}

	public void NoPress(){
		quitMenu.enabled = false;
		startText.enabled = true;
		exitText.enabled = true;
	}

	public void StartLevel(){
		Application.LoadLevel (1);
	}

	public void ExitGame(){
		Application.Quit();
	}


	//faltaria qe quan cliqes canvia el maxscore segons la dificultat
	public void noob(){
		noobText.text = ">noob";
		hardText.text = "hard";
		crazyText.text = "crazy";

		DifficultyHolder.difficulty = 1;
	}

	public void hard(){
		noobText.text = "noob";
		hardText.text = ">hard";
		crazyText.text = "crazy";
		DifficultyHolder.difficulty = 2;

	}

	public void crazy(){
		noobText.text = "noob";
		hardText.text = "hard";
		crazyText.text = ">crazy";
		DifficultyHolder.difficulty = 3;

	}
}
