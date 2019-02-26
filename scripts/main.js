document.onkeydown = typeGame;  //Call for typeGame() when a key is pressed
    
//An array to store alphabets
var moji = new Array("Ａ","Ｂ","Ｃ","Ｄ","Ｅ","Ｆ","Ｇ","Ｈ","Ｉ",
                     "Ｊ","Ｋ","Ｌ","Ｍ","Ｎ","Ｏ","Ｐ","Ｑ","Ｒ",
                     "Ｓ","Ｔ","Ｕ","Ｖ","Ｗ","Ｘ","Ｙ","Ｚ");

//An array to store keycodes
var kcode = new Array(65,66,67,68,69,70,71,72,73,
                      74,75,76,77,78,79,80,81,82,
                      83,84,85,86,87,88,89,90);

//An array to store random numbers fro 0-25
var rnd = new Array();


//global variables
var mondai = "";       //Store the alphabets in the problem
var cnt=0;             //Stores which alpha the user is at
var typStart,typEnd;   //Stores the time of starting and ending


//A function to generate 200 random numbers from 0-25 and store them in the array
function ransu()
{
  for ( var i = 0 ; i < 200 ; i++ )
  {
    rnd[i] = Math.floor( Math.random() * 26 );
  }
}

//A function to set the problem of the typing game
function gameSet()
{
  //Clears the count
  cnt=0;
  
  //Create a problem
  ransu();
  
  //Display the problem using a table, each cell has ID "word + number"
  mondai="<table class='Q'>";
  
  for ( var i = 0 ; i < 10 ; i++ )
  {
    mondai += "<tr>";
    
    for ( var j = 0 ; j < 20 ; j++ )
    {
      var idnum =i*20+j;
      mondai += "<td id='word"+idnum+"'>"+moji[ rnd[idnum] ]+"</td>";
    }
    
    mondai += "</tr>";
  }
  mondai += "</table>";
  
  //Display
  document.getElementById("waku").innerHTML = mondai;
}

//A function to receive the key inputs
function typeGame(evt)
{
  var kc;  //A variable to store the keycode inputs
  
  //Gets the key's keycode input
  if (document.all)
  {
    kc = event.keyCode;
  }
  else
  {
    kc = evt.which;
  }
  //Compares the keycode in the problem and the keycode input
  if (kc == kcode[ rnd[cnt] ])
  {
    //When getting it right
    //Store the time when the first character was inputted
    if (cnt==0)
    { 
      typStart = new Date();
    }
    
    //Change the color to gray of the character which has been typed
    var idName = "word"+cnt;
    document.getElementById(idName).style.color="#dddddd";

    cnt++; //increase the counter
    
    //Check if all of the characters were typed or not
    if ( cnt == 200)
    {
      //When done, store the end time
      typEnd = new Date();
      
      //Get the time in seconds how long the user took to complete
      var keika = typEnd - typStart;
      
      //Devide by 1000 to get seconds
      var sec = Math.floor( keika/1000 );
      
      //Get the milisecond from the remain
      var msec = keika % 1000;
      
      //Create a string which tells the user it's done
      var fin="GAME OVER　Complete Time："+sec+"seconds"+msec;
      
      //Dislay it's over
      document.getElementById("waku").innerHTML = fin;
    }
  }
}