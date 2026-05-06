document.addEventListener("DOMContentLoaded", async () => {
  const PASSWORD_HASH =
	"1155b0007068f8e930964e11ee161fe2958854fa8c82746890802b8ec38c9e67";
  // $ printf "..." | shasum -a 256

  const itemName = "bok26-auth";
  if (sessionStorage.getItem(itemName) === "ok") {
    return;
  }

  const input = prompt("비밀번호를 입력하세요:");

  errmsg = "<style>body{margin:20px;}</style><h1>접근 거부</h1><p>비밀번호가 올바르지 않습니다.</p><p>다시 시도하려면 페이지를 새로고침하세요.<br/>문제가 계속되면 탭을 닫았다가 다시 열어 주세요.</p>";

  if (input === null) {
    document.body.innerHTML = errmsg;
    return;
  }

  const inputHash = await sha256(input);

  if (inputHash === PASSWORD_HASH) {
    sessionStorage.setItem(itemName, "ok");
  } else {
    document.body.innerHTML = errmsg;
  }
});

async function sha256(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}
