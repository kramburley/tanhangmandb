var user_JSON = {}
var current_user_name = ""
var current_user_date = ""
var current_user_score
var lives = 7;
var defaultScore = 0;
var timer = 120;
var randomWord
var wordtoguess_str
var wordtoguess
var size
var word_def
var arr_letter_boxes
var letters_to_guess
var words_selected = []
var player_count

//saving ranking to firebase
function storeJSON() {
    //delete database
    firebase.database().ref().remove();
    
    //store new data in database
    firebase.database().ref().set({
        user_JSON: user_JSON
    });
}

var firebaseJSON = firebase.database().ref().child("user_JSON");

firebaseJSON.on('value', (snapshot)=> {
    if (snapshot.val() != null) {
        user_JSON = snapshot.val();
        player_count = snapshot.numChildren()
    } else {
        player_count = 0;
    }
    //console.log(player_count + "   firebasejson")
});



//available words
var words = [
    ['formal','Relating to or involving outward form or structure, often in contrast to content or meaning.'],
    ['bumper','A protective device for absorbing shocks or impeding contact.'],
    ['degree','One of a series of steps in a process, course, or progression; a stage'],
    ['online','Connected to a central computer or to a computer network'],
    ['rarely','Not often; infrequently'],
    ['planet','A celestial body that orbits the sun'],
    ['yellow','The hue of that portion of the visible spectrum lying between orange and green'],
    ['picked','Chosen by careful selection'],
    ['fellow','A person of equal rank, position, or background; a peer.'],
    ['random','Having no specific pattern, purpose, or objective'],
    ['electricity','is the set of physical phenomena associated with the presence and motion of electric charge.'],
    ['tattoo','a form of body modification where a design is made by inserting ink'],
    ['mark','my name'],
]

function correct(letter, id) {
    document.getElementById(id).innerHTML = letter;
}

function generateWord() {
    //clear divs for a new word
    document.getElementById("definition").innerHTML = ""
    document.getElementById("word_guess").innerHTML = ""
    document.getElementById("button_container").innerHTML = ""

    //randomize word to guess
    randomWord = Math.floor(Math.random() * words.length);
    while (words_selected.includes(randomWord)) {
        randomWord = Math.floor(Math.random() * words.length);
    }

    words_selected.push(randomWord)

    wordtoguess_str = words[randomWord][0];
    wordtoguess = wordtoguess_str.split('');
    size = wordtoguess.length;
    letters_to_guess = size;
    word_def = words[randomWord][1].toString();

    //output definition of word to guess
    var p_def = document.createElement("P");
    var txt_def = document.createTextNode(word_def);
    p_def.appendChild(txt_def);
    document.getElementById("definition").appendChild(p_def);

    //output word to guess as disabled boxes
    arr_letter_boxes = new Array(size);
    for (i = 0; i < size; i++) {
        let letter_boxes = document.createElement("BUTTON");
        let txt_letter_boxes = document.createTextNode("");
        letter_boxes.appendChild(txt_letter_boxes);

        letter_boxes.style.width = '80px';
        letter_boxes.style.height = '80px';
        letter_boxes.style.textAlign = 'center';
        letter_boxes.style.fontSize = '50px';
        letter_boxes.style.margin = '1px';

        letter_boxes.className = "btn btn-secondary"
        letter_boxes.disabled = 'true';

        letter_boxes.id = "g" + wordtoguess[i] + i;
        arr_letter_boxes[i] = letter_boxes.id;
        
        document.getElementById("word_guess").appendChild(letter_boxes);
    }

    //create all letter buttons
    for (let i = 0; i < 26; i++ ) {
        let btn = document.createElement("BUTTON");
        
        btn.className = "btn btn-success"
        btn.style.width = '80px';
        btn.style.height = '80px';
        btn.style.textAlign = 'center';
        btn.style.fontSize = '30px'
        btn.style.margin = '1px';

        //converts integer to a character in the dictionary using ascii code
        let char = (i+10).toString(36);

        btn.id = char;
        let btn_txt = document.createTextNode(char);
        btn.appendChild(btn_txt);
        btn.onclick = function() {guess(this.id);};

        document.getElementById("button_container").appendChild(btn);
    }    

}


//countdown timer... once timer expires, display player score and leaderboard
function activate_timer() {
    var countdown_timer = window.setInterval(function() {
        timer--;
        document.getElementById("remaining_time").innerHTML = timer;

        if (timer == 0 ) {
            clearInterval(countdown_timer);
            showLeaderboard();
        }
            
    },1000);

}

//process ranking and displaying leaderboard
function showLeaderboard() {
    //retrieving current user name
    current_user_name = localStorage.getItem("currentUser")
    //clearing local storage
    localStorage.clear();

    current_user_score = defaultScore;

    //save username and score of current player to firebase database and store it
    user_JSON[player_count] = {username: current_user_name, score: current_user_score}
    storeJSON();

    //create the leaderboard list
    let leaderboard = document.createElement("p")
    let lb_txt = document.createTextNode(top_10)
    leaderboard.appendChild(lb_txt);
    document.getElementById("body").innerHTML = ""
    document.getElementById("body").style.fontSize = "60px"
    document.getElementById("body").appendChild(leaderboard)

    let top_1_index = 0
    let top_2_index = 1
    let top_3_index = 2
    let top_4_index = 3
    let top_5_index = 4
    
    //check player scores and rank to 5 ranks
    for (let i = 1; i < player_count; i++) {
        if(user_JSON[i].score != 0) {
            if (user_JSON[i].score > user_JSON[top_1_index].score) {
                /*topscore[4] = topscore[3];
                topscore[3] = topscore[2];
                topscore[2] = topscore[1];
                topscore[1] = topscore[0];
                topscore[0] = i;*/
                top_5_index = top_4_index;
                top_4_index = top_3_index;
                top_3_index = top_2_index;
                top_2_index = top_1_index;
                top_1_index = i
            } else if (user_JSON[i].score > user_JSON[top_2_index].score) {
                top_5_index = top_4_index;
                top_4_index = top_3_index;
                top_3_index = top_2_index;
                top_2_index = i;
            } else if (user_JSON[i].score > user_JSON[top_3_index].score) {
                top_5_index = top_4_index;
                top_4_index = top_3_index;
                top_3_index = i;
            } else if (user_JSON[i].score > user_JSON[top_4_index].score) {
                top_5_index = top_4_index;
                top_4_index = i;
            } else if (user_JSON[i].score > user_JSON[top_5_index].score) {
                top_5_index = i;
            }
        }
        
    }
    
    let topscore = [top_1_index,top_2_index,top_3_index, top_4_index,top_5_index]

    if (topscore.length > player_count) {
        range = player_count
    } else {
        range = topscore.length
    }
    for (let i = 0; i < range; i++) {
        let player_info = document.createElement("p")
        let player_info_txt = document.createTextNode(user_JSON[topscore[i]].username + "  " + user_JSON[topscore[i]].score)
        player_info.appendChild(player_info_txt)
        player_info.style.color = "BLUE"
        document.getElementById("body").appendChild(player_info)
    }
}