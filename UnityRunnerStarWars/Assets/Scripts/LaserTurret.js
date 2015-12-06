#pragma strict

var turret1 : Transform;
var turret2 : Transform;

var line : LineRenderer;

function Start () {
	line.SetPosition(0, turret1.position);
	line.SetPosition(1, turret2.position);
}

function Update () {

}