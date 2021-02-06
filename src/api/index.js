var socket = new WebSocket("ws://localhost:8080/ws");

let connect = (cb, server_status) => {
  console.log("Attempting Connection ...");

  socket.onopen = () => {
    console.log("Successfully Connected");
    server_status(true);
  };

  socket.onmessage = msg => {
    console.log(msg);
    cb(msg);
  };

  socket.onclose = event => {
    console.log("Socket Closed Connection: ", event);
  };

  socket.onerror = error => {
    console.log("Socket Error: ", error);
    server_status(false);
  };
}

let sendMsg = msg =>{
  console.log("sending msg:", msg);
  socket.send(msg);
};

let sendMove = data =>{
  console.log(data);
  //send to socket
}

export {connect, sendMsg, sendMove};
