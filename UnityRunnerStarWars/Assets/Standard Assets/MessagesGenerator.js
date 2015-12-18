#pragma strict

private var messagesTime1 = [[1.0, 2.0], [3.2,4],[7.4,4],[10.5,1.5]]; // [display time, duration]
private var messages1 = ["Red one, this is the rebel base", "Your first mission is to get out of this planet, its maps are on your right", "You must arrive to the launching point at 0.3q", "Good luck"];
private var messagesTime2 = [[1.0, 3.0], [5.2,4],[10.0,3]]; // [display time, duration]
private var messages2 = ["Congratulations! Now you have to reach the Death Star", "We must travel inside the asteroid belt, otherwise we could be discovered", "You are our last hope Red one, stay strong!"];
private var messagesTime3 = [[0.0, 3.0]]; // [display time, duration]
private var messages3 = ["You're in! Blow the whole thing up!"];
private var messagesTime = [[0.0]];
private var time : float;

var level : int;

private var canvas : Canvas;

function Start () {
	time = Time.realtimeSinceStartup;
	canvas = GetComponent.<Canvas>();
	canvas.enabled = false;
	if (level == 1)	messagesTime = messagesTime1;
	else if (level == 2 && !MapGenerator.checkpointReached) messagesTime = messagesTime2;
	else if (level == 3) messagesTime = messagesTime3;

}

function Update () {
	if (level == 1)	DisplayMessages(messages1);
	else if (level == 2) DisplayMessages(messages2);
	else if (level == 3) DisplayMessages(messages3);

}

function DisplayMessages(messages : String[]) {
	if (messagesTime.Length != messages.Length) return;
	for (var i = 0; i < messages.Length; i++) {
		if (Time.realtimeSinceStartup - time > messagesTime[i][0]) {
			canvas.enabled = true;
			AnimateText(messages[i]);
			messagesTime[i][0] = Mathf.Infinity;
			yield WaitForSeconds(messagesTime[i][1]);
			canvas.enabled = false;
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

function OnTriggerEnter(collider: Collider) {
	if (collider.tag != "Player") return;
	if (level == 1) {
		canvas.enabled = true;
		AnimateText("Seems these natives aren't very happy to have us here");
		yield WaitForSeconds(4);
		canvas.enabled = false;
	} else if (level == 2) {
		time = Time.realtimeSinceStartup;
		messagesTime = [[1.0, 6], [8,1.5], [10.0,3], [15.0,4],[20.0,4], [27.0,4]];
		var tfighters = 4;
		if (DifficultyHolder.difficulty == 2) tfighters = 5;
		else if (DifficultyHolder.difficulty == 3) tfighters = 6;
		messages2 = ["Perfect! We are getting closer, you will arrive to the space launcher shortly", "Wait...", "What are those dots?", "Red one, you have " + tfighters + " Tie-Fighters onto you", "Don't stand still! Move!", "Let them pass you and shoot them"];
	}

}