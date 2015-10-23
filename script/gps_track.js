var latitud:float;
var longitud:float;
private var  gps : boolean ;
var windowRect : Rect; 
 var guiText: GUIText;
var stringToEdit : String ;



function Start () {
windowRect =  Rect (40, 20, 400, 300);

Screen.sleepTimeout = SleepTimeout.NeverSleep;

if (!Input.location.isEnabledByUser)
{
	gps=false;
	return;	
}


Input.location.Start (10.0f,1.0f);
var maxWait : int = 40;
while (Input.location.status== LocationServiceStatus.Initializing && maxWait > 0) 
{
yield WaitForSeconds (1);
maxWait--;
}

if (maxWait < 1) 
{
print ("Timed out");
return;
}


if (Input.location.status == LocationServiceStatus.Failed) 
{
print ("Unable to determine device location");
return;
}
}
function Update () {

if (Input.location.isEnabledByUser)
{	
	gps=true;
}
else 
if (!Input.location.isEnabledByUser)
{
	gps=false;	
}

if (Input.GetKeyDown(KeyCode.Escape)) 
{
 Input.location.Stop (); Application.Quit(); 
 }
var lat:float;
var lon:float; 

var li : LocationInfo;

li= Input.location.lastData;

lat = li.latitude;
lon = li.longitude;

latitud=lat;
longitud=lon;
}


function OnGUI ()
{
	if(gps==false)
	{
		windowRect = GUI.Window (0, windowRect, DoMyWindow, "Error");
	}
	else if (gps== true)
	{
		GUI.Button (new Rect (10,10,150,60), "LAT= "+ latitud +"\nLON= " + longitud);
		GUI.Button (new Rect (10,70,150,60), "STAT= " +Input.location.status+"\nON= " + Input.location.isEnabledByUser);
	}
}

	function DoMyWindow (windowID : int) 
	{
	 	GUI.Label (Rect (100, 100, 200, 100), " Enable gps to continue.");
		GUI.Button (Rect (270,250,100,20), "Ok");
			
	}
