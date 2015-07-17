#pragma strict 

 public var speed : float = 1.0;
 public var jumpForce : float = 100;
 public var jumpDelay : float = 40;
 public var ghostPrefab : GameObject; 
 
 var recording : boolean = true;
 var startPosition : Vector3 = new Vector3(); //this will be where all the ghosts start

 
 var jumpCounter : int = 0;
 /*public var top_left : Transform;
 public var bottom_right : Transform;
 public var ground_layers : LayerMask;
 var grounded : boolean;*/
 
 var roundCounter : int = 0;
 var roundNumber : int = 0;
 
 var playerRecord : Array = new Array();
 var ghosts = new GameObject[99]; //this will contain the list of ghost objects
 
//playerRecord = new Vector2[,];
 
 
 function Update() {
    /* grounded = Physics2D.OverlapArea(top_left.GetComponent.<Transfposition, bottom_right.position, ground_layers);   */
    
    if (Input.GetKeyDown("space")) {
    	
    	if (recording) { 
    		stopRecording();
		}
		else {
			startRecording();
		}
    }
    
    if (recording) {
    
	    var move = Vector3(Input.GetAxis("Horizontal"), 0);
	    transform.position += move * speed * Time.deltaTime; 
	    
	    if (Input.GetKeyDown("up") && jumpCounter>jumpDelay) {
		    GetComponent.<Rigidbody2D>().AddForce (new Vector2(0, jumpForce));
		    jumpCounter=0;
	    }
	    
	    jumpCounter++;
	 //   Debug.Log(jumpCounter);
	    
	    //store the position of the player
	    playerRecord[roundCounter] = transform.position;
	    roundCounter++;
	    
    }
    
    else {
    	//transform.position = playerRecord[roundCounter];
    	//roundCounter++;
    	
	   // if (roundCounter >= playerRecord.length) {
		//    startRecording(); 
	    //}
	
	
    }
 }
 
 function startRecording() {
	 Debug.Log("start recording");
 	 
	 recording=true;
 	
 	
 }
 
 function stopRecording() {
 
	Debug.Log("stop recording");
 	recording = false;
 	
 	 //if this is after round 1, let's spawn a ghost based on the previous round..
 	 //if (roundNumber>0) {
 	 spawnGhost();
 	 
  	 roundNumber++;
 	 
 	 startGhosts();
 	 //}
 	 
	 playerRecord.Clear();
 	
   	roundCounter=0;
 	
 }
 
 function spawnGhost() {
 	//instantiate a new ghost object
 	var newGhost:GameObject = Instantiate(ghostPrefab, startPosition, Quaternion.identity);
 	
 	//assign the record of the round the player just played to this ghost
 	newGhost.GetComponent(PlayerGhost).ghostRecord = playerRecord.slice(0, playerRecord.length);	
 	
 	
 //	Debug.Log(ghosts);
 	ghosts[roundNumber] = newGhost;
 }
 
 function startGhosts() {
 	//send all the ghosts back to their starting position
 	//set them all to be playing
 	for (var i = 0; i<roundNumber; i++) {
 		Debug.Log("ghost" + i + " is starting playback");
 		ghosts[i].GetComponent(PlayerGhost).startingPlayback = true;
 	}
 }
 
 
 function Start() {
	 startPosition = transform.position;
 }
 
 /*
 function startRound() {
	playerRecord[roundNumber] = Array;
 }
 
 */
 /*
 #pragma strict 

 public var speed : float = 1.0;
 public var jumpSpeed : float = 1;
 var gravity : float = 20.0;
 
 function Update() {
	 var controller : CharacterController = GetComponent.<CharacterController>();
     var move = Vector3(Input.GetAxis("Horizontal"), 0);
     controller.SimpleMove(move * speed * Time.deltaTime);   
     
  if (controller.isGrounded && Input.GetKey ("up")) {
  		var newMove = Vector3.up * jumpSpeed * Time.deltaTime;
  		newMove.y -= gravity * Time.deltaTime;
		controller.Move(newMove);
	}
		 
 }*/