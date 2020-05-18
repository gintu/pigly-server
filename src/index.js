let app = require("express")();
let http = require("http").createServer(app);
let io = require("socket.io")(http);
let cors = require("cors");

app.use(cors());

io.on("connection", socket => {
  console.log("a user is connected");
  socket.emit("news", { hello: "world" });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("my other event", data => {
    console.log(data);
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
