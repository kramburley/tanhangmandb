//onclick function of guesses
function guess(char) {  
    //if correct answer
    if (wordtoguess.includes(char)) {
        for(i=0; i < size; i++) {
            let temp = arr_letter_boxes[i];

            let tester = "g" + char + i;
            if (temp == tester) {
                correct(char, temp);

                letters_to_guess--;
            }
        }
        //document.getElementById("points").innerHTML = defaultScore;
    } else {
        lives--;
        document.getElementById("score").innerHTML = lives;
       
        if (lives == 0) {
           showLeaderboard();
        }
    }

    //disable button after guessing
    document.getElementById(char).disabled = true;
    document.getElementById(char).style.backgroundColor = "white";
    document.getElementById(char).style.color = "grey";

    if (letters_to_guess == 0) {
        defaultScore++;
        document.getElementById("points").innerHTML = defaultScore;
        generateWord();
    }

}
