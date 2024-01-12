module.exports = ({ socket }) => {
  const send = (channel, message, content) => {
    console.log(channel, message, content)
    socket.on('connection', (connection) => {
      connection.emit(channel, { message, id: connection.id, content });
      connection.on('disconnect', () => {});
      console.log(`Send message: ${message} for channel ${channel}`);
    })
  }
  return { send }
}