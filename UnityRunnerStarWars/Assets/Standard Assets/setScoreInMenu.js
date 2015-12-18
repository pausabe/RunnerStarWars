 // UnityScript
 import UnityEngine.UI;

 function Update()
 {
	var score = GameObject.Find("Score").GetComponent.<scoreController> ().thisScore + scoreController.totalScore;
   	GetComponent.<Text>().text = "Score: " + score;
 }