function clearAlarm(e){
  var child = e.target;
  browser.runtime.sendMessage({ op: "clearAlarm", args: e.target.value })
  window.location.reload();

}

function listAlarms(alarms){
  var list = document.getElementById('list');
  var html = "";
  for(var a of alarms){
    var card = document.getElementById("alarm-card");
    var title = card.content.getElementById("heading");
    var when = card.content.getElementById("time");
    var body = card.content.getElementById("link");
    var button = card.content.getElementById("delete");

    var uri = new URL(a.url);
    title.textContent = uri.origin;

    button.setAttribute("value", a.url);

    var time = a.delay;
    when.textContent = new Date(time);

    body.setAttribute("href", a.url);

    list.appendChild(document.importNode(card.content, true));
  }

  var buttons = document.getElementsByClassName("danger");
  for (var index = 0; index < buttons.length; index++) {
    var element = buttons[index];
    element.addEventListener("click", clearAlarm);
    
  }
}

function loadAlarms(){
  // browser.alarms.getAll().then(listAlarms);
  browser.storage.local.get().then((items) => { listAlarms(items.alarms) });
}

document.addEventListener('DOMContentLoaded', loadAlarms);