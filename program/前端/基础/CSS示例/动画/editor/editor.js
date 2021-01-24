function update() {
  let outty = window.hello.document;
  outty.open();
  let inny = document.getElementById("data");
  outty.write(inny.value);
  outty.close();
}

function goFullscreen(newWin) {
  if (newWin) outWin = window.open();
  else outWin = window.open("about:blank", "html_editor");
  outWin.focus();
  let outty = outWin.document;
  outty.open();
  let inny = document.getElementById("data");
  outty.write(inny.value);
  outty.close();
}

function realtime() {
  if (!document.querySelector("#realtime").checked) return;
  update();
}

dataArea = document.getElementById("data");
dataArea.onkeyup = realtime;

update();
