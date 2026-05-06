document.addEventListener("DOMContentLoaded", () => {
  const config = document.querySelector("#hw-config");
  const start = config ? parseInt(config.dataset.start || "0", 10) : 0;

  document.querySelectorAll("hw").forEach((el, i) => {
    el.setAttribute("data-num", start + i + 1);
  });
});
