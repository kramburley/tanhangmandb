//output welcome script
let p_welcome = document.createElement("P");
let txt_welcome = document.createTextNode(welcome_to_ninja_hangman);
p_welcome.style.fontSize = "70px"
p_welcome.appendChild(txt_welcome);
document.getElementById("welcome").appendChild(p_welcome);

//output welcome script
let p_instructions = document.createElement("P");
let txt_instructions = document.createTextNode(instructions);
p_instructions.style.fontSize = "30px"
p_instructions.appendChild(txt_instructions);
document.getElementById("instructions").appendChild(p_instructions);

//output welcome script
let input_username = document.createElement("INPUT");
input_username.id = "input_username"
input_username.setAttribute("type", "text");
document.getElementById("index_login").appendChild(input_username);
document.getElementById("input_username").placeholder = input_player_name_here
input_username.style.fontSize = "30px"
input_username.style.width = "500px"
input_username.style.height = "50px"
input_username.style.textAlign = "center"


let login_button = document.createElement("button")
let login_btn_name = document.createTextNode(start_quiz)

login_button.className = "btn btn-success"

login_button.appendChild(login_btn_name);
document.getElementById("index_login_btn").appendChild(login_button)

login_button.style.width = "200px"
login_button.style.height = "50px"

