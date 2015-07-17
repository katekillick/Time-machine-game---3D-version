#pragma strict

function Start () {

}

function Update () {

}

function OnCollisionEnter (col : Collision)
{
	var colObject = col.gameObject;
    if(colObject.name == "Player")
    {
    	Debug.Log("YOU WIN!!!!!");
    	colObject.GetComponent.<PlayerMovement>().resetGame();
      //  Destroy(col.gameObject);
    }
}