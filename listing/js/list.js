function clearAlarm(e) {
  var child = e.target;
  browser.runtime.sendMessage({ op: "clearAlarm", args: e.target.value })
  window.location.reload();

}

function listAlarms(alarms) {
  var list = document.getElementById('list');
  var html = "";
  for (var a of alarms) {
    var card = document.getElementById("alarm-card");
    var url = card.content.getElementById("url");
    var domainText = card.content.getElementById("domainText");
    var datetime = card.content.getElementById("datetime");
    var deleteButton = card.content.getElementById("deleteButton");

    var uri = new URL(a.url);
    domainText.textContent = uri.origin;
    url.setAttribute("href", a.url);

    var time = new Date(a.delay);
    datetime.textContent = formattedDate(time);

    deleteButton.setAttribute("value", a.url);

    list.appendChild(document.importNode(card.content, true));
  }

  var buttons = document.getElementsByClassName("danger-button");
  for (var index = 0; index < buttons.length; index++) {
    var element = buttons[index];
    element.addEventListener("click", clearAlarm);

  }
}

function formattedDate(time) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour12: true };
  return time.toLocaleTimeString(navigator.language, options);
}

function loadAlarms() {
  removeIrrelevantButtons();
  browser.storage.local.get().then((items) => { listAlarms(items.alarms) });
}

document.addEventListener('DOMContentLoaded', loadAlarms);

document.getElementById("refreshButton").addEventListener("click", function () {
  window.location.reload();
});

document.getElementById("goBackButton").addEventListener("click", function () {
  window.location.href = browser.runtime.getURL("/popup/index.html");;
});

function removeIrrelevantButtons() {
  if(/sidebar/.test(window.location.search)){
    document.getElementById("goBackButton").remove();
  }
  else if(/popup/.test(window.location.search)){
    document.getElementById("refreshButton").remove();
  }
}