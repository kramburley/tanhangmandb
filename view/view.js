//output time text
var p_score = document.createElement("P");
var txt_score = document.createTextNode(remaining_time);
p_score.appendChild(txt_score);
document.getElementById("timer_div").appendChild(p_score);

//output time
var p_score = document.createElement("P");
document.getElementById("remaining_time").innerHTML = timer;
activate_timer();
document.getElementById("remaining_time").style.fontSize = "50px";

//output score text
var p_score = document.createElement("P");
var txt_score = document.createTextNode(remaining_tries);
p_score.appendChild(txt_score);
document.getElementById("player_score").appendChild(p_score);

//output player's current life count
document.getElementById("score").innerHTML = lives;
document.getElementById("score").style.fontSize = "50px";

//output score text
var p_score = document.createElement("P");
var txt_score = document.createTextNode(current_score);
p_score.appendChild(txt_score);
document.getElementById("player_points").appendChild(p_score);

//display user score
document.getElementById("points").innerHTML = defaultScore;
document.getElementById("points").style.fontSize = "50px";

//creates the word, definition, letter buttons
generateWord();