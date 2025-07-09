const terminal = document.getElementById("terminal");
const input = document.getElementById("command");

async function checkLogin() {
  const res = await fetch("https://webos.maikanamaikana.workers.dev/auth", {
    credentials: "include"
  });
  if (res.status !== 200) {
    location.href = "login.html";
  }
}
checkLogin();

input.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const cmd = input.value.trim();
    terminal.textContent += `\n$ ${cmd}`;
    input.value = "";
    if (cmd === "help") {
      terminal.textContent += "\nAvailable commands:\n- help\n- whoami\n- logout";
    } else if (cmd === "whoami") {
      terminal.textContent += "\nuser";
    } else if (cmd === "logout") {
      fetch("https://webos.maikanamaikana.workers.dev/logout", {
        method: "POST",
        credentials: "include"
      }).then(() => location.href = "login.html");
    } else {
      terminal.textContent += `\nCommand not found: ${cmd}`;
    }
  }
});
