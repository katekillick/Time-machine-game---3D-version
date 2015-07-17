#pragma strict 

 public var speed : float = 1.0;
 public var jumpForce : float = 100;
 public var jumpDelay : float = 40;
 public var ghostPrefab : GameObject; 
 
 var recording : boolean = true; //decides whether we are recording player movements right now
 var startPosition : Vector3 = new Vector3(); //where all the ghosts start

 
 var jumpCounter : int = 0; //counts how long the player is in the air
 var roundNumber : int = 0; //counts which "round" we are on - ie how many times the player has recorded movements and how many ghosts we therefore have
 var roundCounter : int = 0; //counts the frames so far in this "round"
 
 var playerRecord : Array = new Array(); //will store the player's movements each round
 var ghosts = new GameObject[99]; //will contain the list of ghost objects
 
 
 function Update() {
 
    if (Input.GetKeyDown("a")) { //the input key for starting/ending recording the player movement
    	
    	if (recording) { 
    		stopRecording();
		}
		else {
			startRecording();
		}
    }
    
    if (recording) { //if we are in the state of recording player movements...
    
    	//let the player move around
	    var move = Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));
	    transform.position += move * speed * Time.deltaTime; 
	    
	    //let the player jump - v hacky right now!
	    if (Input.GetKeyDown("space") && jumpCounter>jumpDelay) {
		    GetComponent.<Rigidbody2D>().AddForce (new Vector2(0, jumpForce));
		    jumpCounter=0;
	    }
	    
	    jumpCounter++; //crappy jump hack
	    
	    //store the position of the player
	    playerRecord[roundCounter] = transform.position;
	    roundCounter++;
	    
    }
    
    else { //nothing here for now...
	
    }
 }
 
 function startRecording() { //start recording player movements
	 Debug.Log("start recording");
	 recording=true;
 }
 
 function stopRecording() { //stop recording player movements and start ghosts playback
 
	Debug.Log("stop recording");
 	recording = false;


 	 spawnGhost(); //spawn a new ghost based on the player movements we've been recording
  	 roundNumber++; //increase which round we are on
 	 startGhosts(); //set the ghosts in motion
 	 
	 playerRecord.Clear(); //clear the record of the player's movements ready for the next round
 	
   	roundCounter=0;
 	
 }
 
 function spawnGhost() { //spawns a new ghost at the start of a round
 	//instantiate a new ghost object
 	var newGhost:GameObject = Instantiate(ghostPrefab, startPosition, Quaternion.identity);
 	
 	//assign the record of the round the player just played to this ghost
 	newGhost.GetComponent(PlayerGhost).ghostRecord = playerRecord.slice(0, playerRecord.length);	
 	
    //Debug.Log(ghosts);
 	ghosts[roundNumber] = newGhost; //add the new ghost into the ghost array
 }
 
 function startGhosts() { //sets all the ghosts in motion
 
 	for (var i = 0; i<roundNumber; i++) { //loop through the ghosts
 		Debug.Log("ghost" + i + " is starting playback");
 		ghosts[i].GetComponent(PlayerGhost).startingPlayback = true; //this sets off a function in the PlayerGhost.js script
 	}
 }
 
 
 function Start() {
	 startPosition = transform.position; //record the starting position for the rest of the game
 }
 