const socket = io();

socket.on("connect", () => {
  console.log("Conection established ");
});

socket.on("products", (products) => {
  console.log("Receiving products from the server");
  console.log(products);
});

socket.on("disconnect", () => {
  console.log("Disconnected from the server");
});
