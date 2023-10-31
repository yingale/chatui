const User = require('./User');
const users = {};

module.exports = (io) => {

  // Connection
  io.on('connection', (socket) => {
    console.log('User connected');
    // Send online user list
    socket.on('join', (userId) => {
      users[userId] = socket.id;
    });
  
    socket.emit('get online user', User.getOnlineUser());

    let connectedUser = new User(socket.id, false);
    User.users.set(socket.id, connectedUser);

    // Login
    socket.on('login', (fullName) => {

      // Check user
      let isUsing = false;
      User.users.forEach((key) => {
        if (key.fullname == fullName) {
          isUsing = true;
        }
      });
      socket.emit('check user', isUsing);

      // Add User
      if (User.users.has(socket.id) && !isUsing) {
        let currentUser = User.users.get(socket.id);
        currentUser.isLogin = true;
        currentUser.fullname = fullName;
        io.emit('new user', fullName);
      }

    });

    // Send message
    socket.on('send message', (message) => {
      socket.broadcast.emit('new message', message);
    });

    // Disconnect
    socket.on('disconnect', (reason) => {
      const disconnectedUserId = Object.keys(users).find(
        (userId) => users[userId] === socket.id
      );
      delete users[disconnectedUserId];
  
    });

    socket.on('private-message', ({ receiverId, text }) => {
      const receiverSocketId = users[receiverId];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('private-message', {
          senderId: socket.id,
          text,
        });
      }
    });
  

  });
}