document.getElementById("submit").addEventListener("click", function(e){
  var number = document.getElementById("number").value;
  var unit = document.getElementById("unit").value;
  var delay = number * unit;
  browser.runtime.sendMessage({ op: "snooze", args: { delay: delay }});
});
