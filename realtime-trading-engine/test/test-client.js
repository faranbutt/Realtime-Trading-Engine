const io = require("socket.io-client");
const socket  = io("http://localhost:3000");
socket.on("connect", () => {
  console.log("Connected:", socket.id);
  socket.emit("subscribe",{topic:'AAPL.price'})
  socket.emit("subscribe",{ topic:'AAPL.orderbook' })
  socket.emit('subscribe',{topic: 'AAPL.trades'})
});

socket.on('subscribed', data => {
  console.log('subscribed to ',data)
})

socket.on('priceUpdate',data => {
  console.log('PRICE',data,null,2)
})

socket.on('orderBookUpdate',data => {
  console.log('ORDERBOOK',JSON.stringify(data,null,2))
})

socket.on('tradeUpdate',data => {
  console.log('Trade:',data.symbol,data.price,data,data.size, data.side);
})

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});