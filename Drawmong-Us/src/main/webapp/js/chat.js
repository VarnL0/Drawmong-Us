/** A class that represents a websocket client. It connects to the server with a username, prints all received
 * messages in the log field and can send the content of the message field to the server */
class ChatClient {
    /** connection */
    webSocket;

    /** Connects to the server, save the connexion and listen for the messages send by the server in JSON, in
     * order to print them in the log field
     * */
    connect() {
        //let username = document.getElementById("username").value;
        let username = getCookie('pseudo');
        let host = document.location.host;
        let pathname = document.location.pathname.split("/");
        console.log(username);
        console.log(pathname);
        // connect using the same base URL as the current document location
        this.webSocket = new WebSocket("ws://" + host + "/" + pathname[1] + "/paint/" + username);
        // Listen to the messages from the server
        this.webSocket.onmessage = (event) => {
            // Print the message on the browser console
                //console.log(event.data);
            // Append the message to the log field
            let message = JSON.parse(event.data);
            if (message.type == "img") {
                document.getElementById("canvasimg").src = message.content;
            } else {
                let log = document.getElementById("log");
                let message = JSON.parse(event.data);
                log.innerHTML += message.from + " : " + message.content + "\n";

            }
           };
    }

    /** Send the content of the message field to the server, in JSON */
    send() {
        let json = JSON.stringify({
            "content": document.getElementById("msg").value
        });
        this.webSocket.send(json);
    }

    sendimg() {
        let json = JSON.stringify( {
            "content": document.getElementById("canvasimg").src,
            "type": "img"
        })
        this.webSocket.send(json);
    }
}

function getCookie(name){
    if(document.cookie.length == 0)
        return null;

    var regSepCookie = new RegExp('(; )', 'g');
    var cookies = document.cookie.split(regSepCookie);

    for(var i = 0; i < cookies.length; i++){
        var regInfo = new RegExp('=', 'g');
        var infos = cookies[i].split(regInfo);
        if(infos[0] == name){
            return unescape(infos[1]);
        }
    }
    return null;
}