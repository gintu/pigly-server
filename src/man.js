io.on("connection", socket => {
  socket.on("join", data => {
    socket.join(data.room);
    console.log("user joined " + data.room);

    socket.broadcast.to(data.room).emit("from server", {
      message: `${data.name} has joined the chat`,
      sentBy: "admin",
      id: uuid.v4(),
      room: data.room
    });

    socket.on("chat message", msg => {
      console.log(msg);
      io.to(data.room).emit("from server", msg);
    });

    console.log(data);
  });

  // socket.on("disconnect user", name => {
  //   socket.broadcast.emit("from server", {
  //     message: `${name} has left the chat`,
  //     sentBy: "admin",
  //     id: uuid.v4(),
  //     room: ""
  //   });

  //   console.log("user is disonnected");
  // });

  socket.on("disconnect", () => {
    // socket.broadcast.emit("from server", {
    //   message: `someone has left the chat`,
    //   sentBy: "admin",
    //   id: uuid.v4(),
    //   room: ""
    // });

    console.log("user is disonnected");
  });
});
