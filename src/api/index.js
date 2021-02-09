export const BACKEND_URL = "ws://localhost:8080"

let connect = (socket,cb, server_status) => {
  console.log("Attempting Connection to Server ...");

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

/**
socket: the websockew
qid = 1 RANKED QUEUE
qid = 2 UNRANKED QUEUE
pid = player id
**/
let joinQueue = (socket,qid,pid) => {
  console.log("registering player", pid, "in queue ", qid);
  const data = JSON.stringify({type: 2, queue: qid.toString(), id: pid.toString()});
  console.log(data);
  socket.send(data)
}

let sendMsg = (socket,msg) =>{
  console.log("sending msg:", msg);
  const message = JSON.stringify(msg);
  socket.send(message);
};


let connectGame = (socket, cb) => {
  console.log('Attempting Connection to Game...');

  socket.onopen = () => {
    console.log("Successfully Connected to Game");
  };

  socket.onmessage = msg => {
    console.log("data received", msg);
    cb(msg);
  };

  socket.onclose = event => {
    console.log("Socket Closed Connection: ", event);
  };

  socket.onerror = error => {
    alert("Could not connect to game")
    console.log("Socket Error: ", error);
  };
}

let createGame = (cb,id,privacy) => {
  fetch("/create/"+ id +"/" + privacy, {
    method: "post",
  }).then(function(response){
      if(!response.ok){
        if(response.status === 409){
          alert("Game with this id already exists")
        }
        else{
          alert("Something went wrong with creating your game. Status: ", response.status)
        }
      }
      else{
        cb()
      }
  }).catch(function(error){
    console.log(error)
  });
}


let fetchGameRooms = (listGames) => {
  fetch("/listgames", {
    method: 'GET',
  }).then(function(response){
    console.log(response)
    response.json().then(data => listGames(data))
  }).catch(function(error){
    console.log(error);
  })
}

export {connect, sendMsg, joinQueue, connectGame, fetchGameRooms, createGame};
