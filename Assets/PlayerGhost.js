#pragma strict

public var ghostRecord : Array = new Array();
var playingBack : boolean = false;
public var startingPlayback : boolean = false;
var ghostRoundCounter : int = 0;

function Start () {

}

function Update () {

	if (startingPlayback) { startPlayback(); }

	if (playingBack && ghostRoundCounter < ghostRecord.length) {
    	transform.position = ghostRecord[ghostRoundCounter];
	   	ghostRoundCounter++;
	}
}

public function startPlayback() {
	ghostRoundCounter = 0;
	playingBack = true;
	startingPlayback=false;
	Debug.Log("ghost is starting playback");
	Debug.Log(ghostRecord);
}