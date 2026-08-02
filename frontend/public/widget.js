(function () {
  const button = document.createElement("button");
  button.innerHTML = "💬";

  button.style.position = "fixed";
  button.style.bottom = "25px";
  button.style.right = "25px";
  button.style.width = "60px";
  button.style.height = "60px";
  button.style.borderRadius = "50%";
  button.style.background = "#6C63FF";
  button.style.color = "#fff";
  button.style.border = "none";
  button.style.cursor = "pointer";
  button.style.zIndex = "999999";

  const iframe = document.createElement("iframe");

  iframe.src = "https://aiktc-chatbot-frontend.onrender.com";

  iframe.style.position = "fixed";
  iframe.style.bottom = "100px";
  iframe.style.right = "20px";
  iframe.style.width = "400px";
  iframe.style.height = "650px";
  iframe.style.border = "none";
  iframe.style.borderRadius = "18px";
  iframe.style.boxShadow = "0 15px 45px rgba(0,0,0,.25)";
  iframe.style.display = "none";
  iframe.style.zIndex = "999999";

  button.onclick = () => {
      iframe.style.display =
          iframe.style.display === "none"
              ? "block"
              : "none";
  };

  document.body.appendChild(button);
  document.body.appendChild(iframe);
})();