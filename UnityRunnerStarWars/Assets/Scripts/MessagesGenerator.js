#pragma strict

var messagesTime = [4.0];
var messages = ["hellomessage"];
private var time : float;

private var canvas : Canvas;

function Start () {
	time = Time.realtimeSinceStartup;
	canvas = GetComponent.<Canvas>();
	canvas.enabled = false;
}

function Update () {
	for (var i = 0; i < messages.Length; i++) {
		if (Time.realtimeSinceStartup - time > messagesTime[i]) {
			canvas.enabled = true;
			AnimateText(messages[i]);
			messagesTime[i] = Mathf.Infinity;
		}
	}
}

function AnimateText(strComplete : String){
    var i: int = 0;
    var str = "";
    while( i < strComplete.Length ){
        str += strComplete[i++];
        this.transform.GetChild(0).transform.GetChild(0).GetComponent.<Text>().text = str;
        yield WaitForSeconds(0.02);
    }
}
