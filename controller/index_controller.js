
//onclick function of login button
//gets user typed name and use that as player name
login_button.addEventListener("click", function(){
    if (document.getElementById("input_username").value == "")
    {
        console.log("false")
        //output a message requiring user to fill text input
    } else {
        //stores username for later use
        localStorage.setItem("currentUser",document.getElementById("input_username").value);
        //direct to another page
        location.href = "Tan_hangman.html"
    }
});