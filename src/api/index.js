export const BACKEND_URL = "ws://localhost:8080"


let connect = (socket,cb, server_status) => {
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
    server_status(false);
  };

  socket.onerror = error => {
    console.log("Socket Error: ", error);
    server_status(false);
  };
}

let sendMsg = (socket,msg) =>{
  console.log("sending msg:", msg);
  socket.send(msg);
};

/**
socket: the websocket
qid = 1 RANKED QUEUE
qid = 2 UNRANKED QUEUE
pid = player id
**/
let joinQueue = (socket,qid,pid) => {
  console.log("registering player", pid, "in queue ", qid);
  const data = JSON.stringify({type: 2, queue: qid.toString(), id: pid.toString() });
  console.log(data);
  socket.send(data)
}



export {connect, sendMsg, joinQueue};
