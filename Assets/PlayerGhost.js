#pragma strict

public var ghostRecord : Array = new Array(); //will store the recorded movements from the player
var playingBack : boolean = false; //whether the ghost is currently in motion
public var startingPlayback : boolean = false; //a trigger set off from the PlayerMovement.js script
var ghostRoundCounter : int = 0; //counts which frame the ghost should load from the recorded movements

function Start () {

}

function Update () {

	if (startingPlayback) { startPlayback(); } //triggered from the PlayerMovement.js script

	if (playingBack && ghostRoundCounter < ghostRecord.length) { //move the ghost around as long as it hasn't reached the end of it's recorded movements
    	transform.position = ghostRecord[ghostRoundCounter]; //set the position accordingly
	   	ghostRoundCounter++;
	}
}

public function startPlayback() { //start moving the ghost around
	ghostRoundCounter = 0;
	playingBack = true;
	startingPlayback=false;
	Debug.Log("ghost is starting playback");
	Debug.Log(ghostRecord);
}