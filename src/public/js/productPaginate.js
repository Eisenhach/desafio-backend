const socket = io();

socket.on("connect", () => {
  console.log("Conection established ");
});

socket.on("products", (products) => {
  console.log("Receiving products from the server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from the server");
});

document.addEventListener("DOMContentLoaded", () => {
  const btnCartButtons = document.querySelectorAll(".btnCart");

  btnCartButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      const productId = event.target.getAttribute("data-id");
      const productTitle = event.target.getAttribute("data-title");

      try {
        const response = await fetch(
          `http://localhost:8080/api/carts/651586d6255b065b95e28288/product/${productId}`,
          {
            method: "POST",
          }
        );

        if (response.ok) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: productTitle + `agregado al carrito`,
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          console.error("Error al agregar el producto", error);
        }
      } catch (error) {
        console.error(error);
      }
    });
  });
});
