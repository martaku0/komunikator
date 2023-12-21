var nick = "";
var randomColor = Math.floor(Math.random() * 16777215).toString(16);
var date_start = "";

//TODO
// dzialanie na wielu uzytkownikach


function start() {
    setNick();
}

function setNick() {
    while (nick == "" || nick == null) {
        nick = prompt("Podaj swój nick:");
    }

    if (nick != "" && nick != null) {
        loadAll();
    }
}

function loadAll() {

    $('#scrollbar1').tinyscrollbar();

    let d = new Date();
    date_start = d.getTime();


    let inp = document.getElementById("mess-input");
    let box = document.getElementById('main-window');
    document.querySelector("body").style.display = "flex";
    inp.value = "";
    box.innerHTML = '';

    let message = "";

    inp.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            message = inp.value;
            inp.value = '';

            if (message == "/nick") {
                tempNick = nick;
                nick = prompt("Podaj swój nick:");
                while (nick == "" || nick == null) {
                    nick = prompt("Podaj swój nick:");
                }
                if (nick == "" || nick == null) {
                    nick = tempNick;
                }
            } else if (message == "/color") {
                randomColor = Math.floor(Math.random() * 16777215).toString(16);

            } else if (message == "/quit") {
                location.reload()
            } else if (message != "") {
                send_mess(message);
            }
        }
    });

    get("php/reset.php");
    alp();
}

function send_mess(message_) {
    let formData = new FormData();
    formData.append('message', message_);
    formData.append('nick', nick);
    formData.append('color', randomColor);

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "php/mess.php", true);

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // console.log(this.responseText)
        }
    }
    xhttp.send(formData);

}

function create_p(nick_, message_, color_, date_, id_) {
    let box = document.getElementById('main-window');
    p = document.createElement('p');
    box.appendChild(p);
    p.innerHTML = "[" + date_.getHours().toString().padStart(2, '0') + ":" + date_.getMinutes().toString().padStart(2, '0') + `] <<span style='color: #${color_};'>@` + nick_ + "</span>> " + message_;
    p.id = id_;
    $(p).emoticonize();
    $('#scrollbar1').data().plugin_tinyscrollbar.update("bottom")
    box.scrollTop = box.scrollHeight;
}

function get(url) {

    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // console.log(this.responseText)
            if (this.responseText) {
                // let jsonAll = JSON.parse(this.responseText);
                // if (jsonAll.status != "null") {
                //     jsonAll.forEach(json => {
                //         if (!document.getElementById(json['time'])) {
                //             create_p(json['nick'], json['message'], json['color'], new Date(), json['time']);
                //         }
                //     });
                // }

                let json = JSON.parse(this.responseText);
                if (json.status != "null") {
                    create_p(json['nick'], json['message'], json['color'], new Date(), json['time']);
                }

            }
            alp();
        }
    }
    xhttp.send();
}

function alp() {
    get('php/alp.php')
}