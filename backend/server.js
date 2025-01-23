require("dotenv").config();
const http = require("http");
const app = require("./app");
// const { Server } = require("socket.io");
const { init } = require("./socket"); 
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

init(server);

const io = require("./socket").getIO();

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Handle the event when a user joins a room
  socket.on("joinRoom", (roomId) => {
    console.log(`User joined room: ${roomId}`);
    socket.join(roomId);
  });

  // Handle the event when a new bid is placed
  socket.on("newBid", (data) => {
    const { listingId, bidAmount, transporterId } = data;
    io.to(`listing_${listingId}`).emit("bidReceived", { bidAmount, transporterId });
  });

  // Handle the event when a bid is accepted
  socket.on("bidAccepted", (data) => {
    const { bidId, transporterId } = data;
    io.to(`transporter_${transporterId}`).emit("bidAcceptedNotification", { bidId });
  });

  // Handle disconnect event
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});


server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
